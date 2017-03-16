'use strict';
// Import
var config = require(__dirname+'/../config.js');
var thinky = require('thinky')(config);
var r = thinky.r;
var type = thinky.type;
var Query = thinky.Query;
var Validator = require('Validator');
var jwt = require('jsonwebtoken');

var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
})

var Twitter = require('Twitter');

var client = new Twitter({
          consumer_key: 'IG6vI8OFypyKdatneRwI2iPPn',
          consumer_secret: 'vQ7PZ3juGCEWzikxOvsnMz02oaR76ELSBMIO6kkTwGmt4CeWIS',
          access_token_key: '841440127821856769-GmSBpOndJqO4tTxaFD0kKkX4WQM7woA',
          access_token_secret: 'HiUfLNzaIbqAwMMVM1ZdjJzSetv95pq0IZcBFVI2ecLm9'
        });
         


// Create the models


var User = thinky.createModel('User', {
    id: type.string(),
    email: type.string(),
    password: type.string(),
    user_img_path: type.string(),
});

var YoutubeVideo = thinky.createModel('YoutubeVideo', {
    id: type.string(),
    url: type.string(),
    userId: type.string(),
    title: type.string(),
    thumbnail: type.string(),
    subscriberPoints: type.number(),
    likePoints : type.number(),
    viewPoints : type.number(),
    liked: [
        type.string()
    ]
    
});

var TwitterAccount = thinky.createModel('TwitterAccount', {
    id: type.string(),
    name: type.string(),
    userId: type.string(),
    thumbnail: type.string(),
    screenname: type.string(),

});
var UserHistory = thinky.createModel('UserHistory', {
    id: type.string(),
    userId: type.string(),
    likedVideos: [
        type.string()
    ],
    watchedVideos: [
        type.string()
    ],
    subbedUsers: [
        type.string()
    ]
});





// Specify the relations

// A Client has one User that we will keep in the field `User`.
//Client.belongsTo(User, "User", "UserId", "id");
//User.hasMany(Client, "Client", "id", "UserId");

// A Client has multiple Roles that we will keep in the field `Roles`.
//Client.hasMany(Role, "Roles", "id", "ClientId");
//Role.belongsTo(Client, "Client", "ClientId", "id");



User.ensureIndex("email");
UserHistory.ensureIndex("userId");
YoutubeVideo.ensureIndex("id");

function validateInput(data){
    var errors = {};
    if(Validator.isNull(data.email)){
        errors.email = 'This field is required';
    }
    if(Validator.isNull(data.email)){
        errors.password = 'This field is required';
    }

}

exports.LoginCheck = function(req, res){
    const { email, password } = req.body;


    User.filter({'email' : email, 'password' : password}).run().then(function(User){
        if(User.length >= 1){
            const token = jwt.sign({
                id: User[0].id,
                email: User[0].email
            }, config.jwtSecret);


            res.json({
                token
             })

        }else{
            res.status(401).json({errors: {form : "Invalid Credentials" } });
        }
        
    }).error(handleError(res));
   


};
exports.Twitter = function(req,res){

    var params = {screen_name: req.params.screenname};
        client.get('users/lookup', params, function(error, tweets, response) {
          if (!error) {
            
            res.json({
                tweets
            })
          }
        });
    
}
exports.addTwitter = function(req,res){

    const { userId, name, thumbnail, screenname } = req.body;

        TwitterAccount.save(req.body).then(function(TwitterAccount){
        res.json({
            TwitterAccount
        })
    }).error(handleError(res));
    
}
exports.getTwitter = function (req, res) {
    var id = req.params.id;
    TwitterAccount.filter({'userId' : id}).run().then(function(TwitterAccount) {
        res.json({
            TwitterAccount
        });
    }).error(handleError(res));
};
exports.deleteAccount = function (req, res) {
    var id = req.params.id;

    // Delete a Client and all its Roles
    TwitterAccount.get(id).run().then(function(TwitterAccount) {
        TwitterAccount.deleteAll().then(function(result) {
            res.json({
                result: result
            });
        }).error(handleError(res));
    }).error(handleError(res));
};
exports.addUserLikedVideo = function(req,res){
    const {vidId,userId} = req.body;
    var id = req.body.vidId;
     YoutubeVideo.get(id).update({liked: r.row("liked").append(userId)}).run().then(function(YoutubeVideo){
        res.json({
            YoutubeVideo
        })
     })
}
exports.UserSignup = function(req, res){
    const { email, password } = req.body;
    var Users = User;
    var table1 = UserHistory;
    User.filter({'email' : email, 'password' : password}).run().then(function(User){
        if(User.length == 0){
            var table2 = table1;
            Users.save({'email' :email, 'password': password}).then(function(User){
                table2.save({"userId" : User[0].id, "likedVideos":[], "watchedVideos":[], "subbedUsers":[] });
                Users.filter({'email' : email, 'password' : password}).run().then(function(User){
                const token = jwt.sign({
                    id: User[0].id,
                    email: User[0].email
                    }, config.jwtSecret);
                    res.json({
                        token
                     })
                });
            });

        }else{
            res.status(401).json({errors: {form : "Email exists" } });
        }
    }).error(handleError(res));
};


exports.addYoutube = function (req, res) {
    const { url, userId, title, thumbnail, subscriberPoints, likePoints, viewPoints } = req.body;

    YoutubeVideo.save(req.body).then(function(YoutubeVideo){
        res.json({
            YoutbeVideo : YoutubeVideo
        })
    }).error(handleError(res));
    
};

exports.getYoutube = function (req, res) {
    var id = req.params.id;
    YoutubeVideo.filter({"userId" : id}).run().then(function(YoutubeVideo){
        res.json({
            YoutubeVideo
        })
    }).error(handleError(res));
    
};
exports.getYoutubeVideo = function (req, res) {
    var id = req.params.id;
    YoutubeVideo.filter({"id" : id}).run().then(function(YoutubeVideo){
        res.json({
            YoutubeVideo
        })
    }).error(handleError(res));
    
};
exports.getRandomVideo = function (req, res) {

    var id = req.params.id;
    
    YoutubeVideo.filter(r.not(r.row('liked').contains(id)).and(r.row("userId").ne(id))).orderBy(r.desc(r.row('likePoints'))).limit(1).run().then(function(YoutubeVideo){
        res.json({
            YoutubeVideo
        })
    })

    // UserHistory.filter(r.row('userId').eq(id)).run().then(function(UserHistory, YoutubeVideo){
    //      YoutubeVideo.filter(r.row)
         
    // });
    // console.log(item);

    // YoutubeVideo.filter(r.row('userId').ne(id)).and(r.row()).orderBy(r.desc('likePoints')).run().then(function(YoutubeVideo){
    //     console.log(res)
    //     res.json({
    //         YoutubeVideo
    //     })
    // })
    
   


};
exports.deleteYoutube = function (req, res) {
    var id = req.params.id;

    // Delete a Client and all its Roles
    YoutubeVideo.get(id).run().then(function(YoutubeVideo) {
        YoutubeVideo.deleteAll().then(function(result) {
            res.json({
                result: result
            });
        }).error(handleError(res));
    }).error(handleError(res));
};
exports.updateYoutubePoints = function (req, res) {

    YoutubeVideo.get(req.body.id).update(req.body).run().then(function(YoutubeVideo) {
        YoutubeVideo.subscriberPoints = req.body.subscriberPoints;
        YoutubeVideo.likePoints = req.body.likePoints;
        YoutubeVideo.viewPoints = req.body.viewPoints;
        
        res.json({
            YoutubeVideo: YoutubeVideo
        })
    }).error(handleError(res));
};

exports.Searches = function (req, res) {
    Searches.orderBy({index: r.asc('created_at')}).run().then(function(Searches) {
        res.json(Searches);
    }).error(handleError(res));
};
exports.Search = function (req, res) {
    var id = req.params.id;
    Searches.get(id).run().then(function(Searches) {
        res.json({
            Searches: Searches
        });
    }).error(handleError(res));
};
// Edit a User
exports.editSearch = function (req, res) {
    Searches.get(req.body.id).update(req.body).run().then(function(Searches) {
        Searches.leaseInfo.leaseRate = req.body.leaseInfo.leaseRate;
        Searches.leaseInfo.leaseType = req.body.leaseInfo.leaseType;
        Searches.leaseInfo.leaseFrequency = req.body.leaseInfo.leaseFrequency;
        Searches.leaseInfo.size = req.body.leaseInfo.size;
        Searches.leaseInfo.buildingSize = req.body.leaseInfo.buildingSize;
        res.json({
            Searches: Searches
        })
    }).error(handleError(res));
};
exports.checkIfSaved = function (req, res){
    var lat = req.params.lat;
    var lng = req.params.lng;
    var query = new thinky.Query(Searches, r.db("retail").table("Searches").filter({lat : lat, lng : lng}).count());
    query.execute().then(function(result){
        res.json({
            result : result
        })
    }).error(handleError(res));

};
exports.addSearch = function (req, res) {
    Searches.save(req.body).then(function(result) {
        res.json(result);
    }).error(handleError(res));
};
exports.deleteSearch = function (req, res) {
    var id = req.params.id;
    Searches.get(id).run().then(function(Searches) {
        Searches.deleteAll().then(function(result) {
            res.json({
                result: result
            });
        }).error(handleError(res));
    }).error(handleError(res));
};

// Retrieve a list of Clients ordered by date with its User and Roles
exports.Clients = function (req, res) {
    Client.orderBy({index: r.desc('client_name')}).run().then(function(Client) {
        res.json(Client);
    }).error(handleError(res));
};


// Retrieve one Client
exports.Client = function (req, res) {
    var id = req.params.id;
    Client.get(id).run().then(function(Client) {
        res.json({
            Client: Client
        });
    }).error(handleError(res));
};


// Retrieve a Client and all the available Users

//exports.ClientAndUsers = function (req, res) {
 //   var id = req.params.id;
//    Client.get(id).run().then(function(Client) {
//        User.run().then(function(Users) {
//            res.json({
//                Client: Client,
//                Users: Users
//            });
//        }).error(handleError(res));
//    }).error(handleError(res));
//};


// Save a Client in the database
exports.addClient = function (req, res) {

    //var newClient = new Client(req.body);

    Client.save(req.body).then(function(result) {
        res.json(result);
    }).error(handleError(res));
};


// Delete a Client and its Roles from the database
exports.deleteClient = function (req, res) {
    var id = req.params.id;

    // Delete a Client and all its Roles
    Client.get(id).run().then(function(Client) {
        Client.deleteAll().then(function(result) {
            res.json({
                result: result
            });
        }).error(handleError(res));
    }).error(handleError(res));
};


// Update a Client in the database
exports.editClient = function (req, res) {
    Client.get(req.body.id).run().then(function(Client) {
        Client.title = req.body.title;
        Client.text = req.body.text;
        Client.UserId = req.body.UserId;
        Client.save().then(function(Client) {
            res.json({
                Client: Client
            });
        }).error(handleError(res));
    }).error(handleError(res));
};


// Retrieve all Users
exports.Users = function (req, res) {
    User.orderBy({index: 'first_name'}).run().then(function(User) {
        res.json({
            User: User
        });
    }).error(handleError(res));
};


// Retrieve one User
exports.User = function (req, res) {
    var id = req.params.id;

    User.get(id).run().then(function(User) {
        res.json({
            User: User
        });
    }).error(handleError(res));
};


// Save an User in the database
exports.addUser = function (req, res) {
    User.save(req.body).then(function(result) {
        res.json(result);
    }).error(handleError(res));
};


// Delete a User
exports.deleteUser = function (req, res) {
    var id = req.params.id;

    // Delete a User 
    User.get(id).run().then(function(User) {
        User.delete().then(function(User) {
            res.json({
                result: User
            })
        }).error(handleError(res));
    }).error(handleError(res));
};


// Edit a User
exports.editUser = function (req, res) {
    // Update an User
    User.get(req.body.id).update(req.body).run().then(function(User) {
        res.json({
            User: User
        })
    }).error(handleError(res));
};


// Add a Role
exports.addRole = function (req, res) {
    var newRole = new Role(req.body);

    newRole.save().then(function(error, result) {
        res.json({
            error: error,
            result: result
        });
    });
};


// Delete Role
exports.deleteRole = function (req, res) {
    var id = req.params.id;

    // We can directly delete the Role since there is no foreign key to clean
    Role.get(id).delete().execute().then(function(error, result) {
        res.json({
            error: error,
            result: result
        })
    });
};

function handleError(res) {
    return function(error) {
        console.log(error.message);
        return res.send(500, {error: error.message});
    }
}

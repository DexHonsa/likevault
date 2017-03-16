import React from 'react';

class YoutubeIframe extends React.Component {
	render() {
		return(
				<iframe src={"http://youtube.com/watch?v=" + this.props.params.url}></iframe>
			);
	}
}
export default YoutubeIframe;
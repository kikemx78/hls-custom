import * as React from 'react';

class MockControls extends React.Component<any,any> {
	
	render() {
		
		const {
			videoSrc, 
			hasCapLevel, 
			setUrlValue,
			setVideoUrl,
			resetVideoUrl
		} = this.props;

		return (
			<div>
				<div style={{margin: '50px'}}>
					<label>Has capLevelToPlayerSize</label>
					<select onChange={hasCapLevel}>
							<option value="no"></option>
							<option value="yes">Yes</option>
							<option value="no">No</option>
					</select>
				</div>

				<div>
					<label>Type Video URL</label>
					<input type="text" onChange={setUrlValue} value={videoSrc} />
					<button disabled={videoSrc === ''} onClick={setVideoUrl}>Set video url</button>
					<button onClick={resetVideoUrl}>Reset video url</button>
				</div>

				<div>
					<p>Sample URL:</p>
					https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8
				</div>
			</div>
		);
	}

}

export default MockControls;

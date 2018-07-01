import React from 'react';
import Glyphicon from 'react-bootstrap';

//CSS
import '../../css/tile.less';

export default class Tile extends React.Component {
	render() {
	    const image = require('../../images/' + this.props.image);
	    console.log(image);
        return (
			<div className="tile">
				<div className="tileImage" style={{backgroundImage: `url(${'./images/' + image})`}}></div>
				{this.props.children}
			</div>
		);
	}
}
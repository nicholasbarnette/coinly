import React from 'react';
import Glyphicon from 'react-bootstrap';

//CSS
import '../../css/tile.less';

export default class Tile extends React.Component {

    handleClick() {
		this.props.click(this.props.data1, this.props.data2);
	}

	render() {
	    const image = require('../../images/' + this.props.image);
        return (
			<div className="tile" onClick={e => this.handleClick()}>
				<div className="tileImage" style={{backgroundImage: `url(${'./dist/' + image})`}}></div>
				{this.props.children}
			</div>
		);
	}
}
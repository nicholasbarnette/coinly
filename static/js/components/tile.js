import React from 'react';
import {Glyphicon} from 'react-bootstrap';

//CSS
import '../../css/components/tile.less';

export default class Tile extends React.Component {

    handleClick() {
		this.props.click(this.props.data1, this.props.data2);
	}

	render() {
	    const image = require('../../images/' + this.props.image);
        return (
			<div className={"tile " + this.props.type} onClick={e => this.handleClick()}>
			{
				this.props.completed === "-1" || this.props.completed === "0" || this.props.completed === "1" ?
					<div className={this.props.completed === "0" ? "selectedValue partial" : 
									(this.props.completed === "-1" ? "selectedValue incomplete" : "selectedValue complete")}
						title={this.props.completed === "0" ? "Incomplete" : 
									(this.props.completed === "-1" ? "Missing" : "Owned")}></div>
				: ""
			}
				<div className="tileImage" style={{backgroundImage: `url(${'./dist/' + image})`}}></div>
				{this.props.children}
			</div>
		);
	}
}
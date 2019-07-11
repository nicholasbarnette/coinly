import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import Button from '../components/button.js';

//CSS
import '../../css/components/tile.less';

export default class Tile extends React.Component {

	constructor() {
        super();

        this.openDialog = this.openDialog.bind(this);
    }

    handleClick() {
		this.props.click(this.props.data1, this.props.data2);
	}

	openDialog() {
		this.props.setCoinOption(this.props.coinOption);
		this.props.openAddCoinDialog();
	}

	render() {
	    const image = require('../../images/' + this.props.image);
        return (
			<div className={"tile " + this.props.type} onClick={e => this.handleClick()}>
				<div className="notificationBar">
				{
					this.props.completed === "-1" || this.props.completed === "0" || this.props.completed === "1" ?
						<div className={this.props.completed === "0" ? "selectedValue partial" : 
										(this.props.completed === "-1" ? "selectedValue incomplete" : "selectedValue complete")}
							title={this.props.completed === "0" ? "Incomplete" : 
										(this.props.completed === "-1" ? "Missing" : "Owned")}></div>
					: ""
				}
				{
					this.props.canAdd === true ?
						<Button click={this.openDialog} type="iconButton addCoinButton dark"><Glyphicon glyph="plus" /></Button>
					: ""
				}
				</div>
				<div className="tileImage" style={{backgroundImage: `url(${'./dist/' + image})`}}></div>
				{this.props.children}
			</div>
		);
	}
}
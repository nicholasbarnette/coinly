import React from 'react';
import { Glyphicon } from 'react-bootstrap';


//JS
import Button from '../components/button.js';


//CSS
import '../../css/components/dialog.less';


export default class Dialog extends React.Component {

    constructor() {
        super();
        //Logged In
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e) {
        if (e.key == 'Enter') {
            this.props.submitDialog();
        }
    }

	render() {
		return (
            <div className="dialogContainer" id={this.props.dialogName + "DialogContainer"} onKeyPress={this.handleKeyPress}>
                <div className="dialogMask">
                    <div className="dialog">
                        <Button click={this.props.closeDialog} params={this.props.params} type="iconButton closeButton"><Glyphicon glyph="remove" /></Button>
                        <div className="header">
                            <h1>{this.props.header}</h1>
                        </div>
                        <div className="body">
                            {this.props.children}
                        </div>
                        <div className="footer">
                            <Button click={this.props.submitDialog} type="">
                                <span className="text">{this.props.buttonText == undefined ? "Submit" : this.props.buttonText}</span>
                            </Button>
                        </div>
                    </div>
                </div>
			</div>
		);
	}
}
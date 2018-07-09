import React from 'react';
import { Glyphicon } from 'react-bootstrap';


//JS
import Button from '../components/button.js';


//CSS
import '../../css/components/dialog.less';


export default class Dialog extends React.Component {
	render() {
		return (
		    <div className="dialogMask">
                <div className="dialog">
                    <Button click={this.props.closeDialog} type="iconButton closeButton"><Glyphicon glyph="remove" /></Button>
                    <div className="header">
                        <h1>{this.props.header}</h1>
                    </div>
                    <div className="body">
                        {this.props.children}
                    </div>
                    <div className="footer">
                        <Button click={this.props.submitDialog} type="">
                            <span className="text">Save</span>
                        </Button>
                    </div>
                </div>
			</div>
		);
	}
}
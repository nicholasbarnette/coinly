import React from 'react';
import { Glyphicon } from 'react-bootstrap';

//CSS
import '../../css/components/notification.less';

export default class Notification extends React.Component {

	handleOpenClick() {
	    this.props.click();
	}

	handleCloseClick() {
	    this.props.close();
	}

	render() {
		return (
			<div className="notification" onClick={e => this.handleOpenClick()} style={{width: this.props.notificationOpen ? '3rem' : '100%', height: this.props.notificationOpen ? '3.5rem' : 'auto', display: this.props.notification == '' ? 'none' : 'flex'}}>
                <span className="notificationIcon"><Glyphicon glyph="warning-sign" /></span>
				<span className="notificationText">{this.props.notification}</span>
				<span className="notificationClose" onClick={e => this.handleCloseClick()}><Glyphicon glyph="remove" /></span>
			</div>
		);
	}
}
import React from 'react';
import { Glyphicon } from 'react-bootstrap';

//CSS
import '../../css/components/notification.less';

export default class Notification extends React.Component {
	render() {
		return (
			<div className="notification">
                <span className="notificationIcon"><Glyphicon glyph="warning-sign" /></span>
				<span className="notificationText">{this.props.notification}</span>
			</div>
		);
	}
}
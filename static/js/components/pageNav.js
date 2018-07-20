import React from "react";
import ReactDOM from "react-dom";

//JS
import LeftNav from '../components/leftNav.js';
import TopNav from '../components/topNav.js';
import Notification from '../components/notification.js';


export default class PageNav extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			width: '10rem',
			notificationOpen: false
		};
		this.openLeftNav = this.openLeftNav.bind(this);
		this.toggleNotification = this.toggleNotification.bind(this);
		this.closeNotification = this.closeNotification.bind(this);
		this.setNotification = this.setNotification.bind(this);
	}

	openLeftNav() {
		this.setState({
			width: this.state.width === '10rem' ? '0' : '10rem'
		});
	}

	toggleNotification() {
	    this.setState({
	        notificationOpen: !this.state.notificationOpen
	    });
	}

	closeNotification() {
	    this.props.closeNotification();
	}

	setNotification(n) {
	    this.props.setNotification(n);
	}

	render() {
		return	<div className="navContainer">
					<TopNav openLeftNav={this.openLeftNav} setNotification={this.setNotification} />
					<LeftNav width={this.state.width}>{
						<div className="bodyContainer">
							{this.props.children}
					    </div>}
					</LeftNav>
					<Notification notification={this.props.notification} click={this.toggleNotification} close={this.closeNotification} notificationOpen={this.state.notificationOpen} />
				</div>;
	}
}




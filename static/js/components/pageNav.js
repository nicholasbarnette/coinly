import React from "react";
import ReactDOM from "react-dom";

//JS
import LeftNav from '../components/leftNav.js';
import Notification from '../components/notification.js';


export default class PageNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notificationOpen: false,
			loggedIn: false,
			collapsed: false
		};
		this.toggleLeftNav = this.toggleLeftNav.bind(this);
		this.toggleNotification = this.toggleNotification.bind(this);
		this.closeNotification = this.closeNotification.bind(this);
		this.setNotification = this.setNotification.bind(this);
		this.setLoggedIn = this.setLoggedIn.bind(this);
	}

	componentDidMount() {
		this.setState({
			collapsed: localStorage.getItem('leftNavCollapsed')
		});
    }

	toggleLeftNav() {
		this.setState({
			collapsed: !this.state.collapsed
		});
		localStorage.setItem('leftNavCollapsed', !this.state.collapsed);
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

	setLoggedIn(l) {
	    this.props.setLoggedIn(l);
	    this.setState({
			loggedIn: l
		});
	}

	render() {
		return	<div className="navContainer">
					<LeftNav toggleLeftNav={this.toggleLeftNav} setNotification={this.setNotification} setLoggedIn={this.setLoggedIn} collapsed={this.state.collapsed}>
					{
						<div className="bodyContainer">
							{this.props.children}
					    </div>
					}
					</LeftNav>
					<Notification notification={this.props.notification} click={this.toggleNotification} close={this.closeNotification} notificationOpen={this.state.notificationOpen} />
				</div>;
	}
}




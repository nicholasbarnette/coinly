import React from "react";
import ReactDOM from "react-dom";

//JS
import LeftNav from '../components/leftNav.js';
import Notification from '../components/notification.js';


export default class PageNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: '10rem',
			notificationOpen: false,
			loggedIn: false,
			collapsed: false
		};
		this.openLeftNav = this.openLeftNav.bind(this);
		this.toggleNotification = this.toggleNotification.bind(this);
		this.closeNotification = this.closeNotification.bind(this);
		this.setNotification = this.setNotification.bind(this);
		this.setLoggedIn = this.setLoggedIn.bind(this);
	}

	componentDidMount() {
		this.setState({
			width: localStorage.getItem('leftNavWidth') === "null" ? "10rem" : localStorage.getItem('leftNavWidth'),
			collapsed: localStorage.getItem('leftNavWidth') === "4rem" ? true : false
		});
    }

	openLeftNav() {
		this.setState({
			width: this.state.width === '10rem' ? '4rem' : '10rem',
			collapsed: this.state.width === '10rem' ? true : false
		});
		localStorage.setItem('leftNavWidth', this.state.width === '10rem' ? '4rem' : '10rem');
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
					<LeftNav width={this.state.width} openLeftNav={this.openLeftNav} setNotification={this.setNotification} setLoggedIn={this.setLoggedIn} collapsed={this.state.collapsed}>
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




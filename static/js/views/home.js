import React from "react";
import ReactDOM from "react-dom";

//CSS
import '../../css/home.less';

//JS
import PageNav from '../components/pageNav.js';
import Button from '../components/button.js';

export default class Home extends React.Component {

    constructor() {
        super();

        this.state = {
            notification: '',
            loggedIn: false
        };

        //Buttons
        this.buttonClick = this.buttonClick.bind(this);

        //Notification
        this.closeNotification = this.closeNotification.bind(this);
        this.setNotification = this.setNotification.bind(this);

        //Logged In
        this.setLoggedIn = this.setLoggedIn.bind(this);
    }

    setLoggedIn(l) {
        this.setState({
            loggedIn: l
        });
        this.loadData('',0,0,'Value');
    }

    closeNotification() {
	    this.setState({
	        notification: ''
	    });
	}

	buttonClick() {
	    return;
	}

	closeNotification() {
	    this.setState({
	        notification: ''
	    });
	}

	setNotification(n) {
	    this.setState({
	        notification: n
	    });
	}

	render() {
		return	<div className="pageContainer">
					<PageNav notification={this.state.notification} closeNotification={this.closeNotification} setNotification={this.setNotification} setLoggedIn={this.setLoggedIn} >
					{
					    <div className="bodyContent">
							<h1>Coin Storage</h1>
							<p>This application allows you to track your coin collection.</p>
							<a href="/collections"><Button click={this.buttonClick} type=""><span>Get Started</span></Button></a>
					    </div>
					}
					</PageNav>
				</div>;
	}
}




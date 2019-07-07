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
					    	<div className="section odd">
								<h1>Collection Management</h1>
								<p>Your collection in the palm of your hand.</p>
								<a href="/collections"><Button click={this.buttonClick} type="dark"><span>Get Started</span></Button></a>
					    	</div>
					    	<div className="section even">
						    	<h3>Create a Collection</h3>
						    	<p>Create an electronic version of your collection. You can view your collection from anywhere at anytime. No matter the device, you will always have access.</p>
					    	</div>
					    	<div className="section odd">
						    	<h3>Add to the Collection</h3>
						    	<p>Add a new coin to your collection in a couple clicks. You will no longer be limited to adding a coin to your collection when you get back to your computer. Now, you can do it straight from your mobile device.</p>
					    	</div>
					    	<div className="section even">
						    	<h3>View your Collection</h3>
						    	<p>Looking for a specific coin? Quickly navigate your collection to find exactly the coin you're looking for.</p>
								<a href="/collections"><Button click={this.buttonClick} type=""><span>Get Started</span></Button></a>
					    	</div>
					    </div>
					}
					</PageNav>
				</div>;
	}
}




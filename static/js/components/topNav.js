import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import $ from 'jquery';

//CSS
import '../../css/components/nav.less';


//JS
import Button from '../components/button.js';
import Dialog from '../components/dialog.js';
import Form from '../components/form.js';
import Input from '../components/input.js';


export default class TopNav extends React.Component {

    constructor() {
        super();

        this.state = {
            loggedIn: false,
            dialogOpen: false,

            //Dialog Type
            //0 -- Dialog Not Open
            //1 -- Login
            //2 -- Create Account
            dialogType: 0,

            //Input values
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            birthday: '',
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
            firstNameError: false,
            lastNameError: false,
            birthdayError: false
        };

       //Dialog Functions
       this.toggleDialogOpen = this.toggleDialogOpen.bind(this);
       this.submitLogin = this.submitLogin.bind(this);
       this.submitLogout = this.submitLogout.bind(this);
       this.submitCreateAccount = this.submitCreateAccount.bind(this);

       //Input Functions
       this.onInputChange = this.onInputChange.bind(this);
    }

    setLoggedIn(l) {
        this.setState({
            loggedIn: l
        });
        this.props.setLoggedIn(l);
    }

    componentDidMount() {
        this.loginCheck()
    }

    loginCheck() {
        $.ajax({
            url: "/profile/login/check",
            method: 'POST',
            contentType: 'application/json',
            data: "{}"
        })
        .done(data => {
            data = JSON.parse(data);
            this.setState({
                loggedIn: data.loggedIn
            });
            this.setNotification('');
            this.setLoggedIn(data.loggedIn);
        })
        .fail((xhr, status, error) => {
            this.setNotification(JSON.parse(xhr.responseJSON).message);
            this.setLoggedIn(false);
        });
    }

	handleClick() {
		this.props.openLeftNav();
	}

    toggleDialogOpen(n) {
        this.setState({
            dialogOpen: !this.state.dialogOpen,
            dialogType: n
        });
	}

	submitLogout() {
        $.ajax({
            url: "/profile/logout",
            method: 'POST',
            contentType: 'application/json'
        })
        .done(data => {
            this.setState({
                loggedIn: false
            });
            this.setNotification('');
            this.setLoggedIn(false);
        })
        .fail((xhr, status, error) => {
            this.setNotification(JSON.parse(xhr.responseJSON).message);
        });
	}

	submitCreateAccount() {
        var params = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthday: this.state.birthday
        };
        params = JSON.stringify(params);

        //Form validation
        let emailError = this.emailValidation(this.state.email);
        let passwordError = this.passwordValidation(this.state.password, this.state.confirmPassword);
        let firstNameError = this.state.firstName.length > 1;
        let lastNameError = this.state.lastName.length > 1;
        let birthdayError = this.dateValidation(this.state.birthday);
        this.setState({
            firstNameError: !firstNameError,
            lastNameError: !lastNameError
        });
        if (!passwordError || !emailError || !firstNameError || !lastNameError || !birthdayError) {
            return;
        }

        $.ajax({
            url: "/profile/create",
            method: 'POST',
            contentType: 'application/json',
            data: params
        })
        .done(data => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                birthday: ''
            });
            this.toggleDialogOpen(0);
            this.setNotification('');
        })
        .fail((xhr, status, error) => {
            this.setNotification(JSON.parse(xhr.responseJSON).message);
            this.setLoggedIn(false);
        });
	}

	submitLogin(l,v) {
        var params = {
            email: this.state.email,
            password: this.state.password
        };
        params = JSON.stringify(params);

        $.ajax({
            url: "/profile/login",
            method: 'POST',
            contentType: 'application/json',
            data: params
        })
        .done(data => {
            this.setState({
                loggedIn: true,
                email: '',
                password: ''
            });
            this.toggleDialogOpen(0);
            this.setNotification('');
            this.setLoggedIn(true);
        })
        .fail((xhr, status, error) => {
            this.setNotification(JSON.parse(xhr.responseJSON).message);
            this.setLoggedIn(false);
        });
	}

	onInputChange(c,v) {
        if (this.state.dialogType == 1) {
            if (c == 0) {
                this.setState({
                    email: v
                });
            } else if (c == 1) {
                this.setState({
                    password: v
                });
            }
        } else if (this.state.dialogType == 2) {
            if (c == 0) {
                this.setState({
                    email: v
                });
            } else if (c == 1) {
                this.setState({
                    password: v
                });
            } else if (c == 2) {
                this.setState({
                    confirmPassword: v
                });
            } else if (c == 3) {
                this.setState({
                    firstName: v
                });
            } else if (c == 4) {
                this.setState({
                    lastName: v
                });
            } else if (c == 5) {
                this.setState({
                    birthday: v
                });
            }
        }
    }

    emailValidation(e) {
        let re = new RegExp('[a-z0-9!#$%&*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?', 'g');
        if (re.test(e)) {
            this.setState({
                emailError: false
            });
            return true;
        }
        this.setState({
            emailError: true
        });
        return false;
    }

    passwordValidation(p1,p2) {
        //Must match
        //Must be at least 8 characters long but less than 32
        //May only contain letters, numbers, and special characters ! @ # $ % & ?

        let re = new RegExp('^[A-Za-z0-9!@#$%&?]*$', 'g');
        let passwordValid = false;
        if (re.test(p1) && p1.length >= 8 && p1.length <= 32) {
            this.setState({
                passwordError: true,
                confirmPasswordError: false
            });
            passwordValid = true;
        }
        if (p1 == p2 && passwordValid) {
            this.setState({
                passwordError: false,
                confirmPasswordError: false
            });
            return true;
        }
        this.setState({
            passwordError: !passwordValid,
            confirmPasswordError: true
        });
        return false;
    }

    dateValidation(d) {

        if (d.length == 0) {
            this.setState({
                birthdayError: true
            });
            return false;
        }

        let dArray = d.split('-');
        if (dArray.length != 3) {
            this.setState({
                birthdayError: true
            });
            return false;
        }

        let year = parseInt(dArray[0]);
        let month = parseInt(dArray[1]) - 1;
        let day = parseInt(dArray[2]);

        if (month < 0 && month > 11 && year > new Date().getFullYear() - 100 && year < new Date().getFullYear()) {
            this.setState({
                birthdayError: true
            });
            return false;
        }

        if (isNaN((new Date(year, month, day)).getFullYear())) {
            this.setState({
                birthdayError: true
            });
            return false;
        }

        this.setState({
            birthdayError: false
        });
        return true;
    }

    setNotification(n) {
        this.props.setNotification(n);
    }

	render() {
		return (
			<nav className="navbar">
				<div className="navGroup left">
					<div className="navItem hamburger" onClick={e => this.handleClick()}>
						<a><Glyphicon glyph="menu-hamburger" /></a>
					</div>
				</div>
				<div className="navGroup middle">
					<div className="navItem logo">
						<a href="/">Coin Storage</a>
					</div>
				</div>
				<div className="navGroup right">
                    {
                        this.state.loggedIn ?
                            <div>
                                <Button click={this.submitLogout} type=""><span>Logout</span></Button>
                            </div>
                        :
                            <div>
                                <Button click={this.toggleDialogOpen} params={1} type=""><span>Login</span></Button>
                                <Button click={this.toggleDialogOpen} params={2} type=""><span>Create Account</span></Button>
                            </div>

                    }
				</div>
				{
				    this.state.dialogOpen ?

                        this.state.dialogType == 1 ?
                            <Dialog header="Login" closeDialog={this.toggleDialogOpen} params={0} submitDialog={this.submitLogin}>
                                <Form>
                                    {
                                       <div>
                                            <Input hasLabel="true" labelText="Email:" name="email" type="text" placeholderText="Email" change={this.onInputChange} params={0} />
                                            <Input hasLabel="true" labelText="Password:" name="password" type="password" placeholderText="Password" change={this.onInputChange} params={1} />
                                       </div>
                                    }
                                </Form>
                            </Dialog>
                        :
                            <Dialog header="Login" closeDialog={this.toggleDialogOpen} params={0} submitDialog={this.submitCreateAccount} buttonText="Create">
                                <Form>
                                    {
                                        <div>
                                            <Input hasLabel="true" labelText="Email:" name="email" type="text" placeholderText="Email" change={this.onInputChange} params={0} error={this.state.emailError} />
                                            <Input hasLabel="true" labelText="Password:" name="password" type="password" placeholderText="Password" change={this.onInputChange} params={1} error={this.state.passwordError} />
                                            <Input hasLabel="true" labelText="Confirm Password:" name="confirmPassword" type="password" placeholderText="Confirm Password" change={this.onInputChange} params={2} error={this.state.confirmPasswordError} />
                                            <Input hasLabel="true" labelText="First Name:" name="firstName" type="text" placeholderText="First Name" change={this.onInputChange} params={3} error={this.state.firstNameError}  />
                                            <Input hasLabel="true" labelText="Last Name:" name="lastName" type="text" placeholderText="Last Name" change={this.onInputChange} params={4} error={this.state.lastNameError}  />
                                            <Input hasLabel="true" labelText="Birthday:" name="birthday" type="date" placeholderText="YYYY-MM-DD" change={this.onInputChange} params={5} error={this.state.birthdayError}  />
                                        </div>
                                    }
                                </Form>
                            </Dialog>

                    : ''
				}
			</nav>
		);
	}
}
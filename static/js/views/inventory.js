import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import { Glyphicon } from 'react-bootstrap';

//CSS
import '../../css/inventory.less';

//JS
import PageNav from '../components/pageNav.js';
import Tile from '../components/tile.js';
import Button from '../components/button.js';
import Dialog from '../components/dialog.js';
import Form from '../components/form.js';
import Input from '../components/input.js';
import Select from '../components/select.js';


export default class Inventory extends React.Component {

    //Level 0 - Value List
    //Level 1 - Type List
    //Level 2 - Coin List

    constructor() {
        super();

        this.state = {
            level: 0,
            value: 0,
            nickname: '',
            tileContent: [],
            header: 'Value',
            dialogOpen: false,
            levelOption: 0,
            valueOptions: [],
            valueOption: '',
            nicknameOptions: [],
            nicknameOption: '',
            coinOptions: [],
            grade: '',
            buyDate: '',
            buyPrice: 0,
            notes: '',
            notification: '',
            loggedIn: false,
            gradeError: false,
            dateError: false,
            priceError: false
        };

        //Tile and Collection Navigation Functions
        this.selectTile = this.selectTile.bind(this);
        this.backButtonClick = this.backButtonClick.bind(this);

        //Dialog Functions
        this.openAddCoinDialog = this.openAddCoinDialog.bind(this);
        this.closeAddCoinDialog = this.closeAddCoinDialog.bind(this);
        this.submitAddCoinDialog = this.submitAddCoinDialog.bind(this);

        //Select Functions
        this.onCoinSelectChange = this.onCoinSelectChange.bind(this);
        this.onInputSelectChange = this.onInputSelectChange.bind(this);

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

    selectTile(n, v) {
        var l = this.state.level;
        if (this.state.level < 2) {
            l = this.state.level + 1;
        }
        var h = 'Value';
        if (l == 1) {
            h = v;
        } else if (l == 2) {
            h = n;
        }
        this.loadData(n,v,l,h);
    }


    createContent() {

        if (this.state.tileContent.length > 0) {

            var tempArray = [];
            this.state.tileContent.map ((k) => {
                var temp = [];
                Object.keys(k).forEach(function(key) {
                    temp.push(k[key]);
                });
                tempArray.push(temp);
            });


            return	tempArray.map ((n) => {
                        return <Tile image={n[n.length-1]} click={this.selectTile} data1={n[0]} data2={n[1]} type={this.state.level != 2 ? "clickable" : ""}>
                        {
                            <div className="tileContent">
                                {n.map ((m) => {
                                    if (m.includes('.jpg') || m.includes('.jpeg') || m.includes('.png') || m == '' || m == 'Notes: ') {
                                        return;
                                    } else {
                                        return <p>{m}</p>;
                                    }
                                })}
                            </div>
                        }
                        </Tile>
                    });
		} else {
		    return	<p>RESULTS NOT FOUND...</p>;
		}
    }


    backButtonClick() {
        var n = this.state.nickname;
        var v = this.state.value;
        var l = this.state.level - 1;
        var h = this.state.header;
        this.loadData(n,v,l,h);
    }


    loadData(n, v, l, h) {
        this.setState({
            nickname: n,
            value: v,
            level: l,
            header: h
        });

        var params = {
            level: l,
            value: v,
            nickname: n
        };
        params = JSON.stringify(params);

        $.ajax({
            url: "/inventory",
            method: 'POST',
            contentType: 'application/json',
            data: params
        })
        .done(data => {
            data = JSON.parse(data);
            this.setState({
                tileContent: data.values,
                header: data.header,
                notification: ''
            });
        })
        .fail((xhr, status, error) => {
            this.setState({
                notification: JSON.parse(xhr.responseJSON).message
            });
        });
    }


    componentDidMount() {
        this.loadData('',0,0,'Value');
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

    openAddCoinDialog () {
        this.loadOptions(0, '', '');
        this.setState({
            dialogOpen: true
        });
    }

    closeAddCoinDialog() {
        this.setState({
            dialogOpen: false,
            levelOption: 0,
            valueOptions: [],
            valueOption: '',
            nicknameOptions: [],
            nicknameOption: '',
            coinOptions: []
        });
    }

    submitAddCoinDialog() {
        var params = {
            value: this.state.valueOption,
            nickname: this.state.nicknameOption,
            coin: this.state.coinOption,
            grade: this.state.grade,
            buyDate: this.state.buyDate,
            buyPrice: this.state.buyPrice,
            notes: this.state.notes
        };
        params = JSON.stringify(params);

        var coin = false;
        if (this.state.coinOption != '' ) {
            coin = true;
        }
        let grade = this.state.grade.length != '';
        let date = this.dateValidation(this.state.buyDate);
        let price = parseInt(this.state.buyPrice) >= 0;
        if (!coin || !grade || !date || !price) {
            return;
        }

        $.ajax({
            url: "/inventory/coin/add",
            method: 'POST',
            contentType: 'application/json',
            data: params
        })
        .done(data => {
            data = JSON.parse(data);
            this.setState({
                notification: ''
            });
        })
        .fail((xhr, status, error) => {
            this.setState({
                notification: JSON.parse(xhr.responseJSON).message
            });
            return;
        });
        this.loadData(this.state.nickname,this.state.value,this.state.level,this.state.header);
        this.closeAddCoinDialog();
    }

    loadOptions(l,v,n,c) {

        this.setState({
            levelOption: l,
            valueOption: v,
            nicknameOption: n,
            coinOption: c
        });

        var params = {
            level: l,
            value: v,
            nickname: n
        };
        params = JSON.stringify(params);

        $.ajax({
            url: "/collections/select",
            method: 'POST',
            contentType: 'application/json',
            data: params
        })
        .done(data => {
            data = JSON.parse(data);
            if (this.state.levelOption == 0) {
                this.setState({
                    valueOptions: data.items
                });
            } else if (this.state.levelOption == 1) {
                this.setState({
                    nicknameOptions: data.items
                });
            } else if (this.state.levelOption == 2) {
                this.setState({
                    coinOptions: data.items
                });
            }
            this.setState({
                notification: ''
            });
        })
        .fail((xhr, status, error) => {
            this.setState({
                notification: JSON.parse(xhr.responseJSON).message
            });
        });
    }

    onCoinSelectChange(c,v) {
        if (c == 0) {
            this.loadOptions(1, v, this.state.nicknameOption, this.state.coinOption);
        } else if (c == 1) {
            this.loadOptions(2, this.state.valueOption, v, this.state.coinOption);
        } else {
            this.loadOptions(2, this.state.valueOption, this.state.nicknameOption, v);
        }
    }

    onInputSelectChange(c,v) {
        if (c == 0) {
            this.setState({
                grade: v
            });
        } else if (c == 1) {
            this.setState({
                buyDate: v
            });
        } else if (c == 2) {
            this.setState({
                buyPrice: v
            });
        } else {
            this.setState({
                notes: v
            });
        }
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


	render() {

	    var grades = ['Not Graded','Ungradeable','PO-1','FR-2','AG-3','G-4','G-6','VG-8','VG-10','F-12',
	                    'F-15','VF-20','VF-25','VF-30','VF-35','XF-40','XF-45','AU-50','AU-53','AU-55',
	                    'AU-58','MS/PR-60','MS/PR-61','MS/PR-62','MS/PR-63','MS/PR-64','MS/PR-65',
	                    'MS/PR-66','MS/PR-67','MS/PR-68','MS/PR-69','MS/PR-70'];

	    return	<div className="pageContainer">
                        <PageNav notification={this.state.notification} closeNotification={this.closeNotification} setNotification={this.setNotification} setLoggedIn={this.setLoggedIn} >
                        {
                            <div className="pageContent">
                                <div className="pageHeader">
                                    <h1>Inventory</h1>
                                </div>
                                <div className="pageMainContent">
                                    <div className="groupHeader">
                                        <div className="catContainer">
                                            {this.state.level > 0 ? <Button click={this.backButtonClick} type="iconButton dark"><Glyphicon glyph="chevron-left" /><h1>{this.state.header}</h1></Button> : <h1>Value</h1>}
                                        </div>
                                        {this.state.loggedIn ? <Button click={this.openAddCoinDialog} type="iconButton addCoinButton dark"><Glyphicon glyph="plus" /></Button> : ''}
                                    </div>
                                    <div className="tileContainer" id="tileContainer">
                                        {this.state.loggedIn ? this.createContent() : <p>RESULTS NOT FOUND...</p>}
                                    </div>
                                </div>
                            </div>
                        }
                        </PageNav>
                        {
                            this.state.dialogOpen ?

                                <Dialog dialogName="add" header="Add to Your Collection" closeDialog={this.closeAddCoinDialog} submitDialog={this.submitAddCoinDialog}>
                                    <Form>
                                        <Select items={this.state.valueOptions} hasLabel="true" labelText="Value: " name="valueSelect" change={this.onCoinSelectChange} params={0} />
                                        {this.state.levelOption >= 1 ? <Select items={this.state.nicknameOptions} hasLabel="true" labelText="Type: " name="typeSelect" change={this.onCoinSelectChange} params={1} /> : ''}
                                        {this.state.levelOption == 2 ? <Select items={this.state.coinOptions} hasLabel="true" labelText="Year/Mint: "name="yearSelect" change={this.onCoinSelectChange} params={2} /> : ''}
                                        <div className="horizontalDivider"></div>
                                        <Select items={grades} hasLabel="true" labelText="Grade:" name="gradeSelect" change={this.onInputSelectChange} params={0} error={this.state.gradeError} />
                                        <Input hasLabel="true" labelText="Purchase Date:" name="buyDate" type="date" placeholderText="Purchase Date" change={this.onInputSelectChange} params={1} error={this.state.dateError} />
                                        <Input hasLabel="true" labelText="Purchase Price:" name="buyPrice" type="number" placeholderText="Purchase Price" change={this.onInputSelectChange} params={2} error={this.state.priceError} />
                                        <Input hasLabel="true" labelText="Notes:" name="notes" type="text" placeholderText="Notes" change={this.onInputSelectChange} params={3} />
                                    </Form>
                                </Dialog>

                            : ''
                        }
                    </div>;
	}
}
import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import { Glyphicon } from 'react-bootstrap';

//CSS
import '../../css/collections.less';

//JS
import PageNav from '../components/pageNav.js';
import Tile from '../components/tile.js';
import Button from '../components/button.js';
import Dialog from '../components/dialog.js';
import Form from '../components/form.js';
import Input from '../components/input.js';
import Select from '../components/select.js';


export default class Collections extends React.Component {

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
            notification: ''
        };

        //Tile and Collection Navigation Functions
        this.selectTile = this.selectTile.bind(this);
        this.backButtonClick = this.backButtonClick.bind(this);

        //Notification
        this.closeNotification = this.closeNotification.bind(this);
        this.setNotification = this.setNotification.bind(this);

        //Logged In
        this.setLoggedIn = this.setLoggedIn.bind(this);
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

    setLoggedIn(l) {
        this.setState({
            loggedIn: l
        });
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
            url: "/collections",
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
                                    <h1>Collections</h1>
                                </div>
                                <div className="pageMainContent">
                                    <div className="groupHeader">
                                        <div className="catContainer">
                                            {this.state.level > 0 ? <Button click={this.backButtonClick} type="iconButton dark"><Glyphicon glyph="chevron-left" /><h1>{this.state.header}</h1></Button> : <h1>Value</h1>}
                                        </div>
                                    </div>
                                    <div className="tileContainer" id="tileContainer">
                                        {this.createContent()}
                                    </div>
                                </div>
                            </div>
                        }
                        </PageNav>
                    </div>;
	}
}
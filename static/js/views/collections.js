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


class Collections extends React.Component {

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
            valueOption: 0,
            nicknameOptions: [],
            nicknameOption: '',
            coinOptions: []
        };

        //Tile and Collection Navigation Functions
        this.selectTile = this.selectTile.bind(this);
        this.backButtonClick = this.backButtonClick.bind(this);

        //Dialog Functions
        this.openAddCoinDialog = this.openAddCoinDialog.bind(this);
        this.closeAddCoinDialog = this.closeAddCoinDialog.bind(this);
        this.submitAddCoinDialog = this.submitAddCoinDialog.bind(this);

        //Select Functions
        this.onSelectChange = this.onSelectChange.bind(this);
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
                        return <Tile image={n[n.length-1]} click={this.selectTile} data1={n[0]} data2={n[1]}>
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
        console.log();
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
            console.log(data);
            this.setState({
                tileContent: data.values,
                header: data.header
            });
        });
    }


    componentDidMount() {
        this.loadData('',0,0,'Value');
    }

    openAddCoinDialog () {
        console.log('Opening...');
        this.loadOptions();
        this.setState({
            dialogOpen: true
        });
    }

    closeAddCoinDialog() {
        console.log('Closing...');
        this.setState({
            dialogOpen: false
        });
    }

    submitAddCoinDialog() {
        console.log('Submitting...');
        this.closeAddCoinDialog();
    }

    loadOptions(l,v,n) {

        this.setState({
            levelOption: l,
            valueOption: v,
            nicknameOption: n
        });

        var params = {
            level: this.state.levelOption,
            value: this.state.valueOption,
            nickname: this.state.nicknameOption
        };
        params = JSON.stringify(params);

        console.log(params);

        $.ajax({
            url: "/collections/select",
            method: 'POST',
            contentType: 'application/json',
            data: params
        })
        .done(data => {
            data = JSON.parse(data);
            console.log(data);

            if (this.state.level == 0) {
                this.setState({
                    valueOptions: data.items
                });
            } else if (this.state.level == 1) {
                this.setState({
                    nicknameOptions: data.items
                });
            } else if (this.state.level == 3) {
                this.setState({
                    coinOptions: data.items
                });
            }

        });
    }

    onSelectChange(c) {
        if (c == 0) {
            this.loadOptions(c,this.state.valueOption,this.state.nicknameOption);
        } else if (c == 1) {
            this.loadOptions(this.state.levelOption,c,this.state.nicknameOption);
        } else {
            this.loadOptions(this.state.levelOption,this.state.valueOption,c);
        }
    }


	render() {

	    var grades = ['Not Graded','Ungradeable','PO-1','FR-2','AG-3','G-4','G-6','VG-8','VG-10','F-12',
	                    'F-15','VF-20','VF-25','VF-30','VF-35','XF-40','XF-45','AU-50','AU-53','AU-55',
	                    'AU-58','MS/PR-60','MS/PR-61','MS/PR-62','MS/PR-63','MS/PR-64','MS/PR-65',
	                    'MS/PR-66','MS/PR-67','MS/PR-68','MS/PR-69','MS/PR-70'];

	    return	<div className="pageContainer">
                        <PageNav>
                        {
                            <div className="collectionsContent">
                                <div className="pageHeader">
                                    <h1>Collections</h1>
                                </div>
                                <div className="collectionsMainContent">
                                    <div className="groupHeader">
                                        {this.state.level > 0 ? <Button click={this.backButtonClick} type="iconButton"><Glyphicon glyph="chevron-left" /></Button> : ''}
                                        <h1>{this.state.header}</h1>
                                        <Button click={this.openAddCoinDialog} type="iconButton addCoinButton"><Glyphicon glyph="plus" /></Button>
                                    </div>
                                    <div className="tileContainer" id="tileContainer">
                                        {this.createContent()}
                                    </div>
                                </div>
                            </div>
                        }
                        </PageNav>
                        <div className="dialogContainer" id="dialogContainer">
                        {
                            this.state.dialogOpen ?

                                <Dialog header="Add to Your Collection" closeDialog={this.closeAddCoinDialog} submitDialog={this.submitAddCoinDialog}>
                                    <Form>
                                        <Select items={this.state.valueOptions} hasLabel="false" name="valueSelect" change={this.onSelectChange} params={1} />
                                        {this.state.level == 1 ? <Select items={this.state.nicknameOptions} hasLabel="false" name="valueSelect" change={this.onSelectChange} params={2} /> : ''}
                                        {this.state.level == 2 ? <Select items={this.state.coinOptions} hasLabel="false" name="valueSelect" change={this.onSelectChange} params={2} /> : ''}
                                        <Select items={grades} hasLabel="true" labelText="Grade:" name="gradeSelect" />
                                        <Input hasLabel="true" labelText="Buy Date:" name="test44" type="date" placeholderText="Placeholder" />
                                        <Input hasLabel="true" labelText="Buy Price:" name="test4" type="number" placeholderText="Placeholder" />
                                        <Input hasLabel="true" labelText="Notes:" name="test5" type="text" placeholderText="Placeholder" />
                                    </Form>
                                </Dialog>

                            : ''
                        }
                        </div>
                    </div>;
	}
}


export default Collections;
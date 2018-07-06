import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';

//CSS
import '../../css/collections.less';

//JS
import PageNav from '../components/pageNav.js';
import Tile from '../components/tile.js';


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
            header: 'Value'
        };

        this.selectTile = this.selectTile.bind(this);
    }

    selectTile(n, v) {
        var l = 0;
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
                                    if (m.includes('.jpg') || m.includes('.jpeg') || m.includes('.png') || m == '') {
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
                tileContent: data.values
            });
        });
    }


    componentDidMount() {
        this.loadData('',0,0,'Value');
    }


	render() {
	    return	<div className="pageContainer">
                        <PageNav>
                        {
                            <div className="collectionsContent">
                                <div className="pageHeader">
                                    <h1>Collections</h1>
                                </div>
                                <div className="collectionsMainContent">
                                    <div className="groupHeader">
                                        <h1>{this.state.header}</h1>
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


export default Collections;
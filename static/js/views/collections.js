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
            tileContent: []
        };
    }

    componentDidMount() {

        var params = {
            level: this.state.level
        };
        params = JSON.stringify(params);

        if (this.state.level == 0) {
            $.ajax({
                url: "/collections",
                method: 'POST',
                contentType: 'application/json',
                data: params
            })
            .done(data => {
                data = JSON.parse(data);
                this.setState({
                    tileContent: data.values
                });
            });
        } else if (this.state.level == 1) {
            $.ajax({
                url: "/collections/10",
                method: 'POST',
                contentType: 'application/json',
                data: params
            })
            .done(data => {
                data = JSON.parse(data);
                this.setState({
                    tileContent: data.values
                });
            });
        } else if (this.state.level == 2) {
            $.ajax({
                url: "/collections/10/roosevelt",
                method: 'POST',
                contentType: 'application/json',
                data: params
            })
            .done(data => {
                data = JSON.parse(data);
                this.setState({
                    tileContent: data.values
                });
            });
        }

    }


	render() {

	    if (this.state.tileContent.length > 0) {

            var tempArray = [];
            this.state.tileContent.map ((k) => {
                var temp = [];
                Object.keys(k).forEach(function(key) {
                    temp.push(k[key]);
                });;
                tempArray.push(temp);
            });


            return	<div className="pageContainer">
                        <PageNav>
                        {
                            <div className="collectionsContent">
                                <div className="pageHeader">
                                    <h1>Collections</h1>
                                </div>
                                <div className="collectionsMainContent">
                                    <div className="groupHeader">
                                        <h1>Value</h1>
                                    </div>
                                    <div className="tileContainer">
                                        {tempArray.map ((n) => {
                                            return <Tile image={n[n.length-1]}>
                                            {
                                                <div className="tileContent">
                                                    {n.map ((m) => {
                                                        if (m.includes('.jpg') || m.includes('.jpeg') || m.includes('.png')) {
                                                            return;
                                                        } else {
                                                            return <p>{m}</p>;
                                                        }
                                                    })}
                                                </div>
                                            }
                                            </Tile>
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                        </PageNav>
                    </div>;
		} else {
		    return	<div className="pageContainer">
                        <PageNav>
                        {
                            <div className="collectionsContent">
                                <div className="pageHeader">
                                    <h1>Collections</h1>
                                </div>
                                <div className="collectionsMainContent">
                                    <div className="groupHeader">
                                        <h1>Value</h1>
                                    </div>
                                    <div className="tileContainer">
                                        <p>EMPTY</p>
                                    </div>
                                </div>
                            </div>
                        }
                        </PageNav>
                    </div>;
		}
	}
}


export default Collections;
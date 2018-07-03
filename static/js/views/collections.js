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
            tileContent: [{value: 1,name: "Pennies"},{value: 5,name: "Nickles"},{value: 10,name: "Dimes"},{value: 25,name: "Quarters"},{value: 50,name: "Half Dollars"},{value: 100,name: "Dollars"}]
        };
    }

    componentDidMount() {

        if (this.state.level == 0) {
            $.ajax({
                url: "/collections",
                method: 'POST'
            })
            .done(data => {
                this.setState({
                    tileContent: data["values"]
                });
            });
        } else if (this.state.level == 1) {
            $.ajax({
                url: "/collections/10",
                method: 'POST'
            })
            .done(data => {
                this.setState({
                    tileContent: data["values"]
                });
            });
        } else if (this.state.level == 2) {
            $.ajax({
                url: "/collections/10/roosevelt",
                method: 'POST'
            })
            .done(data => {
                this.setState({
                    tileContent: data["values"]
                });
            });
        }

    }


	render() {
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
                                        return <Tile image={"download.jpg"}>
                                        {
                                            <div className="tileContent">
                                                {n.map ((m) => {
                                                    return <p>{m}</p>
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
	}
}


export default Collections;
import React from "react";
import ReactDOM from "react-dom";

//CSS
import '../../css/collections.less';

//JS
import PageNav from '../components/pageNav.js';
import Tile from '../components/tile.js';


class Collections extends React.Component {

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
						            <h1>Value</h1>
						        </div>
						        <div className="tileContainer">
                                    <Tile image={"download.jpg"}>
                                        {
                                            <div className="tileContent">
                                                <h1>Roosevelt Dimes</h1>
                                                <p>1946-Present</p>
                                                <p>Collected: 80/142</p>
                                            </div>
                                        }
                                    </Tile><Tile image={"download.jpg"}>
                                        {
                                            <div className="tileContent">
                                                <h1>Roosevelt Dimes</h1>
                                                <p>1946-Present</p>
                                                <p>Collected: 80/142</p>
                                            </div>
                                        }
                                    </Tile><Tile image={"download.jpg"}>
                                        {
                                            <div className="tileContent">
                                                <h1>Roosevelt Dimes</h1>
                                                <p>1946-Present</p>
                                                <p>Collected: 80/142</p>
                                            </div>
                                        }
                                    </Tile><Tile image={"download.jpg"}>
                                        {
                                            <div className="tileContent">
                                                <h1>Roosevelt Dimes</h1>
                                                <p>1946-Present</p>
                                                <p>Collected: 80/142</p>
                                            </div>
                                        }
                                    </Tile><Tile image={"download.jpg"}>
                                        {
                                            <div className="tileContent">
                                                <h1>Roosevelt Dimes</h1>
                                                <p>1946-Present</p>
                                                <p>Collected: 80/142</p>
                                            </div>
                                        }
                                    </Tile><Tile image={"download.jpg"}>
                                        {
                                            <div className="tileContent">
                                                <h1>Roosevelt Dimes</h1>
                                                <p>1946-Present</p>
                                                <p>Collected: 80/142</p>
                                            </div>
                                        }
                                    </Tile><Tile image={"download.jpg"}>
                                        {
                                            <div className="tileContent">
                                                <h1>Roosevelt Dimes</h1>
                                                <p>1946-Present</p>
                                                <p>Collected: 80/142</p>
                                            </div>
                                        }
                                    </Tile><Tile image={"download.jpg"}>
                                        {
                                            <div className="tileContent">
                                                <h1>Roosevelt Dimes</h1>
                                                <p>1946-Present</p>
                                                <p>Collected: 80/142</p>
                                            </div>
                                        }
                                    </Tile><Tile image={"download.jpg"}>
                                        {
                                            <div className="tileContent">
                                                <h1>Roosevelt Dimes</h1>
                                                <p>1946-Present</p>
                                                <p>Collected: 80/142</p>
                                            </div>
                                        }
                                    </Tile><Tile image={"download.jpg"}>
                                        {
                                            <div className="tileContent">
                                                <h1>Roosevelt Dimes</h1>
                                                <p>1946-Present</p>
                                                <p>Collected: 80/142</p>
                                            </div>
                                        }
                                    </Tile><Tile image={"download.jpg"}>
                                        {
                                            <div className="tileContent">
                                                <h1>Roosevelt Dimes</h1>
                                                <p>1946-Present</p>
                                                <p>Collected: 80/142</p>
                                            </div>
                                        }
                                    </Tile><Tile image={"download.jpg"}>
                                        {
                                            <div className="tileContent">
                                                <h1>Roosevelt Dimes</h1>
                                                <p>1946-Present</p>
                                                <p>Collected: 80/142</p>
                                            </div>
                                        }
                                    </Tile>
                                    <Tile image={"download.jpg"}>
                                        {
                                            <div className="tileContent">
                                                <h1>Mercury Dimes</h1>
                                                <p>1916-1943</p>
                                                <p>Collected: 10/64</p>
                                            </div>
                                        }
                                    </Tile>
                                </div>
						    </div>
					    </div>
					}
					</PageNav>
				</div>;
	}
}


export default Collections;
import React from "react";
import ReactDOM from "react-dom";

//CSS
import '../../css/collections.less';

//JS
import LeftNav from '../components/leftNav.js';
import TopNavHome from '../components/topNavHome.js';
import Tile from '../components/tile.js';


class Collections extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			width: '10rem'
		}
		this.openLeftNav = this.openLeftNav.bind(this);
	}

    openLeftNav() {
		this.setState({
			width: this.state.width === '10rem' ? '0' : '10rem'
		});
	}

	render() {
		return	<div className="collectionsContainer">
					<TopNavHome openLeftNav={this.openLeftNav} />
					<LeftNav width={this.state.width}>
					{
						<div className="collectionsContent">
						    <div className="pageHeader">
						        <h1>Collections</h1>
						    </div>
						    <div className="collectionsMainContent">
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
					}
					</LeftNav>
				</div>;
	}
}


export default Collections;
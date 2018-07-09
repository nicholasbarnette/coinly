import React from 'react';
import Glyphicon from 'react-bootstrap';

//CSS
import '../../css/components/button.less';

export default class Button extends React.Component {

    handleClick() {
		this.props.click();
	}

	render() {
        return (
			<div className={"button " + this.props.type} onClick={e => this.handleClick()}>
				<div className="inner">
				    {this.props.children}
				</div>
			</div>
		);
	}
}
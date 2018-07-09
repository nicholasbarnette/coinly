import React from 'react';
import { Glyphicon } from 'react-bootstrap';


//JS


//CSS
import '../../css/components/input.less';


export default class Input extends React.Component {
	render() {
		return (
		    <div className="inputContainer">
		        {this.props.hasLabel == "true" ? <p className="label">{this.props.labelText}</p> : ''}
		        <input className="input" type={this.props.type} id={this.props.name} name={this.props.name} placeholder={this.props.placeholderText} />
		    </div>
		);
	}
}
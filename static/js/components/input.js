import React from 'react';
import { Glyphicon } from 'react-bootstrap';


//JS


//CSS
import '../../css/components/input.less';


export default class Input extends React.Component {

    handleChange(e) {
        if (e.target.value != "unselected") {
            this.props.change(this.props.params,e.target.value);
        }
    }

	render() {
		return (
		    <div className="inputContainer">
		        {this.props.hasLabel == "true" ? <p className="label">{this.props.labelText}</p> : ''}
		        <input className={"input" + (this.props.error ? " error" : "")} type={this.props.type} id={this.props.name} name={this.props.name} placeholder={this.props.placeholderText} onChange={e => this.handleChange(e)} />
		    </div>
		);
	}
}
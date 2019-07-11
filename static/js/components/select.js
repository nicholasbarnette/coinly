import React from 'react';

//CSS
import '../../css/components/select.less';


export default class Select extends React.Component {

    handleChange(e) {
        if (e.target.value != "unselected") {
            this.props.change(this.props.params, e.target.value);
        }
    }

	render() {
		return (
		    <div className="inputContainer">
		        {this.props.hasLabel == "true" ? <p className="label">{this.props.labelText}</p> : ''}
                <select className="select" id={this.props.name} name={this.props.name} onChange={e => this.handleChange(e)}>
                    <option value={"unselected"} disabled selected>Select an option</option>
                    {
                        this.props.items.map ((k, i) => {
                            return <option value={k}>{k}</option>;
                        })
                    }
                </select>
            </div>
		);
	}
}
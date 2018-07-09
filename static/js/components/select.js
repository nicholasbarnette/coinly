import React from 'react';

//CSS
import '../../css/components/select.less';


export default class GradeSelect extends React.Component {

    handleChange() {
        console.log('The cheated');
        this.props.change(this.props.params);
    }

	render() {
		return (
		    <div className="inputContainer">
		        {this.props.hasLabel == "true" ? <p className="label">{this.props.labelText}</p> : ''}
                <select className="select" id={this.props.name} name={this.props.name} onChange={e => this.handleChange()}>
                    {
                        this.props.items.map ((k, i) => {
                            if (i == 0) {
                                return <option value={i} selected>{k}</option>;
                            }
                            return <option value={i}>{k}</option>;
                        })
                    }
                </select>
            </div>
		);
	}
}
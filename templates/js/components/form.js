import React from 'react';


//CSS
import '../../css/components/form.less';


export default class Form extends React.Component {
	render() {
		return (
		    <div className="form">
                {this.props.children}
			</div>
		);
	}
}
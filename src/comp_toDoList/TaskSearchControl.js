import React, { Component } from 'react';
import '../App.css';
class TaskSearchControl extends Component {
	constructor(props){
		super(props);
		this.state={
			keyword:''
		}
	}
	onChange=(event)=>
	{
		var target=event.target;
		var name=target.name;
		var value=target.value;
		this.setState({
			[name]: value
		})
	}
	onSearch=()=>
	{
		this.props.onSearchCtrl(this.state.keyword);
	}
    render() {
		var {keyword}=this.state;
        return (<div className="input-group">
					<input 
						type="text" 
						name="keyword" 
						className="form-control" 
						required="required" 
						pattern="" 
						title=""
						value={keyword}
						onChange={this.onChange}
						/>
						<span className="input-group-btn">
							<button type="button" 
									className="btn btn-primary"
									onClick={this.onSearch}>Tìm</button>
						</span>
				</div>       				
        );
    }
}
export default TaskSearchControl;
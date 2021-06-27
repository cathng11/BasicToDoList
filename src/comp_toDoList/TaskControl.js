import React, { Component } from 'react';
import '../App.css';
import TaskSearchControl from './TaskSearchControl.js';
import TaskSortControl from './TaskSortControl.js'

class TaskControl extends Component {
	render() {
		return (
		<div className="row mt-15">
			<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
				{/*Search*/}
				<TaskSearchControl onSearchCtrl={this.props.onSearchApp}/>
			</div>
			<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
				{/*Sort*/}
				<TaskSortControl 
					onSortCtrl={this.props.onSortApp}
					sortBy={this.props.sortBy}
					sortValue={this.props.sortValue}
				/>
			</div>
		</div>
		);
	}
}
export default TaskControl;
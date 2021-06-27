import React, { Component } from 'react';
import '../App.css';
import TaskItem from './TaskItem'
class TaskList extends Component {
	constructor(props)
	{
		super(props);
		this.state={
			filterName:'',
			filterStatus:-1
		}
	}
	onChange=(event)=>
	{
		var target=event.target;
		var name=target.name;
		var value=target.value;
		this.props.onFilterApp(
			name==='filterName'?value:this.state.filterName,
			name==='filterStatus'?value:this.state.filterStatus
		)
		this.setState({
			[name]: value
		})
	}
	render() {
		var {taskList}=this.props;
		var {filterName,filterStatus}=this.state;
		var elmTasks=taskList.map((task,index)=>{
			return <TaskItem 
			key={task.id} 
			indexItem={index+1} 
			taskItem={task}
			onUpdateStatusList={this.props.onUpdateStatusApp}
			onDeleteList={this.props.onDeleteApp}
			onUpdateAllList={this.props.onUpdateAllApp}/>
		})

		return (<div>
			<table className="table table-hover mt-15">
				<thead>
					<tr>
						<th className="text-center">STT</th>
						<th className="text-center">Tên</th>
						<th className="text-center">Trạng thái</th>
						<th className="text-center">Hoạt động</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td><input 	type="text" 
									name="filterName" 
									className="form-control" 
									required="required" 
									pattern="" 
									title="" 
									value={filterName}
									onChange={this.onChange}/></td>
						<td>
							<select
								name="filterStatus"
								className="form-control"
								required="required"
								value={filterStatus}
								onChange={this.onChange}>
								<option value={-1}>Tất cả</option>
								<option value={0}>Ẩn</option>
								<option value={1}>Kích hoạt</option>
							</select>
						</td>
						<td></td>
					</tr>
					{elmTasks}
				</tbody>
			</table>
		</div>
		);
	}
}
export default TaskList;
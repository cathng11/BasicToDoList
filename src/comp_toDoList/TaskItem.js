import React, { Component } from 'react';
import '../App.css';

class TaskItem extends Component {
	onUpdateStatusItem=()=>
	{
		this.props.onUpdateStatusList(this.props.taskItem.id);
	}
	onDeleteItem=()=>
	{
		this.props.onDeleteList(this.props.taskItem.id);
	}
	onUpdateAll=()=>
	{
		this.props.onUpdateAllList(this.props.taskItem.id);
	}
    render() {
		var {taskItem,indexItem}=this.props;

	return (<tr><td>{indexItem}</td>
					<td>{taskItem.name}</td>
					<td className="text-center">
					<span className={taskItem.status===true ?"label label-danger":"label label-success" }
							onClick={this.onUpdateStatusItem}> 
					{taskItem.status===true ? 'Kích hoạt' : 'Ẩn'}</span></td>
					<td className="text-center">
						<button type="button" 
								className="btn btn-warning"
								onClick={this.onUpdateAll}>
							<span className="fa fa-pencil mr-5"></span>Sửa</button>&nbsp;
						<button type="button" 
								className="btn btn-danger"
								onClick={this.onDeleteItem}>
							<span className="fa fa-trash mr-5"></span>Xoá</button>
					</td>									
				</tr>   				
        );
    }
}
export default TaskItem;
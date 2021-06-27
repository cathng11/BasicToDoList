import React, { Component } from 'react';
import '../App.css';

class TaskForm extends Component {
	constructor(props)
	{
		super(props);
		this.state={
			id:"",
			name: "",
			status: false,
			lastRow: null
		}
	}
	componentDidMount()
	{
		if(this.props.taskEditing)
		{
			this.setState({
				id: this.props.taskEditing.id,
				name: this.props.taskEditing.name,
				status: this.props.taskEditing.status,
			})
		}
	}
	// UNSAFE_componentWillReceiveProps(nextProps)
	// {
	// 	if(nextProps && nextProps.taskEditing)
	// 	{
	// 		this.setState({
	// 			id: nextProps.taskEditing.id,
	// 			name: nextProps.taskEditing.name,
	// 			status: nextProps.taskEditing.status,
	// 		})
	// 	}else
	// 	{
	// 		this.setState({
	// 			id: "",
	// 			name: "",
	// 			status: false,
	// 		})
			
	// 	}
	// }
	static getDerivedStateFromProps(props,state)
	{
		if(props.taskEditing !== state.taskEditing && props.taskEditing!==null)
		{
			return {
				taskEditing: props.taskEditing
			}
		}
		return null;
	}
	onCloseFormComp=()=>
	{
		this.props.clickCloseForm();
	}
	onSubmitForm=(event)=>
	{
		event.preventDefault();
		this.props.onSubmit(this.state);
		this.onCancel();
		this.onCloseFormComp();
	}
	onHandleChange=(event)=>
	{
		var target=event.target;
		var names=target.name;
		var values=target.value;
		if (names==="status")
		{
			values=target.value==="true"?true:false;
		}
		this.setState({
			[names]: values
		});
	}
	onCancel=()=>
	{
		this.setState({
			name:"",
			status: false
		})
	}
	render() {
		var {id}=this.state;
		return (
			<div className="panel panel-warning">
				<div className="panel-heading">
					<h3 className="panel-title">{id!==''?'Cập nhật công việc':'Thêm công việc'}
						<span className="fa fa-times-circle text-right" onClick={this.onCloseFormComp}></span></h3>
				</div>
				<div className="panel-body">
					<form onSubmit={this.onSubmitForm}>
						<div className="form-group">
							<label >Tên: </label><br />
							<input
								type="text"
								name="name"
								className="form-control mb-15"
								required="required" 
								value={this.state.name}
								onChange={this.onHandleChange}/>
							<br />
							<label >Trạng thái: </label><br />
							<select name="status"
								className="form-control mb-15"
								value={this.state.status}						
								onChange={this.onHandleChange}
								>
								<option value={false}>Ẩn</option>
								<option value={true}>Kích hoạt</option>
							</select>
							<br />
						</div>
						<br />
						<div className="text-center mb-15">
						<button type="submit" className="btn btn-primary mr-5">Lưu lại</button>
						<button type="button" className="btn btn-primary " onClick={this.onCancel}>Huỷ bỏ</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
export default TaskForm;
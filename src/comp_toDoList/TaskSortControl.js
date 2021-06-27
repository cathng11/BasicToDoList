import React, { Component } from 'react';
import '../App.css';
class TaskSortControl extends Component {
	constructor(props)
	{
		super(props);
		this.state={
			sortBy: 'name',
			sortValue: 1,
			lastRow: null
		}
	}
	// static getDerivedStateFromProps(props,state)
	// {
	// 	if(props.sortBy !== state.lastRow && props.sortValue !== state.lastRow)
	// 	{
	// 		return{
	// 			sortBy: props.sortBy>state.lastRow,
	// 			sortValue: props.sortValue,
	// 		}
	// 	}
	// 	else
	// 	{
	// 		return{
	// 			sortBy: 'name',
	// 			sortValue: 1,
	// 		}		
	// 	}
	// }
	onClick=(sortBy,sortValue)=>
	{
		// this.setState({
		// 	sort:{
		// 		by: sortBy,
		// 		value: sortValue
		// 	}
		// });
		this.props.onSortCtrl(sortBy,sortValue);
	}
    render() {
		var {sortBy,sortValue}=this.props;

        return (<div className="dropdown">
			  <button className="btn btn-primary dropdown-toggle" 
					  type="button" 
					  id="dropdownMenuButton" 
					  data-toggle="dropdown" 
					  aria-haspopup="true" 
					  aria-expanded="true">					  
			    Sắp xếp<span className="fa fa-caret-square-o-down ml-5"></span>
			  </button>
				    <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
				      <li 	onClick={()=>this.onClick('name',1)}
					  		role="button" 
							className={(sortBy==='name' && sortValue===1)?"sort_selected":""}
							>
							<span className="fa fa-sort-alpha-asc pr-5"></span>  Tên A-Z</li>
				      <li 	onClick={()=>this.onClick('name',-1)} 
					  		role="button"
							className={(sortBy==='name' && sortValue===-1)?"sort_selected":""}
							> 
							<span className="fa fa-sort-alpha-desc pr-5"></span>  Tên Z-A</li>

				      <li className="divider"></li>

				      <li 	onClick={()=>this.onClick('status',1)} 
					  		role="button"
							className={(sortBy==='status' && sortValue===1)?"sort_selected":""}
							>Trạng thái kích hoạt</li>
				      <li 	onClick={()=>this.onClick('status',-1)} 
					  		role="button"
							className={(sortBy==='status' && sortValue===-1)?"sort_selected":""}
							>Trạng thái ẩn</li>
				    </ul>
			</div>        		
        );
    }
}
export default TaskSortControl;
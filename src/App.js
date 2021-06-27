import React, { Component } from 'react';
import './App.css';
import TaskForm from './comp_toDoList/TaskForm';
import TaskControl from './comp_toDoList/TaskControl';
import TaskList from './comp_toDoList/TaskList';
// import _ from 'lodash';
import {findIndex} from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sortBy: 'name',
      sortValue: 1

    }
  }
  componentDidMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var task = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: task
      })
    }
  }
  // onGenerateData=()=>
  // {
  //   var tasks=[
  //     {
  //       id : this.generateID(),
  //       name: 'Sleep',
  //       status: true
  //     },
  //     {
  //       id : this.generateID(),
  //       name: 'Eat',
  //       status: false
  //     },
  //     {
  //       id : this.generateID(),
  //       name: 'Drink',
  //       status: true
  //     }

  //   ];
  //   this.setState({
  //     tasks: tasks
  //   });
  //   localStorage.setItem('tasks',JSON.stringify(tasks));
  // }
  randomID() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  generateID() {
    return this.randomID() + this.randomID() + '-' + this.randomID() + this.randomID() + '-' + this.randomID() + this.randomID();
  }
  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      });
    }
  }
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  }
  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }
  onSubmitForm = (data) => {
    var currentTask = this.state.tasks;
    if (data.id === '') {
      data.id = this.generateID();
      currentTask.push(data);
    } else {
      var index = this.findIndex(data.id);
      currentTask[index] = data;

    }
    this.setState({
      tasks: currentTask,
      taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(currentTask));
  }
  onUpdateStatus = (id) => {
    var currentTask = this.state.tasks;
    // var index = this.findIndex(id);
    var index=findIndex(currentTask,(task)=>{
      return task.id===id;
    })
    if (index !== -1) {
      currentTask[index].status = !currentTask[index].status
    }
    this.setState({ tasks: currentTask });
    localStorage.setItem('tasks', JSON.stringify(currentTask));
  }
  findIndex = (id) => {
    var result = -1;
    var currentTask = this.state.tasks;
    currentTask.forEach((task, index) => {
      if (task.id === id)
        result = index;
    })
    return result;
  }
  onDelete = (id) => {
    var currentTask = this.state.tasks;
    var index = this.findIndex(id);
    if (index !== -1) {
      currentTask.splice(index, 1);
      this.setState({ tasks: currentTask });
      localStorage.setItem('tasks', JSON.stringify(currentTask));
      if (this.state.isDisplayForm) this.onCloseForm();
    }

  }
  onUpdateAll = (id) => {
    var currentTask = this.state.tasks;
    var index = this.findIndex(id);
    var taskEditing = currentTask[index];
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowForm();
  }
  onFilter = (filterName, filterStatus) => {
    filterStatus = +filterStatus //string to number
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })
  }
  onSearch = (data) => {
    this.setState({
      keyword: data
    })
  }
  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    })
  }
  render() {
    var { tasks, isDisplayForm, taskEditing, filter, keyword, sortBy, sortValue } = this.state; //var tasks=this.state.tasks
    if (filter)//!=null,!==underfined !==0
    {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        })
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        }
        else {
          return task.status === (filter.status === 1 ? true : false);
        }
      })
    }
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      })
    }
    if(sortBy==='name')
    {
      tasks.sort((a,b)=>{
        if(a.name>b.name) return sortValue;
        else if(a.name<b.name) return -sortValue;
        else return 0;
      });
    }else
    {
      tasks.sort((a,b)=>{
        if(a.status>b.status) return -sortValue;
        else if(a.status<b.status) return sortValue;
        else return 0;
      });
    }
    var elmTaskForm = isDisplayForm ? <TaskForm onSubmit={this.onSubmitForm}
      clickCloseForm={this.onCloseForm}
      taskEditing={taskEditing} /> : '';

    return (
      <div>     
        <div className="container">
          <div className="text-center">
            <h1>Quản lý công việc</h1><br />
            <hr />
          </div>
          <div className="row">
            <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
              {/*Form*/}
              {elmTaskForm}
            </div>
            <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
              <button type="button" className="btn btn-primary mb-15" onClick={this.onToggleForm}>
                <span className="fa fa-plus mr-5"> </span> Thêm công việc</button>
              {/* <button type="button" className="btn btn-primary mb-15" onClick={this.onGenerateData}>
              <span className="fa fa-plus mr-5"> </span> Generate Data</button> */}
              <div className="row">
                {/* {Control} */}
                <TaskControl
                  onSearchApp={this.onSearch}
                  onSortApp={this.onSort}
                  sortBy={sortBy}
                  sortValue={sortValue}
                />
              </div>
              {/*List*/}
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList
                    onUpdateStatusApp={this.onUpdateStatus}
                    taskList={tasks}
                    onDeleteApp={this.onDelete}
                    onUpdateAllApp={this.onUpdateAll}
                    onFilterApp={this.onFilter} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default App;

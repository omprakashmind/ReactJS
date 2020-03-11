import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { isCompositeComponent } from 'react-dom/test-utils';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tasksContainer: {},
      showListValues: false,
      taskToBeDone: [],
      taskId: "",
      task_input: '',
      list_input: '',
      showValue: false,
      len:0,
      status:false  
    }
  }

  addValuesToList = (event) => {
    event.preventDefault()
    let inputTask = this.state.list_input
    inputTask = inputTask.trim()

    if (inputTask !== "") {
      const task = this.state.tasksContainer
      task[inputTask] = [];
      task[inputTask].push(0)
     
      this.setState({
        tasksContainer: task,
        list_input: '',
        status:false
      })
    }
    else {
      this.setState({
        list_input: ''
      })
    }
  }

  showList = (id) => {
    const inputList = this.state.tasksContainer[id];
    document.getElementById('btn1').style.backgroundColor = "green"
    const tasktodo=this.state.taskToBeDone
    if(tasktodo.length-1===tasktodo[0])
    {
      
      this.setState({
        len:tasktodo[0],
        status:false
      })
    }
    else{
      this.setState({
        len:tasktodo[0],
        status:true
      })
    }
    this.setState({
      taskToBeDone: inputList,
      showListValues: true,
      taskId: id,
      len:inputList[0]  
    })
  }

  checkSameValues=()=>{
    let arr=this.state.taskToBeDone
    for(let i=0;i<arr.length;i++)
    {
      if((arr[i]['name']===this.state.task_input))
         return false;
    }
    return true
  }

  addValuesToObject = (event) => {
    event.preventDefault()
    const id = this.state.taskId

    if (id !== "") {
      let inputTask = this.state.task_input;
      const inputValue = this.state.taskToBeDone;
      const obj = this.state.tasksContainer
      inputTask = inputTask.trim()
      const id=this.state.taskId
      let bool=this.checkSameValues();
     

      if (inputTask !== "" && bool) {
        let num={}
        num['name']=inputTask
        num['status']=false
        inputValue.push(num)
        obj[id]=inputValue
        this.setState({
          taskToBeDone:inputValue,
          task_input:'',
          tasksContainer:obj,
          len:this.state.len,
          status:false
        })
      }
      else{
        this.setState({
          task_input:''
        })
      }
    }
    console.log(this.state.taskToBeDone.length)
  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  deleteTaskList = (index) => {
    let arr = this.state.taskToBeDone
    arr.splice(index, 1)
    this.setState({
      taskToBeDone: arr,
      len:this.state.len-1
    })
  }

  deleteObjectList = (item) => {
    let obj1 = this.state.tasksContainer
    if (item === this.state.taskId) {
      this.setState({
        taskToBeDone: [],
        taskId: ''
      })
    }
    delete obj1[item]
    this.setState({
      tasksContainer: obj1
    })
  }

  selectCheckbox=(index)=>{
    let obj=this.state.tasksContainer
    
    let arr2=this.state.taskToBeDone
    let len1=this.state.len
   
    if(arr2[index].status===false)
    {
           arr2[index].status=true
           len1=len1+1
    }
    else{
           arr2[index].status=false
           len1=len1-1
    }
    obj[this.state.taskId]=arr2
    if(len1===arr2.length-1)
    {
      this.setState({
        status:true
      })
    }
    else{
      this.setState({
        status:false
      })
    }

    this.setState({
        tasksContainer:obj,
        taskToBeDone:arr2,
        len:len1
    })
  } 

  checkedStatus=()=>{
    let val1=this.state.taskToBeDone
    if(val1.length>1)
    {
    
    if(this.state.len===val1.length-1)
       return true;
    }
    return false;

  }



  render() {
   

    const showTasks=()=> Object.keys(this.state.tasksContainer).map(function (item, index) {

      return (

        <div key={index} value={index} ><p className="list-group-item">{item}<button style={{float:"right"}} onClick={() => this.showList(item)} id="btn1"><input type="checkbox" checked={this.checkedStatus()} /><i className="fa fa-folder-open" aria-hidden="true"></i></button><button className="btn1" onClick={() => this.deleteObjectList(item)}><i class="fa fa-trash" aria-hidden="true"></i></button></p></div>
     
        )

    }, this);


    const showList = this.state.taskToBeDone && this.state.taskToBeDone.map(function (item, index) {

      if(index>0)    
            return <div key={index} ><p className="list-group-item">{ item['name']  }</p ><input type="checkbox" checked={item['status']} onClick={()=>this.selectCheckbox(index)}/><button onClick={() => this.deleteTaskList(index)} id="btn1" className="btn1"><i className="fa fa-window-close" aria-hidden="true"></i></button></div>
    }, this);


          
    
    return (

    <div>
        <div className="jumbotron bg-dark ">

          <b><h3>A Simple To Do List Using Drag and Drop</h3></b>

        </div>

      
    <div className="container">         
       <div className="row">    

      <div className="col-sm-4 card"> 
        
             <div className="inputStyle">CREATE NEW TASK LIST</div>
            

              <div>

                <form onSubmit={this.addValuesToList}>

                  <div><input type="text" name="list_input" className="form-control" placeholder="Add ParentTask" required onChange={this.changeInput} value={this.state.list_input} /></div><br /><br />
                    
                     <span className="inline">TASKS IS TO BE ADDED</span><span className="inline"> CHOOSE ANY ONE</span> <br />
                  
                </form>


                    <div className="list-group">
                        {showTasks()}
                    </div>    
           </div>
      </div>     

      <div className="col-sm-4"></div> 


      <div className="col-sm-4 card"> 

            {this.state.taskId && <div>


              {this.state.taskId && <li className="text2  border">LIST SELECTED :: <h5 className="titleColor">{this.state.taskId}</h5> </li>}

                  <form onSubmit={this.addValuesToObject}>
                       
                       <input type="text" name="task_input" className="form-control" placeholder="Add Task To LIST" required onChange={this.changeInput} value={this.state.task_input} /><br />
                  
                  </form>

                <div className="list-group">
                  {showList} 
                </div>  


            </div>}

          </div> 

         </div>

      </div>


      <div className="container text-center"><br /><br />

          <button type="button" className="btn btn-primary">DRAG HERE TO DELETE</button>

      </div>

      </div>
    )
  }
}


export default App;



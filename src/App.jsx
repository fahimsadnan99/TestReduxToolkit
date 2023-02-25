import React, { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addTask,changePriority,clearAllTask,completeAllTask,compliteTask } from "./redux/Reducers/TodoReducer";


const lvl = ["High","Medium","Low"]

const App = () => {
  const [inputTask, setInputTask] = useState(null);
  const [lestTask,setLeftTask] = useState([])
  const [allTask,setAllTask] = useState([])
  const dispatch = useDispatch();
  const { task } = useSelector((state) => state.Todo);

  console.log(task);


const handleAll = ()=>{
  setAllTask(task)
}

const handleComplite = ()=>{
  let data = task?.filter(item => item.isComplite == true)
 setAllTask(data)
}

const handleInComplite = ()=>{
  let data = task?.filter(item => item.isComplite !== true)
  setAllTask(data)
}

const handleFilter = (value)=>{
  let data = task?.filter(item => item.priority == value)

  setAllTask(data)
}
 useEffect(()=>{
     let data = task?.filter(item => item.isComplite !== true)
     setLeftTask(data)

     setAllTask(task)
 },[task])
  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-[600px] mx-auto bg-white rounded-md shadow-lg w-full my-10">
        <div className="flex justify-around items-start text-3xl py-5">
          <BsPencilSquare className="text-purple-800"></BsPencilSquare>
          <input
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
            className="outline-none"
            placeholder="Enter Your Teak"
          />
          <button onClick={() => dispatch(addTask(inputTask))}>
            <IoIosAddCircleOutline className="text-orange-600"> </IoIosAddCircleOutline>
          </button>
        </div>

        <hr></hr>
        <div className="py-2 flex justify-around items-center">
           <button className="bg-purple-500 text-white p-2"
           onClick={()=> dispatch(completeAllTask())}
           
           >Complete all</button>
           <button className="bg-purple-500 text-white p-2"
           
           onClick={()=> dispatch( clearAllTask())}
           >Clear all</button>
        </div>
        <hr></hr>
        {
          allTask?.map(({task,id,isComplite,priority},index)=>{
            return (

              <div className="flex justify-between items-center space-x-3 text-2xl   w-full px-10 py-2">
                <div className="flex justify-center items-center space-x-3">
              <input type="checkbox" value="complite"  
              onClick={()=> dispatch(compliteTask(id))}
              checked={isComplite}
              />
    
              <p style={{textDecoration : isComplite ?  "line-through" : "blink"}}>{task}</p>
              </div>
              <div className="text-xl flex justify-center  items-center ml-auto space-x-2">
                {
                  lvl?.map(item =>{
                    return (
                      <>
                      
                      <input type="radio" onChange={(e)=> dispatch(changePriority({id : id, value : e.target.value }))}   name="fav_language" value={item} checked={priority == item} />
                      <label>{item}</label> <br />
                      </>
                    )
                  })
                }
              
                
              </div>
            </div>
            )
          })
        }

         <hr></hr>
        <div className="py-2 flex justify-between items-center">
          <p>{lestTask.length} Task Left</p>
           <button className="bg-purple-500 text-white p-2" onClick={handleAll}> all</button>
           <button className="bg-purple-500 text-white p-2" onClick={handleInComplite}> Incomplete</button>
           <button className="bg-purple-500 text-white p-2" 
           onClick={handleComplite}
           > Complete</button>




           {
                  lvl?.map(item =>{
                    return (
                      <>
                      
                      <input type="radio" onChange={(e)=> handleFilter(e.target.value)}   name="fav_language" value={item}  />
                      <label>{item}</label> <br />
                      </>
                    )
                  })
                }
        </div>

      </div>
    </div>
  );
};

export default App;

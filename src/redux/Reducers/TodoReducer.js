import { createSlice } from "@reduxjs/toolkit";

export const ToDoReducer = createSlice({
  name: "Todo",
  initialState: {
    task: [],
    completeAll : false
  },

  reducers: {
    addTask: (state, action) => {
      let TaskInfo = {
        isComplite: false,
        task: action.payload,
        priority: "",
        id: new Date().getMilliseconds(),
      };
      state.task.push(TaskInfo);
    },

    compliteTask: (state, action) => {
      let data = state.task.map((item) =>
        item.id == action.payload ? { ...item, isComplite: !item.isComplite } : item
      );

      state.task = data;
    },

    changePriority : (state,action)=>{
        let {id,value} = action.payload
        let priority = state.task.map(item => item.id == id ? {...item, priority : value } : item)
        state.task = priority
    },

    completeAllTask : (state,action)=>{
        
       let compliteArray = state.task.map(item =>{
        return {...item, isComplite : !state.completeAll}
       })

        state.completeAll = !state.completeAll
       state.task = compliteArray
    },

    clearAllTask : (state,action)=>{
        state.task = []
        state.completeAll = false
    }
  },
});

export const { addTask, compliteTask,changePriority,clearAllTask,completeAllTask } = ToDoReducer.actions;
export default ToDoReducer.reducer;

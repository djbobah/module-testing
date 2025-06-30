import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./configureStore";

export interface taskListState {
  list: Task[];
  allTasks: Task[];
  filter: boolean;
  notification: string;
}

const initialState: taskListState = {
  list: [],
  allTasks: [],
  filter: false,
  notification: "",
};

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task["header"]>) => {
      const newTask = {
        id: crypto.randomUUID(),
        header: action.payload,
        done: false,
      };
      state.list.push(newTask);
      state.allTasks.push(newTask);
    },
    addFilter: (state) => {
      if (!state.filter) {
        state.list = state.allTasks.filter((item) => item.done === false);
        state.filter = true;
      } else {
        state.list = state.allTasks;
        state.filter = false;
      }
    },

    completeTask: (state, action: PayloadAction<Task["id"]>) => {
      const task = state.list.find((x) => x.id === action.payload);
      if (task) {
        task.done = true;
      }
      const taskInAll = state.list.find((x) => x.id === action.payload);
      if (taskInAll) {
        taskInAll.done = true;
      }
    },
    toggleTask: (state, action: PayloadAction<Task["id"]>) => {
      const task = state.list.find((x) => x.id === action.payload);
      const taskInAll = state.allTasks.find((x) => x.id === action.payload);

      if (task && taskInAll) {
        task.done = !task.done;
        taskInAll.done = task.done;

        if (task.done) {
          state.notification = `Задача "${task.header}" завершена`;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<Task["id"]>) => {
      state.list = state.list.filter((x) => x.id !== action.payload);
      state.allTasks = state.allTasks.filter((x) => x.id !== action.payload);
    },
    setNotification: (state, action: PayloadAction<Task["header"]>) => {
      state.notification = `Задача "${action.payload}" завершена`;
    },
    clearNotification: (state) => {
      state.notification = "";
    },
    resetState: (state) => {
      state.list = [];
      state.allTasks = [];
      state.filter = false;
      state.notification = "";
    },
  },
});

export const {
  addTask,
  addFilter,
  completeTask,
  deleteTask,
  toggleTask,
  clearNotification,
  resetState,
} = taskListSlice.actions;

export default taskListSlice.reducer;

export const tasksSelector = (state: RootState) => state.taskList.list;

export const fullCount = (state: RootState) => state.taskList.list.length;

export const completeCount = (state: RootState) =>
  state.taskList.list.filter((x) => x.done).length;

export const uncompleteCount = (state: RootState) =>
  state.taskList.list.filter((x) => !x.done).length;

export const getNotification = (state: RootState) =>
  state.taskList.notification;

export const getFilter = (state: RootState) => state.taskList.filter;

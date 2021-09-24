import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 1,
        username: "Paras",
        gender: "male",
        hobbies: ["Watching Scifi movies", "Sports"],
        age: "23",
        task: "Finish this todo.",
        status: "WIP",
        deadline:"2021-09-25"

      },
      {
        id: 2,
        username: "Khushal",
        gender: "male",
        hobbies: ["Reading Blogs"],
        age: "22",
        task: "Finish Client website",
        status: "Assigned",
        deadline:"2021-09-24"

      },
      {
        id: 3,
        username: "Neha",
        gender: "female",
        hobbies: ["Makeup"],
        age: "22",
        task: "Finish logo designing",
        status: "Canceled",
        deadline:"2021-09-24"
      },
    ],
  },
  mutations: {
    addTodo(state, payload) {
      payload.id = state.todos.length + 1;
      state.todos.push(payload);
    },
    updateTodo(state, payload) {
      state.todos = state.todos.map((todo) =>
        todo.id === payload ? { ...todo } : todo
      );
    },
    deleteTodo(state, id) {
      var index = state.todos.findIndex((todo) => todo.id == id);
      state.todos.splice(index, 1);
    },
  },
  actions: {
    addTodo({ commit }, payload) {
      commit("addTodo", payload);
    },
    updateTodo({ commit }, payload) {
      commit("updateTodo", payload);
    },
    deleteTodo({ commit }, id) {
      commit("deleteTodo", id);
    },
  },
  modules: {},
  getters: {
    todoCount: (state)=>(status) => {
      return state.todos.filter((todo) => todo.status==status).length;
    },
    todo: (state) => (id) => {
      return state.todos.filter((todo) => todo.id ==id);
    },
  
    todos: (state) => {
      return state.todos;
    },
  },
});

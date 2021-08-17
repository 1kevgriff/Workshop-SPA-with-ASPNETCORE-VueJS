import { createStore } from 'vuex';
import axios from 'axios';

const url = "/api";

const store = createStore({
    state: {
        toDoLists: []
    },
    actions: {
        async getToDoLists({ commit, dispatch }) {
            commit('startLoading');
            console.log("Action: Getting ToDos");

            var result = await axios.get(url + "/todos");

            commit('updateToDoLists', result);
            commit('endLoading');
        },
        async addNewToDoList({ commit }, toDoListName) {
            commit('startLoading');
            console.log("Action: Adding new todo list");

            var result = await axios.post(url + "/todos", {
                name: toDoListName
            });

            commit('updateToDoLists', result);
            commit('endLoading');
        },
        async addToDoListItem({ commit }, { toDoListName, taskName }) {
            commit('startLoading');
            console.log("Action: Adding todo list item");

            var result = await axios.post(url + "/todos/" + toDoListName + "/items", {
                name: taskName
            });

            commit('updateToDoLists', result);
            commit('endLoading');
        },
        async toggleItem({ commit }, { toDoListName, index }) {
            commit('startLoading');
            console.log("Action: Marking todo list item as done");

            var result = await axios.put(url + "/todos/" + toDoListName + "/items/" + index);

            commit('updateToDoLists', result);
            commit('endLoading');
        }
    },
    mutations: {
        updateToDoLists(state, toDoLists) {
            console.log("Mutation: Adding new todo list");
            state.toDoLists = toDoLists.data;
        },
        startLoading(state) {
            state.loading = true;
        },
        endLoading(state) {
            state.loading = false;
        }
    },
    getters: {
        getToDoListByName: (state) => (name) => {
            return state.toDoLists.find(todoList => todoList.name === name);
        }
    }
});

export default store;
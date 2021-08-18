import { createStore } from 'vuex';
/* import axios */

const url = import.meta.env.VITE_API_URL;
console.log(url);

const store = createStore({
    state: {
        toDoLists: []
    },
    actions: {
        async getToDoLists({ commit, dispatch }) {
            commit('startLoading');
            console.log("Action: Getting ToDos");

            /* Axios */

            commit('updateToDoLists', result);
            commit('endLoading');
        },
        async addNewToDoList({ commit }, toDoListName) {
            commit('startLoading');
            console.log("Action: Adding new todo list");

            /* Axios */

            commit('updateToDoLists', result);
            commit('endLoading');
        },
        async addToDoListItem({ commit }, { toDoListName, taskName }) {
            commit('startLoading');
            console.log("Action: Adding todo list item");

            /* Axios */

            commit('updateToDoLists', result);
            commit('endLoading');
        },
        async toggleItem({ commit }, { toDoListName, index }) {
            commit('startLoading');
            console.log("Action: Marking todo list item as done");

            /* Axios */

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
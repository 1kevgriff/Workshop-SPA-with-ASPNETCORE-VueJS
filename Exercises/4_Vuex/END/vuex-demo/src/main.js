import './assets/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import ToDoList from './components/ToDoList.vue';
import ListItems from './components/ListItems.vue';
import { createStore } from 'vuex';

/* vue router */
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { name: "default", path: '/', component: ToDoList },
    { path: '/about', component: () => import('./components/About.vue') },
    { name: "todoList", path: '/:id', component: ListItems }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

/* vuex */
const store = createStore({
    state: {
        toDoLists: []
    },
    actions: {
        addNewToDoList({ commit }, toDoListName) {
            console.log("Action: Adding new todo list");
            commit('addNewToDoList', toDoListName);
        }
    },
    mutations: {
        addNewToDoList(state, toDoListName) {
            console.log("Mutation: Adding new todo list");
            state.toDoLists.push({ name: toDoListName, items: [] });
        }
    },
    getters: {
        getToDoListByName: (state) => (name) => {
            return state.toDoLists.find(todoList => todoList.name === name);
        }
    }
});

var app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app')

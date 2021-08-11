import './assets/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from "vuex";
import ToDoList from './components/ToDoList.vue';
import ListItems from './components/ListItems.vue';

/* Vue Router */
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { name: "default", path: '/', component: ToDoList },
    { path: '/about', component: () => import('./components/About.vue') },
    { path: '/:id', component: ListItems }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

/* Vuex */
const store = createStore({
    state: {
        toDoLists: []
    },
    actions: {
        addToDoList(context, toDoListName) {
            context.commit('addToDoListMutation', toDoListName);
        },
        addToDoListItem(context, toDoListName, toDoListItem) {
            context.commit('addToDoListItemMutation', toDoListName, toDoListItem);
        }
    },
    mutations: {
        addToDoListMutation(state, toDoListName) {
            state.toDoLists.push({ name: toDoListName, items: [] });
        },
        addToDoListItemMutation(state, toDoListName, itemText) {
            state.toDoLists
                .find(list => list.name === toDoListName)
                .items
                .push({ itemText: itemText, done: false });
        }
    }
});

var app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app')

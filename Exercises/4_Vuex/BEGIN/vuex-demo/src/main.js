import './assets/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import ToDoList from './components/ToDoList.vue';
import ListItems from './components/ListItems.vue';

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

var app = createApp(App);
app.use(router);
/* TODO: use store */
app.mount('#app');

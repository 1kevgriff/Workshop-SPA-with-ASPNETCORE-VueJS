# Exercise 3: Vue Router

## Introduction

> If you run into issue, refer to the END folder which contains the solution to this exercise.

## Step 1
Open the BEGIN folder in Visual Studio Code, or your preferred text editor.

## Step 2
In a terminal,type `cd vue-router-demo` and press `Enter`.

Type `npm install` and press `Enter`.  This should install the appropriate packages for the exercise.

## Step 3 - Configuring main.js

Open `main.js`.

In our application, we want to support three separate views:

1) The home page which contains a list of To Do Lists
2) A To Do List
3) An about page, because you always need an about page.

### Import Views

At the top of the file, add the following imports:

```javascript
import ToDoList from './components/ToDoList.vue';
import ListItems from './components/ListItems.vue';

import { createRouter, createWebHistory } from "vue-router";
```

The two imports for `ToDoList` and `ListItems` will ensure the components are preloaded at the start of the application.

The `createRouter` and `createWebHistory` functions are used to create the router.

### Configure Routes

Continuing in `main.js`, add the following code:

```javascript
const routes = [
    { name: "default", path: '/', component: ToDoList },
    { path: '/about', component: () => import('./components/About.vue') },
    { name: "todoList", path: '/:id', component: ListItems }
];
```

Because we imported the components `ToDoList` and `ListItems` in an earlier step, they can now be referenced directly in the routes.

The `name` property is used to identify the route.  We can reference the `name` directly when we need to navigate to this particular route.

The `path` property defines what we see in the URL bar.  This can either be a static path, as with `/` or `/about` or it can be a dynamic path, as with `/:id`.  The `/:id` provides a placeholder for the ID of the To Do List.  We will use this placeholder to identify the To Do List when we navigate to it.

Finally, the `component` property defines the component that will be rendered when the route is matched.  With `/` and `/:id`, we are using a previous imported component.  With `/about`, we are lazy loading the `About` component when it needs to be used.  Lazy Loading can be used to reduce the initial load time of the application, improving the user experience.

### Create the Router

Continuing in `main.js`, add the following code:

```javascript
const router = createRouter({
    history: createWebHistory(),
    routes: routes
});
```

The `createRouter` function is a helper provided by Vue Router.  

The `history` property tells Vue Router what History Implementation we want to use.  `createWebHistory` is most useful for single page applications, but there are [other implementations](https://next.router.vuejs.org/api/#history).

The `routes` property, as we've previously defined it, is an array of route definitions.  As the state of the address bar changes in the browser, the router will match the URL to the first route that matches in the array.

### Injecting Router into Vue Application

Lastly, in `main.js`, add the following code:

```javascript
var app = createApp(App);
app.use(router);
app.mount('#app');
```

Specifically you'll add the line `app.use(router);`.  This injects the Vue Router in the Vue Application.

## Step 4 - Injecting a <router-view>

The `<router-view>` tag is used by the router to determine which component to render when a route is matched.

Open `App.vue` and add the following code after the `<nav-bar />` tag:

```html
<router-view></router-view>
```

## Step 4 - Updating the Navigation Bar

Open `components/navbar.vue`.  We want to add two items that'll link us to the Home page (list of To Do Lists) and the About page.

Inside the `<template>` tag, add the following code inside the `<nav>` tag:

```html
<router-link class="
            border-transparent
            text-gray-500
            hover:text-gray-700
            hover:border-gray-300
            whitespace-nowrap
            py-4
            px-1
            border-b-2
            font-medium
            text-sm" :to="{path: '/'}" >Home</router-link>
```

```html
<router-link class="
            border-transparent
            text-gray-500
            hover:text-gray-700
            hover:border-gray-300
            whitespace-nowrap
            py-4
            px-1
            border-b-2
            font-medium
            text-sm" :to="{path: '/about'}" >About</router-link>
```

> You can safely ignore all the class` attributes.  They are used to style the links.  By the way, we're using TailwindCSS for some of the styling.  You should totally check it out.

It's time to test!  At the command prompt, type `npm run dev` and press `Enter`.

Open a browser and navigate to `http://localhost:3000`.  You should be able to navigate between the home page and the about page by just clicking on the navigation bar links.

## Step 5 - Creating a List of To Do Lists

Open `components/ToDoList.vue`.  Add the following code to the `<template>` tag:

```html
  <br />
  <router-link :to="{ name: 'todoList',  params: { id: 1 }}">Go to List #1</router-link><br/>
  <router-link :to="{ name: 'todoList',  params: { id: 50 }}">Go to List #50</router-link><br/>
  <router-link :to="{ name: 'todoList',  params: { id: 1337 }}">Go to List #1337</router-link><br/>
```

The `<router-link>` tag will translate into a `<a>` tag.  The `name` property is used to define the route that the link will navigate to.  The `params` property is used to pass in the ID of the To Do List.

Looking at `Go to List #1`, this route will translate to `/1`, because in our `routes` configuration several steps ago, we said `toDoList` follows the pattern `/:id`.  However, to make this route work correctly we need to pass in the ID of the To Do List.  We can do this by adding the `params` property to the `:to` definition.

## Step 6 - Final Test!

Ensure all your files are saved.  Then, at the command prompt, type `npm run dev` and press `Enter`.

If everything is configured correctly, you should be able to navigate between the home page and the about page by clicking on the navigation bar links.  Additionally, there should be three links on the home page that will take you to the To Do List #1, 50, and 1337.

**YOU HAVE COMPLETED THIS EXERCISE - WAY TO GO**
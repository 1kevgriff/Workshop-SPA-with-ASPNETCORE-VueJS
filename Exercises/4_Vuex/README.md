# Exercise 4: Vuex

## Introduction

> If you run into an issue, refer to the END folder which contains the solution to this exercise.

## Step 1
Open the BEGIN folder in Visual Studio Code, or your preferred text editor.

## Step 2
In a terminal,type `cd vuex-demo` and press `Enter`.

Type `npm install` and press `Enter`.  This should install the appropriate packages for the exercise.

## Step 3
Open the file `main.js`.  We will use this file for setting up Vuex.

## Step 4
At the top of the file with the other `import` statements, add the following line to import Vuex.

```javascript
import { createStore } from 'vuex';
```

## Step 5
In the same file, find the comment marked `/* vuex */` and write the following code:

```javascript
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
```

Let's walkthrough what this code is doing for us.

`state` is the data you want to track changes for within the application.  It's important to note that it's only properties.

`actions` are methods for doing work.  This might be API calls or doing logic.  Actions are the only mechanism in Vuex that can trigger mutations, which eventually changes the state of the application.

`mutations` are how state is actually manipulated.  Any action can call a mutation. Vuex will provide the mutation with `state` as it current exists, and we can change anything within that state.  

Changes to state here are detected by Vuex, and any components that are mapping state will receive notice that the state has changed.

`getters` allows us to define methods which can return filters or altered versions of items within Vuex state.  For example, our `getToDoListByName` getter provides a function, which if executed will return a todo found from all the todo lists in state.

## Step 6
Finally, still in `main.js` add the following code near where the Vue App is created.

```javascript
app.use(store);
```

## Step 6
Jump over to `components/ToDoList.vue`.  Our goal in this file is to wire up some actions and the state.

> The HTML has already been wired up for you, as it's a review of the work we did in previous labs.

In the `<script>` section, add near the top:

```javascript
import { mapActions, mapState } from "vuex";
```

We'll use these helpers to request appropriate actions and state changes from Vuex.

In the component itself, we'll want to add `mapState`:

```javascript
computed: mapState({
    todoLists: (state) => state.toDoLists,
  }),
```

This helper works by pulling out certain properties from state.  Vuex will manage the changes to these properties and automatically ensure any changes are propogated to our components.

Inside of `methods:`, we want to add a call at the top:

```javascript
...mapActions(["addNewToDoList"]),
```

The `...` extends the result of mapActions into the object we're passing into methods.

When you're all done, your final `<script>` section should look like this:

```javascript
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return { newToDoListName: "" };
  },
  computed: mapState({
    todoLists: (state) => state.toDoLists,
  }),
  methods: {
    ...mapActions(["addNewToDoList"]),
    addNewToDo() {
      this.addNewToDoList(this.newToDoListName);
      this.newToDoListName = "";
    },
  },
};
</script>
```

## Step 7
Swap over now to `components/ListItems.vue`.  This is the place where we want to see a loaded to do list.

> Note: in this lab, we're not worrying about list items in the To Do List.  We're only going to worry about showing the name of the to do list.

The HTML for this file is already in place.  Your job is to add the appropriate code that'll get the ToDo from state, based on the name of the to do list.

```html
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getToDoListByName"]),
    loadedToDoList() {
      return this.getToDoListByName(this.$route.params.id);
    },
  }
};
</script>
```

`mapGetters` works in the same way as `mapState`.  However, we only want the ToDo list we're currently looking at - not all of the lists.

Because `getToDoListByName` needs a parameters, we can't use it directly in our view.  Instead, we need to create a second computed property `loadedToDoList` which executes `getToDoListByName` and passes in the Id of the current list (which is from the route).

## Step 8
It's time to test!  Save all your changes, open a terminal and run:

```
npm start dev
```

Open a browser to the URL the dev server provides you, and see if you want add to do lists!


**YOU HAVE COMPLETED THIS EXERCISE - WAY TO GO**

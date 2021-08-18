# Exercise 2: Your First Custom Vue Component

## Introduction

> If you run into issues, refer to the END folder which contains the solution to this exercise.

## Step 1
Open the BEGIN folder in Visual Studio Code, or your preferred text editor.

## Step 2
In a terminal, type `cd custom-components` and press `Enter`.

Type `npm install` and press `Enter`.  This should install the appropriate packages for the exercise.

## Step 3
This is a fantastic time to go ahead and start the development server for the demo.  In the same terminal, type `npm run dev` and press `Enter`.  This will start the development server.

In any browser, go to `http://localhost:3000` and you should see the component page.  It'll be blank.

## Step 4
Open the file `src/components/GenericList.vue`.  You'll notice it is an empty component.  Let's start building it out!

## Step 5
Add the following code to the `<template>` tag:

```html
<div>
    <input />&nbsp;
    <button>Add To List</button>
    <br />
    <ul>
      <li></li>
    </ul>
  </div>
```

Save the file, and the page should automatically reload.  You should see the input and button.  The list will be empty because, obviously, there is nothing in it.

## Step 6
It's time to add the data model in which the component will store its data.  Back in the component, add the following to the `<script>` tag:

```javascript
export default {
  data() {
    return {
      list: [],
      newItem: "",
    };
  }
}
```

As we build out the component, the `list` will contain an array of strings we want to list inside of the `<ul>` tag.  The `newItem` will contain the text that the user types into the input.

## Step 7
Even though we have the data model, it's useless unless we have the model wired up to our component.

In the `<template>`, adjust the following lines:

```html
<input v-model="newItem" />&nbsp;
```

```html
<ul>
    <li v-for="(item, index) in list" v-bind:key="index">{{item}}</li>
</ul>
```

Refresh the page in your browser.  Not much happened, did it?  We should wire up the button now so we can add items to the list.

## Step 8

In the `<script>` tag, update your export to reflect the following code:

```javascript
{
  data() {
    return {
      list: [],
      newItem: "",
    };
  },
  methods: {
      addToList() {
        this.list.push(this.newItem);
        this.newItem = "";
      }
  }
}
```

The `methods` section of the block is new, and contains a single methods called `addToList`.  This method will add the `newItem` to the `list` array.  The `newItem` will be cleared out of the input.

Back in your `<template>` tag, update the `<button>`:

```html
<button @click="addToList">Add To List</button>
```

Refresh the page.  Type something, anything!, into the input.  Press `add to list` and see what happens. Add a few more items!

**YOU HAVE COMPLETED THIS EXERCISE - WAY TO GO**

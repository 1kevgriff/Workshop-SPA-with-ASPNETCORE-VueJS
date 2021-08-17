<template>
  <h2>To Do List</h2>
  <br />
  <div v-if="todoLists && todoLists.length > 0">
    <div v-for="td in todoLists" :key="td.name">
      <router-link :to="{ name: 'todoList', params: { id: td.name } }"
        >{{ td.name }} - {{ td.items.length }} items to do</router-link
      >
      <br />
    </div>
  </div>
  <div v-else>
    <p>No todo lists found</p>
  </div>
  <hr />
  <div class="mt-10">
    <input class="border-2 border-black" v-model="newToDoListName" />
    <button
      class="
        mx-2
        p-2
        border-2 border-gray-300
        bg-blue-300
        hover:bg-blue-100
        shadow
      "
      @click="addNewToDo"
    >
      Add new todo list
    </button>
  </div>
</template>

<script>
/* import vuex helpers */

export default {
  data() {
    return { newToDoListName: "" };
  },
  /* mapState */
  methods: {
    /* mapActions */
    addNewToDo() {
      this.addNewToDoList(this.newToDoListName);
      this.newToDoListName = "";
    },
  },
};
</script>

<style>
</style>
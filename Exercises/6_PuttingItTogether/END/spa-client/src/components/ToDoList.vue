<template>
  <div>
    <h2>To Do List</h2>
    <br />
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else-if="todoLists && todoLists.length > 0">
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
        class="p-2 mx-2 bg-blue-300 border-2 border-gray-300 shadow hover:bg-blue-100"
        @click="addNewToDo"
      >
        Add new todo list
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return { newToDoListName: "" };
  },
  computed: mapState({
    todoLists: (state) => state.toDoLists,
    loading: (state) => state.loading,
  }),
  methods: {
    ...mapActions(["getToDoLists", "addNewToDoList"]),
    addNewToDo() {
      this.addNewToDoList(this.newToDoListName);
      this.newToDoListName = "";
    },
  },
  created() {
    this.getToDoLists();
  },
};
</script>

<style>
</style>
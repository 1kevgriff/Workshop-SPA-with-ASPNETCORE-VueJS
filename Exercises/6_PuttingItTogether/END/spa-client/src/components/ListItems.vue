<template>
  <div>
    <h2 class="text-2xl font-bold" v-if="loadedToDoList">
      List Items for list {{ loadedToDoList.name }}
    </h2>
    <br />
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <ul v-else-if="loadedToDoList && loadedToDoList.items.length > 0">
      <li
        v-for="(item, index) in loadedToDoList.items"
        :key="index"
        :class="{ 'line-through': item.done }"
        @click="toggle(index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <ul v-else>
      <li>No items in list</li>
    </ul>
    <div class="mt-10">
      <input class="border-2 border-black" v-model="newToDoListItem" />
      <button
        class="
          p-2
          mx-2
          bg-blue-300
          border-2 border-gray-300
          shadow
          hover:bg-blue-100
        "
        @click="addNewItem"
      >
        Add new todo item
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      newToDoListItem: "",
    };
  },
  computed: {
    ...mapGetters(["getToDoListByName"]),
    ...mapState({
      loading: (state) => state.loading,
    }),
    loadedToDoList() {
      return this.getToDoListByName(this.$route.params.id);
    },
  },
  methods: {
    ...mapActions(["toggleItem", "addToDoListItem", "getToDoLists"]),
    addNewItem() {
      this.addToDoListItem({
        toDoListName: this.$route.params.id,
        taskName: this.newToDoListItem,
      });
      this.newToDoListItem = "";
    },
    toggle(index) {
      this.toggleItem({ toDoListName: this.$route.params.id, index: index });
    },
  },
  created() {
    this.getToDoLists();
  },
};
</script>

<style>
</style>
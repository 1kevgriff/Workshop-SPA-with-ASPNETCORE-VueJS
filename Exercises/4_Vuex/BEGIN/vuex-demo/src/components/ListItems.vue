<template>
  <div>
    <h2 class="text-2xl font-bold" v-if="loadedToDoList">
      List Items for list {{ loadedToDoList.name }}
    </h2>
    <br />
    <ul v-if="loadedToDoList && loadedToDoList.items.length > 0">
      <li
        v-for="(item, index) in loadedToDoList.items"
        :key="index"
        :class="{ 'line-through': item.done }"
      >
        {{ item.name }}
      </li>
    </ul>
    <ul v-else>
      <li>No items in list</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
  },
  methods: {
  },
};

</script>

<style>
</style>
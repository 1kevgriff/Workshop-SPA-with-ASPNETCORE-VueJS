<template>
  <div>
    <h2>List Items for list {{ loadedToDoList.name }}</h2>
    <hr />
    <ul v-if="loadedToDoList.items.length > 0">
      <li
        v-for="(item, index) in loadedToDoList.items"
        :key="index"
        @click="toggle(index)"
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
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapActions(["toggleItem"])),
    ...mapGetters(["getToDoListByName"]),
    loadedToDoList() {
      return this.getToDoListByName(this.$route.params.id);
    },
  },
  methods: {
    toggle() {
      this.toggle(this.$route.params.id, )
    }
  },
};
</script>

<style>
</style>
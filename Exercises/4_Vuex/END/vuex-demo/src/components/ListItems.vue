<template>
  <h2>List Items for list {{ toDoList.name }}</h2>
  <hr />
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getToDoListByName"]),
  },
  methods: {
    ...mapActions(["addNewToDoList"]),
  },
};

</script>

<style>
</style>
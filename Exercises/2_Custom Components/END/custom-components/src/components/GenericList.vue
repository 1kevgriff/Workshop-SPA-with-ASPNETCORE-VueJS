<template>
  <div>
    <input v-model="newItem" />&nbsp;
    <button @click="addToList">Add To List</button>
    <br />
    <ul>
      <li v-for="(item, index) in list" v-bind:key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
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
</script>

<style>

</style>
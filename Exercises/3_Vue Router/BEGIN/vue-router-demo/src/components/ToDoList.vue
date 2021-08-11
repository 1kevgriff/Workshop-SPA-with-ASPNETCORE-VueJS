<template>
  <h2>To Do List</h2>
  <br />
  <router-link :to="{ name: 'todoList',  params: { id: 1 }}">Go to List #1</router-link><br/>
  <router-link :to="{ name: 'todoList',  params: { id: 50 }}">Go to List #50</router-link><br/>
  <router-link :to="{ name: 'todoList',  params: { id: 1337 }}">Go to List #1337</router-link><br/>
</template>

<script>
export default {};
</script>

<style>
</style>
<template>
  <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <!-- We've used 3xl here, but feel free to try other max-widths based on your needs -->
    <div class="max-w-3xl mx-auto">
      <nav-bar />
      <div class="mt-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
</style>

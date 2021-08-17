<template>
  <div class="sm:block">
    <div class="border-b border-gray-200">
      <nav class="flex -mb-px space-x-8" aria-label="Tabs">
        <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
        <router-link
          class="px-1 py-4 text-sm font-medium text-gray-500 border-b-2 border-transparent  hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
          :to="{ path: '/' }"
          >Home</router-link
        >

        <router-link
          class="px-1 py-4 text-sm font-medium text-gray-500 border-b-2 border-transparent  hover:text-gray-700 hover:border-gray-300 whitespace-nowrap"
          :to="{ path: '/about' }"
          >About</router-link
        >
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
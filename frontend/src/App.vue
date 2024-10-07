<template>
  <div class="h-full w-full"><Header /><router-view></router-view></div>
</template>

<script lang="ts">
import Header from "./components/Header.vue";

export default {
  components: { Header },
};
</script>

<style></style>

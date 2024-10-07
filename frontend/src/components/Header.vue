<template>
  <div
    class="fixed left-0 top-0 flex px-4 py-2 w-screen items-center justify-between bg-slate-400"
  >
    <div>
      <router-link to="/"><img :src="logo" alt="logo" /></router-link>
    </div>
    <div class="flex px-4 space-x-4 items-center justify-between">
      <div v-for="(el, index) in links" :key="index">
        <router-link :to="el.link" class="text-lg text-black">{{ el.text }}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import logo from "../assets/vue.svg";

interface LinkItem {
  link: string;
  text: string;
}

export default defineComponent({
  data() {
    return {
      links: [
        { link: "/", text: "Доска" },
        { link: "/register", text: "Регистрация" },
        { link: "/login", text: "Вход" },
      ] as LinkItem[],
      logo,
    };
  },
});
</script>

<style scoped></style>

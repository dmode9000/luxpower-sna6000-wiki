<script setup>
import DefaultTheme from "vitepress/theme";
import { nextTick, onMounted } from "vue";
import mediumZoom from "medium-zoom";
import "./medium-zoom.css";

const { Layout } = DefaultTheme;

onMounted(async () => {
  await nextTick();
  mediumZoom(".vp-doc img", {
    background: "var(--vp-c-bg)",
  });
});
</script>

<template>
  <Layout />
</template>

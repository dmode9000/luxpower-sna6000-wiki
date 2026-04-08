<script setup>
import DefaultTheme from "vitepress/theme";
import { nextTick, onMounted, watch } from "vue";
import { useRoute } from "vitepress";
import mediumZoom from "medium-zoom";
import "./medium-zoom.css";

const { Layout } = DefaultTheme;
const route = useRoute();

const initMediumZoom = async () => {
  await nextTick();
  mediumZoom(".vp-doc img", {
    background: "var(--vp-c-bg)",
  });
};

onMounted(initMediumZoom);

watch(
  () => route.path,
  () => {
    initMediumZoom();
  },
);
</script>

<template>
  <Layout />
</template>

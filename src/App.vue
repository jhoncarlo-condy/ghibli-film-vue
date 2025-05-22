<script setup lang="ts">
import { Motion } from 'motion-v'
import { useRouter } from 'vue-router'

const router = useRouter()

const redirectHome = () => {
  router.push('/')
}
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
    :while-in-view="{
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    }"
    :transition="{
      delay: 0.3,
      duration: 0.8,
      ease: 'easeInOut',
    }"
    class="relative flex flex-col items-center justify-center gap-4 px-4"
  >
    <div class="flex justify-center items-center my-8">
      <img
        @click="redirectHome"
        src="/ghibli-logo.svg"
        alt="Ghibli Logo"
        class="h-20 hover:cursor-pointer hover:scale-[1.05] transition-transform"
      />
    </div>
    <router-view :key="$route.fullPath" />
  </Motion>
  <footer class="w-full text-center bg-gray-100 dark:bg-gray-900 py-6 fixed bottom-0 left-0">
    <div
      class="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center text-sm text-gray-600 dark:text-gray-400"
    >
      <span> &copy; 2025 Studio Ghibli. All rights reserved. </span>
    </div>
  </footer>
</template>

<style scoped></style>

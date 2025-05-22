<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { Card, CardContent } from '@/components/ui/card'
import { ref, watch } from 'vue'
import { useGetFilms } from '@/server/Film/film'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const films = ref([])
const { data } = useGetFilms(4)

watch(data, (newData) => {
  if (newData) films.value = newData
})

const router = useRouter()

const goToFilmDetail = (filmId: string) => {
  router.push(`/film/${filmId}`)
}
</script>

<template>
  <Carousel class="relative w-full max-w-6xl mx-auto">
    <CarouselContent>
      <CarouselItem
        v-for="film in films"
        :key="film.id"
        class="md:basis-1/2 lg:basis-1/4 cursor-pointer"
        @click="goToFilmDetail(film.id)"
      >
        <div class="p-4">
          <Card class="h-full bg-white dark:bg-zinc-900 shadow">
            <img :src="film.image" :alt="film.title" class="w-full h-40 object-cover rounded-t" />
            <CardContent class="p-4">
              <h5 class="font-bold text-base leading-snug">
                {{ film.title }} ({{ film.original_title }})
              </h5>
              <p class="text-sm text-muted mb-2">
                {{ film.release_date }} | Score: {{ film.rt_score }}
              </p>
              <p class="text-sm line-clamp-4">{{ film.description }}</p>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  <Button class="hover:cursor-pointer hover:scale-[1.05] transition-transform"
    ><router-link to="/films">View More</router-link></Button
  >
</template>

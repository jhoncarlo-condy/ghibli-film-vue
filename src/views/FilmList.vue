<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useGetFilms } from '@/server/Film/Film'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import type { Film } from '@/types/Film'

const router = useRouter()

const limit = ref(4)
const films = ref<Film[]>([])

const { data, refetch } = useGetFilms(limit)

watch(data, (newData) => {
  if (newData) films.value = newData
})

const loadMore = async () => {
  limit.value += 4
  await refetch()
}

const goToDetail = (id: string) => {
  router.push(`/film/${id}`)
}

onMounted(() => {
  refetch()
})
</script>

<template>
  <div class="flex flex-col items-center gap-10 w-full px-4">
    <Card class="w-full max-w-3xl" v-for="film in films" :key="film.id">
      <CardHeader class="p-0">
        <img
          :src="film.movie_banner"
          :alt="film.title"
          class="w-full h-52 object-cover rounded-t"
        />
        <div class="text-center mt-4">
          <CardTitle class="text-xl font-semibold">
            {{ film.title }} ({{ film.original_title }})
          </CardTitle>
          <Label class="text-sm text-muted-foreground mt-1"
            >Release date: {{ film.release_date }}</Label
          >
        </div>
        <CardDescription class="p-4"> </CardDescription>
      </CardHeader>

      <CardContent>
        <div class="flex flex-row gap-5">
          <img :src="film.image" :alt="film.title" class="w-48 h-48 object-cover rounded-md mb-2" />

          <div class="flex flex-col justify-between">
            <Label class="text-sm text-gray-700 leading-relaxed">
              {{ film.description }}
            </Label>

            <div class="flex items-center gap-2 mt-4">
              <Star class="w-4 h-4 text-yellow-400" />
              <Label class="text-sm text-gray-500">Rating: {{ film.rt_score }}</Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter class="place-self-end flex justify-between items-center px-6 pb-6">
        <Button
          class="hover:cursor-pointer hover:scale-[1.05] transition-transform"
          @click="goToDetail(film.id)"
        >
          View Detail
        </Button>
      </CardFooter>
    </Card>
    <Button
      class="hover:cursor-pointer hover:scale-[1.05] transition-transform mb-20"
      @click="loadMore"
    >
      View More Films
    </Button>
  </div>
</template>

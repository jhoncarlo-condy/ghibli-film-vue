<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-vue-next'
import { useMutation } from '@tanstack/vue-query'
import { useGetFilmDetail } from '@/server/Film/film'

const route = useRoute()
const film = ref(null)

const detailMutation = useMutation({
  mutationFn: useGetFilmDetail,
  onSuccess: (data) => {
    film.value = data
  },
})

onMounted(() => {
  const id = route.params.id as string
  detailMutation.mutate({ id: id })
})
</script>

<template>
  <div class="container py-4" v-if="film">
    <div class="flex justify-center">
      <Card class="w-full max-w-3xl">
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
            <Label class="text-sm text-muted-foreground mt-1">
              Release date: {{ film.release_date }}
            </Label>
          </div>
          <CardDescription class="p-4"></CardDescription>
        </CardHeader>

        <CardContent>
          <div class="flex flex-row gap-5">
            <img
              :src="film.image"
              :alt="film.title"
              class="w-48 h-48 object-cover rounded-md mb-2"
            />

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
          <div class="flex flex-col gap-5 mt-10">
            <Label>Original Title Romanised: {{ film.original_title_romanised }}</Label>
            <Label>Director: {{ film.director }}</Label>
            <Label>Producer: {{ film.director }}</Label>
            <Label>Running Time: {{ film.running_time }}</Label>
          </div>
        </CardContent>
      </Card>
    </div>
    <div class="text-center mt-5 mb-20">
      <Button class="hover:cursor-pointer hover:scale-[1.05] transition-transform underlined">
        <router-link to="/"> Back to Home</router-link>
      </Button>
    </div>
  </div>
</template>

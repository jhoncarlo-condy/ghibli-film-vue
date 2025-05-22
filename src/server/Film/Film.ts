import { AxiosInstance } from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'
import type { Ref } from 'vue'

export const getFilms = async (limit = 4) => {
  return await AxiosInstance.get(`/films?limit=${limit}`)
    .then((response) => response.data)
    .catch((error) => error.response?.data)
}

export const useGetFilms = (page: Ref<number>) => {
  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ['getFilms', page],
    queryFn: () => getFilms(page.value),
    staleTime: Infinity,
  })

  return { data, refetch, error, isLoading }
}

export const useGetFilmDetail = async ({ id }: { id: string }) => {
  return await AxiosInstance.get(`/films/${id}`)
    .then((response) => response.data)
    .catch((error) => error.response?.data)
}

import { create } from 'zustand'
import { combine } from 'zustand/middleware' // 타입 추론하기 위함

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export const useMovieStore = create(
  // combine(데이터들, 함수들) = combine(상태, 액션들)
  combine({ movies: [] as Movie[] }, set => {
    return {
      async searchMovies(searchText: String) {
        console.log(`${searchText}`)
        const res = await fetch(
          `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
        )
        const data = await res.json()
        console.log(data.Search)
        set({ movies: data.Search })
      }
    }
  })
)

import { useState } from 'react'
import { useMovieStore } from '@/stores/movie'

export default function SearchBar() {
  const [searchText, setSearchText] = useState('')
  const searchMovies = useMovieStore(state => state.searchMovies)

  return (
    <>
      <input
        type="text"
        value={searchText}
        onChange={e => {
          setSearchText(e.target.value)
        }}
        onKeyDown={e => {
          if (e.key == 'Enter' && !e.nativeEvent.isComposing) {
            searchMovies(searchText)
          }
        }}
      />
      <button onClick={() => searchMovies(searchText)}>검색!</button>
    </>
  )
}

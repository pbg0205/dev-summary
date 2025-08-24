import SearchBar from '@/components/SearchBar'
import MovieList from '@/components/MovieList'
import { useState } from 'react'

export default function App() {
  const [message, setMessage] = useState('111')

  return (
    <>
      <SearchBar />
      <MovieList
        msg={message}
        total={10}
        onClick={() => setMessage('안녕하세요!')}
      />
    </>
  )
}

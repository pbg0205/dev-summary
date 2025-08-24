import { useMovieStore } from '@/stores/movie'
import styles from '../styles/MovieList.module.css'

export default function MovieList({
  msg,
  total,
  onClick
}: {
  msg: string
  total: number
  onClick: () => void
}) {
  const movies = useMovieStore(state => state.movies)

  console.log('movie:' + movies)

  return (
    <>
      <h2 onClick={onClick}>{msg}</h2>
      <h3>{total}개 영화까지 검색됩니다.</h3>
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.imdbID}>
              <div className={styles.titleRed}>{movie.Title}</div>
              <img
                src={movie.Poster}
                alt={movie.Title}
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}

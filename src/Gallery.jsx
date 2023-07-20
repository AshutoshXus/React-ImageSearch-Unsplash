import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalContext } from './context'

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`
console.log(import.meta.env.VITE_API_KEY)

const Gallery = () => {
  const { searchText } = useGlobalContext()

  const response = useQuery({
    queryHash: ['images', searchText],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchText}`)
      return result.data
    },
  })

  console.log(response)
  if (response.isLoading) {
    return (
      <section className="image-conatiner">
        <h4>Loading</h4>
      </section>
    )
  }

  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error</h4>
      </section>
    )
  }

  const results = response.data.results
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found</h4>
      </section>
    )
  }

  return (
    <section className="image-container">
      {results.map((item) => {
        const { regular } = item.urls
        return <img className="img" key={item.id} src={regular}></img>
      })}
    </section>
  )
}
export default Gallery

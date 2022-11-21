import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import fetchJSON from "../../functions/fetchJSON"
const SearchResults = () => {
    
    const [results, setResults] = useState([])
    
    const imagePath = "https://image.tmdb.org/t/p/original"
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("query");


    useEffect(() => {

        const queryAPIString = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`

        async function getData() {
            const data = await fetchJSON(queryAPIString);
            setResults(data);
        }
        getData();
    }, [])

    useEffect(() => {

        const queryAPIString = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`

        async function getData() {
            const data = await fetchJSON(queryAPIString);
            setResults(data);
        }
        getData();
    }, [searchQuery])



    function determineMedia(item) {
        if (item.media_type === 'movie') {
            return <>
            {item.title} ({item.release_date.split('-')[0]})
            <p><i>Movie</i></p>
            </>
        } else if (item.media_type === 'tv') {
            return <>
                {item.name} ({item.first_air_date.split('-')[0]})
                <p><i>TV Series</i></p>
            </>
        }
    }

    return (
    <div>
        <h1>Search Results for "{searchQuery}"</h1>
        <ul>
            {results.results &&
            results.results.map((item, i) => {
                return <li key={i}>{determineMedia(item)}</li>
            })}
        </ul>
    </div>
  )
}

export default SearchResults


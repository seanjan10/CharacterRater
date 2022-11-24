import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import fetchJSON from "../../functions/fetchJSON"
import placeholder from "../../static/placeholder.jpg"
const SearchResults = () => {
    
    const [results, setResults] = useState([])
    const [counter, setCounter] = useState(1)

    const imagePath = "https://image.tmdb.org/t/p/original"
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("query");
    
    
    //const queryAPIString = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${searchQuery}&page=${counter}&include_adult=false`
    const queryAPIString = `http://localhost:3500/search/?searchQuery=${searchQuery}&counter=${counter}`



    useEffect(() => {
        async function getData() {
            const data = await fetchJSON(queryAPIString);
            setResults(data);
        }
        getData();
    }, [])

    useEffect(() => {

        //console.log(counter);
        setCounter(1);
        //const queryAPIString = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
        const queryAPIString = `http://localhost:3500/search/?searchQuery=${searchQuery}&counter=${counter}`
        
        async function getData() {
            const data = await fetchJSON(queryAPIString);
            setResults(data);
        }
    getData();

    }, [searchQuery])

    
    useEffect(() => {

        async function loadMore() {

            const data = await fetchJSON(queryAPIString)
            const mergeData = {
                page: counter,
                results: results.results.concat(data.results),
                //each fetch only returns an array of the first 20 results
                total_results: results.total_results - 20,
                total_pages: results.total_pages
            }
            //console.log(mergeData)
            setResults(mergeData);
        }
        if (counter !== 1) {
            loadMore();
            // console.log("load more entries")
        } else {
            // console.log("new search, don't run")
        }
    }, [counter])


    function determineMedia(item) {
        if (item.media_type === 'movie') {
            //need ?. i think
            return <>
            {item.title} ({item.release_date?.split('-')[0]})
            </>
        } else if (item.media_type === 'tv') {
            return <>
                {item.name} ({item.first_air_date?.split('-')[0]})
                
            </>
        }
    }

    return (
    <div className="container">
        <h1>Search Results for "{searchQuery}"</h1>
        <div className="search__container">
            <ul className="search__results-list">
                {results.results &&
                
                results.results.map((item, i) => {
                    if (item.media_type === 'tv' || item.media_type === 'movie') {
                        return <li key={i} className="search_result-item">
                            <Link to={"../" + item.media_type + "/" + item.id}>
                            <img className="img-fluid search__image" src={item.poster_path ? imagePath + item.poster_path : placeholder} alt={item.media_type === 'movie'? item.title : item.name} />{determineMedia(item)} </Link>
                            <p>{item.media_type === 'movie' ? "Movie": "TV Series"}</p>
                        </li>
                    }
                    
                })}
            </ul>
            {results.total_results > 20 &&
            
                <div className="d-flex justify-content-center">
                <button className="search__load-more btn btn-primary" onClick={() => setCounter(counter + 1)}>Load More</button>
                </div>
            }
            
        </div>
    </div>
  )
}

export default SearchResults

//{/* wider button d-grid gap-2 col-6 mx-auto */}
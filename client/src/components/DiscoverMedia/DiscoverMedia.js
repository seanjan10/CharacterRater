import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import fetchJSON from "../../functions/fetchJSON"
import placeholder from "../../static/placeholder.jpg"

const DiscoverMedia = ({media}) => {

    const [sortMethod, setSortMethod] = useState('popularity.desc')
    const [results, setResults] = useState({})

    const apiString = `https://api.themoviedb.org/3/discover/${media}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=${sortMethod}&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    const imagePath = "https://image.tmdb.org/t/p/original"

    //https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&include_null_first_air_dates=false&with_watch_monetization_types=flatrate

    useEffect(() => {
        const getData = async () => {
            const data = await fetchJSON(apiString);
            setResults(data);
            // console.log(apiString);
            
        }
        getData();
    }, [])

    useEffect(() => {
        const getData = async () => {
            const data = await fetchJSON(apiString);
            setResults(data);
            // console.log(apiString);
            
        }
        getData();
    }, [media])
    


    const getSortType = () => {
        const getSortMethod = sortMethod.split('.')
        const type = getSortMethod[0]
        const direction = getSortMethod[1]

        if (type === 'popularity') {
            if (direction === 'asc') {
                return "Least Popular"
            } else {
                return "Most Popular"
            }
        } else if (type === 'release_date') {
            if (direction === 'asc') {
                return "Newest"
            } else {
                return "Oldest"
            }
        } else if (type === 'revenue') {
            if (direction === 'asc') {
                return "Lowest Grossing"
            } else {
                return "Highest Grossing"
            }
        } else if (type === 'original_title') {
            if (direction === 'asc') {
                return "Reverse Alphabetical Order"
            } else {
                return "Alphabetical Order"
            }
        } else if (type === 'vote_average') {
            if (direction === 'asc') {
                return "Lowest Rated"
            } else {
                return "Highest Rated"
            }
        } else if (type === 'vote_count') {
            if (direction === 'asc') {
                return "Least Voted"
            } else {
                return "Most Voted"
            }
        } else {
            return ""
        }
    }

  return (
    <div className='container'>
        <h1>Showing {getSortType()} {media === "movie" ? "Movies" : "TV Shows"}</h1>
        <ul className="discover__list">
        {results.results &&
        results.results.map((item, i) => {
            return <li key={i} className="discover__item">
                        <Link to={"/" + media + "/" + item.id}>
                        <img className="img-fluid discover__item-image" src={item.poster_path ? imagePath + item.poster_path : placeholder} alt={item.title} />{media === "movie" ? item.title : item.name} ({media === "movie" ? item.release_date?.split('-')[0] : item.first_air_date?.split('-')[0] }) </Link>
                </li>
        })}
        </ul>
    </div>
  )
}

export default DiscoverMedia
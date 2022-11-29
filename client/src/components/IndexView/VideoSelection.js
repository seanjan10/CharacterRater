import {useState, useEffect } from "react"
import VideoCard from "./VideoCard";
import fetchJSON from "../../functions/fetchJSON";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//receives two props, type of video (tv, movie) and number to fetch??, time frame? (only day or week)
const VideoSelection = (props) => {

    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        //const trendingAPIString = `https://api.themoviedb.org/3/trending/${props.media}/${props.time}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        const trendingAPIString = `http://localhost:3500/home/?media=${props.media}&time=${props.time}`

        const getTrending = async () => {
            const trendingFromServer = await fetchJSON(trendingAPIString);
            setTrending(trendingFromServer);
        };

        getTrending();
        setLoading(false);
    }, [])
   
  return (
    
    <div>
        <h1>Trending {props.media === 'movie' ? "Movies": "TV Shows"}</h1>
        {loading ? 
            <div className="loading__container">
                <FontAwesomeIcon className='loading__icon' icon={faSpinner}/>
            </div>
        
        : 
        <ul className="public-trending__movies">
            {trending.results &&
            trending.results.map( (item, i) =>
            <VideoCard key={i} mediaID={item.id} title={props.media === 'movie' ? item.title : item.name} type={props.media === 'movie' ? item.title : item.name} poster_path={item.poster_path} media={props.media}/> )}
            
        </ul>
        
        }
       
    </div>        
    
  )
}

export default VideoSelection

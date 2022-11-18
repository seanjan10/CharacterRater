import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import fetchJSON from './fetchJSON';
import CharacterDisplay from './CharacterDisplay'

const MediaPage = ({media}) => {

    const [content, setContent] = useState("");
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/original"
    
    useEffect(() => {
        const mediaAPIString =`https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        const getMedia = async () => {
            const mediaData = await fetchJSON(mediaAPIString);
            setContent(mediaData);
        }
        getMedia();
    }, [])
    //function to get release date of movie/tv
    function getYear() {
        let yearOfRelease = null
        if (media === 'tv') {
            yearOfRelease = content.first_air_date?.split("-")[0];
        } else {
            yearOfRelease = content.release_date?.split("-")[0]
        }
        return yearOfRelease
    }
 


    return (
        <>
            <div className="container">
            <img className="mediapage__image" src={imagePath + content.poster_path}></img>
            <p>{content.tagline}</p>
            <p>{media === "tv" ? content.name : content.title} ({getYear()})</p>
            <p>{content.poster_path}</p>
            <ul>
            {content.genres &&
            content.genres.map(( item, i ) => {
              return <li key={i}>{item.name} </li>
            })} </ul>
            <p>Overview <br/>{content.overview}</p>
            <CharacterDisplay mediaID={id}/>

            </div>
        </>
    )
}


export default MediaPage
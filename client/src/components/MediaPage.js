import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import fetchJSON from './fetchJSON';

const MediaPage = ({media}) => {

    const [content, setContent] = useState("");
    const { id } = useParams();

    
    useEffect(() => {
        const mediaAPIString =`https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        const getMedia = async () => {
            const mediaData = fetchJSON(mediaAPIString);
            setContent(mediaData);
        }
        getMedia();
    }, [])

    return (
        <div>{id}</div>
    )
}

export default MediaPage
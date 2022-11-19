import { useEffect, useState } from "react"
import fetchJSON from "../../functions/fetchJSON";
const CharacterDisplay = ({mediaID, mediaType}) => {
    
    const [characters, setCharacters] = useState("");
    //initial data
    useEffect(() => {
        
        const charactersAPIString = mediaType === 'tv' ?  `https://api.themoviedb.org/3/tv/${mediaID}/aggregate_credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}` : `https://api.themoviedb.org/3/movie/${mediaID}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`

        const getCharacters = async () => {
            const data = await fetchJSON(charactersAPIString);
            setCharacters(data);
        }
        getCharacters();
    }, [])
    //comparator for Array.sort
    function sortByEpisodeCount(a,b) {
        if (a.episode_count > b.episode_count) {
            return -1
        } else {
            return 1
        }
    }

    return (
        <div className="">
            {/* display actors and characters from tv show */}
            {mediaType === 'tv' && characters.cast &&
            characters.cast.map( (item, i) => { 
               return (<p key={i}><b>real name </b> = {item.name}  <b> character name </b> = 
               {/* sort characters based on how many episodes that character appeared in if the actor played more than one character */}
               {/* remove credit_id for formatting */}
               {item.roles.length > 1 &&
               item.roles.sort(sortByEpisodeCount) &&
               item.roles.map((character, i) => {  
                return (i + 1 === item.roles.length ) ? (<>
                 {' '} {character.character} {' '} ({character.episode_count} Eps)
                    </>): (<>
                 {' '} {character.character} ({character.episode_count} Eps) / 
                    </>)
               })}

               {item.roles.length === 1 &&
               item.roles.map((character) => {  
                return  <> {character.character} ({character.episode_count} Eps)</>
               })}

               </p>)
            })}
            {/* display actors and characters from movie */}
            {mediaType === 'movie' && characters.cast &&
            characters.cast.map( (item, i) => { 
               return (<p key={i}><b>real name </b> = {item.name}  <b> character name </b> = {item.character}
               </p>)
            })}



        </div>
    )
}

export default CharacterDisplay
/*<> <b> character id </b> = {character.credit_id} <b>character name </b> = {character.character} </>) */
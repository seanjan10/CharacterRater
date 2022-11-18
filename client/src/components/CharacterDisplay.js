import { useEffect, useState } from "react"
import fetchJSON from "./fetchJSON";
const CharacterDisplay = ({mediaID}) => {
    
    const [characters, setCharacters] = useState("");

    useEffect(() => {

        const charactersAPIString = `https://api.themoviedb.org/3/tv/${mediaID}/aggregate_credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`

        const getCharacters = async () => {
            const data = await fetchJSON(charactersAPIString);
            setCharacters(data);
        }
        getCharacters();
    }, [])
    
    return (
        <div className="">
            {characters.cast &&
            characters.cast.map( (item, i) => { 
               return (<p key={i}><b>real name </b> = {item.name} <b>TMBD id </b> = {item.id}      <b>episodes actor appeared in </b>= {item.total_episode_count} 
               {item.roles &&
               item.roles.map((character) => {  
                return (<>
                    <b> character id </b> = {character.credit_id} <b>character name </b> = {character.character}
                    </>)
               })}
               </p>)
            })}
        </div>
    )
}

export default CharacterDisplay
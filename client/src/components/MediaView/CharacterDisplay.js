import { useEffect, useState } from "react";
import fetchJSON from "../../functions/fetchJSON";
import placeholder from "../../static/placeholder.jpg";
import LoadingIcon from "../LoadingIcon";
//import fetchCharacterImage from "../../functions/fetchCharacterImage";
//import * as cheerio from 'cheerio'

const CharacterDisplay = ({ mediaID, mediaType, mediaName }) => {
  const [characters, setCharacters] = useState("");
  const [loading, setLoading] = useState(true);
  //const [series, setSeries] = useState("");
  //initial data

  const imagePath = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    //const charactersAPIString = mediaType === 'tv' ?  `https://api.themoviedb.org/3/tv/${mediaID}/aggregate_credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}` : `https://api.themoviedb.org/3/movie/${mediaID}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`

    //const mediaAPIString = `https://api.themoviedb.org/3/${mediaType}/${mediaID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`

    const charactersAPIString = `http://localhost:3500/mediaPage/characters/?mediaID=${mediaID}&media=${mediaType}`;

    const getCharacters = async () => {
      setLoading(true);
      const data = await fetchJSON(charactersAPIString);
      setCharacters(data);
      setLoading(false);
    };
    getCharacters();
  }, []);
  //comparator for Array.sort
  function sortByEpisodeCount(a, b) {
    if (a.episode_count > b.episode_count) {
      return -1;
    } else {
      return 1;
    }
  }

  /*async function getCharacterImage(val) {
        const res = await fetch(val);
        const data = await res.json();
        console.log(data.link);
        return data.link
    } */

  return (
    <div className="">
      {/* display actors and characters from tv show */}

      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          {mediaType === "tv" &&
            characters.cast &&
            characters.cast.map((item, i) => {
              return (
                <p key={i}>
                  {" "}
                  <img
                    className="media__character-img"
                    src={
                      item.profile_path
                        ? imagePath + item.profile_path
                        : placeholder
                    }
                    alt={item.name}
                  />{" "}
                  <b>real name </b> = {item.name} <b> character name </b> =
                  {/* sort characters based on how many episodes that character appeared in if the actor played more than one character */}
                  {/* remove credit_id for formatting */}
                  {item.roles.length > 1 &&
                    item.roles.sort(sortByEpisodeCount) &&
                    item.roles.map((character, i) => {
                      return i + 1 === item.roles.length ? (
                        <>
                          {" "}
                          {character.character} ({character.episode_count} Eps)
                        </>
                      ) : (
                        <>
                          {" "}
                          {character.character} ({character.episode_count} Eps)
                          /
                        </>
                      );
                    })}
                  {item.roles.length === 1 &&
                    item.roles.map((character) => {
                      return (
                        <>
                          {" "}
                          {character.character} ({character.episode_count} Eps)
                        </>
                      );
                    })}
                  <div className="rate">
                    <input
                      type="radio"
                      id={"star5_" + i}
                      name={"rate_" + i}
                      value="5"
                    />
                    <label for={"star5_" + i}>5 stars</label>
                    <input
                      type="radio"
                      id={"star4_" + i}
                      name={"rate_" + i}
                      value="4"
                    />
                    <label for={"star4_" + i}>4 stars</label>
                    <input
                      type="radio"
                      id={"star3_" + i}
                      name={"rate_" + i}
                      value="3"
                    />
                    <label for={"star3_" + i}>3 stars</label>
                    <input
                      type="radio"
                      id={"star2_" + i}
                      name={"rate_" + i}
                      value="2"
                    />
                    <label for={"star2_" + i}>2 stars</label>
                    <input
                      type="radio"
                      id={"star1_" + i}
                      name={"rate_" + i}
                      value="1"
                    />
                    <label for={"star1_" + i}>1 star</label>
                  </div>
                </p>
              );
            })}
        </>
      )}

      {/* display actors and characters from movie */}
      {mediaType === "movie" &&
        characters.cast &&
        characters.cast.map((item, i) => {
          return (
            <p key={i}>
              {" "}
              <img
                className="media__character-img"
                src={
                  item.profile_path
                    ? imagePath + item.profile_path
                    : placeholder
                }
                alt={item.name}
              />
              <b> real name </b> = {item.name} <b> character name </b> ={" "}
              {item.character}
              <div className="rate">
                <input
                  type="radio"
                  id={"star5_" + i}
                  name={"rate_" + i}
                  value="5"
                />
                <label for={"star5_" + i}>5 stars</label>
                <input
                  type="radio"
                  id={"star4_" + i}
                  name={"rate_" + i}
                  value="4"
                />
                <label for={"star4_" + i}>4 stars</label>
                <input
                  type="radio"
                  id={"star3_" + i}
                  name={"rate_" + i}
                  value="3"
                />
                <label for={"star3_" + i}>3 stars</label>
                <input
                  type="radio"
                  id={"star2_" + i}
                  name={"rate_" + i}
                  value="2"
                />
                <label for={"star2_" + i}>2 stars</label>
                <input
                  type="radio"
                  id={"star1_" + i}
                  name={"rate_" + i}
                  value="1"
                />
                <label for={"star1_" + i}>1 star</label>
              </div>
            </p>
          );
        })}
    </div>
  );
};

export default CharacterDisplay;
/*<> <b> character id </b> = {character.credit_id} <b>character name </b> = {character.character} </>) */

//src={item.profile_path ? imagePath + item.profile_path : placeholder}

//<img className="media__character-img" src={apiReq + "?characterMedia=" + character.character + " " + mediaName} alt={item.name}/>

//{apiReq + "?characterMedia=" + character.character + " " + mediaName}

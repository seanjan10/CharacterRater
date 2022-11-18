import {useState, useEffect } from "react"
//receives two props, type of video (tv, movie) and number to fetch??, time frame? (only day or week)
const VideoSelection = (props) => {

    const [trending, setTrending] = useState([]);

    //const trendingAPIString = `https://api.themoviedb.org/3/trending/${props.media}/${props.time}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`

    const imagePath = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        const trendingAPIString = `https://api.themoviedb.org/3/trending/${props.media}/${props.time}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`

        const getTrending = async () => {
            const trendingFromServer = await fetchTrending(trendingAPIString);
            setTrending(trendingFromServer);
        };

        getTrending();
    }, [])


    // async function getText(file) {
    //     let myObject = await fetch(file);
    //     let myText = await myObject.json();
    //     console.log(myText.total_results)
    // }

    const fetchTrending = async (str) => {
        const res = await fetch(str);
        const data = await res.json();
        //console.log(data.total_pages);
        return data;
    }

    //fetchTrending(trendingAPIString);

    


  return (
    
    <div>
        <ul>
            {trending.total_pages} <br />
            {trending.total_results} <br />
           {/* {JSON.stringify(trending.results)} */}
           {trending.results && trending.results.map( (item,i) =>  <div key={i}>{item.title}</div>)} 
            
        </ul>
    </div>        
    
  )
}

export default VideoSelection
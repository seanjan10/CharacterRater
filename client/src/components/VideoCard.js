

const VideoCard = ({mediaID, title, poster_path, type}) => {

  const imagePath = "https://image.tmdb.org/t/p/original"
  
  

  return (
    <li className="trending__item">
        <img className="trending__img" src={imagePath + poster_path}/>
       <h4>{title}</h4>
       
    </li>
  )
}

export default VideoCard
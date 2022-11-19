import { Link } from 'react-router-dom'


const VideoCard = ({mediaID, title, poster_path, type, media}) => {

  const imagePath = "https://image.tmdb.org/t/p/original"
  const mediaLink = `/${media}/${mediaID}`;

  
  return (
    <li className="trending__item">
        <Link to={mediaLink}>
        <img className="trending__img" alt={title}src={imagePath + poster_path}/>
        </Link>
       <p>{title}</p>
       
    </li>
  )
}

export default VideoCard
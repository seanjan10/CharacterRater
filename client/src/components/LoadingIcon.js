import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoadingIcon = () => {
  return (
    <div className="loading__container">
        <FontAwesomeIcon className='loading__icon' icon={faSpinner}/>
    </div>
  )
}

export default LoadingIcon
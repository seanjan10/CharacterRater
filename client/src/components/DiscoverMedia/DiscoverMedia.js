import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import fetchJSON from "../../functions/fetchJSON"
import placeholder from "../../static/placeholder.jpg"
import ReactPaginate from 'react-paginate'

const DiscoverMedia = ({media}) => {

    const [sortMethod, setSortMethod] = useState('popularity.desc')
    const [results, setResults] = useState({})

    //const itemsPerPage = 20;

    
    const imagePath = "https://image.tmdb.org/t/p/original"
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = searchParams.get("page") ? searchParams.get("page") : 1;
    //console.log(currentPage)
    const location = useLocation();
    let navigate = useNavigate();

    const apiString = `https://api.themoviedb.org/3/discover/${media}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=${sortMethod}&include_adult=false&include_video=false&page=${currentPage}&with_watch_monetization_types=flatrate`


    useEffect(() => {
        const getData = async () => {
            const data = await fetchJSON(apiString);
            setResults(data);
            // console.log(apiString);
            //setPageCount(data.total_pages)
        }
        getData();
    }, [])

    //reload data if user clicks between tv / movies
    useEffect(() => {
        const getData = async () => {
            const data = await fetchJSON(apiString);
            setResults(data);
            // console.log(apiString);
            currentPage = searchParams.get("page") ? searchParams.get("page") : 1;
        }
        getData();
    }, [media])
    
    //todo create custom hook/refactor code to remove the unnecessary code copy/paste
    const handlePageClick = (event) => {
        
        const currentPageString = `https://api.themoviedb.org/3/discover/${media}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=${sortMethod}&include_adult=false&include_video=false&page=${event.selected + 1}&with_watch_monetization_types=flatrate`

        const getData = async () => {
            const data = await fetchJSON(currentPageString);
            setResults(data);
        }
        getData();
        navigate(`?page=${event.selected + 1}`)
    };

    const getSortType = () => {
        const getSortMethod = sortMethod.split('.')
        const type = getSortMethod[0]
        const direction = getSortMethod[1]

        if (type === 'popularity') {
            if (direction === 'asc') {
                return "Least Popular"
            } else {
                return "Most Popular"
            }
        } else if (type === 'release_date') {
            if (direction === 'asc') {
                return "Newest"
            } else {
                return "Oldest"
            }
        } else if (type === 'revenue') {
            if (direction === 'asc') {
                return "Lowest Grossing"
            } else {
                return "Highest Grossing"
            }
        } else if (type === 'original_title') {
            if (direction === 'asc') {
                return "Reverse Alphabetical Order"
            } else {
                return "Alphabetical Order"
            }
        } else if (type === 'vote_average') {
            if (direction === 'asc') {
                return "Lowest Rated"
            } else {
                return "Highest Rated"
            }
        } else if (type === 'vote_count') {
            if (direction === 'asc') {
                return "Least Voted"
            } else {
                return "Most Voted"
            }
        } else {
            return ""
        }
    }



  return (
    <div className='container'>
        <h1>Showing {getSortType()} {media === "movie" ? "Movies" : "TV Shows"}</h1>
        <ul className="discover__list">
        {results.results &&
        results.results.map((item, i) => {
            return <li key={i} className="discover__item">
                        <Link to={"/" + media + "/" + item.id}>
                        <img className="img-fluid discover__item-image" src={item.poster_path ? imagePath + item.poster_path : placeholder} alt={item.title} />{media === "movie" ? item.title : item.name} ({media === "movie" ? item.release_date?.split('-')[0] : item.first_air_date?.split('-')[0] }) </Link>
                </li>
        })}
        </ul>
        <div className="d-flex justify-content-center">
            <ReactPaginate 
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={results.total_pages < 500 ? results.total_pages : 500}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="---"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage -1}
                
            />
        </div>
    </div>
  )
}

export default DiscoverMedia

/*
 {results.results &&
        results.results.map((item, i) => {
            return <li key={i} className="discover__item">
                        <Link to={"/" + media + "/" + item.id}>
                        <img className="img-fluid discover__item-image" src={item.poster_path ? imagePath + item.poster_path : placeholder} alt={item.title} />{media === "movie" ? item.title : item.name} ({media === "movie" ? item.release_date?.split('-')[0] : item.first_air_date?.split('-')[0] }) </Link>
                </li>
        })} */
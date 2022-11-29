import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import fetchJSON from "../../functions/fetchJSON"
import placeholder from "../../static/placeholder.jpg"
import ReactPaginate from 'react-paginate'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Helmet, HelmetProvider } from 'react-helmet-async'

const DiscoverMedia = ({media}) => {

    const [sortMethod, setSortMethod] = useState('popularity.desc')
    const [results, setResults] = useState({})

    //const itemsPerPage = 20;

    
    const imagePath = "https://image.tmdb.org/t/p/original"
    const [searchParams, setSearchParams] = useSearchParams();
    let currentPage = searchParams.get("page") ? searchParams.get("page") : 1;
    //console.log(currentPage)
    const location = useLocation();
    let navigate = useNavigate();

    //const apiString = `https://api.themoviedb.org/3/discover/${media}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=${sortMethod}&include_adult=false&vote_count.gte=500&include_video=false&page=${currentPage}&with_watch_monetization_types=flatrate`
    const apiString = `http://localhost:3500/discover/?media=${media}&sortMethod=${sortMethod}&currentPage=${currentPage}`


    useEffect(() => {
        const getData = async () => {
            const data = await fetchJSON(apiString);
            setResults(data);
            // console.log(apiString);
            //setPageCount(data.total_pages)
        }
        getData();
    }, [])


    useEffect(() => {
        const getData = async () => {
            const data = await fetchJSON(apiString);
            setResults(data);
            // console.log(apiString);
            //setPageCount(data.total_pages)
        }
        getData();
    }, [sortMethod])

    //reload data if user clicks between tv / movies
    useEffect(() => {
        const getData = async () => {
            const data = await fetchJSON(apiString);
            setResults(data);
            // console.log(apiString);
            currentPage = searchParams.get("page") ? searchParams.get("page") : 1;
        }
        console.log("media changed")
        getData();
        setSortMethod('popularity.desc')
    }, [media])
    
    //todo create custom hook/refactor code to remove the unnecessary code copy/paste
    const handlePageClick = (event) => {
        
        //const currentPageString = `https://api.themoviedb.org/3/discover/${media}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=${sortMethod}&include_adult=false&vote_count.gte=500&include_video=false&page=${event.selected + 1}&with_watch_monetization_types=flatrate`
        const currentPageString = `http://localhost:3500/discover/?media=${media}&sortMethod=${sortMethod}&currentPage=${currentPage}`

        const getData = async () => {
            const data = await fetchJSON(currentPageString);
            setResults(data);
        }
        getData();
        navigate(`?page=${event.selected + 1}`)
    };

    const getSortTypeHeader = () => {
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
                return "Oldest"
            } else {
                return "Newest"
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

    function onChangeDirectionButton() {
        const sortType = sortMethod.split('.')[0]
        const sortDirection = sortMethod.split('.')[1]
        //let dire = document.querySelector('.discover__sort-btn');
        if (sortDirection === 'desc') {
            setSortMethod(sortType + ".asc")
        } else {
            setSortMethod(sortType + ".desc")
        }
    }

    //todo, refactor so don't have to copy paste if structure again
    function currentSelection() {
        const sortType = sortMethod.split('.')[0]
        const sortDirection = sortMethod.split('.')[1]

        if (sortType === 'popularity') {
            if (sortDirection === 'asc') {
                return <>Popular {'  '} <FontAwesomeIcon icon={faUpLong}/> </>
            } else {
                return <>Popular {'  '} <FontAwesomeIcon icon={faDownLong}/> </>
            }
        } else if (sortType === 'release_date') {
            if (sortDirection === 'asc') {
                return <>Release Date{'  '} <FontAwesomeIcon icon={faUpLong}/> </>
            } else {
                return <>Release Date {'  '} <FontAwesomeIcon icon={faDownLong}/> </>
            }
        } else if (sortType === 'revenue') {
            if (sortDirection === 'asc') {
                return <>Revenue {'  '} <FontAwesomeIcon icon={faUpLong}/> </>
            } else {
                return <>Revenue {'  '} <FontAwesomeIcon icon={faDownLong}/> </>
            }
        } else if (sortType === 'original_title') {
            if (sortDirection === 'asc') {
                return <>Title {'  '} <FontAwesomeIcon icon={faUpLong}/> </>
            } else {
                return <>Title {'  '} <FontAwesomeIcon icon={faDownLong}/> </>
            }
        } else if (sortType === 'vote_average') {
            if (sortDirection === 'asc') {
                return <>Average Rating {'  '} <FontAwesomeIcon icon={faUpLong}/> </>
            } else {
                return <>Average Rating {'  '} <FontAwesomeIcon icon={faDownLong}/> </>
            }
        } else if (sortType === 'vote_count') {
            if (sortDirection === 'asc') {
                return <>Votes {'  '} <FontAwesomeIcon icon={faUpLong}/> </>
            } else {
                return <>Votes {'  '} <FontAwesomeIcon icon={faDownLong}/> </>
            }
        } else {
            return ""
        }
        
    }

    function notSelected() {
        const nsArray = ['Popular', 'Release Date', 'Revenue', 'Title', 'Average Rating', 'Votes']
        const sortChoices = ['popularity', 'release_date', 'revenue', 'original_title', 'vote_average', 'vote_count']
        const sortType = sortMethod.split('.')[0]
        let selIndex = null;
        if (sortType === sortChoices[0]) {
            selIndex = 0;
        } else if (sortType === sortChoices[1]) {
            selIndex = 1;
        } else if (sortType === sortChoices[2]) {
            selIndex = 2;
        } else if (sortType === sortChoices[3]) {
            selIndex = 3;
        } else if (sortType === sortChoices[4]) {
            selIndex = 4;
        } else if (sortType === sortChoices[5]) {
            selIndex = 5;
        }

        const content = nsArray.map((item,i) => {
            //console.log(item);
            if (i === selIndex) {
                return
            } else if (i === 2 && media === 'tv') {
                return
            } else {
                return <Dropdown.Item key={i} onClick={(() => changeSort(sortChoices[i]))}>{item}</Dropdown.Item>
            }
            
            
        });


        return <>{content}</>
    }


    function changeSort(index) {
        setSortMethod(index + ".desc")
    }

    function titleLength(title) {
        if (title === undefined) {
            //console.log('wait')
            return
        }
        if (title.length <= 17) {
            return "card-title "
        } else if (title.length > 17 && title.length <=38) {
            return "card-title long-title"
        } else {
            return "card-title really-long-title"
        }
    }

  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title>Discover {media ==='movie' ? "Movies": "TV Shows"}</title>
            </Helmet>
        </HelmetProvider>
        <div className='container '>
            <div className="d-flex justify-content-center m-3">
                <h1>
                Showing {getSortTypeHeader()} {media === "movie" ? "Movies" : "TV Shows"}
                </h1>
                <Dropdown as={ButtonGroup}>
                    <Button variant="primary" className="discover__sort-btn" onClick={() => onChangeDirectionButton()}>{currentSelection()}  </Button>

                    <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

                    <Dropdown.Menu>
                        {notSelected()}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <ul className="discover__list">
            {results.results &&
            results.results.map((item, i) => {
                return <li key={i} className="discover__item">
                            <Link to={"/" + media + "/" + item.id} className="discover__anchor">
                            <div className="card m-2">
                                <div className="row g-0">
                                    <div className="col-4">
                                        <img className="img-fluid discover__item-image card-img-top" src={item.poster_path ? imagePath + item.poster_path : placeholder} alt={item.title} />
                                        </div>
                                        <div className="col-md-8">
                                        <div className="card-body p-2">
                                            <h5 className={media === "movie" ? titleLength(item?.title) : titleLength(item?.name)}>{media === "movie" ? item.title : item.name}</h5>
                                            <p className="card-text mb-4"> {item.overview ? item.overview : "Does not have an overview"}</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Link>
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
    </>
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

        /* <Dropdown.Menu>
                    <Dropdown.Item href="?sorting=popularity_desc">Release Date</Dropdown.Item>
                    <Dropdown.Item href="?sorting=revenue_desc">Revenue</Dropdown.Item>
                    <Dropdown.Item href="?sorting=title_desc">Title</Dropdown.Item>
                    <Dropdown.Item href="?sorting=vote_average_desc">Average Rating</Dropdown.Item>
                    <Dropdown.Item href="?sorting=vote_count_desc">Votes</Dropdown.Item>
                </Dropdown.Menu> */


/* <img className="img-fluid discover__item-image" src={item.poster_path ? imagePath + item.poster_path : placeholder} alt={item.title} />{media === "movie" ? item.title : item.name} ({media === "movie" ? item.release_date?.split('-')[0] : item.first_air_date?.split('-')[0] }) */

/*  <div className="card flex-row flex-wrap">
                                <img className="img-fluid discover__item-image card-img-top" src={item.poster_path ? imagePath + item.poster_path : placeholder} alt={item.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{media === "movie" ? item.title : item.name}</h5>
                                    <p class="card__description"> {item.overview}</p>
                                </div>
        
                            </div> */
/*{media === "movie" ? item.title.length <=17 ? "card-title " : item.title.length <=38 ? "card-title long-title": "card-title really-long-title" : item.name.length <=17 ? "card-title " : item.name.length <=38 ? "card-title long-title": "card-title really-long-title"} */
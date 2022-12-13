import _ from "lodash";
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import apolloClient from "../utils/apolloClient";
import { API_URL } from "../utils/config";
import { Link } from "react-router-dom";
import Pagination from "../component/Pagination";
import { AiFillStar } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { GET_ALL_BOOKS } from "../graphql/queries/book";
import Navbar from "../component/Navbar";
import Loading from "../component/Loading";
import NoData from "../component/NoData";

const BrowseBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    page: 1,
    sizePerPage: 20,
    keywords: "",
  });

  const [pageCount, setPageCount] = useState(0);
  const [filter, setFilter] = useState([]);
  const [filterItems, setFilterItems] = useState({
    genre: "",
    rating: "",
    year: "",
    orderBy: "",
  });
  const filterData = {
    genre: ["Horror", "Romance", "Comedy", "Manga"],
    rating: ["1+", "2+", "3+", "4+", "5+", "6+", "7+", "8+", "9+"],
    year: [
      "2022",
      "2021",
      "2020",
      "2019",
      "2015 - 2018",
      "2010 - 2014",
      "2000 - 2009",
      "1997 - 1999",
    ],
    orderBy: ["rating", "year"],
  };

  const handleFilterChange = (e) => {
    setFilterItems({ ...filterItems, [e.target.name]: e.target.value });
  };
  const handleFilters = (e) => {
    //setFilter(filterItems);
    if (filterItems.genre == "All") {
      setFilterItems({ ...filterItems, genre: "" });
    } else if (filterItems.rating == "All") {
      setFilterItems({ ...filterItems, rating: "" });
    } else if (filterItems.year == "All") {
      setFilterItems({ ...filterItems, year: "" });
    } else if (filterItems.orderBy == "All") {
      setFilterItems({ ...filterItems, orderBy: "" });
    } else {
      setFilter(filterItems);
    }
    e.preventDefault();
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFilterItems({
      genre: "",
      rating: "",
      year: "",
      orderBy: "",
    });
    setFilter({
      genre: "",
      rating: "",
      year: "",
      orderBy: "",
    });
  };
  const handlePageChange = (page) => {
    setQuery({ ...query, page: page });
  };

  useEffect(() => {
    getAllBooks();
  }, [query, filter]);

  const getAllBooks = async () => {
    setLoading(true);
    let filters = {};

    filters = {
      and: {
        or: [
          { title: { containsi: query.keywords } },
          { authors: { name: { containsi: query.keywords } } },
        ],
      },
    };

    // if (filter?.genre?.length > 0) {
    //   filters.and = _.concat(filters.and, {
    //     genre: { eq: filter.genre },
    //   });
    // }
    // if (filter?.rating?.length > 0) {
    //   filters.and = _.concat(filters.and, {
    //     rating: { gte: parseFloat(filter?.rating?.charAt(0)) },
    //   });
    // }
    // if (filter?.year?.length > 0) {
    //   filters.and = _.concat(filters.and, {
    //     year: { in: parseInt(filter?.year.split(" - ")) },
    //   });
    // }
    // console.log("filter", filters);
    try {
      const {
        data: { books },
      } = await apolloClient.query({
        fetchPolicy: "network-only",
        query: GET_ALL_BOOKS,
        variables: {
          page: query.page,
          pageSize: query.sizePerPage,
          filters: filters,
          //data: filter?.orderBy?.length > 0 ? filter?.orderBy : null,
        },
      });
      console.log("books", books);
      const booksInfo = books?.data?.map((book) => {
        return {
          id: book?.id,
          status: book?.attributes?.status,
          rating: book?.attributes?.rating,
          title: book?.attributes?.title,
          genre: book?.attributes?.genre,
          saved: book?.attributes?.saved,
          summary: book?.attributes?.summary,
          publishedAt: book?.attributes?.publishedAt,
          author: book?.attributes?.authors?.data?.map(
            (author) => author?.name
          ),
          poster: book?.attributes?.bookCover?.data?.attributes?.url,
        };
      });

      setPageCount(books?.meta?.pagination?.pageCount);
      setAllBooks(booksInfo);
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };
  const handleSearch = (e) => {
    setQuery({ ...query, keywords: e.target.value });
  };
  return (
    <div>
      <Navbar />
      <div css={styles.mainContainer}>
        <form>
          <div css={styles.searchContainer}>
            <div className="form-group mb-4">
              <label htmlFor="search" css={styles.label}>
                Search Term :
              </label>
              <input
                type="text"
                className="form-control py-4"
                placeholder="Search by Book Title or Author"
                name="search"
                css={styles.inputStyle}
                onChange={handleSearch}
              />
            </div>
            <div className="d-flex justify-content-between">
              <div
                className="input-group mb-3 d-flex flex-column"
                css={styles.filteBox}
              >
                <label>Genre :</label>
                <select
                  className="custom-select"
                  name="genre"
                  value={filterItems.genre}
                  onChange={handleFilterChange}
                >
                  <option>All</option>
                  {filterData.genre.map((data) => (
                    <option value={data}>{data}</option>
                  ))}
                </select>
              </div>
              <div
                className="input-group mb-3 d-flex flex-column"
                css={styles.filteBox}
              >
                <label>Rating :</label>
                <select
                  className="custom-select"
                  name="rating"
                  value={filterItems?.rating}
                  onChange={handleFilterChange}
                >
                  <option>All</option>
                  {filterData.rating.map((data) => (
                    <option value={data}>{data}</option>
                  ))}
                </select>
              </div>
              <div
                className="input-group mb-3 d-flex flex-column"
                css={styles.filteBox}
              >
                <label>Year :</label>
                <select
                  className="custom-select"
                  name="year"
                  value={filterItems?.year}
                  onChange={handleFilterChange}
                >
                  <option>All</option>
                  {filterData.year.map((data) => (
                    <option value={data}>{data}</option>
                  ))}
                </select>
              </div>
              <div
                className="input-group mb-3 d-flex flex-column"
                css={styles.filteBox}
              >
                <label>OrderBy :</label>
                <select
                  className="custom-select"
                  name="orderBy"
                  value={filterItems?.orderBy}
                  onChange={handleFilterChange}
                >
                  <option>All</option>
                  {filterData.orderBy.map((data) => (
                    <option value={data}>{data}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4 gap-4">
              <button css={styles.searchBtn} onClick={handleReset}>
                Reset
              </button>
              <button css={styles.searchBtn} onClick={handleFilters}>
                Filter
              </button>
            </div>
          </div>
        </form>
        <div css={styles.pagination}>
          {allBooks.length > 0 && (
            <Pagination
              {...query}
              pageCount={pageCount}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
        <div>
          <h3 className="text-center my-5">All Books</h3>
          {loading && <Loading />}
          {allBooks?.length === 0 && <NoData />}
          <div css={styles.allBooksContainer}>
            {allBooks.map((book) => (
              <div key={book.id}>
                <div css={styles.imageCard}>
                  <img src={`${API_URL}${book?.poster}`} alt="books" />
                  <div>
                    <span css={styles.ratingIcon}>
                      <AiFillStar size={32} color="#fff" />
                    </span>
                    <p css={styles.viewRating}>{book?.rating} / 10</p>
                    <div>
                      <Link
                        to={`/${book.genre}/details/bookId=${book.id}/mode=view-details`}
                      >
                        <button css={styles.viewDetailBtn}>View Detail</button>
                      </Link>
                      <button css={styles.saveBtn}>Save</button>
                    </div>
                  </div>
                </div>

                <p css={styles.bookName}>{book?.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div css={styles.pagination}>
          {allBooks.length > 0 && (
            <Pagination
              {...query}
              pageCount={pageCount}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseBooks;
const styles = {
  mainContainer: css`
    width: 100%;
    height: auto;
    padding: 2em;
    padding-top: 3em;
    color: #fff;
    background-color: #2b3341;
  `,
  pagination: css`
    margin-top: 3em;
    margin-bottom: 0.5em;
  `,
  searchBtn: css`
    border: none;
    padding: 1em 3em;
    border-radius: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.28);
  `,

  searchContainer: css`
    .form-control {
      color: #fff;
      font-weight: 500;
      padding: 2em;
    }
    .custom-select {
      width: 100%;
      height: auto;
      padding: 1em;
      background: rgba(0, 0, 0, 0.28)
        url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 4 5'%3E%3Cpath fill='%23ffffff' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")
        no-repeat right 0.75rem center;
      border: none;
      color: #fff;
      &:focus,
      &:hover {
        border: none;
        outline: none;
        background: rgba(0, 0, 0, 0.28)
          url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 4 5'%3E%3Cpath fill='%23ffffff' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")
          no-repeat right 0.75rem center;
        box-shadow: none;
      }
    }
  `,
  allBooksContainer: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 2em 4em;
  `,
  searchInput: css``,
  label: css`
    font-weight: 500;
  `,
  inputStyle: css`
    background: rgba(0, 0, 0, 0.28);
    border: none;

    &:focus,
    &:hover {
      border: none;
      outline: none;
      background: rgba(0, 0, 0, 0.28);
      box-shadow: none;
    }
  `,
  filteBox: css`
    width: 20%;
  `,
  imageCard: css`
    position: relative;
    width: 200px;
    height: 300px;
    border: 2px solid #fff;
    border-radius: 8px;
    margin-bottom: 1em;
    cursor: pointer;
    filter: drop-shadow(10px 8px 8px rgba(0, 0, 0, 0.4));
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0);
    }
    &:hover {
      &:before {
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
    &:hover button {
      opacity: 1;
    }

    &:hover {
      border: 2px solid #486af5;
      p,
      span {
        opacity: 1;
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  `,
  viewDetailBtn: css`
    border: 2px solid #fff;
    width: 65%;
    padding: 0.5em 1em;
    color: #fff;
    font-weight: 500;
    font-size: 16px;
    border-radius: 8px;
    background: rgba(64, 66, 88, 0.77);
    position: absolute;
    top: 60%;
    left: 50%;

    transform: translate(-50%, -50%);
    opacity: 0;
  `,
  saveBtn: css`
    border: 2px solid #fff;
    width: 65%;
    padding: 0.5em 1em;
    color: #fff;
    font-weight: 500;
    font-size: 16px;
    border-radius: 8px;
    background: rgba(64, 66, 88, 0.77);
    position: absolute;
    top: 80%;
    left: 50%;

    transform: translate(-50%, -50%);
    opacity: 0;
  `,
  viewRating: css`
    position: absolute;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 500;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  `,
  ratingIcon: css`
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  `,
  savedIcon: css`
    position: absolute;
    top: 10px;
    right: 0;
    transform: translate(-50%, -50%);
    opacity: 0;
  `,
  bookName: css`
    white-space: nowrap;
    max-width: 200px;
    font-size: 1em;
    color: #fff;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};

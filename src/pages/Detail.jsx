import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { css } from "@emotion/react";
import apolloClient from "../utils/apolloClient";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { API_URL } from "../utils/config";
import { AiFillStar, AiFillEye } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GET_BOOK_BY_ID, GET_SIMILAR_BOOK } from "../graphql/queries/book";
import { CREATE_COMMENT } from "../graphql/mutations/comment";
import SuccessModal from "../component/SuccessModal";
import { useMutation } from "@apollo/client";
const Detail = () => {
  const { id, genre } = useParams();
  const [similarBooks, setSimilarBooks] = useState([]);
  const [info, setInfo] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [username, setUsername] = useState(null);
  const [comment, setComment] = useState(null);
  const [email, setEmail] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const getSingleBookById = async () => {
    const {
      data: { book },
    } = await apolloClient.query({
      fetchPolicy: "network-only",
      query: GET_BOOK_BY_ID,
      variables: {
        id: id,
      },
    });
    const bookInfo = {
      id: book?.data?.id,
      title: book?.data?.attributes?.title,
      year: book?.data?.attributes?.year,
      genre: book?.data?.attributes?.genre,
      rating: book?.data?.attributes?.rating,
      summary: book?.data?.attributes?.summary,
      status: book?.data?.attributes?.status,
      poster: book?.data?.attributes?.bookCover?.data?.attributes?.url,
      authors: book?.data?.attributes?.authors?.data?.map((author) => {
        return {
          id: author?.id,
          authorName: author?.attributes?.name,
        };
      }),
    };

    setInfo(bookInfo);
  };

  const getSimilarBooks = async () => {
    const {
      data: { books },
    } = await apolloClient.query({
      fetchPolicy: "network-only",
      query: GET_SIMILAR_BOOK,
      variables: {
        pageSize: 4,
        id: id,
        genre: genre,
      },
    });
    const bookInfo = books?.data?.map((book) => {
      return {
        id: book?.id,
        genre: book?.attributes?.genre,
        poster: book?.attributes?.bookCover?.data?.attributes?.url,
      };
    });
    setSimilarBooks(bookInfo);
  };
  const [createComment, { error: err }] = useMutation(CREATE_COMMENT, {
    client: apolloClient,
    onCompleted: () => {
      setSuccessModalOpen(true);
      setUsername("");
      setEmail("");
      setComment("");
    },
    onError: (err) => alert(err),
  });
  const submitComment = async () => {
    await createComment({
      variables: {
        data: {
          username,
          userEmail: email,
          description: comment,
          books: parseInt(id),
        },
      },
    });
  };
  useEffect(() => {
    getSingleBookById();
    getSimilarBooks();
  }, [id, genre]);

  return (
    <div>
      <Navbar />

      <div css={styles.mainContainer}>
        <div css={styles.detailContainer}>
          <div css={styles.detailInfo}>
            <div className="d-flex flex-column">
              <div css={styles.imageCard}>
                <img src={`${API_URL}${info?.poster}`} />
              </div>
              <div className="mt-4">
                <button
                  css={styles.actionBtn}
                  className="mb-3 d-flex align-items-center gap-4"
                >
                  <FaDownload /> Download Now
                </button>
                <button
                  css={styles.actionBtn}
                  className="mb-3 d-flex align-items-center gap-4"
                >
                  <AiFillEye size={21} />
                  Read Now
                </button>
              </div>
            </div>

            <div>
              <div>
                <span css={styles.title}>{info?.title} </span>
                by
                {info?.authors?.map((author) => (
                  <span> {author?.authorName}</span>
                ))}
                <p className="d-flex gap-3 mt-3">
                  <span>{info?.year}</span>
                  <span className="d-flex align-items-center gap-1">
                    <AiFillStar />
                    {info?.rating} / 10
                  </span>
                </p>
                <p>Genre - {info?.genre}</p>
              </div>
              <div>
                <h4 css={styles.plotSummary}>Summary</h4>
                {readMore ? (
                  <p className="mb-0">
                    {info?.summary}
                    <span
                      css={styles.readMore}
                      className="ms-2"
                      onClick={() => {
                        setReadMore(false);
                      }}
                    >
                      See Less
                    </span>
                  </p>
                ) : (
                  <p className="mb-0">
                    {info?.summary?.substring(0, 200)} ...{" "}
                    <span
                      css={styles.readMore}
                      onClick={() => {
                        setReadMore(true);
                      }}
                    >
                      Read More
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex flex-column">
            <h4 css={styles.similarTitle}>Similar Books</h4>
            <div css={styles.similarBooks}>
              {similarBooks.map((book) => (
                <Link
                  key={book?.id}
                  to={`/${book.genre}/details/bookId=${book.id}/mode=view-details`}
                >
                  <div css={styles.similarImg}>
                    <img src={`${API_URL}${book?.poster}`} alt={book?.genre} />
                  </div>
                </Link>
              ))}
            </div>
            <div
              className="formInputGroup align-self-end mt-5"
              style={{ width: "270px" }}
            >
              <label className="mb-2">Leave a comment</label>
              <textarea
                name="comment"
                value={comment}
                className="form-input mb-2"
                placeholder="Start Typing ..."
                rows={5}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="formInputGroup">
                <label>Name *</label>
                <input
                  name="username"
                  value={username}
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="formInputGroup">
                <label>Email *</label>
                <input
                  name="userEmail"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="registerBtn"
                  onClick={submitComment}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {successModalOpen && (
        <SuccessModal
          open={successModalOpen}
          onClose={() => {
            setSuccessModalOpen(false);
          }}
          title="Comment Posted"
          bodyValue={<span>Your comment is posted .</span>}
        />
      )}
      <Footer />
    </div>
  );
};

export default Detail;
const styles = {
  mainContainer: css`
    width: 100%;
    height: auto;
    padding: 2em;
    padding-top: 3em;
    color: #fff;
    background-color: #404258;
  `,
  detailContainer: css`
    display: flex;
    justify-content: space-between;
    textarea {
      resize: none;
    }
  `,
  detailInfo: css`
    display: flex;
    gap: 7em;
    width: 99%;
  `,
  imageCard: css`
    width: 300px;
    height: 450px;
    border: 2px solid #fff;
    border-radius: 8px;
    margin-bottom: 1em;
    cursor: pointer;
    filter: drop-shadow(10px 8px 8px rgba(0, 0, 0, 0.4));
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  `,
  title: css`
    font-size: 1.8em;
    font-weight: 500;
  `,
  similarTitle: css`
    font-size: 1.5em;
    font-weight: 400;
    text-align: center;
    margin-left: 4.5em;
    margin-bottom: 1.5em;
  `,

  similarBooks: css`
    display: flex;
    gap: 2em;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: flex-end;
  `,
  similarImg: css`
    width: 120px;
    height: 180px;
    border: 2px solid #fff;
    border-radius: 8px;
    margin-bottom: 1em;
    cursor: pointer;
    filter: drop-shadow(10px 8px 8px rgba(0, 0, 0, 0.4));
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
    &:hover {
      border: 2px solid #486af5;
    }
  `,
  actionBtn: css`
    border: 1px solid #fff;
    outline: none;
    background-color: transparent;
    color: #fff;
    padding: 1em 2em;
    border-radius: 8px;
    width: 100%;
    font-size: 1.1em;
    font-weight: 500;
  `,
  plotSummary: css`
    font-size: 1.5em;
    font-weight: 400;
    margin-top: 1em;
    margin-bottom: 1em;
    border-bottom: 3px solid #00e0ff;
    border-radius: 3px;
    color: #00e0ff;
    width: 22%;
  `,
  readMore: css`
    font-size: 0.8em;
    font-weight: 700;
    cursor: pointer;
  `,
};

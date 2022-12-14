import React from "react";
import Navbar from "../component/Navbar";
import { css } from "@emotion/react";
import Loading from "../component/Loading";
import NoData from "../component/NoData";
import { GET_SAVED_BOOKS } from "../graphql/queries/book";
import { useState, useEffect } from "react";
import apolloClient from "../utils/apolloClient";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/config";
import { AiFillStar } from "react-icons/ai";
import { UNSAVE_BOOK } from "../graphql/mutations/book";
import { v4 as uuid } from "uuid";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useMutation } from "@apollo/client";
import SuccessModal from "../component/SuccessModal";

const Save = () => {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removeSuccessModalOpen, setRemoveSuccessModalOpen] = useState(false);
  const [unsaveModalOpen, setUnsaveModalOpen] = useState();
  const [unsavedBook, setUnsavedBook] = useState(null);
  const [fetch, setFetch] = useState(null);
  const [updateBook, { error: err }] = useMutation(UNSAVE_BOOK, {
    client: apolloClient,
    onCompleted: () => {
      setUnsaveModalOpen(false);
      setRemoveSuccessModalOpen(true);
      setFetch(uuid());
    },
    onError: (err) => alert(err),
  });
  const handleBookSave = (book) => {
    setUnsaveModalOpen(true);
    setUnsavedBook(book);
  };
  const getSavedBooks = async () => {
    setLoading(true);
    try {
      const {
        data: { books },
      } = await apolloClient.query({
        fetchPolicy: "network-only",
        query: GET_SAVED_BOOKS,
        pageSize: 10,
      });
      const bookInfo = books?.data?.map((book) => {
        return {
          id: book?.id,
          rating: book?.attributes?.rating,
          status: book?.attributes?.status,
          title: book?.attributes?.title,
          genre: book?.attributes?.genre,
          poster: book?.attributes?.bookCover?.data?.attributes?.url,
        };
      });

      setInfo(bookInfo);
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };
  const unsaveBook = async () => {
    await updateBook({
      variables: {
        id: parseInt(unsavedBook?.id),
        data: {
          saved: false,
        },
      },
    });
  };
  useEffect(() => {
    getSavedBooks();
  }, [fetch]);
  return (
    <>
      <Navbar />
      <div css={styles.container}>
        <h2 css={styles.title}>All Saved Books</h2>
        {loading && <Loading />}

        <div css={styles.bookContainer}>
          {info?.length === 0 && <NoData />}
          {info.map((book) => (
            <div key={book.id}>
              <div css={styles.imageCard}>
                <img src={`${API_URL}${book?.poster}`} alt="trending" />
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
                    <button
                      css={styles.saveBtn}
                      onClick={() => handleBookSave(book)}
                    >
                      Unsave
                    </button>
                  </div>
                </div>
              </div>

              <p css={styles.bookName}>{book?.title}</p>
            </div>
          ))}
        </div>
        {unsaveModalOpen && (
          <Modal
            isOpen={unsaveModalOpen}
            toggle={() => setUnsaveModalOpen(false)}
            centered
          >
            <ModalHeader toggle={() => setUnsaveModalOpen(false)}>
              Do you want to remove it from your saved list ?
            </ModalHeader>

            <ModalFooter>
              <Button
                className="closeBtn w-25"
                onClick={() => setUnsaveModalOpen(false)}
              >
                Cancel
              </Button>{" "}
              <Button className="registerBtn w-25" onClick={unsaveBook}>
                Yes
              </Button>
            </ModalFooter>
          </Modal>
        )}
        {removeSuccessModalOpen && (
          <SuccessModal
            open={removeSuccessModalOpen}
            onClose={() => {
              setRemoveSuccessModalOpen(false);
            }}
            title="Unsaved Book"
            bodyValue={
              <span>
                Book : <b>{unsavedBook?.title} </b> is unsaved
              </span>
            }
          />
        )}
      </div>
    </>
  );
};

export default Save;
const styles = {
  container: css`
    padding: 2em;
    width: 100%;
    min-height: 100vh;
    background-color: #2b3341;
  `,
  title: css`
    font-size: 1.5em;
    color: #fff;
    font-weight: 500;
    text-align: center;
    margin-bottom: 1em;
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
  bookName: css`
    white-space: nowrap;
    max-width: 200px;
    font-size: 1em;
    color: #fff;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  bookContainer: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 2em 4em;
  `,
  seeAllBtn: css`
    font-size: 1rem;
    color: #fff;
    text-align: center;
    margin-bottom: 1.5em;
  `,
};

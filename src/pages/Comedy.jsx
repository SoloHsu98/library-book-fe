import React, { useEffect, useState } from "react";
import apolloClient from "../utils/apolloClient";
import { css } from "@emotion/react";

import { API_URL } from "../utils/config";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { UNSAVE_BOOK } from "../graphql/mutations/book";
import { useMutation } from "@apollo/client";
import { v4 as uuid } from "uuid";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SuccessModal from "../component/SuccessModal";
import Loading from "../component/Loading";
import NoData from "../component/NoData";
import { GET_COMEDY_BOOKS } from "../graphql/queries/book";
import Navbar from "../component/Navbar";

const Comedy = () => {
  const [actionStatus, setActionStatus] = useState("");
  const [info, setInfo] = useState([]);
  const [fetch, setFetch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveBook, setSaveBook] = useState(null);
  const [removeSuccessModalOpen, setRemoveSuccessModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState({
    unsaved: false,
    saved: false,
  });
  const handleBookModalOpen = (name) => {
    console.log("name", name);
    setModalOpen({
      [name]: true,
    });
  };
  const handleBookModalClose = (name) => {
    setModalOpen({
      [name]: false,
    });
  };
  const [updateBook, { error: err }] = useMutation(UNSAVE_BOOK, {
    client: apolloClient,
    onCompleted: () => {
      setFetch(uuid());
      setRemoveSuccessModalOpen(true);
    },
    onError: (err) => alert(err),
  });

  const getNewBooks = async () => {
    setLoading(true);
    try {
      const {
        data: { books },
      } = await apolloClient.query({
        fetchPolicy: "network-only",
        query: GET_COMEDY_BOOKS,
        pageSize: 10,
      });
      const bookInfo = books?.data?.map((book) => {
        return {
          id: book?.id,
          rating: book?.attributes?.rating,
          status: book?.attributes?.status,
          title: book?.attributes?.title,
          saved: book?.attributes?.saved,
          genre: book?.attributes?.genre,
          poster: book?.attributes?.bookCover?.data?.attributes?.url,
        };
      });

      setInfo(bookInfo);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  const handleBookSave = (book) => {
    if (book?.saved) {
      handleBookModalOpen("unsaved");
    } else {
      handleBookModalOpen("saved");
    }
    setSaveBook(book);
  };
  const unsaveBook = async () => {
    setActionStatus("unsaved");
    await updateBook({
      variables: {
        id: parseInt(saveBook?.id),
        data: {
          saved: false,
        },
      },
    });
    handleBookModalClose("unsaved");
  };
  const saveBookItem = async () => {
    setActionStatus("saved");
    await updateBook({
      variables: {
        id: parseInt(saveBook?.id),
        data: {
          saved: true,
        },
      },
    });
    handleBookModalClose("saved");
  };

  useEffect(() => {
    getNewBooks();
  }, [fetch]);
  return (
    <>
      <Navbar />
      <div css={styles.container}>
        <h2 css={styles.title}>Genre - Romance</h2>
        {loading && <Loading />}
        {info?.length === 0 && <NoData />}
        <div css={styles.bookContainer}>
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
                      Save
                    </button>
                  </div>
                </div>
              </div>

              <p css={styles.bookName}>{book?.title}</p>
            </div>
          ))}
        </div>
        {modalOpen?.unsaved && (
          <Modal
            isOpen={modalOpen?.unsaved}
            toggle={() => handleBookModalClose("unsaved")}
            centered
          >
            <ModalHeader toggle={() => handleBookModalClose("unsaved")}>
              Already Saved
            </ModalHeader>
            <ModalBody>
              It's already saved.You can view your saved books in saved page.
            </ModalBody>
            <ModalFooter>
              <Button
                className="closeBtn w-25"
                onClick={() => handleBookModalClose("unsaved")}
              >
                Cancel
              </Button>{" "}
              <Button className="registerBtn w-25" onClick={unsaveBook}>
                Unsave
              </Button>
            </ModalFooter>
          </Modal>
        )}
        {modalOpen?.saved && (
          <Modal
            isOpen={modalOpen?.saved}
            toggle={() => handleBookModalClose("saved")}
            centered
          >
            <ModalHeader toggle={() => handleBookModalClose("saved")}>
              Save Book
            </ModalHeader>
            <ModalBody>
              Do you want to save the book : <b>{saveBook?.title} </b>?
            </ModalBody>
            <ModalFooter>
              <Button
                className="closeBtn w-25"
                onClick={() => handleBookModalClose("saved")}
              >
                Cancel
              </Button>{" "}
              <Button className="registerBtn w-25" onClick={saveBookItem}>
                Save
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
            title={actionStatus == "saved" ? "Save Book" : "Unsaved Book"}
            bodyValue={
              actionStatus == "saved" ? (
                <span>
                  Book : <b>{saveBook?.title} </b> is saved
                </span>
              ) : (
                <span>
                  Book : <b>{saveBook?.title} </b> is unsaved
                </span>
              )
            }
          />
        )}
      </div>
    </>
  );
};

export default Comedy;
const styles = {
  container: css`
    padding: 2em;
    background-color: #2b3341;
  `,
  title: css`
    font-size: 1.5em;
    color: #fff;
    font-weight: 500;
    text-align: center;
    margin-bottom: 1.5em;
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
    height: 100vh;
  `,
  seeAllBtn: css`
    font-size: 1rem;
    color: #fff;
    text-align: center;
    margin-bottom: 1.5em;
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
};

import React, { useState, useEffect } from "react";
import { StyledApp } from "./App.styled";
import { getImageWithQuery } from "../../PixabayApi/pixabayApi";
import { Loader } from "../Loader/Loader";
import { Button } from "../Button/Button";
import { ModalImg } from "../Modal/Modal";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";

const status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export const App = () => {
  const [imageName, setImageName] = useState("");
  const [gallery, setGallery] = useState([]);
  const [stateStatus, setStateStatus] = useState(status.IDLE);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState("");
  const { PENDING, RESOLVED, REJECTED } = status;

  useEffect(() => {
    if (imageName === "") {
      return;
    }

    setStateStatus(PENDING);

    getImageWithQuery(imageName, page)
      .then(({ hits }) => {
        setStateStatus(PENDING);

        if (hits.length === 0) {
          setStateStatus(REJECTED);
          setGallery([]);
          setError("Sory, You are entering an incorrect value");

          return;
        }

        setGallery((prevGallery) => [...prevGallery, ...hits]);
        setError(null);
        setStateStatus(RESOLVED);

        if (page > 1) {
          const { height: cardHeight } =
            document.documentElement.getBoundingClientRect();

          window.scrollBy({
            top: cardHeight * 0.2,
            behavior: "smooth",
          });
        }
      })
      .catch((error) => {
        setGallery([]);
        setError("something is wrong with the request address".toUpperCase());
        setStateStatus(REJECTED);
      });
  }, [imageName, page]);

  const handleFormSubmite = (imageName) => {
    setImageName(imageName);
    setGallery([]);
    setPage(1);
  };

  const onLoadMorePictures = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (e) => {
    setStateStatus(PENDING);
    togleModal();
    const { image } = e.target.dataset;
    setLargeImage(image);
    setTimeout(() => {
      setStateStatus(RESOLVED);
    }, 300);
  };

  const togleModal = () => {
    setShowModal(!showModal);
  };

  const isGallery = gallery.length;

  return (
    <StyledApp>
      <Searchbar onSubmit={handleFormSubmite} />
      {stateStatus === PENDING ? <Loader /> : null}
      {showModal && (
        <ModalImg onClose={togleModal} onClick={togleModal} url={largeImage} />
      )}
      {stateStatus === REJECTED ? <div>{error}</div> : null}

      {isGallery ? (
        <ImageGallery galleryList={gallery} onClick={openModal} />
      ) : null}

      {isGallery ? <Button onLoadMore={onLoadMorePictures} /> : null}
    </StyledApp>
  );
};

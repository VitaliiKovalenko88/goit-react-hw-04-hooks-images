// import axios from 'axios';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
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

  useEffect(() => {
    if (imageName === "") {
      return;
    }
    setStateStatus(status.PENDING);

    getImageWithQuery(imageName, page)
      .then(({ hits }) => {
        setStateStatus(status.PENDING);

        if (hits.length === 0) {
          setStateStatus(status.REJECTED);
          setGallery([]);
          setError("Sory, You are entering an incorrect value");

          return;
        }

        if (page > 1) {
          const { height: cardHeight } =
            document.documentElement.getBoundingClientRect();

          window.scrollBy({
            top: cardHeight * 0.4,
            behavior: "smooth",
          });
          console.log(cardHeight);
          console.log(document.documentElement);
        }

        setGallery((prevGallery) => [...prevGallery, ...hits]);
        setError(null);
        setStateStatus(status.RESOLVED);
      })
      .catch((error) => {
        setGallery([]);
        setError("something is wrong with the request address".toUpperCase());
        setStateStatus(status.REJECTED);
      });
  }, [imageName, page]);

  const handleFormSubmite = (imageName) => {
    setImageName(imageName);
    setGallery([]);
    setPage(1);
  };

  const onLoadMorePictures = () => {
    // this.setState((prevState) => ({
    //   page: prevState.page + 1,
    // }));
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (e) => {
    // this.setState({
    //   largeImage: e.target.dataset.image,
    // });
    const { image } = e.target.dataset;
    setLargeImage(image);
    togleModal();
    // this.setState({status: status.RESOLVED,})
  };

  const togleModal = () => {
    setShowModal(!showModal);
  };

  const isGallery = gallery.length;
  const { PENDING, REJECTED } = status;
  return (
    <StyledApp>
      <Searchbar onSubmit={handleFormSubmite} />
      {stateStatus === PENDING ? <Loader /> : null}
      {showModal && (
        <ModalImg onClose={togleModal} onClick={togleModal} url={largeImage} />
      )}
      {stateStatus === REJECTED ? <div>{error}</div> : null}

      <ImageGallery galleryList={gallery} onClick={openModal} />

      {isGallery ? <Button onLoadMore={onLoadMorePictures} /> : null}
    </StyledApp>
  );
};

import React, { Component } from "react";
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

export class App extends Component {
  state = {
    imageName: "",
    gallery: [],
    status: status.IDLE,
    page: 1,
    error: null,
    showModal: false,
    largeImage: "",
  };

  async componentDidUpdate(prevPropse, prevState) {
    try {
      const nextName = this.state.imageName;
      const prevName = prevState.imageName;
      const nextPage = this.state.page;
      const prevPage = prevState.page;

      if (nextName !== prevName || nextPage !== prevPage) {
        this.setState({ status: status.PENDING });
        this.createGallery();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  handleFormSubmite = (imageName) => {
    this.setState({
      imageName,
      gallery: [],
      page: 1,
    });
  };

  createGallery = async () => {
    const { imageName, page } = this.state;

    try {
      const { hits } = await getImageWithQuery(imageName, page);

      if (hits.length === 0) {
        this.setState({
          gallery: [],
          error: "Sory, You are entering an incorrect value",
          status: status.REJECTED,
        });
        return;
      }

      this.setState((prevState) => ({
        gallery: [...prevState.gallery, ...hits],
        status: status.RESOLVED,
        error: null,
      }));
    } catch (error) {
      this.setState({
        gallery: [],
        status: status.REJECTED,
        error: "something is wrong with the request address".toUpperCase(),
      });
    }
  };

  onLoadMorePictures = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (e) => {
    this.setState({
      largeImage: e.target.dataset.image,
    });
    this.togleModal();
    // this.setState({status: status.RESOLVED,})
  };

  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { status, gallery, error, showModal, largeImage } = this.state;
    const isGallery = gallery.length;
    return (
      <StyledApp>
        <Searchbar onSubmit={this.handleFormSubmite} />
        {status === "pending" ? <Loader /> : null}
        {showModal && (
          <ModalImg
            onClose={this.togleModal}
            onClick={this.togleModal}
            url={largeImage}
          />
        )}
        {status === "rejected" ? <div>{error}</div> : null}

        <ImageGallery galleryList={gallery} onClick={this.openModal} />
        {isGallery ? <Button onLoadMore={this.onLoadMorePictures} /> : null}
      </StyledApp>
    );
  }
}

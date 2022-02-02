import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { StyledImageGallery } from "./ImageGallery.styled.js";
import PropTypes from "prop-types";

export const ImageGallery = ({ galleryList, onClick }) => {
  return (
    <StyledImageGallery onClick={onClick}>
      {galleryList.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            tags={tags}
            modalUrl={largeImageURL}
          />
        );
      })}
    </StyledImageGallery>
  );
};

ImageGallery.propTypes = {
  galleryList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

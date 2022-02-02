import PropTypes from "prop-types";
import {
  StyledImageGalleryItem,
  ImageGalleryItemImg,
} from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ url, tags, modalUrl }) => {
  return (
    <StyledImageGalleryItem>
      <ImageGalleryItemImg data-image={modalUrl} src={url} alt={tags} />
    </StyledImageGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  modalUrl: PropTypes.string.isRequired,
};

import { StyledButton } from "./Button.styled";
import PropTypes from "prop-types";

export const Button = ({ onLoadMore }) => {
  return (
    <StyledButton type="submite" onClick={onLoadMore}>
      Load More
    </StyledButton>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

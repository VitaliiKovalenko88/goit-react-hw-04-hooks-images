import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  StyledSearchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from "./Searchbar.styled";
import { ImSearch } from "react-icons/im";

export const Searchbar = (props) => {
  const [imageName, setImageName] = useState("");

  const handleNameChange = (e) => {
    const { value } = e.currentTarget;
    setImageName(value);
  };

  const handleSabmite = (e) => {
    e.preventDefault();
    if (imageName.trim() === "") {
      console.log("введите что нибуть!!!");
      return;
    }
    props.onSubmit(imageName);
    setImageName("");
  };

  return (
    <StyledSearchbar>
      <SearchForm onSubmit={handleSabmite}>
        <SearchFormButton type="submit">
          <ImSearch />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleNameChange}
        />
      </SearchForm>
    </StyledSearchbar>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

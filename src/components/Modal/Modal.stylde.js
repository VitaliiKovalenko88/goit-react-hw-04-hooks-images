import styled from "styled-components";

export const Overlay = styled.div`
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const Modal = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

export const ButtonIcon = styled.button`
  position: relative;
  border-radius: 50%;
  background-color: transparent;
  right: 2%;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  border-color: black;
  left: 97%;
  bottom: -30px;

  /* top: 8px;
  right: 8px; */
  width: 30px;
  height: 30px;
  background: transparent;

  :hover,
  :focus {
    background-color: tomato;
    width: 35px;
    height: 35px;
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

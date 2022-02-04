import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Overlay, Modal, ButtonIcon } from "./Modal.stylde";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");
export const ModalImg = ({ onClose, onClick, url }) => {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  const handleBackdrope = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdrope}>
      <Modal>
        <ButtonIcon type="button" onClick={onClick}>
          X
        </ButtonIcon>
        <img src={url} alt={url} />
      </Modal>
    </Overlay>,
    modalRoot
  );
};
// export class ModalImg extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeydown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeydown);
//   }

//   handleKeydown = (e) => {
//     if (e.code === "Escape") {
//       this.props.onClose();
//     }
//   };

//   handleBackdrope = (e) => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <Overlay onClick={this.handleBackdrope}>
//         <Modal>
//           <ButtonIcon type="button" onClick={this.props.onClick}>
//             X
//           </ButtonIcon>
//           <img src={this.props.url} alt={this.props.url} />
//         </Modal>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }

ModalImg.propTypes = {
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

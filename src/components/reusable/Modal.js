import React from "react";
import { Modal } from "@sky-uk/toolkit-react";
import ButtonComponent from "./Button";
import ModalData from "./reusableData/ModalData";

function ModalComponent(props) {
  const { isOpen, onCloseFunction, textToDisplay, modalButtons } = props;

  return (
    <Modal isOpen={isOpen} onClose={onCloseFunction}>
      <p>{ModalData[textToDisplay]}</p>
      {modalButtons
        ? modalButtons.map(([text, onClick], index) => {
            return (
              <ButtonComponent key={index} text={text} onClick={onClick} />
            );
          })
        : ""}
    </Modal>
  );
}

export default ModalComponent;

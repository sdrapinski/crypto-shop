import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";

export default function DeleteProductModal(props) {
  const handleOnClick = async () => {
    props.onHide();
    props.callback();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ textAlign: "center", width: "100%" }}
        >
          Delete a Product: {props.product.product_name} ?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ justifyContent: "space-evenly", display: "flex" }}>
        <Button
          variant="danger"
          onClick={handleOnClick}
          style={{ width: "40%" }}
        >
          Yes
        </Button>
        <Button variant="info" onClick={props.onHide} style={{ width: "40%" }}>
          No
        </Button>
      </Modal.Body>
    </Modal>
  );
}

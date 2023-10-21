import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../state/AppContext";
import { Col, Form, InputGroup } from "react-bootstrap";
import InputForm from "../../Forms/InputForm";

interface FilterProps {
  category: string;
}

const Filters: React.FC<FilterProps> = (props) => {
  const { category } = props;
  const appcontext = useContext(AppContext);
  useEffect(() => {
    axios
      .get(`${appcontext?.backendUrl}/offer/filters/${category}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
      });

    return () => {};
  }, []);

  return (
    <Col md={2} className="filters">
      Price <br />
      <InputGroup>
        <Form.Control placeholder="min" />
        <Form.Control placeholder="max" />
      </InputGroup>
    </Col>
  );
};

export default Filters;

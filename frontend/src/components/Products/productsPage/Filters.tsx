import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../state/AppContext";
import { Col, Form, InputGroup } from "react-bootstrap";
import InputForm from "../../Forms/InputForm";

interface FilterProps {
  category: string;
  
}

const Filters: React.FC<FilterProps> = (props) => {
  const [minPrice, setminPrice] = useState(0)

  const chandleMinPrice =(event:React.ChangeEvent<HTMLInputElement>)=>{
    setminPrice(parseFloat( event.target.value))
  }
 

  const { category } = props;
  const body ={}
  const appcontext = useContext(AppContext);
  useEffect(() => {
    axios
      .post(`${appcontext?.backendUrl}/offer/filters/${category}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body
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
        <Form.Control type="number" placeholder="min" value={minPrice} onChange={chandleMinPrice}/>
        <Form.Control placeholder="max" />
        
        
      </InputGroup>

      <button >apply</button>
    </Col>
  );
};

export default Filters;

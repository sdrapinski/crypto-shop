import React, { useContext, useEffect, useState } from "react";

import { Notification as NotificationInterface } from "../../interfaces/Profile.interface";
import { Card, Row, Col, Button } from "react-bootstrap";


interface NotificationProps {
  notification: NotificationInterface;
  handleConfirmShipment: (delivery_id:string)=>Promise<boolean>
}

const NotificationContentSeller: React.FC<NotificationProps> = ({ notification,handleConfirmShipment }) => {
  const { productsBought } = notification;
  const [deliveryStatus, setDeliveryStatus] = useState<string>();

  useEffect(() => {
    setDeliveryStatus(notification.productsBought.delivery.status)
  
    return () => {
      
    }
  }, [notification.notification_id])
  
 

  // Ustawienie lokalnego stanu dla statusu dostawy
  

  if (!productsBought || !productsBought.delivery) {
    return <div>No detailed delivery information available.</div>;
  }

  const { delivery, products_bought_items } = productsBought;

  const handleConfirmShipmentButton = async (delivery_id:string) => {
    if (!delivery_id) {
      console.error("Delivery ID is missing.");
      return false;
    }

    const result =  await handleConfirmShipment(delivery_id)
    
    

    if(result){
      setDeliveryStatus("Shipped")
    }
  };

  return (
    <div>
      <h4>Delivery Details:</h4>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Delivery Information</Card.Title>
          <Row>
            <Col>
              <p>
                <strong>City:</strong> {delivery.city}
              </p>
              <p>
                <strong>Street:</strong> {delivery.street} 
              </p>
              <p>
                <strong>Postal Code:</strong> {delivery.postcode}
              </p>
            </Col>
            <Col>
              <p>
                <strong>Contact Phone:</strong> {delivery.phoneNumber}
              </p>
              <p>
                <strong>Contact Email:</strong> {delivery.email}
              </p>
              <p>
                <strong>Package Status:</strong> {deliveryStatus}
              </p>
            </Col>
          </Row>
          {deliveryStatus !== "Shipped" && (
            <Button className="mt-3" variant="primary" onClick={()=>{handleConfirmShipmentButton(delivery.id)}}>
              Confirm Shipment
            </Button>
          )}
        </Card.Body>
      </Card>

      <h4>Products in this Sale:</h4>
      <Row>
        {products_bought_items.map((item) => (
          <Col md={6} lg={4} key={item.products_bought_items_id}>
            <Card className="mb-4">
              <Card.Img
                style={{ maxHeight: "250px" }}
                variant="top"
                src={item.product.product_images || "https://via.placeholder.com/150"}
                alt={item.product.product_name}
              />
              <Card.Body>
                <Card.Title>{item.product.product_name}</Card.Title>
                <p>
                  <strong>Quantity:</strong> {item.product_quantity}
                </p>
                <p>
                  <strong>Price:</strong> ${item.product.product_dollar_price.toFixed(2)}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default NotificationContentSeller;

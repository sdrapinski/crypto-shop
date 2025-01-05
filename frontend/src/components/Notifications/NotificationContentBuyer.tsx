import React from "react";
import { Notification as NotificationInterface } from "../../interfaces/Profile.interface";
import { Card, Row, Col } from "react-bootstrap";

interface NotificationProps {
  notification: NotificationInterface;
}

const NotificationContentBuyer: React.FC<NotificationProps> = ({ notification }) => {
  const { productsBought } = notification;

  if (!productsBought || !productsBought.delivery) {
    return <div>No detailed delivery information available.</div>;
  }

  const { delivery, products_bought_items } = productsBought;

  return (
    <div>
      <h4>Your Package Status:</h4>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Delivery Information</Card.Title>
          <Row>
            <Col>
              <p>
                <strong>Status:</strong> {delivery.status}
              </p>
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
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <h4>Products in this Purchase:</h4>
      <Row>
        {products_bought_items.map((item) => (
          <Col md={6} lg={4} key={item.products_bought_items_id}>
            <Card className="mb-4">
              <Card.Img
                style={{maxHeight:"250px"}}
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

export default NotificationContentBuyer;

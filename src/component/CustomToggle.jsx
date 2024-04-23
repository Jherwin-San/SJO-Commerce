import { Button, AccordionContext, useAccordionButton } from "react-bootstrap";
import React from "react";
import { useContext } from "react";

const On = "dark";
const Off = "outline-dark";

const CustomToggle = ({ children, eventKey, callback }) => {
  const { activeEventKey } = useContext(AccordionContext);
  const isCurrentEventKey = activeEventKey === eventKey;
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );
  return (
    <Button
      style={{ borderRadius: "50%" }}
      variant={isCurrentEventKey ? On : Off}
      className="fw-bold mx-3"
      onClick={decoratedOnClick}
    >
      {children}
    </Button>
  );
};

export default CustomToggle;

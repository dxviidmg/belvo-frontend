import { useState } from "react";
import Alert from "react-bootstrap/Alert";

export function AlertDismissibleExample({ message }) {
  const [show, setShow] = useState(true);
  return (
    <Alert variant="danger" onClose={() => setShow(!{show})} dismissible>
      <Alert.Heading>Error</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}

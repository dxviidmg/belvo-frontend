import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AlertDismissibleExample } from "../common/alert/Alert";

export const Login = () => {
//  const navigate = useNavigate();

  const [shownAlert, setShownAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const url = backendUrl + "api-token-auth/";
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);

      const data = response.data;
      console.log(response);
      // Aquí puedes guardar el token en el estado global o en localStorage para futuras solicitudes autenticadas.
      console.log("Token:", data.token);
      localStorage.setItem("token", data.token);
      const jsonString = JSON.stringify(data);
      localStorage.setItem('user', jsonString);
//      navigate("/profile");
    } catch (error) {
      if (
        error.response.data.non_field_errors[0] ===
        "Unable to log in with provided credentials."
      ) {
        setMessageAlert("Usuario o contraseña incorrecta");
      } else {
        setMessageAlert("Error desconocido");
      }

      setShownAlert(true);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} lg={3}>
          {shownAlert ? <AlertDismissibleExample message={messageAlert} /> : ""}

          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="form-group mt-3">
                <label>Usuario</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Usuario"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Contraseña"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Iniciar sesión
                </button>
              </div>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
import React, { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AlertDismissible } from "../common/alert/Alert";
import { useNavigate } from "react-router-dom";


const backendUrl = process.env.REACT_APP_BACKEND_URL;
const belvoUrl = process.env.REACT_APP_BELVO_URL;
const belvoAuth = process.env.REACT_APP_BELVO_AUTHORIZATION;
const belvoToken = process.env.REACT_APP_BELVO_TOKEN;

export const Login = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ shown: false, message: "" });

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

  const handleBelvoApiCall = async (link) => {
    axios.defaults.headers.common["Authorization"] = belvoAuth;

    const requestData2 = {
      link: link,
      token: belvoToken,
    };

    try {
      console.log(requestData2)
      const response = await axios.post(belvoUrl + "api/owners/", requestData2);
      console.log(response.data);
      const responseData2 = response.data;
      const jsonString2 = JSON.stringify(responseData2);
      console.log(jsonString2)
      localStorage.setItem("owner", jsonString2);
      // Handle response data accordingly
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}api-token-auth/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = response.data;
      console.log(responseData)
      const jsonString1 = JSON.stringify(responseData);
      localStorage.setItem("user", jsonString1);

      if (responseData && responseData.belvo_link) {
        await handleBelvoApiCall(responseData.belvo_link);
      }
      navigate("/home");
    } catch (error) {
      if (
        error.response.data.non_field_errors[0] ===
        "Unable to log in with provided credentials."
      ) {
        setAlert({ shown: true, message: "Usuario o contraseña incorrecta" });
      } else {
        setAlert({ shown: true, message: "Error desconocido" });
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} lg={3}>
          {alert.shown && <AlertDismissible message={alert.message} />}

          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Inicio de sesión</h3>
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
};

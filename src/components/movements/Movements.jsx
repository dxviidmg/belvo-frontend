import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";

const belvoUrl = process.env.REACT_APP_BELVO_URL;
const belvoAuth = process.env.REACT_APP_BELVO_AUTHORIZATION;
const belvoToken = process.env.REACT_APP_BELVO_TOKEN;

export const Movements = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userString = localStorage.getItem("user");
      const user = JSON.parse(userString);
      axios.defaults.headers.common["Authorization"] = belvoAuth;

      const requestData = {
        link: user.belvo_link,
        token: belvoToken,
      };

      try {
        const response = await axios.post(
          belvoUrl + "api/accounts/",
          requestData
        );
        setAccounts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    console.log(accounts[event.target.value])
    setSelectedAccount(accounts[event.target.value]);
  };

  return (
    <>
    Hola
    </>
  );
};
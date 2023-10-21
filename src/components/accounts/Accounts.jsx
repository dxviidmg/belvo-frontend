import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const belvoUrl = process.env.REACT_APP_BELVO_URL;
const belvoAuth = process.env.REACT_APP_BELVO_AUTHORIZATION;
const belvoToken = process.env.REACT_APP_BELVO_TOKEN;

export const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);

    console.log(user);
    axios.defaults.headers.common["Authorization"] = belvoAuth;

    const requestData = {
      link: user.belvo_link,
      token: belvoToken,
    };

    try {
      console.log(requestData);
      const response = axios.post(belvoUrl + "api/accounts/", requestData);
      console.log(response);
      const responseData = response.data;
      console.log(responseData)
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Form.Select aria-label="Default select example">
        <option>Seleciona un banco</option>
        {accounts.map((account, index) => {
          return (
            <option key={index} value="1">
              {account.id}
            </option>
          );
        })}
      </Form.Select>
    </div>
  );
};

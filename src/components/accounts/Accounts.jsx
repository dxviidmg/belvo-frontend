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
      const link = localStorage.getItem("t", "t")
      axios.defaults.headers.common["Authorization"] = belvoAuth;
  
      const requestData2 = {
        link: link,
        token: belvoToken,
      };
  
      try {
        console.log(requestData2)
//        const response = axios.post(belvoUrl + "api/accounts/", requestData2);
//        console.log(response.data);
//        const responseData2 = response.data;
//        const jsonString2 = JSON.stringify(responseData2);
//        console.log(jsonString2)
//        localStorage.setItem("owner", jsonString2);
        // Handle response data accordingly
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

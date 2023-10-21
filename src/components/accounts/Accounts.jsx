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
    const fetchData = async () => {
      const userString = localStorage.getItem("user");
      const user = JSON.parse(userString);
      axios.defaults.headers.common["Authorization"] = belvoAuth;
  
      const requestData = {
        link: user.belvo_link,
        token: belvoToken,
      };
  
      try {
        const response = await axios.post(belvoUrl + "api/accounts/", requestData);
        setAccounts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    // Call the async function
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount
  

  return (
    <div>
      <Form.Select aria-label="Default select example">
        <option>Seleciona una cuenta</option>
        {accounts.map((account, index) => {
          console.log(account)
          return (
            <option key={index} value="1">
              {account.name}
            </option>
          );
        })}
      </Form.Select>
    </div>
  );
};

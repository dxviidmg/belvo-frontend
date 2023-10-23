import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { Loader } from "../loaders/Loader";

const belvoUrl = process.env.REACT_APP_BELVO_URL;
const belvoAuth = process.env.REACT_APP_BELVO_AUTHORIZATION;
const belvoToken = process.env.REACT_APP_BELVO_TOKEN;

export const Accounts = ({updateAccount}) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({})
  const [loading, setLoading] = useState(false)

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
        setLoading(true)
        const response = await axios.post(
          belvoUrl + "api/accounts/",
          requestData
        );
        setAccounts(response.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedAccount(accounts[event.target.value]);
    updateAccount(accounts[event.target.value])
  };

  return (
    <>
    <Loader isLoading={loading}/>
    <Row className="p-1">
      <Col md={7}>
      <Form.Select aria-label="Default select example" onChange={handleSelectChange}>
      <option value="default">
              Seleccione una cuenta
            </option>
        {accounts.map((account, index) => {
          return (
            <option key={index} value={index}>
              {account.name}
            </option>
          );
        })}
      </Form.Select>


      </Col>
      <Col><h3>{selectedAccount?.balance?.current? "Balance actual: $": ""} {selectedAccount?.balance?.current}</h3></Col>
    </Row>
    </>
  );
};

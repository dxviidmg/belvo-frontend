import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const belvoUrl = process.env.REACT_APP_BELVO_URL;
const belvoAuth = process.env.REACT_APP_BELVO_AUTHORIZATION;
const belvoToken = process.env.REACT_APP_BELVO_TOKEN;

export const Movements = ({ accountId }) => {
  const [movements, setMovements] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const convertDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    // Formatted date in "yyyy-mm-dd" format
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
    
      const userString = localStorage.getItem("user");
      const user = JSON.parse(userString);
      axios.defaults.headers.common["Authorization"] = belvoAuth;

      const date_to = convertDate(currentDate);

      const dateAMonthAgo = new Date(currentDate);

      // Restar un mes
      dateAMonthAgo.setMonth(currentDate.getMonth() - 1);
      const date_from = convertDate(dateAMonthAgo);
      const requestData = {
        link: user.belvo_link,
        token: belvoToken,
        account: accountId,
        date_from: date_from,
        date_to: date_to,
      };

      console.log(requestData)
      try {
        const response = await axios.post(
          belvoUrl + "api/transactions/",
          requestData
        );

        console.log("response", response.data);
        setMovements(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [accountId]);

  return (
    <>
      Hola {accountId}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Balance</th>
            <th>description</th>
            <th>category</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((movement, index) => (
            <tr key={index}>
              <td>{movement.created_at}</td>
              <td>{movement.amount}</td>
              <td>{movement.balance}</td>
              <td>{movement.description}</td>
              <td>{movement.category}</td>
              <td>{movement.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

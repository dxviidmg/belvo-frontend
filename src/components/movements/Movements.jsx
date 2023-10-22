import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Loader } from "../loaders/Loader";

const belvoUrl = process.env.REACT_APP_BELVO_URL;
const belvoAuth = process.env.REACT_APP_BELVO_AUTHORIZATION;
const belvoToken = process.env.REACT_APP_BELVO_TOKEN;

export const Movements = ({ account }) => {
  const [movements, setMovements] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const convertDateToApi = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatDateTime = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDateTime = `${dateObject.getDate()}-${
      dateObject.getMonth() + 1
    }-${dateObject.getFullYear()} ${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;
    return formattedDateTime;
  };

  useEffect(() => {
    const fetchData = async () => {
      const userString = localStorage.getItem("user");
      const user = JSON.parse(userString);
      axios.defaults.headers.common["Authorization"] = belvoAuth;

      const date_to = convertDateToApi(currentDate);

      const dateAMonthAgo = new Date(currentDate);
      dateAMonthAgo.setMonth(currentDate.getDay() - 5);

      const date_from = convertDateToApi(dateAMonthAgo);


      const formatNumberToDecimal = (number) => {
        const formattedNumber = parseFloat(number).toFixed(2);
        return parseFloat(formattedNumber);
      };


      const requestData = {
        link: user.belvo_link,
        token: belvoToken,
        account: account.id,
        date_from: date_from,
        date_to: date_to,
      };


      if (account.id === undefined){
        setMovements([]);
      }
      else {
      setLoading(true);
      try {
        const response = await axios.post(
          belvoUrl + "api/transactions/?fields=created_at,amount,description,status",
          requestData
        );
        
        let response_movements = response.data        
        let balance = account.balance.current
        
        response_movements = response_movements.map((movement, index) => {
          if (index !== 0) {
            balance = balance - response_movements[index-1].amount;
          }
          return {
            ...movement,
            balance: balance
          };
        });

        setMovements(response_movements);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

  }      
    fetchData();
  }, [account]);

  const formatStatus = (status) => {
    if (status === "PENDING") {
      return "Pendiente";
    }
    if (status === "PROCESSED") {
      return "Procesado";
    }
    return status;
  };

  return (
    <div className="">
      <Loader isLoading={loading} />
      <h2>Mis movimientos del ultimo mes</h2>

      <h2>cuenta {account.name}</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Fecha y hora</th>
              <th>Descripción</th>
              <th>Cargo</th>
              <th>Balance despues de la transacción</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement, index) => (
              
              <tr
                key={index}
              >
                <td>{formatDateTime(movement.created_at)}</td>
                <td>{movement.description}</td>
                <td>${movement.amount}</td>
                <td>${movement.balance}</td>
                <td>{formatStatus(movement.status)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Loader } from "../loaders/Loader";
import './movements.css'


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
      dateAMonthAgo.setMonth(currentDate.getMonth() - 1);

      const date_from = convertDateToApi(dateAMonthAgo);


      const formatNumberToDecimal = (number) => {
        const formattedNumber = parseFloat(number).toFixed(2);
        return parseFloat(formattedNumber);
      };

      const process_movements = (balance, movements) => {
        return movements.map((movement, index) => {
          if (index !== 0) {
            if (movement.type === "INFLOW"){
              balance = balance + movements[index-1].amount;
            }
            else {
              balance = balance - movements[index-1].amount;
            }
            balance = formatNumberToDecimal(balance)
          }

          return {
            ...movement,
            balance: balance
          };
        });
      }

      
      const requestData = {
        link: user.belvo_link,
        token: belvoToken,
        account: account.id,
        date_from: date_from,
        date_to: date_to,
      };

      console.log(requestData)

      if (account.id === undefined){
        setMovements([]);
      }
      else {
      setLoading(true);
      try {
        const response = await axios.post(
          belvoUrl + "api/transactions/" + "?fields=created_at,amount,description,type,balance",
          requestData
        );
        
        let response_movements = response.data        

        console.log('ww')
        console.log(response_movements)

        console.log(response_movements)

        response_movements = process_movements(account.balance.current, response_movements)
        
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

  return (
    <div id="movements-section">
      <Loader isLoading={loading} />
      <h2>Mis movimientos del ultimo mes</h2>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Fecha y hora</th>
              <th>Descripción</th>
              <th>Abono</th>
              <th>Cargo</th>
              <th>Balance despues de la transacción</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement, index) => (
              
              <tr
                key={index}
              >
                <td>{formatDateTime(movement.created_at)}</td>
                <td>{movement.description}</td>
                <td>{movement.type === 'INFLOW' ? ('$' + movement.amount): ""}</td>
                <td>{movement.type === 'OUTFLOW' ? ('$' + movement.amount): ""}</td>
                <td>${movement.balance}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

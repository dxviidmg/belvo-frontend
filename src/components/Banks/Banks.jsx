import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';


export const Banks = () => {
    const [banks, setBanks] = useState([])
  useEffect(() => {
    const url = 'https://sandbox.belvo.com/';
    const apiUrl = url + "api/institutions/?type=bank";

    const headers = {
        Authorization: 'Basic MzMyOTE2YjUtMzdlZS00NmEyLTlkMDktZDI1MTFjNmM0Yzc5Om1AMl8yVzNpS2FtV0dWcEc2WjFyb2wwKlBrekIjcFVWdDhsWFZQM25DKk0zI2M0V2cjbDJLNUhYU1RFczBZYjA='
      };

    axios
      .get(apiUrl, {headers})
      .then((response) => {
        let results = response.data.results;
        console.log(results)
        setBanks(results)
//        results.forEach(element => {
//            console.log(element.resources)
//          if (element.resources.includes('BALANCES')) {
//            console.log(element);
//          }
//        }); // Cerré el paréntesis y el corchete correctamente
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
            <Form.Select aria-label="Default select example">
      <option>Seleciona un banco</option>
      {banks.map((bank, index) => {
        return (      <option key={index} value="1">{bank.name}</option>)
      })}
    </Form.Select>
    </div>
  );
}

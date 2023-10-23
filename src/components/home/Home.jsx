import { Container } from "react-bootstrap";
import { Accounts } from "../accounts/Accounts";
import { UserInfo } from "../userInfo/UserInfo";
import { Movements } from "../movements/Movements";
import React, { useEffect, useState } from "react";
import OffcanvasExample from "../navbar/Navbar";

export const Home = () => {
  const [account, setAccount] = useState({});

  // Función para actualizar el estado desde B
  const updateAccount = (newAccount) => {
    setAccount(newAccount);
  };

  return (
    <>
      <OffcanvasExample></OffcanvasExample>
      <Container>
        <UserInfo></UserInfo>
        <Accounts updateAccount={updateAccount} />
        <Movements account={account}></Movements>
      </Container>
    </>
  );
};

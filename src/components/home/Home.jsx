import { Container } from "react-bootstrap";
import { Accounts } from "../accounts/Accounts";
import { UserInfo } from "../userInfo/UserInfo";
import { Movements } from "../movements/Movements";
import React, { useEffect, useState } from "react";


export const Home = () => {

    const [accountId, setAccount] = useState('');

    // Función para actualizar el estado desde B
    const updateAccountId = (newAccountId) => {
      setAccount(newAccountId);
      console.log('aid', accountId)
    };

    return (
    <Container>
            <UserInfo></UserInfo>
            <Accounts updateAccountId={updateAccountId} />
            <Movements accountId={accountId}></Movements>
    </Container>
  );
}

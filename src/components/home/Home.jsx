import { Container } from "react-bootstrap";
import { Accounts } from "../accounts/Accounts";
import { UserInfo } from "../userInfo/UserInfo";

export const Home = () => {
  return (
    <Container>
            <UserInfo></UserInfo>
            <Accounts></Accounts>
    </Container>
  );
}

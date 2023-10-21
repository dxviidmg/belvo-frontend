import React, { useEffect, useState } from "react";

export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ownerString = localStorage.getItem("owner");
      const owner = JSON.parse(ownerString);
      console.log(owner)
      setUserInfo(owner);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>¡Hola, {userInfo && userInfo[0]?.first_name} !</h1>
      <p>{userInfo && userInfo[0]?.display_name}</p>
    </>
  );
};

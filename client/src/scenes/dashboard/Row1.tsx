import { Typography } from "@mui/material";
import Events from "../event/events";
import Orders from "../order/orders";
import { useIsLoggedInQuery } from "@/state/api";
import { useEffect } from "react";

const Row1 = () => {
  const { data: loggedData, isLoading } = useIsLoggedInQuery();

  useEffect(() => {
    if(!isLoading && loggedData) console.log('role:', getCookie('role'));
  },[]);

  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }

  return (
    <>
      <Typography style={{fontSize: 18, color: '#043028', paddingTop: 8}}>Eventi di Questa settimana</Typography>
      <Events isCreateHidden={true} heigth="80%" timeFilter="week"/>
      <Typography style={{fontSize: 18, color: '#043028', paddingTop: 8}}>Ordini recenti</Typography>
      <Orders isCreateHidden={true} heigth="80%"/>
    </>
  );
};

export default Row1;
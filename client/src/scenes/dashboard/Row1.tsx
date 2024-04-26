import { Typography } from "@mui/material";
import Events from "../event/events";
import Orders from "../order/orders";

const Row1 = () => {
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
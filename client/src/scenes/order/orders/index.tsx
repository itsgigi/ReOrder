import { Box } from "@mui/material";
import Content from "./Row1";

type OrdersProps = {
  isCreateHidden: boolean,
  heigth: string
}

const Orders = ({isCreateHidden, heigth}: OrdersProps) => {
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
    >
      <Content isCreateHidden={isCreateHidden} heigth={heigth}/>
    </Box>
  );
};

export default Orders;
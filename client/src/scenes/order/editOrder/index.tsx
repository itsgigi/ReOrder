import { useParams } from 'react-router-dom';
import { Box } from "@mui/material";
import Content from "./editOrderForm";
import { useGetTransactionsByIdQuery } from '@/state/api';

const EditOrder = () => {
  let { orderId } = useParams();
  const { data: orderData } = useGetTransactionsByIdQuery(orderId!);

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
    >
      {orderData ? <Content orderData={orderData} /> : <>Ordine non trovato</>}
    </Box>
  )
}

export default EditOrder;
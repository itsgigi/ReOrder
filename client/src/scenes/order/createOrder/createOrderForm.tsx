import { Button, Input, Snackbar, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import ProductsList from "./productsList";
import { useCreateOrderMutation } from "@/state/api";
import ProductList from "./productsList";
import { getCookie } from "@/utils/getCookie";
import SelectedProductList from "../editOrder/selectedProductList";

const CreateOrderForm = () => {
  const [createOrder,{ isLoading: isUpdating }] = useCreateOrderMutation();
  const [productList, setProductList] = useState<{productId: string, quantity: number, company: string, price: number}[]>();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [tot, setTot] = useState(0);
  const { palette } = useTheme();
  let userName = getCookie('name');

  function addProductToList(product: string, quantity: number, price: number, company: string) {
    setProductList([...productList ? productList : [], {productId: product, quantity: quantity, company: company, price: price}]);
    let total = tot + (price * quantity);
    setTot(total);
  }

  function updateProductList(newProductList: any) {
    setProductList(newProductList);
  }

  useEffect(() => {
    let total = 0
    productList?.forEach((prod: any) => {
      if(prod.quantity > 0 ){ total = total + (prod.quantity * prod.price);} 
    });
    setTot(total);
  }, [productList])
  
  async function sendOrder() {
    try {
      if(!isUpdating) createOrder(
        {
          buyer: userName,
          amount: tot,
          productIds: productList
        }
      ).then(() => {setOpen(true)}
      ).finally( () => navigate('/orders') )
    } catch {(error: any) => {
      console.error('[createOrder] error ->', error)
    }}  
  }

  return (
    <>
        <div style={{backgroundColor: "#ced3dc", borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: 12, height: 'max-content', padding: 16, width: '100%', boxShadow: "0.1rem 0.15rem 0.1rem 0.1rem rgba(67, 112, 133, 0.9)"}}>
            <Typography style={{fontSize: 16, color: palette.primary[900], marginBottom: 8}}>Crea Nuovo Ordine</Typography>
            <Input type="string" style={{fontSize: 14, color: palette.primary[500]}} placeholder="userName" value={userName} disabled />
            <ProductList addProduct={addProductToList}/>
            <Typography style={{fontSize: 16, color: palette.primary[900]}}>Lista prodotti selezionati</Typography>
            <SelectedProductList productList={productList} setProductList={updateProductList} />
            <Button style={{fontSize: 18}} onClick={sendOrder} disabled={productList?.length! <= 1} >Crea Ordine</Button>
        </div>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => {}}
            message={"Ho aggiunto " + name}
        />
    </>
  );
};

export default CreateOrderForm;
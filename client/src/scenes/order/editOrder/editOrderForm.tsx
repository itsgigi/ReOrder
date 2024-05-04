import { Button, Input, Snackbar, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import ProductsList from "./productsList";
import { useUpdateOrderMutation } from "@/state/api";
import ProductList from "../createOrder/productsList";
import { GetTransactionsResponse } from "@/state/types";

type EditOrderFormProps = {
    orderData: GetTransactionsResponse
}

const EditOrderForm = ({orderData}: EditOrderFormProps) => {
  const [updateOrder,{ isLoading: isUpdating }] = useUpdateOrderMutation();
  //@ts-ignore
  const [productList, setProductList] = useState<{productId: string, quantity: number, company: string}[]>(orderData.productIds);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [tot, setTot] = useState(orderData.amount);
  const [creator, setCreator] = useState(orderData.buyer);
  const { palette } = useTheme();

  function addProductToList(product: string, quantity: number, price: number, company: string) {
    setProductList([...productList, {productId: product, quantity: quantity, company: company}]);
    let total = tot + (price * quantity);
    setTot(total);
  }

  function removeProductFromList(product: string) {
    let tempList = productList.filter(prod => prod.productId != product);
    let total = 0;

    productList.forEach((prod) => {
      let price = parseFloat(prod.productId.split(':')[1]); 
      if(prod.quantity > 0 && prod.productId != product){ total = total + (prod.quantity * price);} 
    });
    setProductList(tempList);
    setTot(total);
  }

  function changeProductQuantity(product: string, value: number) {
    let tempList: { productId: string; quantity: number; company: string; }[] = [];
    let total = 0;
    tempList = productList.map(prod => {
      if(prod.productId === product) {
        return {
        productId: prod.productId,
        quantity: value,
        company: prod.company
        }
      } else {
        return {
          productId: prod.productId,
          quantity: prod.quantity,
          company: prod.company
        }
      }
    })

    productList.forEach((prod) => {
      let price = parseFloat(prod.productId.split(':')[1]); 
      if(prod.quantity > 0 && prod.productId != product){ total = total + (prod.quantity * price);} 
    });
    console.log(tempList)
    setProductList(tempList);
    setTot(total);
  }
  
  async function sendOrder() {
    try {
      if(!isUpdating) updateOrder(
        {
            id: orderData._id,
            buyer: creator,
            amount: tot,
            productIds: productList,
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
            <Typography style={{fontSize: 16, color: palette.primary[900], marginBottom: 8}}>Modifica Ordine Esistente</Typography>
            <Input type="string" style={{fontSize: 14, color: palette.primary[500]}} placeholder="Tuo nome" value={creator} onChange={e => setCreator(e.target.value)} />
            <ProductList addProduct={addProductToList}/>
            <Typography style={{fontSize: 16, color: palette.primary[900]}}>Lista prodotti selezionati</Typography>
            {productList.map((product) => 
              {
                return <div style={{display: 'flex', flexDirection:'column'}}>
                        {product.quantity > 0 && 
                          <div style={{display: 'flex', gap: 8, alignItems: 'center', borderBottom: `solid 1px ${palette.primary[500]}`}}>
                            <Typography style={{color: palette.primary[500]}}>{product.productId}</Typography>
                            <div>
                              <Typography style={{color: palette.primary[500]}}>QUANTITÀ</Typography>
                              <Input style={{fontSize: 12}} value={product.quantity} onChange={(e) => changeProductQuantity(product.productId, parseInt(e.target.value))}/>
                            </div> 
                            <Button style={{fontSize: 12}} onClick={() => removeProductFromList(product.productId)} disabled={false} >Rimuovi</Button>
                          </div>
                        }
                       </div>
              })
            }
            <Button style={{fontSize: 18}} onClick={sendOrder} disabled={false} >Modifica Ordine</Button>
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

export default EditOrderForm;
import { GetCompanyResponse, GetTransactionsResponse, IProductIds } from "@/state/types";
import { useGetTransactionsQuery, useUpdateOrderMutation } from "@/state/api";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import ReactWhatsapp from 'react-whatsapp';
import Button from '@mui/material/Button';
import AlertDialog from "@/components/AlertDialog";

type PreviewCompanyFormProps = {
    orderData: GetCompanyResponse
}
  
const PreviewCompanyForm = ({orderData}: PreviewCompanyFormProps) => {
    const { data: transactionData, isLoading } = useGetTransactionsQuery();
    const [updateOrder,{ isLoading: isUpdating }] = useUpdateOrderMutation();
    const [productList, setProductList] = useState<IProductIds[]>([{productId: 'product', quantity: '', company: '', price: 0}]);
    let temp: {productId: string, quantity: string, company: string, price: number}[] = [];
    const [open, setOpen] = useState(false);

    const filterOrdersByCompany = (transactionData: GetTransactionsResponse[]) => {
        return transactionData.map((order:any) => { 
            order.productIds.map((prod:IProductIds) => {
                if(prod.company === orderData.name){
                    const isProductInList = checkIsProductInList(prod);
                    if(!isProductInList){
                        temp.push({productId: prod.productId, quantity: prod.quantity, price: prod.price, company: prod.company});
                    }
                }
                setProductList(temp);
            } 
        )})
    }

    function checkIsProductInList(prod: IProductIds) {
        let found = false;

        temp.map((product) => {
            if(prod.productId.includes(product.productId)){
                product.quantity = (parseFloat(product.quantity) + parseFloat(prod.quantity)).toString();
                found = true;
            }
        })

        if(found){ 
            return true;
        } else{
            return false;
        }
    }

    function parseProductListToString() {
        let finalString = "";

        {productList.map((product) => {
            finalString = finalString + '\n' + product.productId.replace("- PREZZO:", '').replace(product.productId.split(':')[1], '').replace("- AZIENDA:", '').replace(product.productId.split(':')[2], '') + " QUANTITÀ:" + product.quantity; // Rimuovo prezzo e azienda da productIds
        })}

        return finalString;
    }

    async function removeFromOrder(id: string, creator: string, tot: any, productList: IProductIds[] ) {
        console.log('order', id, creator, productList)
        try {
          if(!isUpdating) updateOrder(
            {
                id: id,
                buyer: creator,
                amount: tot,
                productIds: productList,
            }
          )
        } catch {(error: any) => {
          console.error('[removeFromOrder] error ->', error)
        }}  
    }

    function removeProductsFromOrders() {
        transactionData?.map((order: GetTransactionsResponse) => { 
            order.productIds.map((prod: any) => {
                if(prod.company === orderData.name){
                    temp = order.productIds.filter((item: any) => { return item != prod });
                    removeFromOrder(order.id, order.buyer, order.amount, temp);
                }
            } 
        )})
        //location.reload();
    }

    function handleClickOpen() {
        setOpen(true);
    };
  
    const handleClose = (selectedValue: boolean) => {
      if(selectedValue) removeProductsFromOrders();
      setOpen(false);
    };

    useEffect(() => {
       if(!isLoading) filterOrdersByCompany(transactionData!);
    }, [isLoading]);
  
    return (
      <>
        <div style={{backgroundColor: "#ced3dc", borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: 12, height: 'max-content', padding: 16, width: '100%', boxShadow: "0.1rem 0.15rem 0.1rem 0.1rem rgba(67, 112, 133, 0.9)"}}>
            
            <Typography style={{fontSize:16, fontWeight: 600}}>{orderData.name}</Typography>
            
            {productList.map((product) => {
                return <div key={product.productId}>{product.productId} - QUANTITÀ: {product.quantity}</div>
            })}

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                {//@ts-ignore
                <ReactWhatsapp number={orderData.phoneNumber ? orderData.phoneNumber : '3274510693'} message={parseProductListToString()} style={{flexBasis: 240, height: 73, backgroundColor: '#fcf7f8', borderRadius: 8}}>Apri in Whatsapp</ReactWhatsapp>
                }
                <Button style={{flexBasis: 100, border: '1px solid', fontSize: 11}} onClick={handleClickOpen}>Rimuovi prodotti dagli ordini</Button>
            </div>
        </div>
        
        <AlertDialog open={open} handleClose={handleClose}/>
      </>
    );
  };
  
  export default PreviewCompanyForm;
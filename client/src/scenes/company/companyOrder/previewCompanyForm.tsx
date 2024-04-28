import { GetCompanyResponse, GetTransactionsResponse, IProductIds } from "@/state/types";
import { useGetTransactionsQuery } from "@/state/api";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import ReactWhatsapp from 'react-whatsapp';

type PreviewCompanyFormProps = {
    orderData: GetCompanyResponse
}
  
const PreviewCompanyForm = ({orderData}: PreviewCompanyFormProps) => {
    const { data: transactionData, isLoading } = useGetTransactionsQuery();
    const [productList, setProductList] = useState<{productId: string, quantity: string}[]>([{productId: 'product', quantity: ''}]);
    let temp: {productId: string, quantity: string}[] = []

    const filterOrdersByCompany = (transactionData: GetTransactionsResponse[]) => {
        return transactionData.map((order) => { 
            order.productIds.map((prod) => {
                if(prod.company === orderData.name){
                    const isProductInList = checkIsProductInList(prod);
                    if(!isProductInList){
                        temp.push({productId: prod.productId, quantity: prod.quantity});
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

    useEffect(() => {
       if(!isLoading) filterOrdersByCompany(transactionData!);
    }, [isLoading]);
  
    return (
      <>
          <div style={{backgroundColor: "#ced3dc", borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: 12, height: 'max-content', padding: 16, width: '100%', boxShadow: "0.1rem 0.15rem 0.1rem 0.1rem rgba(67, 112, 133, 0.9)"}}>
            <Typography style={{fontSize:16, fontWeight: 600}}>{orderData.name}</Typography>
            {productList.map((product) => {
                return <div>{product.productId} - {product.quantity}</div>
            })}
            {
                //@ts-ignore
                <ReactWhatsapp number="3274510693" message={productList}>Apri in Whatsapp</ReactWhatsapp>
            }
          </div>
      </>
    );
  };
  
  export default PreviewCompanyForm;
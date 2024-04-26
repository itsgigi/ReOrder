import { useGetProductsQuery } from '@/state/api';
import { Autocomplete, Button, Input, TextField, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

export interface Product {
    id: string,
    name: string,
    price: string,
    company: string,
    transactions: string[],
    quantity: number
}

export interface ProductList {
    productId: any;
    quantity: any;
}

type ProductListProps = {
    addProduct: any
}

export default function ProductList({addProduct}: ProductListProps) {
  const { data: productData } = useGetProductsQuery();
  //@ts-ignore
  const productList = productData && productData.map(prod => prod.name + ' - PREZZO:' + prod.price.toString() + ' - AZIENDA:' + prod.company);
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [company, setCompany] = useState('');
  const { palette } = useTheme();

  function addToOrder() {
    addProduct(product, quantity, price, company);
    setProduct('');
    setCompany('');
    setQuantity(0);
    setPrice(0);
  }
  
  return (
    <div style={{border: 'solid 1px grey', borderRadius: 8, padding: 8, alignItems: 'center', display: 'flex', flexDirection: 'column', backgroundColor: '#fcf7f8', textAlign: 'center'}}>
        <Typography style={{fontSize: 14, color: palette.primary[900], marginBottom: 8}}>Aggiungi Prodotto all'ordine</Typography>
        <div style={{ gap: 8, padding: 6, display: 'flex', flexDirection: 'column'}}>
          
          <Typography style={{fontSize: 10, color: palette.primary[900], marginBottom: 8}}>Scegli Prodotto</Typography>
          <Autocomplete
          id="combo-box-demo"
          key={product}
          options={productList!}
          sx={{ width: 240 }}
          renderInput={(params: any) => <TextField {...params} sx={{ backgroundColor: '#4e8098', borderRadius: 2 }} label={product} onBlur={e => {setProduct(e.target.value), setPrice(parseFloat(e.target.value.split(':')[1])),  setCompany(e.target.value.split(':')[2]) }}/>}
          />

          <Typography style={{fontSize: 10, color: palette.primary[900], margin: 8}}>Quantità</Typography>
          <Input type="number" style={{fontSize: 14, color: palette.primary[900], justifyContent: 'center'}} placeholder="Quantità" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} />

          <Button style={{fontSize: 16, margin: 8}} onClick={addToOrder} disabled={quantity <= 0 || !product}>Aggiungi</Button>
        </div>
    </div>
  );
}
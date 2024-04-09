import {
    useAddProductMutation,
} from "@/state/api";
import { Button, Input, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const [addProduct,{ isLoading: isUpdating }] = useAddProductMutation();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [company, setCompany] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  
  async function createProduct() {
    try {
      if(!isUpdating) addProduct(
        {
          _id: "63bf7ccef03239e" + Math.round(Math.random() * (199999999 - 1000000000) + 1000000000).toString(),
          name: name,
          price: price,
          company: company,
          transactions: [],
        }
      ).then(() => {setOpen(true)}
      ).finally( () => navigate('/products') )
    } catch {(error: any) => {
      console.error('[createProduct] error ->', error)
    }}  
  }

  return (
    <>
        <div style={{backgroundColor: "#ced3dc", borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: 12, height: 'max-content', padding: 16, width: '100%', boxShadow: "0.1rem 0.15rem 0.1rem 0.1rem rgba(67, 112, 133, 0.9)"}}>
            <Typography style={{fontSize: 16, color: '#043028', marginBottom: 8}}>Aggiungi Nuovo Prodotto</Typography>

            <Typography style={{fontSize: 14, color: '#043028'}}>Nome</Typography>
            <Input style={{fontSize: 14, color: '#4e8098'}} placeholder="prodotto" onChange={e => setName(e.target.value)} />
            <Typography style={{fontSize: 14, color: '#043028'}}>Fornitore</Typography>
            <Input style={{fontSize: 14, color: '#4e8098'}} placeholder="azienda" onChange={e => setCompany(e.target.value)} />
            <Typography style={{fontSize: 14, color: '#043028'}}>Prezzo</Typography>
            <Input type="number" style={{fontSize: 14, color: '#4e8098', marginBottom: 8}} placeholder="0.00" onChange={e => setPrice(e.target.value)} />

            <Button style={{fontSize: 18}} onClick={createProduct} disabled={name === '' || price === '' || company === ''} >Aggiungi</Button>
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

export default AddProductForm;
import {
  useAddCompanyMutation
} from "@/state/api";
import { Button, Input, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCompanyForm = () => {
  const [addCompany,{ isLoading: isUpdating }] = useAddCompanyMutation();
  const [name, setName] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  
  async function createCompany() {
    try {
      if(!isUpdating) addCompany(
        {
          _id: "63bf7ccef03239e" + Math.round(Math.random() * (199999999 - 1000000000) + 1000000000).toString(),
          name: name,
          orderDate: orderDate,
          deliveryDate: deliveryDate
        }
      ).then(() => {setOpen(true)}
      ).finally( () => navigate('/companies') )
    } catch {(error: any) => {
      console.error('[createProduct] error ->', error)
    }}  
  }

  return (
    <>
        <div style={{backgroundColor: "#ced3dc", borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: 12, height: 'max-content', padding: 16, width: '100%', boxShadow: "0.1rem 0.15rem 0.1rem 0.1rem rgba(67, 112, 133, 0.9)"}}>
            <Typography style={{fontSize: 16, color: '#043028', marginBottom: 8}}>Aggiungi Nuova Azienda</Typography>

            <Typography style={{fontSize: 14, color: '#043028'}}>Nome</Typography>
            <Input style={{fontSize: 14, color: '#4e8098'}} placeholder="Nome azienda" onChange={e => setName(e.target.value)} />
            <Typography style={{fontSize: 14, color: '#043028'}}>Scadenza Ordine</Typography>
            <Input style={{fontSize: 14, color: '#4e8098'}} placeholder="Giorno entro cui ordinare" onChange={e => setOrderDate(e.target.value)} />
            <Typography style={{fontSize: 14, color: '#043028'}}>Consegna</Typography>
            <Input style={{fontSize: 14, color: '#4e8098', marginBottom: 8}} placeholder="Giorno di consegna" onChange={e => setDeliveryDate(e.target.value)} />

            <Button style={{fontSize: 18}} onClick={createCompany} disabled={name === ''} >Aggiungi</Button>
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

export default AddCompanyForm;
import {
    useAddEventMutation
  } from "@/state/api";
  import { Button, Input, Snackbar, Typography } from "@mui/material";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
  
  const AddEventForm = () => {
    const [addEvent,{ isLoading: isUpdating }] = useAddEventMutation();
    const [name, setName] = useState('');
    const [date, setDate] = useState();
    const [pax, setPax] = useState(0);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    
    async function createEvent() {
      try {
        if(!isUpdating) addEvent(
          {
            _id: "63bf7ccef03239e" + Math.round(Math.random() * (199999999 - 1000000000) + 1000000000).toString(),
            name: name,
            date: date,
            pax: pax
          }
        ).then(() => {setOpen(true)}
        ).finally( () => navigate('/events') )
      } catch {(error: any) => {
        console.error('[createEvent] error ->', error)
      }}  
    }
  
    return (
      <>
          <div style={{backgroundColor: "#ced3dc", borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: 12, height: 'max-content', padding: 16, width: '100%', boxShadow: "0.1rem 0.15rem 0.1rem 0.1rem rgba(67, 112, 133, 0.9)"}}>
              <Typography style={{fontSize: 16, color: '#043028', marginBottom: 8}}>Aggiungi Nuova Azienda</Typography>
  
              <Typography style={{fontSize: 14, color: '#043028'}}>Nome</Typography>
              <Input style={{fontSize: 14, color: '#4e8098'}} placeholder="Nome per identificare l'evento" onChange={e => setName(e.target.value)} />
              <Typography style={{fontSize: 14, color: '#043028'}}>Data</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                        label="Data dell'evento"
                        value={date}
                        onChange={(newValue) => setDate(newValue as any)}
                    />
                </DemoContainer>
              </LocalizationProvider>
              <Typography style={{fontSize: 14, color: '#043028'}}>Persone</Typography>
              <Input type="number" style={{fontSize: 14, color: '#4e8098', marginBottom: 8}} placeholder="Numero persone previste" onChange={e => setPax(parseInt(e.target.value))} />
  
              <Button style={{fontSize: 18}} onClick={createEvent} disabled={name === ''} >Aggiungi</Button>
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
  
  export default AddEventForm;
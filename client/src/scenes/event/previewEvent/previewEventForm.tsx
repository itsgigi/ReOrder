import { Button, Input, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GetEventResponse } from "@/state/types";
import moment from "moment";

type PreviewEventFormProps = {
    eventData: GetEventResponse
}
  
const PreviewEventForm = ({eventData}: PreviewEventFormProps) => {
    const navigate = useNavigate();
  
    return (
      <>
          <div style={{backgroundColor: "#ced3dc", borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: 12, height: 'max-content', padding: 16, width: '100%', boxShadow: "0.1rem 0.15rem 0.1rem 0.1rem rgba(67, 112, 133, 0.9)"}}>
              <Typography style={{fontSize: 16, color: '#043028', marginBottom: 8}}>Dettagli dell'evento</Typography>
  
              <Typography style={{fontSize: 14, color: '#043028'}}>Nome</Typography>
              <Input style={{fontSize: 14, color: '#4e8098'}} placeholder="Nome per identificare l'evento" value={eventData.name} disabled /* onChange={e => setName(e.target.value)} */ />
              <Typography style={{fontSize: 14, color: '#043028'}}>Data</Typography>
              <Input type="date" style={{fontSize: 14, color: '#4e8098', marginBottom: 8}} placeholder="Numero persone previste" value={moment(eventData.date).format('YYYY-MM-DD')} disabled />
              <Typography style={{fontSize: 14, color: '#043028'}}>Persone</Typography>
              <Input type="number" style={{fontSize: 14, color: '#4e8098', marginBottom: 8}} placeholder="Numero persone previste" value={eventData.pax} disabled /*  onChange={e => setPax(parseInt(e.target.value))} */ />
              <Typography style={{fontSize: 14, color: '#043028'}}>Prezzo</Typography>
              <Input style={{fontSize: 14, color: '#4e8098', marginBottom: 8}} placeholder="Prezzo per persona" value={eventData.price + ',00€'} disabled /*  onChange={e => setPax(parseInt(e.target.value))} */ />
              <Typography style={{fontSize: 14, color: '#043028'}}>Menu</Typography>
              <textarea placeholder="Nessun menu inserito" value={eventData.menu} style={{boxSizing: 'border-box',width: '320px', fontFamily: '"Red Hat Display", sans-serif', fontSize: '0.875rem',  background: 'none', fontWeight: 400, padding: '12px', borderRadius: '12px 12px 0 12px', resize: 'none'}}/>
              
              <Button style={{fontSize: 18}} onClick={() => navigate('/events')} >Torna indietro</Button>
          </div>
      </>
    );
  };
  
  export default PreviewEventForm;
import { useParams } from 'react-router-dom';
import { Box } from "@mui/material";
import Content from "./previewEventForm";
import { useGetEventByIdQuery } from '@/state/api';

const PreviewEvent = () => {
  let { eventId } = useParams();
  const { data: eventData } = useGetEventByIdQuery(eventId!);

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
    >
      {eventData ? <Content eventData={eventData} /> : <>Evento non trovato</>}
    </Box>
  )
}

export default PreviewEvent;
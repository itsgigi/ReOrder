import { Box } from "@mui/material";
import Content from "./addEventForm";

const AddEvent = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
    >
      <Content />
    </Box>
    
  );
};

export default AddEvent;
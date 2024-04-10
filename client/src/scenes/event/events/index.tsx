import { Box } from "@mui/material";
import Content from "./Row1";

type EventsProps = {
  isCreateHidden: boolean,
  heigth: string,
  timeFilter: string,
}

const Events = ({isCreateHidden, heigth, timeFilter}: EventsProps) => {
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
    >
      <Content isCreateHidden={isCreateHidden} heigth={heigth} timeFilter={timeFilter}/>
    </Box>
    
  );
};

export default Events;
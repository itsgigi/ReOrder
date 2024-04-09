import { Box } from "@mui/material";
import Row1 from "./Row1";

const Dashboard = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
    >
      <Row1 />
    </Box>
  );
};

export default Dashboard;
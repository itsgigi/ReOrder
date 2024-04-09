import { Box } from "@mui/material";
import { styled } from "@mui/system";

const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  borderRadius: "1rem",
  boxShadow: "0.1rem 0.15rem 0.1rem 0.1rem rgba(67, 112, 133, 0.9)",
}));

export default DashboardBox;
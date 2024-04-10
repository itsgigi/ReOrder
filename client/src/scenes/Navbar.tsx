import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import { Box, Button, Drawer, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { FaBusinessTime, FaCalendarTimes, FaHome, FaPen } from "react-icons/fa";
//import { FaChartGantt } from "react-icons/fa6";
import { Fastfood } from "@mui/icons-material";
import { BiParty } from "react-icons/bi";

const Navbar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  function handleSelection(route: string) {
    setSelected(route);
    setOpen(false);
  }

  const DrawerList = (
    <div style={{display: 'flex', flexDirection: 'column', padding: 48, gap: 16, backgroundColor: '#fcf7f8', minHeight: '100vh'}}>
    <Box sx={{ "&:hover": { color: palette.primary[500] } }}>
      <Link
        to="/"
        onClick={() => handleSelection("dashboard")}
        style={{
          alignItems: 'center', display: 'flex',
          color: selected === "dashboard" ? "inherit" : palette.grey[700],
          textDecoration: "inherit"
        }}
      >
        <FaHome style={{marginRight: 4}}/> <Typography>Dashboard</Typography>
      </Link>
    </Box>
    <Box sx={{ "&:hover": { color: palette.primary[500] } }}>
      <Link
        to="/orders"
        onClick={() => handleSelection("orders")}
        style={{
          alignItems: 'center', display: 'flex',
          color: selected === "orders" ? "inherit" : palette.grey[700],
          textDecoration: "inherit",
        }}
      >
        <FaPen style={{marginRight: 4}}/> Ordini
      </Link>
    </Box>
    <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
      <Link
        to="/products"
        onClick={() => handleSelection("products")}
        style={{
          alignItems: 'center', display: 'flex',
          color: selected === "products" ? "inherit" : palette.grey[700],
          textDecoration: "inherit",
        }}
      >
        <Fastfood style={{marginRight: 4, width: 18}}/> Prodotti
      </Link>
    </Box>
    <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
      <Link
        to="/companies"
        onClick={() => handleSelection("companies")}
        style={{
          alignItems: 'center', display: 'flex',
          color: selected === "companies" ? "inherit" : palette.grey[700],
          textDecoration: "inherit",
        }}
      >
        <FaBusinessTime style={{marginRight: 4}}/> Aziende
      </Link>
    </Box>
    <Box sx={{ "&:hover": { color: palette.primary[500] } }}>
      <Link
        to="/shifts"
        onClick={() => handleSelection("shifts")}
        style={{
          alignItems: 'center', display: 'flex',
          color: selected === "shifts" ? "inherit" : palette.grey[700],
          textDecoration: "inherit",
        }}
      >
        <FaCalendarTimes style={{marginRight: 4}}/>Turni
      </Link>
    </Box>
    <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
      <Link
        to="/events"
        onClick={() => handleSelection("events")}
        style={{
          alignItems: 'center', display: 'flex',
          color: selected === "predictions" ? "inherit" : palette.grey[700],
          textDecoration: "inherit",
        }}
      >
        <BiParty style={{marginRight: 4}}/> Eventi
      </Link>
    </Box>
    {/* <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
      <Link
        to="/predictions"
        onClick={() => handleSelection("predictions")}
        style={{
          alignItems: 'center', display: 'flex',
          color: selected === "predictions" ? "inherit" : palette.grey[700],
          textDecoration: "inherit",
        }}
      >
        <FaChartGantt style={{marginRight: 4}}/>Prospetto
      </Link>
    </Box> */}
  </div>
  )

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem" onClick={() => {handleSelection("dashboard"), navigate('/')}}>
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          Reorder
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <Button onClick={toggleDrawer(true)}>Menu</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </FlexBetween>
  );
};

export default Navbar;

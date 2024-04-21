import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Navbar from "@/scenes/Navbar";
import Events from "@/scenes/event/events";
import Dashboard from "@/scenes/dashboard";
import Orders from "./scenes/order/orders";
import Products from "./scenes/product/products";
import Companies from "./scenes/company/companies";
import AddProduct from "./scenes/product/addProduct";
import ShiftsTable from "./scenes/shifts";
import CreateOrder from "./scenes/order/createOrder";
import EditOrder from "./scenes/order/editOrder";
import AddCompany from "./scenes/company/addCompany";
import AddEvent from "./scenes/event/addEvent";
import PreviewEvent from "./scenes/event/previewEvent";
import Login from "./scenes/login";
/*
import Predictions from "@/scenes/predictions"; */

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box padding="1rem 2rem 4rem 2rem">
            <Navbar />

            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/login" element={<Login />} />
              
              <Route path="/orders" element={<Orders isCreateHidden={false} heigth="90%"/>} />
              <Route path="/createOrder" element={<CreateOrder />} />
              <Route path="/editOrder/:orderId" element={<EditOrder />} />
              
              <Route path="/products" element={<Products />} />
              <Route path="/addProduct" element={<AddProduct />} />

              <Route path="/events" element={<Events isCreateHidden={false} heigth="90%" timeFilter="all"/>} />
              <Route path="/addEvents" element={<AddEvent />} />
              <Route path="/previewEvent/:eventId" element={<PreviewEvent />} />

              <Route path="/companies" element={<Companies />} />
              <Route path="/addCompany" element={<AddCompany />} />

              <Route path="/shifts" element={<ShiftsTable />} />

              <Route path="/predictions" element={<>pred</>} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
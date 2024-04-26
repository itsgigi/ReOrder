import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import {
    useGetCompaniesQuery,
} from "@/state/api";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Row3 = () => {
  const { palette } = useTheme();
  const { data: productData, isLoading } = useGetCompaniesQuery();
  const navigate = useNavigate();

  const productColumns = [
    {
      field: "_id",
      headerName: "Azioni",
      flex: 0.70,
      renderCell: (params: GridCellParams) => <div style={{display: 'flex',position: 'relative'}}>
                                                <div style={{cursor: 'pointer',display:'flex', justifyContent: 'center', alignItems: 'center', border:'solid 1px black', width: 30, height: 32, borderRadius: 4, color: '#6799ac'}} onClick={() => navigate('/companyOrder/' + params.id)}><FaEye /></div>
                                              </div>,
    },
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
    },
    {
      field: "orderDate",
      headerName: "Scadenza ordine",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field: "deliveryDate",
      headerName: "Consegna",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
  ];

  return (
    <>
      {!isLoading ?
      <>
      <div style={{backgroundColor: "#ced3dc", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, boxShadow: "0.1rem 0.15rem 0.1rem 0.1rem rgba(67, 112, 133, 0.9)"}}>
        <Typography style={{fontSize: 14, color: 'black'}}>Aggiungi Nuova Azienda</Typography>
        <Button style={{fontSize: 18}} onClick={() => navigate('/addCompany')}>+</Button>
      </div>
      <DashboardBox>
        <BoxHeader
          title="Lista delle Aziende"
          sideText={`${productData?.length} aziende trovate`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="90%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>
      </>
      : 
      <div style={{width: 'screen', height: 'screen', display:'flex', justifyContent: 'center', paddingTop: 20}}>
        <CircularProgress color="inherit" />
      </div>
      }
    </>
  );
};

export default Row3;
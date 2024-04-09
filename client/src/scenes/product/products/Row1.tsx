import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import {
  useGetProductsQuery,
} from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const Row3 = () => {
  const { palette } = useTheme();
  const { data: productData } = useGetProductsQuery();
  const navigate = useNavigate();

  const productColumns = [
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field: "company",
      headerName: "Fornitore",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field: "price",
      headerName: "Prezzo",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `€${params.value}`,
    },
  ];

  return (
    <>
      <div style={{backgroundColor: "#ced3dc", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, boxShadow: '0.1rem 0.15rem 0.1rem 0.1rem rgba(67, 112, 133, 0.9'}}>
        <Typography style={{fontSize: 14, color: 'black'}}>Crea Nuovo Prodotto</Typography>
        <Button style={{fontSize: 18}} onClick={() => navigate('/addProduct')}>+</Button>
      </div>
      <DashboardBox>
        <BoxHeader
          title="Lista dei Prodotti"
          sideText={`${productData?.length} prodotti trovati`}
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
  );
};

export default Row3;
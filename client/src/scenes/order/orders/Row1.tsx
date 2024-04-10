import AlertDialog from "@/components/AlertDialog";
import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import {
  useDeleteOrderMutation,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type RowProps = {
  isCreateHidden: boolean,
  heigth: string
}

const Row1 = ({isCreateHidden, heigth}: RowProps) => {
  const { palette } = useTheme();
  const { data: transactionData, isLoading } = useGetTransactionsQuery();
  const [deleteOrder,{ isLoading: isDeleting }] = useDeleteOrderMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');

  const handleClickOpen = (id: string) => {
    setIdToDelete(id);
    setOpen(true);
  };

  const handleClose = (selectedValue: boolean) => {
    if(selectedValue) deleteOrderById(idToDelete);
    setIdToDelete('');
    setOpen(false);
  };

  async function deleteOrderById(orderId: string) {
    try {
      if(!isDeleting) deleteOrder(orderId)
      .finally( () => navigate('/orders') )
    } catch {(error: any) => {
      console.error('[deleteOrderById] error ->', error)
    }}  
  }

  const transactionColumns = [
    {
      field: "_id",
      headerName: "Azioni",
      flex: 0.40,
      renderCell: (params: GridCellParams) => <div style={{display: 'flex',position: 'relative',top: 5, gap: 20}}>
                                                <div style={{cursor: 'pointer',display:'flex', justifyContent: 'center', alignItems: 'center', border:'solid 1px black', width: 30, height: 32, borderRadius: 4, color: '#6799ac'}} onClick={() => navigate('/editOrder/' + params.id)}><FaEdit /></div>
                                                <div style={{cursor: 'pointer',display:'flex', justifyContent: 'center', alignItems: 'center', border:'solid 1px black', width: 30, height: 32, borderRadius: 4, color:'#e80303d1'}} onClick={() => handleClickOpen(params.id.toString())}><FaTrash /></div>
                                              </div>,
    }, 
    {
      field: "buyer",
      headerName: "Fatto da",
      flex: 0.35,
    },
    {
      field: "amount",
      headerName: "Totale",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `€${params.value}`,
    }/* ,
    {
      field: "productIds",
      headerName: "N Prodotti",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    }, */
  ];

  return (
    <>
      {!isLoading ?
      <>
      <div style={{backgroundColor: "#ced3dc", borderRadius: '10px', display: isCreateHidden ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, boxShadow: '0.1rem 0.15rem 0.1rem 0.1rem rgba(67, 112, 133, 0.9'}}>
        <Typography style={{fontSize: 14, color: 'black'}}>Crea Nuovo Ordine</Typography>
        <Button style={{fontSize: 18}} onClick={() => navigate('/createOrder')}>+</Button>
      </div>
      <DashboardBox>
        <BoxHeader
          title="Ordini recenti"
          sideText={`${transactionData?.length} ordini trovati`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height={heigth}
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
            rowHeight={45}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>
      <AlertDialog open={open} handleClose={handleClose}/>
      </>
      : 
      <div style={{width: 'screen', height: 'screen', display:'flex', justifyContent: 'center', paddingTop: 20}}>
        <CircularProgress color="inherit" />
      </div>
      }
    </>
  );
};

export default Row1;
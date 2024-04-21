import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import {
    useGetEventsQuery,
} from "@/state/api";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import moment from "moment";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type RowProps = {
  isCreateHidden: boolean,
  heigth: string,
  timeFilter: string
}

const Row1 = ({isCreateHidden, heigth, timeFilter}: RowProps) => {
  const { palette } = useTheme();
  const { data: eventData, isLoading } = useGetEventsQuery();
  const today = new Date();
  const filteredData = eventData 
    ? eventData.filter((event) => 
        {
          let eventDate = new Date(event.date);
          if(timeFilter === 'week'){
            if(eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear() && eventDate.getDate() - today.getDate() <= 7 && eventDate.getDate() - today.getDate() >= 0){
              return eventDate
            }
          } else if(timeFilter === 'all') return eventDate
        })
          // TODO: add case month, year  
    : undefined;
  const navigate = useNavigate();

  const productColumns = [
    {
      field: "_id",
      headerName: "Azioni",
      flex: 0.70,
      renderCell: (params: GridCellParams) => <div style={{display: 'flex',position: 'relative'}}>
                                                <div style={{cursor: 'pointer',display:'flex', justifyContent: 'center', alignItems: 'center', border:'solid 1px black', width: 30, height: 32, borderRadius: 4, color: '#6799ac'}} onClick={() => navigate('/previewEvent/' + params.id)}><FaEye /></div> {/* TODO: Create PreviewEvent */}
                                              </div>,
    },
    {
      field: "name",
      headerName: "Nome",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field: "date",
      headerName: "Data",
      flex: 0.5,
      renderCell: (params: GridCellParams) => <>{moment(params.value as string).format("DD-MM-YYYY")}</>,
    },
    {
      field: "pax",
      headerName: "Persone",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
  ];

  return (
    <>
    {!isLoading ?
      <>
      <div style={{backgroundColor: "#ced3dc",  borderRadius: '10px', display: isCreateHidden ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, boxShadow: '0.1rem 0.15rem 0.1rem 0.1rem rgba(67, 112, 133, 0.9'}}>
        <Typography style={{fontSize: 14, color: 'black'}}>Crea Nuovo Evento</Typography>
        <Button style={{fontSize: 18}} onClick={() => navigate('/addEvents')}>+</Button>
      </div>
      <DashboardBox>
        <BoxHeader
          title="Lista degli eventi"
          sideText={`${eventData?.length! > 0 ? eventData?.length : 0} eventi trovati`}
        />
        <div/>
        { filteredData?.length! > 0 ?
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
            rowHeight={35}
            hideFooter={true}
            rows={filteredData || []}
            columns={productColumns}
          />
        </Box>
        : <Box 
          mt="1rem"
          p="0 1rem 1rem"
          height={heigth}>
            Nessun evento trovato
          </Box>
        }
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

export default Row1;
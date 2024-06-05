import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { getCookie } from "@/utils/getCookie";
import { Delete } from "@mui/icons-material";
import { Box, Button, Input, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";

type SelectedProductListProps = {
    productList: any,
    setProductList: any
}  

const SelectedProductList = ({ productList, setProductList }: SelectedProductListProps) => {
  const { palette } = useTheme();
  let role = getCookie('role');
  const isAdmin = role === "Admin" ? true : false;

  const productListColumns = [
    {
      field: "productId",
      headerName: "Nome",
      flex: 0.40,
      renderCell: (params: any) => `${params.value.split('-')[0]}`,
    },
    {
      field: "price",
      headerName: "Prezzo Unitario",
      id: '111',
      flex: 0.15,
      renderCell: (params: GridCellParams) => `${isAdmin ? '€'+params.value : '/'}`,
    },
    {
      field: "company",
      id: '11',
      headerName: "Azienda",
      flex: 0.35,
    },
    {
      field: "quantity",
      headerName: "Quantità",
      id: '1',
      flex: 0.15,
      renderCell: (params: GridCellParams) => <Input style={{fontSize: 12}} value={params.value} onChange={(e) => changeProductQuantity(params.id as string, parseInt(e.target.value))}/>
    },
    {
        headerName: "Azioni",
        flex: 0.10,
        renderCell: (params: GridCellParams) => <Button style={{fontSize: 12}} onClick={() => removeProductFromList(params.id as string)} disabled={false} ><Delete /></Button>
      },
  ];

  function removeProductFromList(product: string) {
    let tempList = productList.filter((prod: any) => prod.productId != product);

    setProductList(tempList);
  }

  function changeProductQuantity(product: string, value: number) {
    let tempList: { productId: string; quantity: number; company: string; price: number }[] = [];

    tempList = productList.map((prod: any) => {
      if(prod.productId === product) {
        return {
          productId: prod.productId,
          quantity: value,
          company: prod.company,
          price: prod.price
        }
      } else {
        return {
          productId: prod.productId,
          quantity: prod.quantity,
          company: prod.company,
          price: prod.price
        }
      }
    })

    setProductList(tempList);
  }

  return (
    <>
      <DashboardBox>
        <BoxHeader
          title="Lista prodotti selezionati"
          sideText={`${productList?.length} prodotti trovati`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
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
            autoHeight
            getRowId={(row) => row.productId}
            rowHeight={45}
            hideFooter={true}
            rows={productList || []}
            //@ts-ignore
            columns={productListColumns}
          />
        </Box>
      </DashboardBox>
    </>
  );
};

export default SelectedProductList;
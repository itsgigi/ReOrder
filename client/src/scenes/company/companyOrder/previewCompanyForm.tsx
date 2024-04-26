import { GetCompanyResponse, /* GetTransactionsResponse */ } from "@/state/types";
/* import { useGetTransactionsQuery } from "@/state/api";
import { useMemo } from "react"; */

type PreviewCompanyFormProps = {
    orderData: GetCompanyResponse
}
  
const PreviewCompanyForm = ({orderData}: PreviewCompanyFormProps) => {
    /* const { data: transactionData, isLoading } = useGetTransactionsQuery();
    const filteredItems = useMemo(() => filterOrdersByCompany(transactionData!), [isLoading]);

    const filterOrdersByCompany = (transactionData: GetTransactionsResponse[]) => {
        return transactionData.map((order) => order.productIds.map((prod) => prod.company ))
    } */

    console.log(orderData)
  
    return (
      <>
          <div style={{backgroundColor: "#ced3dc", borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: 12, height: 'max-content', padding: 16, width: '100%', boxShadow: "0.1rem 0.15rem 0.1rem 0.1rem rgba(67, 112, 133, 0.9)"}}>
              test
          </div>
      </>
    );
  };
  
  export default PreviewCompanyForm;
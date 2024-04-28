import { Box } from "@mui/material";
import Content from "./previewCompanyForm";
import { useParams } from "react-router-dom";
import { useGetCompanyByIdQuery } from "@/state/api";

const CompanyOrder = () => {
  let { companyId } = useParams();
  const { data: companyData, isLoading } = useGetCompanyByIdQuery(companyId!);

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
    >
     {!isLoading && <Content orderData={companyData!} />}
    </Box>
    
  );
};

export default CompanyOrder;
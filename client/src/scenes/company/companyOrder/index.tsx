import { Box } from "@mui/material";
import Content from "./previewCompanyForm";
import { useParams } from "react-router-dom";
import { useGetCompanyByIdQuery } from "@/state/api";

const CompanyOrder = () => {
  let { companyId } = useParams();
  console.log('params',companyId)
  const { data: companyData } = useGetCompanyByIdQuery(companyId!);

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
    >
      <Content orderData={companyData!} />
    </Box>
    
  );
};

export default CompanyOrder;
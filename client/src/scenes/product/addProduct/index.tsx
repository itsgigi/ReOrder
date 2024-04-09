import { Box } from "@mui/material";
import Content from "./addProductForm";

const AddProduct = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
    >
      <Content />
    </Box>
    
  );
};

export default AddProduct;
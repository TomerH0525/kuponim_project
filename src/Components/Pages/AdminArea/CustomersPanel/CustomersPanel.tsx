import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, Button, Typography, styled } from '@mui/material';
import adminService from '../../../Services/AdminService';
import errorHandler from '../../../Services/ErrorHandler';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Customer from '../../../Models/Customer';
import { customersStore } from '../../../Redux/CustomersStore';

const CustomButton = styled(Button)({
  backgroundColor: "rgba(245, 245, 245 ,1)",
  fontSize: "2ex",
  color: "black",
  "&:focus": {
      backgroundColor: "rgba(0, 230, 118, 1)",
      color: "black",
  }
  , "&:hover": {
      backgroundColor: "rgba(0, 230, 118, 1)",
  },
  fontWeight: 700,
  width: "10%",
  minWidth: "150px",
  maxWidth: "200px",
})

function CustomersPanel(): JSX.Element {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customers, setCustomers] = useState<Customer[]>(customersStore.getState().customers);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();


  function removeCustomer(customerId:number) {
    adminService.deleteCustomerById(customerId)
    .then((something) => toast.success(something))
    .catch((err) => errorHandler.showError(err));
  }


  useEffect(() => {

    if (customers === null || customers === undefined) {
      adminService.getAllCustomers()
      .then((customers) => {
        if (Array.isArray(customers) && customers.length > 0) {
          setCustomers(customers)
        }else{
          
        }
      })
      .catch((err) => {errorHandler.showError(err)})
    }
    
    customersStore.subscribe(() =>{
      setCustomers(customersStore.getState().customers)
    })
  },[customers])

  const displayedRows = Array.isArray(customers) ? customers.slice(page * rowsPerPage, (page + 1) * rowsPerPage) : null;


  return (
    <Box>

    <Box sx={{display: 'flex',flexDirection:"column",alignItems:"center", height: '100%', justifyContent: 'center'}}>
      <Typography variant='h3' marginY={3}>Customers</Typography>
    <TableContainer sx={{ backgroundColor: 'rgba(158, 158, 158, 0.8)', width: '80%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Purchased Coupons</TableCell>
            <TableCell sx={{textAlign:"center",width:"325px"}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows?.map((customer) => (
            <TableRow key={customer?.customerID}>
              <TableCell>{customer?.customerID}</TableCell>
              <TableCell>
                <Typography> {customer?.firstName} {customer?.lastName}</Typography> 
                </TableCell>
              <TableCell>{customer?.email}</TableCell>
              <TableCell >
                <Typography sx={{display:"inline",fontSize:"2.5ex"}}>
                {customer?.coupons !== null ? customer?.coupons?.length : 0}
                </Typography>

              
              </TableCell>
              <TableCell>
              <Button sx={{marginX:0.5,backgroundColor: "rgba(245, 245, 245 ,1)", fontSize: "2ex", color: "black",fontWeight: 700,marginLeft:1,
                    "&:focus": {
                        backgroundColor: "rgba(255, 179, 0, 0.9)",
                        color: "black"}
                    ,"&:hover": {
                        backgroundColor: "rgba(255, 179, 0, 0.9)"}}} size="small" onClick={() => navigate("/AdminPanel/customers/"+customer?.customerID)}> show coupons </Button>

                <Button sx={{marginX:0.5,backgroundColor: "rgba(245, 245, 245 ,1)", fontSize: "2ex", color: "black",fontWeight: 700,
                    "&:focus": {
                        backgroundColor: "rgba(3, 155, 229, 1)",
                        color: "black"
                    },
                    "&:hover": {
                        backgroundColor: "rgba(3, 155, 229, 1)"
                      }}} onClick={() =>{navigate("/AdminPanel/Customer/Edit/"+customer.customerID)}}  size="small"> Edit </Button>

                  <Button sx={{marginX:0.5,backgroundColor: "rgba(245, 245, 245 ,1)", fontSize: "2ex", color: "black",fontWeight: 700,
                    "&:focus": {
                        backgroundColor: "rgba(198, 40, 40, 0.9)",
                        color: "black"}
                    ,"&:hover": {
                        backgroundColor: "rgba(198, 40, 40, 0.9)"}}} onClick={() =>{removeCustomer(customer.customerID)}}  size="small"> Remove </Button>

               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box display={"flex"} sx={{justifyContent:"end",marginX:1,marginTop:1}}>
    <CustomButton size="small" sx={{fontSize:"2ex",marginX:1}} onClick={() => navigate("/AdminPanel/Customers/AddCustomer")}>Add Customer</CustomButton>
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]} // Customize available options
        component="div"
        count={customers !== null && customers !== undefined ? customers.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
    </Box>
    </Box>
  );
}

export default CustomersPanel;
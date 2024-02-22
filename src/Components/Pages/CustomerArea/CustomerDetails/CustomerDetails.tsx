import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, Button, Typography, styled } from '@mui/material';
import Company from '../../../Models/Company';
import errorHandler from '../../../Services/ErrorHandler';
import { companiesStore } from '../../../Redux/CompaniesStore';
import { useNavigate, useParams } from 'react-router-dom';
import { companyStore } from '../../../Redux/CompanyStore';
import companyService from '../../../Services/CompanyService';
import { toast } from 'react-toastify';
import dateFormat, { masks } from "dateformat";
import { authStore } from '../../../Redux/AuthStore';
import ClientType from '../../../Models/ClientType';
import adminService from '../../../Services/AdminService';
import { customerStore } from '../../../Redux/CustomerStore';
import Customer from '../../../Models/Customer';
import customerService from '../../../Services/CustomerService';


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

function CustomerDetails(): JSX.Element {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customer, setCustomer] = useState<Customer>(customerStore.getState().customer);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();

  const { customerId } = useParams();

  const getCustomerDetails = async () =>{
    setCustomer((await adminService.getCustomerByID(parseInt(customerId))));
  }

  const isAdmin: boolean = authStore.getState().user?.clientType === ClientType.Administrator;

  useEffect(() => {

    if (customer === null || customer === undefined) {

      if (isAdmin) {
        getCustomerDetails();
      }else{
      customerService.getCustomerDetails()
      .then((thisCustomer) => {
        setCustomer(thisCustomer);
        
      })
      .catch((err) => {errorHandler.showError(err)})
    }}
    
    customerStore.subscribe(() =>{
      setCustomer(customerStore.getState().customer)
    })
  },[customer])

  const removeCoupon = (couponID: number) => {
    console.log(couponID);
    
    companyService.deleteCoupon(couponID)
    .then((answer) => toast.success(answer))
    .catch((err) => errorHandler.showError(err))
  }

  const displayedRows = Array.isArray(customer?.coupons) ? customer.coupons.slice(page * rowsPerPage, (page + 1) * rowsPerPage) : null;
  const numOfCoupons = customer?.coupons !== null && customer?.coupons !== undefined ? customer.coupons?.length : 0;


  return (
    <Box>

    <Box sx={{display: 'flex',flexDirection:"column",alignItems:"center", height: '100%', justifyContent: 'center'}}>
      <Typography variant='h3' marginY={3}>{!isAdmin ? "My Details" : null}</Typography>
      <Box display={"flex"} sx={{justifyContent:"space-evenly",width:"70%",marginY:2}}>
        <Box>
        <Typography display={"inline"} fontSize={"2ex"} fontWeight={700}>customerID: </Typography> <Typography fontSize={"2ex"} display={"inline"}> {customer?.customerID} </Typography>
        </Box>
        <Box>
        <Typography display={"inline"} fontSize={"2ex"} fontWeight={700}>Full name: </Typography> <Typography fontSize={"2ex"} display={"inline"}> {customer?.firstName + " " + customer?.lastName} </Typography>
        </Box>
        <Box>
        <Typography display={"inline"} fontSize={"2ex"} fontWeight={700}>Email: </Typography> <Typography fontSize={"2ex"} display={"inline"}> {customer?.email} </Typography>
        </Box>
        <Box>
        <Typography display={"inline"} fontSize={"2ex"} fontWeight={700}>Purchased coupons: </Typography> <Typography fontSize={"2ex"} display={"inline"}> {numOfCoupons} </Typography>
        </Box>
      </Box>
    <TableContainer sx={{ backgroundColor: 'rgba(158, 158, 158, 0.8)', width: '60%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:700, textDecoration:"underline"}}>ID</TableCell>
            <TableCell sx={{fontWeight:700}}>Title</TableCell>
            <TableCell sx={{fontWeight:700}}>Category</TableCell>
            <TableCell sx={{fontWeight:700}}>Price</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows?.sort((a,b)=> a.couponID-b.couponID).map((coupon) => (
            <TableRow key={coupon?.couponID}>
              <TableCell>{coupon?.couponID}</TableCell>
              <TableCell>{coupon?.title}</TableCell>
              <TableCell>{coupon?.category}</TableCell>
              <TableCell sx={{color:"green"}}>{coupon?.price}</TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]} 
        component="div"
        count={numOfCoupons}
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

export default CustomerDetails;
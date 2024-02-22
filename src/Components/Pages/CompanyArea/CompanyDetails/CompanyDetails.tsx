import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, Button, Typography, styled } from '@mui/material';
import Company from '../../../Models/Company';
import errorHandler from '../../../Services/ErrorHandler';
import { useNavigate, useParams } from 'react-router-dom';
import { companyStore } from '../../../Redux/CompanyStore';
import companyService from '../../../Services/CompanyService';
import { toast } from 'react-toastify';
import dateFormat, { masks } from "dateformat";
import { authStore } from '../../../Redux/AuthStore';
import ClientType from '../../../Models/ClientType';
import adminService from '../../../Services/AdminService';



function CompanyDetails(): JSX.Element {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [company, setCompany] = useState<Company>(companyStore.getState().company);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();

  const { companyId } = useParams();

  const getCompanyDetails = async () =>{
    adminService.getCompanyById(parseInt(companyId))
    .then((company) => setCompany(company))
    .catch((err) => errorHandler.showError(err))
  }

  const isAdmin: boolean = authStore.getState().user?.clientType === ClientType.Administrator;

  useEffect(() => {    
    if (company === null || company === undefined) {
      if (isAdmin) {
        getCompanyDetails();
      }
    }
    
    companyStore.subscribe(() =>{
      setCompany(companyStore.getState().company)
    })
  },[company])

  const removeCoupon = (couponID: number) => {
    companyService.deleteCoupon(couponID)
    .then((answer) => toast.success(answer))
    .catch((err) => errorHandler.showError(err))
  }

  const displayedRows = Array.isArray(company?.coupons) ? company.coupons.slice(page * rowsPerPage, (page + 1) * rowsPerPage) : null;
  const numOfCoupons = company?.coupons !== null && company?.coupons !== undefined ? company.coupons?.length : 0;

  const remainingDays = (endDate: Date) => {
    const dateToday = new Date().getTime();
    const endDateTime: number = new Date(endDate).getTime();
    
    const remainingDays = ((Math.round((endDateTime - dateToday) / (1000 * 3600 * 24)))+1);
    return remainingDays;
  }

  return (
    <Box>

    <Box sx={{display: 'flex',flexDirection:"column",alignItems:"center", height: '100%', justifyContent: 'center'}}>
      <Typography variant='h3' marginY={3}>{!isAdmin ? "My Details" : null}</Typography>
      <Box display={"flex"} sx={{justifyContent:"space-evenly",width:"70%",marginY:2}}>
        <Box>
        <Typography display={"inline"} fontSize={"2ex"} fontWeight={700}>companyID: </Typography> <Typography fontSize={"2ex"} display={"inline"}> {company?.id} </Typography>
        </Box>
        <Box>
        <Typography display={"inline"} fontSize={"2ex"} fontWeight={700}>Name: </Typography> <Typography fontSize={"2ex"} display={"inline"}> {company?.name} </Typography>
        </Box>
        <Box>
        <Typography display={"inline"} fontSize={"2ex"} fontWeight={700}>Email: </Typography> <Typography fontSize={"2ex"} display={"inline"}> {company?.email} </Typography>
        </Box>
        <Box>
        <Typography display={"inline"} fontSize={"2ex"} fontWeight={700}>Number of coupons: </Typography> <Typography fontSize={"2ex"} display={"inline"}> {numOfCoupons} </Typography>
        </Box>
      </Box>
    <TableContainer sx={{ backgroundColor: 'rgba(158, 158, 158, 0.8)', width: '80%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:700, textDecoration:"underline"}}>ID</TableCell>
            <TableCell sx={{fontWeight:700}}>Title</TableCell>
            <TableCell sx={{fontWeight:700}}>Category</TableCell>
            <TableCell sx={{fontWeight:700}}>Stock</TableCell>
            <TableCell sx={{fontWeight:700}}>Start Date</TableCell>
            <TableCell sx={{fontWeight:700}}>End Date</TableCell>
            <TableCell sx={{fontWeight:700}}>Expires in</TableCell>

            <TableCell sx={{textAlign:"center",width:"175px", fontWeight:700}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows?.sort((a,b)=> a.couponID-b.couponID).map((coupon) => (
            <TableRow key={coupon?.couponID}>
              <TableCell>{coupon?.couponID}</TableCell>
              <TableCell>{coupon?.title}</TableCell>
              <TableCell>{coupon?.category}</TableCell>
              <TableCell>{coupon?.amount}</TableCell>
              <TableCell>{dateFormat(coupon?.startDate,'dd/mm/yyyy')}</TableCell>
              <TableCell>{dateFormat(coupon?.endDate,'dd/mm/yyyy')}</TableCell>
              <TableCell>{remainingDays(coupon?.endDate as Date)+" days"}</TableCell>

              <TableCell>

                <Button sx={{marginX:0.5,backgroundColor: "rgba(245, 245, 245 ,1)", fontSize: "2ex", color: "black",fontWeight: 700,
                    "&:focus": {
                        backgroundColor: "rgba(3, 155, 229, 1)",
                        color: "black"
                    },
                    "&:hover": {
                        backgroundColor: "rgba(3, 155, 229, 1)"
                      }}} onClick={() =>{navigate("/coupon/"+coupon.couponID+"/edit")}} disabled={isAdmin} size="small"> Edit </Button>

                  <Button sx={{marginX:0.5,backgroundColor: "rgba(245, 245, 245 ,1)", fontSize: "2ex", color: "black",fontWeight: 700,
                    "&:focus": {
                        backgroundColor: "rgba(198, 40, 40, 0.9)",
                        color: "black"}
                    ,"&:hover": {
                        backgroundColor: "rgba(198, 40, 40, 0.9)"}}} disabled={isAdmin} onClick={() =>{removeCoupon(coupon?.couponID)}}  size="small"> Remove </Button>

               </TableCell>
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

export default CompanyDetails;
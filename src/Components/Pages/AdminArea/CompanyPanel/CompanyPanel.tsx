import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, Button, Typography, makeStyles, styled } from '@mui/material';
import './CompanyPanel.css';
import adminService from '../../../Services/AdminService';
import Company from '../../../Models/Company';
import errorHandler from '../../../Services/ErrorHandler';
import { toast } from 'react-toastify';
import { companiesStore } from '../../../Redux/CompaniesStore';
import { useNavigate } from 'react-router-dom';

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

function CompanyPanel(): JSX.Element {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [companies, setCompanies] = useState<Company[]>(companiesStore.getState().companies);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();


  function removeCompany(companyId:number) {
    adminService.deleteCompanyById(companyId)
    .then((something) => toast.success(something))
    .catch((err) => errorHandler.showError(err));
  }

  useEffect(() => {

    if (companies === null || companies === undefined) {
      adminService.getAllCompanies()
      .then((companies) => {
        if (Array.isArray(companies)) {
          setCompanies(companies)
      }else{
          const companyArray:Company[] = [];
          companyArray.push(companies)
          setCompanies(companyArray)
      }})
      .catch((err) => {errorHandler.showError(err)})
    }
    
    companiesStore.subscribe(() =>{
      setCompanies(companiesStore.getState().companies)
    })
  },[companies])

  const displayedRows = Array.isArray(companies) ? companies.slice(page * rowsPerPage, (page + 1) * rowsPerPage) : null;


  return (
    <Box>

    <Box sx={{display: 'flex',flexDirection:"column",alignItems:"center", height: '100%', justifyContent: 'center'}}>
      <Typography variant='h3' marginY={3}>Companies</Typography>
    <TableContainer sx={{ backgroundColor: 'rgba(158, 158, 158, 0.8)', width: '80%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Coupons</TableCell>
            <TableCell sx={{textAlign:"center",width:"325px"}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows?.map((company) => (
            <TableRow key={company?.id}>
              <TableCell>{company?.id}</TableCell>
              <TableCell>{company?.name}</TableCell>
              <TableCell>{company?.email}</TableCell>
              <TableCell >
                <Typography sx={{display:"inline",fontSize:"2.5ex"}}>
                {company.coupons !== null ? company.coupons.length : 0}
                </Typography>

              
              </TableCell>
              <TableCell>
              <Button sx={{marginX:0.5,backgroundColor: "rgba(245, 245, 245 ,1)", fontSize: "2ex", color: "black",fontWeight: 700,marginLeft:1,
                    "&:focus": {
                        backgroundColor: "rgba(255, 179, 0, 0.9)",
                        color: "black"}
                    ,"&:hover": {
                        backgroundColor: "rgba(255, 179, 0, 0.9)"}}} size="small" onClick={() => navigate("/AdminPanel/companies/"+company?.id)}> show coupons </Button>

                <Button sx={{marginX:0.5,backgroundColor: "rgba(245, 245, 245 ,1)", fontSize: "2ex", color: "black",fontWeight: 700,
                    "&:focus": {
                        backgroundColor: "rgba(3, 155, 229, 1)",
                        color: "black"
                    },
                    "&:hover": {
                        backgroundColor: "rgba(3, 155, 229, 1)"
                      }}} onClick={() =>{navigate("/AdminPanel/Companie/Edit/"+company.id)}}  size="small"> Edit </Button>

                  <Button sx={{marginX:0.5,backgroundColor: "rgba(245, 245, 245 ,1)", fontSize: "2ex", color: "black",fontWeight: 700,
                    "&:focus": {
                        backgroundColor: "rgba(198, 40, 40, 0.9)",
                        color: "black"}
                    ,"&:hover": {
                        backgroundColor: "rgba(198, 40, 40, 0.9)"}}} onClick={() =>{removeCompany(company.id)}}  size="small"> Remove </Button>

               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box display={"flex"} sx={{justifyContent:"end",marginX:1,marginTop:1}}>
    <CustomButton size="medium" sx={{fontSize:"2ex",marginX:1}} onClick={() => navigate("/AdminPanel/Companies/AddCompany")}>Add Company</CustomButton>
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]} 
        component="div"
        count={companies !== null && companies !== undefined ? companies.length : 0}
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

export default CompanyPanel;
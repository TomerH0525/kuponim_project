import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box } from '@mui/material';
import './CompanyPanel.css';
import adminService from '../../../Services/AdminService';

function CompanyPanel(): JSX.Element {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = [
    { id: 1, companyName: 'ABC Corp', email: 'abc@example.com', coupons: 10 },
    { id: 2, companyName: 'XYZ Ltd', email: 'xyz@example.com', coupons: 5 },
    // Add more rows as needed
  ];

  useEffect(() => {
    adminService.getAllCompanies()
  },[])

  const displayedRows = rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Box sx={{display: 'flex', height: '100%', justifyContent: 'center'}}>
    <TableContainer sx={{ backgroundColor: 'rgba(158, 158, 158, 0.8)', width: '80%', marginTop: '3%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Coupons</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.companyName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.coupons}</TableCell>
              <TableCell> {/* Custom actions here */}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]} // Customize available options
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
    </Box>
  );
}

export default CompanyPanel;
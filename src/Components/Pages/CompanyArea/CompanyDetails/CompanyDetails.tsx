import { useEffect, useState } from "react";
import "./CompanyDetails.css";
import companyService from "../../../Services/CompanyService";
import LeftPanel from "../../MyDetails/LeftPannel/LeftPannel";
import { Box, Button, Input, InputLabel, Modal, TextField } from "@mui/material";


function CompanyDetails(): JSX.Element {
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({
      name: '',
      email: '',
      message: '',
    });
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formValues);
        handleClose();
      };
      
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
          ...formValues,
          [event.target.name]: event.target.value,
        });
      };
  
    return (
      <div className="CompanyDetails">
        <Button onClick={handleOpen}>Add Coupon</Button>
        <Modal open={open} onClose={handleClose} sx={{display:"flex", justifyContent:"center",justifyItems:"center", alignItems:"center"}}>
            <Box sx={{backgroundColor:"rgb(255, 253, 231, 0.9)", height:"60%" , width:"50%"}}>
          <form onSubmit={handleSubmit} className="AddCustomerForm">
            <TextField
            sx={{maxWidth:"30%"}}
              label="Title"
              name="title"
              value={formValues.name}
              onChange={handleChange}
            />
            <TextField
            sx={{maxWidth:"30%"}}
              label="Description"
              name="description"
              value={formValues.email}
              onChange={handleChange}
            />
            <TextField
            sx={{maxWidth:"30%"}}
              label="Amount"
              name="amount"
              type="number"
              value={formValues.message}
              onChange={handleChange}
            />
            <TextField
            sx={{maxWidth:"30%"}}
            type="number"
              label="Price"
              name="price"
              value={formValues.message}
              onChange={handleChange}
            />
            <div className="DateDiv">
            <TextField
            sx={{maxWidth:"30%"}}
            type="date"
              name="startDate"
              value={formValues.message}
              onChange={handleChange}
            />
            <TextField
            sx={{maxWidth:"30%"}}
            type="date"
              name="endDate"
              value={formValues.message}
              onChange={handleChange}
            />
            </div>
            
            
             <InputLabel htmlFor="image">Image</InputLabel>
        <Input id="image" type="file" />
        <img id="image-preview"></img>
            <Button type="submit" size="large">Submit</Button>
          </form>
          </Box>
        </Modal>
      </div>
    );
  }



export default CompanyDetails;

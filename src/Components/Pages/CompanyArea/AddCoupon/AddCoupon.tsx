import "./AddCoupon.css";
import { useEffect, useState } from "react";
import companyService from "../../../Services/CompanyService";
import { Box, Button, Input, InputLabel, Modal, TextField, TextareaAutosize } from "@mui/material";

function AddCoupon(): JSX.Element {

    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({
      title: '',
      description: '',
      price: '',
      amount: '',
      startDate: '',
      endDate: '',
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
        <div className="AddCoupon">
			<Button onClick={handleOpen}>Add Coupon</Button>
        <Modal open={open} onClose={handleClose} sx={{display:"flex", justifyContent:"center",justifyItems:"center", alignItems:"center"}}>
            <Box sx={{backgroundColor:"rgb(255, 253, 231, 0.9)", height:"60%" , width:"35%", minWidth:600, minHeight:500, overflow:"auto"}}>
          <form onSubmit={handleSubmit} className="AddCustomerForm">
            <h3>Add Coupon</h3>
            <TextField
            sx={{maxWidth:"30%"}}
              label="Title"
              name="title"
              value={formValues.title}
              onChange={handleChange}
            />
            <TextField
            sx={{maxWidth:"30%"}}
              label="Description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              multiline={true}
            />
            <TextField
            sx={{maxWidth:"30%"}}
              label="Amount"
              name="amount"
              type="number"
              value={formValues.amount}
              onChange={handleChange}
            />
            <TextField
            sx={{maxWidth:"30%"}}
            type="number"
              label="Price"
              name="price"
              value={formValues.price}
              onChange={handleChange}
            />
            <div className="DateDiv">
            <TextField
            sx={{maxWidth:"30%"}}
            type="date"
              name="startDate"
              value={formValues.startDate}
              onChange={handleChange}
            />
            <TextField
            sx={{maxWidth:"30%"}}
            type="date"
              name="endDate"
              value={formValues.endDate}
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

export default AddCoupon;

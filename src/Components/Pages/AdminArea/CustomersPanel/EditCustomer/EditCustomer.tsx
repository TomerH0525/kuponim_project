import { Box, Button, Container, Grid, IconButton, InputAdornment, InputLabel, TextField } from "@mui/material";
import "./EditCustomer.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import errorHandler from "../../../../Services/ErrorHandler";
import { toast } from "react-toastify";
import adminService from "../../../../Services/AdminService";
import Company from "../../../../Models/Company";
import { useNavigate, useParams } from "react-router-dom";
import { customersStore } from "../../../../Redux/CustomersStore";
import Customer from "../../../../Models/Customer";
import { useForm } from "react-hook-form";

function EditCustomer(): JSX.Element {
    
    const customerID:number = +(useParams().customerID!)

    const [customer, setCustomer] = useState<Customer>(customersStore.getState().customers?.find((customer) => customer.customerID === customerID));

    
    const {register, handleSubmit, formState, setValue} = useForm<Customer>({
        mode:"onBlur",
        defaultValues: {
            customerID: customer?.customerID,
            email: customer?.email,
            firstName: customer?.firstName,
            lastName: customer?.lastName,
            password: customer?.password
        }
    });

    const navigate = useNavigate();

    async function getCustomerByID(customerID:number){
        const customer = adminService.getCustomerByID(customerID);
        setCustomer(await customer);
    }


    useEffect(() => {
        console.log(customerID);
        
        if (customer === null || customer === undefined) {
            getCustomerByID(customerID);
        }
        setValue("customerID",customer?.customerID);
        setValue("email",customer?.email)
        setValue("firstName",customer?.firstName)
        setValue("lastName",customer?.lastName)
        setValue("password",customer?.password);

    },[customer])

    function sendForm(customer:Customer){
        adminService.updateCustomer(customer)
        .then((response) => {
            toast.success(response);
            navigate("/AdminPanel/Customers")
        })
        .catch((err) => {errorHandler.showError(err); console.log(err);});
    }
    
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };



    return (
        <Box sx={{display:"flex",alignItems:"center",height:"80vh"}}>
        <Container maxWidth="sm">
        <form onSubmit={handleSubmit(sendForm)}>
            <h2>Update Customer</h2>
            <h4> customerID :{customer?.customerID}</h4>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <InputLabel  htmlFor="Email">
                Email
            </InputLabel>
              <TextField
                fullWidth
                id="Email"
                name="email"
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12}>
            <InputLabel  htmlFor="First Name">
                First Name
            </InputLabel>
              <TextField
                fullWidth
                id="First Name"
                name="firstName"
                {...register("firstName")}
              />
            </Grid>
            <Grid item xs={12}>
            <InputLabel  htmlFor="Last Name">
                Last Name
            </InputLabel>
              <TextField
                fullWidth
                id="Last Name"
                name="lastName"
                {...register("lastName")}
              />
            </Grid>
            <Grid item xs={12}>
            <InputLabel htmlFor="Password">
    Password
</InputLabel>
<TextField
    fullWidth
    id="Password"
    name="password"
    type={showPassword ? 'text' : 'password'}
    {...register("password")}
    InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                <IconButton
                    onClick={handleClickShowPassword}
                >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
        ),
    }}
/>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" size="large" variant="contained" color="primary">
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      </Box>
    );
}

export default EditCustomer;

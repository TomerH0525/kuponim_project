import { Box, Button, Container, Grid, TextField } from "@mui/material";
import "./AddCustomer.css";
import { useForm } from "react-hook-form";
import Customer from "../../../../Models/Customer";
import adminService from "../../../../Services/AdminService";
import { useNavigate } from "react-router-dom";
import errorHandler from "../../../../Services/ErrorHandler";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SetStateAction, useState } from "react";

function AddCustomer(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<Customer>({mode:"onBlur"});

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const navigate = useNavigate();

  function sendSubmit(customer: Customer) {
    adminService
      .addCustomer(customer)
      .then(() => navigate("/AdminPanel/Customers"))
      .catch((err) => errorHandler.showError(err));
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "75vh" }}>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit(sendSubmit)}>
          <h2>Add Customer</h2>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                fullWidth
                InputLabelProps={{ sx: { color: 'black', fontWeight: 700 } }}
                InputProps={{
                  sx: { fontWeight: 700 }
                }}
                label="Email"
                name="email"
                type="email"
                {...register("email",{
                  required: true,
                  validate: value => value.includes('@') || 'Email must include "@" symbol'
                })}
                helperText={formState.errors.email && formState.errors.email.message ? formState.errors.email.message : formState.errors.email ? "Must Enter Email" : null}
                error={Boolean(formState.errors.email)}
            
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                InputLabelProps={{ sx: { color: 'black', fontWeight: 700 } }}
                InputProps={{
                  sx: { fontWeight: 700 }
                }}
                fullWidth
                label="First Name"
                name="firstName"
                {...register("firstName", {
                  required: true,
                  validate: value => value.length >= 2 || "First Name length must be atleast 2 characters"
                })}
                error={Boolean(formState.errors.firstName)}
                helperText={formState.errors.firstName && formState.errors.firstName.message ? formState.errors.firstName.message : formState.errors.firstName ? "Must Enter first name" : null}

              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                InputLabelProps={{ sx: { color: 'black', fontWeight: 700 } }}
                InputProps={{
                  sx: { fontWeight: 700 }
                }}
                fullWidth
                label="Last Name"
                name="lastName"
                {...register("lastName", {
                  required: true,
                  validate: value => value.length >= 2 || "Last name length must be atleast 2 characters"
                })}
                error={Boolean(formState.errors.lastName)}
                helperText={formState.errors.lastName && formState.errors.lastName.message ? formState.errors.lastName.message : formState.errors.lastName ? "Must Enter last name" : null}

              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="Password"
                name="password"
                {...register("password", {
                  required:true,
                  validate: value => value.length >= 5 || "password must be atleast 5 characters in length!"
                })}
                InputLabelProps={{ sx: { color: 'black', fontWeight: 700 } }}
                type={showPassword ? 'text' : 'password'}
                autoComplete="off"
                value={password}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
                error={Boolean(formState.errors.password)}
                helperText={formState.errors.password && formState.errors.password.message ? formState.errors.password.message : formState.errors.password ? "Must Enter Password" : null}
                InputProps={{
                  sx: { fontWeight: 700 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end" sx={{ color: "black" }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>)
                }}
              />
            </Grid>
            <Grid item xs={12}>
            <Button sx={{
              width: 175,
              height: 45,
              marginTop: 1,
              border: "solid #212121",
              borderWidth: 1.5,
              fontWeight: 700,
              backgroundColor: 'rgba(255, 111, 0 ,0.4)',
              color: "black", '&:hover': {
                backgroundColor: "#ffa000",
                fontWeight: 700}
              }}
                 type="submit" variant="contained" color="primary" disabled={Boolean(formState.errors.email || formState.errors.password)}>
                {Boolean(formState.errors.email || formState.errors.password || formState.errors.firstName || formState.errors.lastName) ? "Form Incomplete" : "Add Customer"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}

export default AddCustomer;

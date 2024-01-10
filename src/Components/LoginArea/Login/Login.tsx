
import { Container, Box, Paper, Typography, TextField, InputLabel, Select, MenuItem, Button, Grid, SelectChangeEvent, createTheme, ThemeProvider, CircularProgress } from "@mui/material";
import "./Login.css";
import { useForm } from "react-hook-form";
import User from "../../Models/User";
import { useEffect, useState } from "react";
import authService from "../../Services/AuthService";
import errorHandler from "../../Services/ErrorHandler";
import image from "../../../../public/backgound-P&R.jpg"
import ClientType from "../../Models/ClientType";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { BorderColor } from "@mui/icons-material";
import { toast } from "react-toastify";




function Login(): JSX.Element {

  const { register, handleSubmit, formState } = useForm<User>();

  const [clientType, setType] = useState<ClientType>();


  const handleChange = (event: SelectChangeEvent<ClientType>) => {
    setType(event.target.value as ClientType);
  };

  const [loading, setLoading] = useState(false);

  // const handleClick = () => {
  //   setLoading(true);
  //   // Perform your async operation here
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // };

  
  function sendLogin(user: User) {
    console.log(user);
    setLoading(true);
    setTimeout(() => {
            authService.login(user)
          .then(response => {console.log(response); setLoading(false); toast.success("Login Successfull")})
          .catch(err => {errorHandler.showError(err); setLoading(false);});
        }, 1000);
    

  }

  return (
    <div className="LoginPage">
      <Paper elevation={15}
       sx={{
         width: 500,
          height: 400,
           paddingTop: 6,
            display: "flex",
             textAlign: "center",
              flexDirection: "column",
               backgroundColor: 'rgba(255, 183, 77 ,0.5)' ,
               backdropFilter: 'blur(150px)',
                opacity:0.8
              }}>

        <Typography component="h1" variant="h5" marginBottom={2}>
          Welcome Back
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit(sendLogin)}>
          <TextField
            margin="normal"
            required
            sx={{ width: 300, 
            "& label.Mui-focused": { color: "black" },
            "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: "black" },
              borderColor:"black"
              }}}
            id="email"
            label="Email Address"
            InputLabelProps={{sx:{color: "black"},}}
            name="email"
            autoComplete="email"
            autoFocus
            {...register('email')}
          /> <br />

          <TextField
            margin="normal"
            required
            sx={{ width: 300 ,
              "& label.Mui-focused": { color: "black" },
              "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: "black" },
                borderColor:"black"
                }}}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
          /> <br />

          <InputLabel id="ClientTypeLabel" sx={{color:"black", marginTop:1}}>Type</InputLabel>
          <Select
            labelId="ClientTypeLabel"
            id="ClientType"
            value={clientType}
            sx={{color:"black",
            width:150,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',
            },
            '.MuiSvgIcon-root ': {
              fill: "black",
            }}}
            name="role"
            onChange={handleChange}
            {...register("clientType")}
            defaultValue={ClientType.Customer}
          >
            <MenuItem value={ClientType.Customer} {...register("clientType")}>Customer</MenuItem>
            <MenuItem value={ClientType.Company} {...register("clientType")}>Company</MenuItem>
            <MenuItem value={ClientType.Administrator} {...register("clientType")}>Admin</MenuItem>
          </Select>
          <br />

          <Button variant="contained"
            disabled={loading}
            type="submit"
            sx={{
              width:115,
               height:40,
                marginTop:3,
                border:"solid #212121",
                borderWidth:1,
                backgroundColor: 'rgba(255, 111, 0 ,0.5)',
                 color:"black", '&:hover': {
              backgroundColor: "#ffa000",
              color:"black"
            }}}
            endIcon={loading ? <CircularProgress size={25} sx={{marginRight:1, color:"black",}} /> : null}
          >
            {loading ? '' : 'Login'}
          </Button>
        </Box>
      </Paper>
      
    </div>
  );
}
export default Login;

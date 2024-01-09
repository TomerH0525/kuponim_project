
import { Container, Box, Paper, Typography, TextField, InputLabel, Select, MenuItem, Button, Grid, SelectChangeEvent, createTheme, ThemeProvider } from "@mui/material";
import "./Login.css";
import { useForm } from "react-hook-form";
import User from "../../Models/User";
import { useEffect, useState } from "react";
import authService from "../../Services/AuthService";
import errorHandler from "../../Services/ErrorHandler";
import image from "../../../../public/backgound-P&R.jpg"




function Login(): JSX.Element {

  const theme = createTheme({
    palette: {
      background: {
        default: '#f0f0f0',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: 'url("/backgound-P&R.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          },
        },
      },
    },
  });

  const { register, handleSubmit, formState } = useForm<User>();

  const [clientType, setType] = useState<number>();


  const handleChange = (event: SelectChangeEvent<number>) => {
    setType(event.target.value as number);
  };

  function sendLogin(user: User) {
    console.log(user);
    
    authService.login(user)
      .then(response => console.log(response))
      .catch(err => /*console.log(err.response.data)*/
      errorHandler.showError(err));
  }

  return (
    <div className="LoginPage">
      <Container component="main" maxWidth="xs" sx={{textAlign: "center" ,paddingTop: 6, background: "#fdd835", marginTop:10}}>
        <Box sx={{padding:5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* <Paper sx={{ width: 600, height: 350, paddingTop: 6 }}> */}
            <Typography component="h1" variant="h5">
              Welcome Back
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(sendLogin)}>
              <TextField
                margin="normal"
                required
                sx={{ width: 300 }}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register('email')}
              /> <br />
              <TextField
                margin="normal"
                required
                sx={{ width: 300 }}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password')}
              /> <br />
              <InputLabel id="ClientTypeLabel">Type</InputLabel>
              <Select
                labelId="ClientTypeLabel"
                id="ClientType"
                value={clientType}
                name="role"
                onChange={handleChange}
                {...register("clientType")}
                defaultValue={2}
              >
                <MenuItem value={2} {...register("clientType")}>Customer</MenuItem>
                <MenuItem value={1} {...register("clientType")}>Company</MenuItem>
                <MenuItem value={0} {...register("clientType")}>Admin</MenuItem>
              </Select>
              <br />
              <Button type="submit"  variant="contained" sx={{ backgroundColor :"black", '&:hover':{backgroundColor: 'black',}, mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
            </Box>
          {/* </Paper> */}
        </Box>
      </Container>
    </div>
  );
}
export default Login;

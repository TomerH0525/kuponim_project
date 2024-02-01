
import { Container, Box, Paper, Typography, TextField, InputLabel, Select, MenuItem, Button, Grid, SelectChangeEvent, createTheme, ThemeProvider, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import "./Login.css";
import { useForm } from "react-hook-form";
import User from "../../Models/User";
import { useState } from "react";
import authService from "../../Services/AuthService";
import errorHandler from "../../Services/ErrorHandler";
import ClientType from "../../Models/ClientType";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




function Login(): JSX.Element {

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
  const [loading, setLoading] = useState(false);


  const { register, handleSubmit} = useForm<User>();
  
  const navigate = useNavigate();

  function sendLogin(user: User) {
    setLoading(true);
    setTimeout(() => {
            authService.login(user)
          .then(() => {setLoading(false);console.log(user);
           toast.success("Logged in successfully"); navigate("/"); })
          .catch(err => {errorHandler.showError(err); setLoading(false);});
        }, 1000);

  }

  return (
    <div className="LoginPage" >
      <Paper elevation={15} onSubmit={handleSubmit(sendLogin)}
        sx={{
          width: '30%',
          height: '90%',
          minWidth:350,
          paddingTop: 0,
          display: "flex",
          flexDirection: "column",
          backgroundColor: 'rgba(255, 160, 0 ,0.6)' ,
          backdropFilter: 'blur(150px)',
          opacity:0.8,
          border:"black solid",
          verticalAlign: 'middle',
          justifyContent:"center",
          justifyItems:"center",
          textAlign: 'center',
        }}>

        <Typography component="h2" variant="h4" marginBottom={2} fontWeight={700}>
          Welcome Back
        </Typography>

        <Box component="form">
          <TextField
            margin="normal"
              required
                sx={{
                  width: 300,
                  "& label.Mui-focused": { color: "black" , fontWeight: 700 },
                  "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: "black" },
                }}}
                  id="email"
                    label="Email Address"
                      InputLabelProps={{sx:{color: "black"},}}
                        name="email"
                          InputProps={{sx:{fontWeight:700}}}
                            autoComplete="email"
                              autoFocus
                                {...register('email')}
            /> 
          <br />
          <TextField
            margin="normal"
              required
                id="password"
                  label="Password"
                    sx={{
                      width: 300,
                      '& label.Mui-focused': { color: 'black', fontWeight: 700 },
                      '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': { borderColor: 'black' }}
                    }}
                      {...register("password")}
                        InputLabelProps={{ sx: { color: 'black', } }}
                          type={showPassword ? 'text' : 'password'}
                            autoComplete="off"
                              value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                  InputProps={{
                                    sx:{fontWeight:700},
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end" sx={{color:"black"}}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        </InputAdornment>)
                                    }}
            /> 
          <br />
          <InputLabel id="ClientTypeLabel" sx={{color:"black", marginTop:1}}>Type</InputLabel>
          <Select
            labelId="ClientTypeLabel"
              id="ClientType"
                sx={{color:"black",
                  width:150,
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black'},
                  '.MuiSvgIcon-root ': { fill: "black" }, fontWeight:700
                }}
                  name="role"
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
                  borderWidth:1.5,
                  fontWeight:700,
                  backgroundColor: 'rgba(255, 111, 0 ,0.5)',
                  color:"black", '&:hover': {
                  backgroundColor: "#ffa000",
                  fontWeight:700
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

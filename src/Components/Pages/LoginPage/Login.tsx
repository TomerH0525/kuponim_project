
import { Box, Paper, Typography, TextField, InputLabel, Select, MenuItem, Button, CircularProgress, IconButton, InputAdornment } from "@mui/material";
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


  const { register, handleSubmit, formState } = useForm<User>({ mode: "onTouched" });

  const navigate = useNavigate();

  function sendLogin(user: User) {
    setLoading(true);
    setTimeout(() => {
      authService.login(user)
        .then(() => {
          setLoading(false);
          toast.success("Logged in successfully"); navigate("/");
        })
        .catch(err => { errorHandler.showError(err); setLoading(false); });
    }, 1000);
  }


  return (
    <div className="LoginPage" >
      <Paper elevation={15} onSubmit={handleSubmit(sendLogin)}
        sx={{
          width: '30%',
          height: '90%',
          minWidth: 350,
          paddingTop: 0,
          display: "flex",
          flexDirection: "column",
          backgroundColor: 'rgba(255, 160, 0 ,0.3)',
          backdropFilter: 'blur(150px)',
          opacity: 0.9,
          border: "black solid",
          verticalAlign: 'middle',
          justifyContent: "center",
          justifyItems: "center",
          textAlign: 'center',
        }}>

        <Typography component="h2" variant="h4" marginBottom={2} >
          Welcome Back
        </Typography>

        <Box component="form">

          <TextField
            margin="normal"
            required
            sx={{
              width: 300,
              "& label.Mui-focused": { color: "black", fontWeight: 700, },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "black", },
              }
            }}
            id="email"
            label="Email Address"
            InputLabelProps={{ sx: { color: "black", fontWeight: 700 } }}
            name="email"
            InputProps={{ sx: { fontWeight: 700 } }}
            autoComplete="email"
            autoFocus
            {...register('email', {
              required: true,
              validate: value => value.includes('@') || 'Email must include "@" symbol'
            })}
            helperText={formState.errors.email && formState.errors.email.message ? formState.errors.email.message : formState.errors.email ? "Must enter email" : null}
            error={Boolean(formState.errors.email)}
          /><br />


          <TextField
            margin="normal"
            required
            id="password"
            label="Password"
            sx={{
              width: 300,
              '& label.Mui-focused': { color: 'black', fontWeight: 700 },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: 'black' }
              }
            }}
            {...register("password", {
              required:true,
              validate: value => value.length >= 5 || "password must be atleast 5 characters in length!"
            }
             )}
            error={Boolean(formState.errors.password)}
            helperText={formState.errors.password && formState.errors.password.message ? formState.errors.password.message : formState.errors.password ? "Must enter password" : null}
            InputLabelProps={{ sx: { color: 'black', fontWeight: 700 } }}
            type={showPassword ? 'text' : 'password'}
            autoComplete="off"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            InputProps={{
              sx: { fontWeight: 700 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end" sx={{ color: "black" }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>)
            }}
          /><br />


          <InputLabel id="ClientTypeLabel" sx={{ color: "black", marginTop: 1 }}>Type</InputLabel>
          <Select
            labelId="ClientTypeLabel"
            id="ClientType"
            sx={{
              color: "black",
              width: 150,
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
              '.MuiSvgIcon-root ': { fill: "black" }, fontWeight: 700
            }}
            name="role"
            {...register("clientType")}
            defaultValue={ClientType.Customer}
          >
            <MenuItem value={ClientType.Customer} {...register("clientType")}>Customer</MenuItem>
            <MenuItem value={ClientType.Company} {...register("clientType")}>Company</MenuItem>
            <MenuItem value={ClientType.Administrator} {...register("clientType")}>Admin</MenuItem>
          </Select> <br />

          <Button variant="contained"
            disabled={loading || Boolean(formState.errors.email || formState.errors.password)}
            type="submit"
            sx={{
              width: 115,
              height: 40,
              marginTop: 3,
              border: "solid #212121",
              borderWidth: 1.5,
              fontWeight: 700,
              backgroundColor: 'rgba(255, 111, 0 ,0.4)',
              color: "black", '&:hover': {
                backgroundColor: "#ffa000",
                fontWeight: 700
              }
            }}
            endIcon={loading ? <CircularProgress size={25} sx={{ marginRight: 1, color: "black", }} /> : null}
          >
            {loading ? '' : 'Login'}
          </Button>
          
        </Box>
      </Paper>

    </div>
  );
}
export default Login;

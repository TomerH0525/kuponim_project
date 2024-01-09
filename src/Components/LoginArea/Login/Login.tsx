
import { Container, Box, Paper, Typography, TextField, InputLabel, Select, MenuItem, Button, Grid } from "@mui/material";
import "./Login.css";
import { useForm } from "react-hook-form";
import User from "../../Models/User";
import { useState } from "react";
import authService from "../../Services/AuthService";




function Login(): JSX.Element {

  const { register, handleSubmit, formState } = useForm<User>();

  const [clientType, setType] = useState<string>('2');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  function sendLogin(user: User) {
    authService.login(user)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

  return (
    <div className="Login">
      <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Paper sx={{ width: 600, height: 350, paddingTop: 6 }}>
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
              >
                <MenuItem value="2">Customer</MenuItem>
                <MenuItem value="1">Company</MenuItem>
                <MenuItem value="0">Admin</MenuItem>
              </Select>
              <br />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

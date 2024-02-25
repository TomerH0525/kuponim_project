import { Box, Button, Container, Grid, TextField } from "@mui/material";
import "./AddCompany.css";
import { useForm } from "react-hook-form";
import Company from "../../../../Models/Company";
import adminService from "../../../../Services/AdminService";
import { useNavigate } from "react-router-dom";
import errorHandler from "../../../../Services/ErrorHandler";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SetStateAction, useState } from "react";

function AddCompany(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<Company>({
    mode: "onBlur",
  });

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  function sendSubmit(company: Company) {
    adminService
      .addCompany(company)
      .then(() => navigate("/AdminPanel/Companies"))
      .catch((err) => errorHandler.showError(err));
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "75vh" }}>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit(sendSubmit)}>
          <h2>Add Company</h2>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                InputLabelProps={{ sx: { color: "black", fontWeight: 700 } }}
                InputProps={{
                  sx: { fontWeight: 700 },
                }}
                label="Email"
                name="email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: (value) =>
                    value.includes("@") || 'Email must include "@" symbol',
                })}
                helperText={
                  formState.errors.email && formState.errors.email.message
                    ? formState.errors.email.message
                    : formState.errors.email
                    ? "Must Enter Email"
                    : null
                }
                error={Boolean(formState.errors.email)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ sx: { color: "black", fontWeight: 700 } }}
                InputProps={{
                  sx: { fontWeight: 700 },
                }}
                fullWidth
                label="Name"
                name="name"
                {...register("name", {
                  required: true,
                  validate: (value) =>
                    value.length >= 2 ||
                    "Name length must be above 2 characters",
                })}
                error={Boolean(formState.errors.name)}
                helperText={
                  formState.errors.name && formState.errors.name.message
                    ? formState.errors.name.message : formState.errors.name
                    ? "Must Enter company name" : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                {...register("password", {
                  required: true,
                  validate: (value) =>
                    value.length >= 5 ||
                    "password must be atleast 5 characters in length!",
                })}
                InputLabelProps={{ sx: { color: "black", fontWeight: 700 } }}
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                value={password}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setPassword(e.target.value)
                }
                error={Boolean(formState.errors.password)}
                helperText={
                  formState.errors.password && formState.errors.password.message
                    ? formState.errors.password.message
                    : formState.errors.password
                    ? "Must Enter Password"
                    : null
                }
                InputProps={{
                  sx: { fontWeight: 700 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{ color: "black" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{
                  width: 150,
                  height: 45,
                  marginTop: 1,
                  border: "solid #212121",
                  borderWidth: 1.5,
                  fontWeight: 700,
                  backgroundColor: "rgba(255, 111, 0 ,0.4)",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#ffa000",
                    fontWeight: 700,
                  },
                }}
                type="submit"
                variant="contained"
                color="primary"
                disabled={Boolean(
                  formState.errors.email || formState.errors.password
                )}
              >
                {Boolean(formState.errors.email || formState.errors.password)
                  ? "Form Incomplete"
                  : "Add Company"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}

export default AddCompany;

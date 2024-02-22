import { Box, Button, Container, Grid, IconButton, InputAdornment, InputLabel, TextField } from "@mui/material";
import "./EditCompany.css";
import Company from "../../../../Models/Company";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { companiesStore } from "../../../../Redux/CompaniesStore";
import adminService from "../../../../Services/AdminService";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from "react-toastify";
import errorHandler from "../../../../Services/ErrorHandler";

function EditCompany(): JSX.Element {
    
    const companyId:number = +(useParams().companyId!)

    const [company, setCompany] = useState<Company>(companiesStore.getState().companies?.find((company) => company.id === companyId));

    
    const {register, handleSubmit, formState, setValue} = useForm<Company>({
        mode:"onBlur",
        defaultValues: {
            id: company?.id,
            email: company?.email,
            name: company?.name,
            password: company?.password
        }
    });

    const navigate = useNavigate();

    async function getCompanyById(companyId:number){
        const company = adminService.getCompanyById(companyId);
        setCompany(await company);
    }


    useEffect(() => {
        console.log(companyId);
        
        if (company === null || company === undefined) {
            getCompanyById(companyId);
        }
        setValue("id",company?.id);
        setValue("email",company?.email)
        setValue("name",company?.name)
        setValue("password",company?.password);

    

    },[company])

    function sendForm(company:Company){
        adminService.updateCompany(company)
        .then((response) => {
            toast.success(response);
            navigate("/AdminPanel/Companies")
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
            <h2>Update Company</h2>
            <h4> companyID :{company?.id}</h4>
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
            <InputLabel  htmlFor="Name">
                Name
            </InputLabel>
              <TextField
                fullWidth
                id="Name"
                name="name"
                {...register("name")}

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

export default EditCompany;

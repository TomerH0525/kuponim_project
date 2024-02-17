import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../Models/User';
import { authStore } from '../../Redux/AuthStore';
import authService from '../../Services/AuthService';
import headerBackground from '../../../Images/backgound-P&R2.jpg'
import ClientType from '../../Models/ClientType';
import logo from '../../../Images/Design-removebg-preview.png'


let settings = ['My Details', 'Login', 'Logout'];


function Navbar(): JSX.Element {

  const navigate = useNavigate();

  const [loggedUser, setLoggedUser] = useState<User>(authStore.getState().user);

  const [userPages, setUserPages] = useState<string[]>([]);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  useEffect(() => {

      switch (loggedUser?.clientType) {
        case ClientType.Administrator:
          setUserPages(['Home', 'Customers','Companies',]);
          break;
        case ClientType.Company:
          setUserPages(['Home', 'Add Coupon']);
          break;

        default:
          setUserPages(['Home']);
      }

    authStore.subscribe(() => {
      console.log(authStore.getState().user);
      
      setLoggedUser(authStore.getState().user);
    })
  }, [loggedUser]);

  

  function navigatePages(pageName: string){
    switch (pageName) {
      case "Home":
        navigate("/")
        break;

      case "Login":
        navigate("/login")
      break;

      case "Add Coupon":
        navigate("/addCoupon")
      break;

      case "Customers":
        navigate("/AdminPanel/Customers")
      break;

      case "Companies":
        navigate("/AdminPanel/Companies")
      break;
      
      case "My Details":
        navigate("/MyDetails")
      break;

      default:
        break;
    }

    
  };

  return (
    
    <AppBar position="static" style={{ backgroundImage: `url(${headerBackground})` }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{ marginLeft: 0 }}>
          
          <Box sx={{ display:{xs:"none", md:"contents" }}}>
          <img src={logo} height={90} width={100} />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 0,
              fontSize:"4ex",
              display: { xs: 'none', md: 'none',lg:"flex" },
              fontFamily: 'monospace',
              fontWeight: 900,
              letterSpacing: '.3rem',
              color: "black",
              textDecoration: 'none',
            }}
          >
            Peel&Reveal
          </Typography>

          <Box sx={{ display: { xs: 'flex', md: 'flex',lg:"none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "black" ,padding:0}}
            >
              <MenuIcon sx={{padding:0}} />
            </IconButton>
            <Menu
              id="menu-appbar"
              sx={{padding:0}}
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}

            >
              {userPages.map((page) => (
                <MenuItem key={page} onClick={()=>{handleCloseNavMenu();navigatePages(page)}}>
                  <Typography textAlign="center" sx={{ color: "black" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              display: { xs: 'flex', md: 'flex',lg:"none" },
              fontSize:{md:"5ex",xs:"4ex"},
              justifyContent:"center",
              alignContent:"center",
              textAlign:"center",
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: {xs:'0.2rem',md:"0.6rem"},
              color: 'black',
              textDecoration: 'none',

            }}
          >
            Peel&Reveal
          </Typography>
          <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'none', lg:"flex" },marginX:{md:2}, gap:2}}>
            {userPages.map((page) => (
              <Button
                key={page}
                onClick={ () => {navigatePages(page)}}
                sx={{ color: '#212121', display: 'block',paddingX:3,paddingY:1, backgroundColor:"rgb(238, 238, 238)" ,fontWeight:700,borderRadius:3,
                '&:hover': {
                  backgroundColor: "rgb(189, 189, 189)" }}}
                >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 2, alignItems:"center" }}>
            {loggedUser !== null ?
    
             <Typography sx={{ fontWeight: 700 , backgroundColor:"rgb(255, 196, 0)", borderRadius:4, border:"black 1px solid"
             ,color:"#212121",width:"auto",display:{md:"flex",xs:"none",lg:"flex"},alignItems:"center",justifyContent:"center",p:1.5,fontSize:"2ex"}}>
              Hello {loggedUser.name === undefined ? loggedUser.firstName : loggedUser.name} 
             </Typography>
           
              : null
            }
            
            <Box sx={{display:"flex",flexDirection:"column"}}>
              {settings.map((setting) => (
                setting === "Login" && loggedUser === null ?
                <Button variant="contained" sx={{ my: 0.4, color: '#212121', display: 'block', marginLeft: 0.5,backgroundColor:"rgb(238, 238, 238)",fontWeight:700,borderRadius:3,
                '&:hover': {
                  backgroundColor: "#00c853" }}} key={setting} onClick={() => navigatePages(setting)}>{setting}</Button>

                  : setting === "Logout" && loggedUser !== null ?
                      <Button variant="contained" sx={{ my: 0.4, color: '#212121', display: 'block', marginLeft: 0.5,backgroundColor:"rgb(238, 238, 238)",fontWeight:700,borderRadius:3,
                      '&:hover': {
                        backgroundColor: "#ef5350" }}} key={setting} onClick={() => authService.logout()}>{setting}</Button>

                        : setting === "My Details" && loggedUser !== null && loggedUser.clientType === ClientType.Company && ClientType.Customer ? 
                        <Button variant="contained" sx={{ my: 0.4, color: '#212121', display: 'block', marginLeft: 0.5,backgroundColor:"rgb(238, 238, 238)",fontWeight:700,borderRadius:3,
                        '&:hover': {
                          backgroundColor: "rgb(189, 189, 189)" }}} key={setting} onClick={() => navigatePages(setting)}>{setting}</Button>

                    : null
              ))}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    
  );
}

export default Navbar;

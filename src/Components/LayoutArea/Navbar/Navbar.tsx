import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../Models/User';
import { authStore, login, logout } from '../../Redux/AuthStore';
import { jwtDecode } from 'jwt-decode';
import { log } from 'console';
import { Logout } from '@mui/icons-material';

const pages = ['Home', 'Coupons'];
const settings = ['MyDetails', 'Login', 'Logout'];


function Navbar(): JSX.Element {

  const navigate = useNavigate();

  const [loggedUser, setLoggedUser] = useState<User>(null);



    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    useEffect(() => {
      if (loggedUser === null && authStore.getState().user !== null) {
        setLoggedUser(authStore.getState().user);
        console.log("11");
        
      } else if (sessionStorage.getItem("token") !== null) {
        authStore.dispatch(login(sessionStorage.getItem("token")))
        console.log("333");
  
      }else{
        setLoggedUser(null);
        console.log("22");
      }

      
    
      authStore.subscribe(() => {
        console.log("nono");
      if (authStore.getState().user !== null) {
        setLoggedUser(authStore.getState().user);
        console.log("11");
      } else if(sessionStorage.getItem("token") !== null) {
        setLoggedUser(null);
      }else{

      }})}, []);

    return (
        <AppBar position="static" sx={{backgroundColor:"#f9a825", height:"95px"}}>
        <Container maxWidth={false} >
          <Toolbar disableGutters sx={{marginLeft:2}}>
            <img src={"Design-removebg-preview.png"}height={90} width={100}/>
            <Typography
              variant="h5"
              noWrap
              component="a"
              onClick={() => navigate("/")}
              sx={{
                cursor:"pointer",
                mr: 3,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 900,
                letterSpacing: '.2rem',
                color: "black",
                textDecoration: 'none',
              }}
            >
              Peel&Reveal
            </Typography>
  
            <Box sx={{ flexGrow: 0.5, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{color:"black"}}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
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
                sx={{
                  display: { xs: 'block', md: 'none' },
                  color:"black"
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" sx={{color:"black"}}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href='/'
              sx={{
                mr: 0,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'black',
                textDecoration: 'none',
                
              }}
            >
              Peel&Reveal
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 4, color: 'black', display: 'block' , marginLeft:0.5 }}
                >
                  {page}
                </Button>
              ))}
            </Box>
  
            <Box sx={{ flexGrow: 0 , display:"flex" , gap:2}}>
            {loggedUser != undefined && loggedUser != null ? <span style={{paddingTop:10, fontWeight:700}}>{"Hello "+loggedUser.name+" "} </span> : null
            }
              <Tooltip title="Open settings">
                
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 , marginRight:8}}>
                  
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{border:"black solid", borderWidth:2}} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (setting === "Login" && loggedUser === null ? 
                  <MenuItem key={setting} onClick={() => {handleCloseUserMenu();  navigate("/login");} } >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>

                   : setting === "MyDetails" ? 
                   <MenuItem key={setting} onClick={() => {handleCloseUserMenu();  navigate("/myDetails");} } >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                   : setting === "Logout" && loggedUser != null?
                   <MenuItem key={setting} onClick={() => {handleCloseUserMenu();  authStore.dispatch(logout());} } >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                  : null
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
}

export default Navbar;

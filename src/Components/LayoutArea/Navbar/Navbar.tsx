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
import { authStore } from '../../Redux/AuthStore';
import authService from '../../Services/AuthService';
import headerBackground from '../../../Images/backgound-P&R2.jpg'
import ClientType from '../../Models/ClientType';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


let settings = ['MyDetails', 'Login', 'Logout'];


function Navbar(): JSX.Element {

  const navigate = useNavigate();

  const [loggedUser, setLoggedUser] = useState<User>(authStore.getState().user);

  const [userPages, setUserPages] = useState<string[]>([]);

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

      switch (loggedUser?.clientType) {
        case ClientType.Administrator:
          setUserPages(['Home', 'Admin Panel']);
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

      case "Add Coupon":
        navigate("/addCoupon")
        break;

      case "Admin Panel":
        navigate("/AdminPanel")
      break;

      case "Login":
        navigate("/login")
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
          <img src={"Design-removebg-preview.png"} height={90} width={100} />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 0,
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

          <Box sx={{ flexGrow: 0.5, display: { xs: 'flex', md: 'none' }, maxWidth:48 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "black" }}
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
              display: { xs: 'flex', md: 'none' },
              justifyContent:"center",
              alignContent:"center",
              textAlign:"center",
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '0rem',
              color: 'black',
              textDecoration: 'none',

            }}
          >
            Peel&Reveal
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            {userPages.map((page) => (
              <Button
                key={page}
                onClick={ () => {handleCloseNavMenu();navigatePages(page);}}
                sx={{ my: 4, color: '#212121', display: 'block', marginLeft: 0.5, backgroundColor:"rgba(238, 238, 238 ,1)" ,fontWeight:700,borderRadius:3,
                '&:hover': {
                  backgroundColor: "rgba(189, 189, 189, 1)" }}}
                >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
            {loggedUser !== null ?

             <span style={{ paddingTop: 10, fontWeight: 700 , backgroundColor:"rgba(255, 196, 0 ,1)", borderRadius:15, border:"black 1px solid"
             ,paddingRight:10,paddingLeft:10,color:"#212121"}}>
              Hello {loggedUser.name === undefined ? loggedUser.firstName : loggedUser.name} 
             </span>

              : null
            }
            
            <Box >
              {settings.map((setting) => (
                setting === "Login" && loggedUser === null ?
                <Button variant="contained" sx={{ my: 0.4, color: '#212121', display: 'block', marginLeft: 0.5,backgroundColor:"rgb(238, 238, 238)",fontWeight:700,borderRadius:3,
                '&:hover': {
                  backgroundColor: "#00c853" }}} key={setting} onClick={() => navigatePages(setting)}>{setting}</Button>

                  : setting === "Logout" && loggedUser !== null ?
                      <Button variant="contained" sx={{ my: 0.4, color: '#212121', display: 'block', marginLeft: 0.5,backgroundColor:"rgb(238, 238, 238)",fontWeight:700,borderRadius:3,
                      '&:hover': {
                        backgroundColor: "#ef5350" }}} key={setting} onClick={() => authService.logout()}>{setting}</Button>
                  
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

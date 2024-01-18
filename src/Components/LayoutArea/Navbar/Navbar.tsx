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
import ClientType from '../../Models/ClientType';

const pages = ['Home', 'Coupons'];
const settings = ['MyDetails', 'Login', 'Logout'];


function Navbar(): JSX.Element {

  const navigate = useNavigate();

  const [loggedUser, setLoggedUser] = useState<User>(authStore.getState().user);

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

  let windowWidth = window.innerWidth;
  console.log(windowWidth);
  
  useEffect(() => {


    authStore.subscribe(() => {
      console.log(authStore.getState().user);
      
      setLoggedUser(authStore.getState().user);
    })
  }, [loggedUser]);


  return (
    <AppBar position="static" sx={{ backgroundColor: "#f9a825", height: "10%" }}>
      <Container maxWidth={false} >
        <Toolbar disableGutters sx={{ marginLeft: 0 }}>
          {window.innerWidth > 600 ? <img src={"Design-removebg-preview.png"} height={90} width={100} /> : null}
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              cursor: "pointer",
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
              sx={{
                display: { xs: 'block', md: 'none' },
                color: "black"
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" sx={{ color: "black" }}>{page}</Typography>
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
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 4, color: 'black', display: 'block', marginLeft: 0.5 }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
            {loggedUser !== null ? <span style={{ paddingTop: 10, fontWeight: 700 }}>Hello {loggedUser.name === undefined ? loggedUser.firstName : loggedUser.name} </span> : null
            }
            <Tooltip title="Open settings">

              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginRight: 1 }}>

                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ border: "black solid", borderWidth: 2 }} />
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
              {settings.map((setting) => (
                setting === "Login" && loggedUser === null ?
                <MenuItem key={setting} onClick={() => { handleCloseUserMenu(); navigate("/login"); }} >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>

                : setting === "MyDetails" ?
                  <MenuItem key={setting} onClick={() => { handleCloseUserMenu(); navigate("/myDetails"); }} >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>

                  : setting === "Logout" && loggedUser !== null ?
                    <MenuItem key={setting} onClick={() => { handleCloseUserMenu(); authService.logout(); }} >
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

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
import AdbIcon from '@mui/icons-material/Adb';
import LoginIcon from "@mui/icons-material/Login";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Hidden from '@mui/material/Hidden';

import { Link, useNavigate } from 'react-router-dom';

const pages = ['Dashboard', 'Data'];
const settings = ['Dashboard', 'Data', 'Logout'];
const auth = ['Register', 'Login'];

function Navbar({isAuthenticated}) {
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [icon, setIcon] = React.useState("registration");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event, iconData) => {
    if(iconData){
      if(iconData !== icon){
        setIcon(iconData)
      } else {
        setIcon(icon);
      }
    }
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    if(page){
      setAnchorElNav(null);
      if(isAuthenticated){
        navigate(page);
      } else if(page === '/register' || page === '/login') {
        navigate(page);
      } else {
        navigate('/login');
      }
    } else {
      setAnchorElNav(null);
    }
  };

  const handleCloseUserMenu = (setting) => {
    if(setting){
      setAnchorElUser(null);
      navigate(setting);
    } else {
      setAnchorElUser(null);
    }
  };


  const register = (
    <Box sx={{ flexGrow: 0, display: { md: 'none'}}}>
      <Link to="/register">
        <Tooltip title="register">
          <IconButton
            onClick={(e)=>handleOpenUserMenu(e, "register")}
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <LockOpenIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </Link>
    </Box>
  )


  const login = (
    <Box sx={{ flexGrow: 0, display: { md: 'none'}}}>
      <Link to="/login">
        <Tooltip title="Login">
          <IconButton
            onClick={(e)=>handleOpenUserMenu(e, "login")}
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <LoginIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </Link>
    </Box>
  )


  const authentic = (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={"H"} src="/static/images/avatar/2.jpg" />
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
          <MenuItem key={setting} onClick={()=>handleCloseUserMenu(`/${setting.replace(/\s/g, "").toLowerCase()}`)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )


  const notAuthentic = (

    <Box sx={{ flexGrow: 0}}>
      {icon === "register" ? login : register}
      <Hidden mdDown>
        {auth.map((page) => (
          <Button
            key={page}
            onClick={()=>handleCloseNavMenu(`/${page.replace(/\s/g, "").toLowerCase()}`)}
            sx={{ my: 2, color: "white"}}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/${page.replace(/\s/g, "").toLowerCase()}`}
            >
              {page}
            </Link>
          </Button>
        ))}
      </Hidden>
    </Box>
  )

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={()=>handleCloseNavMenu(`/${page.replace(/\s/g, "").toLowerCase()}`)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>handleCloseNavMenu(`/${page.replace(/\s/g, "").toLowerCase()}`)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>



          {isAuthenticated ? authentic : notAuthentic}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

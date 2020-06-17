
import React, { useRef, useEffect, useState } from 'react'
import { BrowserRouter, HashRouter, NavLink, Route, Link, Switch } from "react-router-dom";
import clsx from 'clsx';
import ManagerCalender from './ManagerCalender'
import Products from './Products'
import ManagerStoreMenber from './ManagerStoreMenber'
import Chart from './Chart'
import Slider from './SliderManager'
import UpdateInfomation from './Pusher'
import Oders from './Oders'
import BookManager from './Seduche'
import Users from './Users'
import History from './History'


import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { MainListItems, UserList } from './Listleft';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function Admin(props) {

  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [colorHome, setColorHome] = useState('blue')
  const [colorContact, setColorContact] = useState('#3C3C3C')
  const [colorManagerStoreMenber, setColorManagerStoreMenber] = useState('#3C3C3C')
  const [colorProduct, setColorProduct] = useState('#3C3C3C')
  const [colorSlider, setColorSilder] = useState('#3C3C3C')
  const [colorOder, setColorOder] = useState('#3C3C3C')
  const [colorInfo, setColorInfo] = useState('#3C3C3C')
  const [colorBook, setColorBook] = useState('#3C3C3C')
  const [userColor, setColorUser] = useState('#3C3C3C')
  const [colorHistory, setColorHistory] = useState('#3C3C3C')

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    fetch('/logout', {
      method: 'GET',
    })
      .then(res => {
        if (res.status === 200) {
          props.history.push('/login');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        //  alert('Error logging in please try again');
      })
  }

  useEffect(() => {
    if (window.outerWidth <= 676) {
      setOpen(false)
    }
    setColorRouter()
    if(props.location.hash ===''){
      setColorHome('blue')
    }
  }, [])

  const setColorRouter = () => {
    setColorUser(props.location.hash === '#/users' ? 'blue' : '#3C3C3C');
    setColorHome(props.location.hash === '#/' ? 'blue' : '#3C3C3C');
    setColorContact(props.location.hash === '#/managercalendarcut' ? 'blue' : '#3C3C3C')
    setColorManagerStoreMenber(props.location.hash === '#/managerMenber' ? 'blue' : '#3C3C3C')
    setColorSilder(props.location.hash === '#/service' ? 'blue' : '#3C3C3C')
    setColorProduct(props.location.hash === '#/products' ? 'blue' : '#3C3C3C')
    setColorOder(props.location.hash === '#/oders' ? 'blue' : '#3C3C3C')
    setColorInfo(props.location.hash === '#/notification' ? 'blue' : '#3C3C3C')
    setColorBook(props.location.hash === '#/managerbook' ? 'blue' : '#3C3C3C')
    setColorHistory(props.location.hash === '#/history' ? 'blue' : '#3C3C3C')
  }

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="#">
          Barber
          </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  return (
    <BrowserRouter>
      <HashRouter>
        <div>
          <div className={classes.root}>
            <CssBaseline />
            <AppBar style={{ height: '8.8%', backgroundColor: '#ffcc33' }} position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
              <Toolbar className={classes.toolbar}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                  Dashboard
          </Typography>
                <IconButton color="inherit">
                  <FontAwesomeIcon size="lg" onClick={() => logout()} title="Đăng xuất" icon={faSignOutAlt} />

                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
              }}
              open={open}
            >
              <div style={{ backgroundColor: '#ffcc33', height: '8.8%' }} className={classes.toolbarIcon}>
                <h1 style={{ marginTop: '4%', color: 'white' }}>Barber</h1>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon style={{ color: 'white' }} />
                </IconButton>
              </div>
              <Divider />
              <List><MainListItems color={{
                colorHome: colorHome, colorContact: colorContact,
                colorProduct: colorProduct,
                colorManagerStoreMenber: colorManagerStoreMenber,
                colorSlider: colorSlider,
                colorOder: colorOder,
                colorInfo: colorInfo,
                colorBook: colorBook,
                colorHistory:colorHistory
              }} > </MainListItems>

              </List>
              <Divider />
              <List>
                <UserList colorUser={userColor} ></UserList>
              </List>
            </Drawer>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <div className="content">
                  <Switch>
                    <Route exact path='/' render={(props) => <Chart setColor={setColorRouter} />} />
                    <Route path='/managerMenber' render={(props) => <ManagerStoreMenber setColor={setColorRouter} />} />
                    <Route path='/managercalendarcut' render={(props) => <ManagerCalender setColor={setColorRouter} />} />
                    <Route path='/products' render={(props) => <Products setColor={setColorRouter} />} />
                    <Route path='/oders' render={(props) => <Oders setColor={setColorRouter} />} />
                    <Route path='/service' render={(props) => <Slider setColor={setColorRouter} />} />
                    <Route path='/notification' render={(props) => <UpdateInfomation setColor={setColorRouter} />} />
                    <Route path='/managerbook' render={(props) => <BookManager setColor={setColorRouter} />} />
                    <Route path='/users' render={(props) => <Users setColor={setColorRouter} />} /> 
                    <Route path='/history' render={(props) => <History setColor={setColorRouter} />} />                   
                  </Switch>
                </div>
                <Box style={{ marginTop: 15 }} pt={4}>
                  <Copyright />
                </Box>
              </Container>
            </main>
          </div>

        </div>
      </HashRouter>
    </BrowserRouter>
  )
}
export default Admin
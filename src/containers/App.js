import React from 'react'
import { withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'

import { toggleDrawer } from '../actions/layout'
import DrawerContent from '../components/DrawerContent'
import Disconnected from '../components/Disconnected'
import Browser from './Browser'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    whiteSpace: 'nowrap',
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing.unit * 3,
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing.unit * 2,
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  container: {
    flexGrow: 1,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
    },
  },
  disconnected: {
    flexShrink: 0,
    boxShadow: theme.shadows[4],
    zIndex: theme.zIndex.appBar,
  },
  content: {
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 3,
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing.unit * 2,
    },
  },
})

const routes = [
  {
    path: '/browser',
    icon: 'web',
    title: 'Backend browser',
    component: Browser,
  },
]

const App = ({ classes, isConnected, isDrawerOpen, onToggleDrawer }) => (
  <div className={classes.root}>
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={onToggleDrawer}
          className={classes.menuButton}
        >
          <Icon>menu</Icon>
        </IconButton>
        <Typography variant="title" color="inherit" noWrap>
          {routes.map(({ path, title }, i) => (
            <Route key={i} path={path} render={() => title} />
          ))}
        </Typography>
      </Toolbar>
    </AppBar>
    <Hidden mdUp>
      <Drawer
        variant="temporary"
        open={isDrawerOpen}
        onClose={onToggleDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <DrawerContent routes={routes} onClose={onToggleDrawer} />
      </Drawer>
    </Hidden>
    <Hidden smDown implementation="css">
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <DrawerContent routes={routes} />
      </Drawer>
    </Hidden>
    <div className={classes.container}>
      <div className={classes.toolbar} />
      <Collapse
        in={!isConnected}
        mountOnEnter
        unmountOnExit
        className={classes.disconnected}
      >
        <Disconnected />
      </Collapse>
      <main className={classes.content}>
        {routes.map(({ path, component }, i) => (
          <Route key={i} path={path} component={component} />
        ))}
      </main>
    </div>
  </div>
)

const mapStateToProps = ({ layout, dryMoose }) => ({
  isDrawerOpen: layout.isDrawerOpen,
  isConnected: dryMoose.isConnected,
})

const mapDispatchToProps = dispatch => ({
  onToggleDrawer: () => dispatch(toggleDrawer()),
})

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(App)

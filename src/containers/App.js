import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'

import { toggleDrawer } from '../actions/layout'
import DrawerContent from './DrawerContent'
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
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
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
  },
  content: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 3,
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing.unit * 2,
    },
  },
})

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
          Backend browser
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
        <DrawerContent />
      </Drawer>
    </Hidden>
    <Hidden smDown implementation="css">
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <DrawerContent />
      </Drawer>
    </Hidden>
    <div className={classes.container}>
      <div className={classes.toolbar} />
      <Slide direction="down" in={!isConnected} mountOnEnter unmountOnExit>
        <Disconnected />
      </Slide>
      <main className={classes.content}>
        <Browser />
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
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(App)

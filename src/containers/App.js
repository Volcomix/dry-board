import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import Slide from '@material-ui/core/Slide'

import withRoot from '../withRoot'
import AppBarContent from './AppBarContent'
import DrawerContent from './DrawerContent'
import Disconnected from '../components/Disconnected'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  container: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing.unit * 3,
  },
})

const App = ({ classes, isConnected }) => (
  <div className={classes.root}>
    <AppBar className={classes.appBar}>
      <AppBarContent />
    </AppBar>
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <DrawerContent />
    </Drawer>
    <div className={classes.container}>
      <div className={classes.toolbar} />
      <Slide direction="down" in={!isConnected} mountOnEnter unmountOnExit>
        <Disconnected />
      </Slide>
      <main className={classes.content} />
    </div>
  </div>
)

const mapStateToProps = state => ({
  isConnected: state.isConnected,
})

export default connect(mapStateToProps)(withRoot(withStyles(styles)(App)))

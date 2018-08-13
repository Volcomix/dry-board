import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'

import withRoot from '../withRoot'
import AppBarContent from './AppBarContent'
import DrawerContent from './DrawerContent'

const drawerWidth = 240

const styles = {
  title: {
    flexGrow: 1,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
}

const App = ({ classes }) => (
  <React.Fragment>
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
  </React.Fragment>
)

export default withRoot(withStyles(styles)(App))

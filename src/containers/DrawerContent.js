import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'

const DrawerContent = () => (
  <React.Fragment>
    <Toolbar>
      <Typography variant="title" color="textSecondary">
        Dry Board
      </Typography>
    </Toolbar>
    <Divider />
    <List>
      <ListItem button>
        <ListItemIcon>
          <Icon>web</Icon>
        </ListItemIcon>
        <ListItemText primary="Backend browser" />
      </ListItem>
    </List>
  </React.Fragment>
)

export default DrawerContent

import React from 'react'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  active: {
    '& $item': {
      color: theme.palette.primary.main,
    },
  },
  item: {},
})

const DrawerContent = ({ classes, onClose }) => (
  <React.Fragment>
    <Toolbar>
      <Typography variant="title" color="textSecondary">
        Dry Board
      </Typography>
    </Toolbar>
    <Divider />
    <List>
      <ListItem
        button
        component={NavLink}
        to="/browser"
        onClick={onClose}
        activeClassName={classes.active}
      >
        <ListItemIcon className={classes.item}>
          <Icon>web</Icon>
        </ListItemIcon>
        <ListItemText
          primary="Backend browser"
          primaryTypographyProps={{ className: classes.item }}
        />
      </ListItem>
    </List>
  </React.Fragment>
)

export default withStyles(styles)(DrawerContent)

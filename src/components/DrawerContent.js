import React from 'react'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  active: {
    '& $item': {
      color: theme.palette.primary.main,
    },
  },
  item: {
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
  },
})

const DrawerContent = ({ classes, routes, onClose }) => (
  <React.Fragment>
    <Toolbar>
      <Typography variant="title" color="textSecondary">
        Dry Board
      </Typography>
    </Toolbar>
    <Divider />
    <List>
      {routes.map(({ path, icon: Icon, title }, i) => (
        <ListItem
          key={i}
          button
          component={NavLink}
          to={path}
          onClick={onClose}
          activeClassName={classes.active}
        >
          <ListItemIcon className={classes.item}>
            <Icon />
          </ListItemIcon>
          <ListItemText
            primary={title}
            primaryTypographyProps={{ className: classes.item }}
          />
        </ListItem>
      ))}
    </List>
  </React.Fragment>
)

export default withStyles(styles)(DrawerContent)

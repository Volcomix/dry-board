import AppBar from '@material-ui/core/AppBar'
import Collapse from '@material-ui/core/Collapse'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import FilterIcon from '@material-ui/icons/FilterList'
import MarketIcon from '@material-ui/icons/FindInPage'
import InputIcon from '@material-ui/icons/Input'
import MenuIcon from '@material-ui/icons/Menu'
import BrowserIcon from '@material-ui/icons/Web'
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { compose } from 'recompose'
import { toggleDrawer } from '../actions/layout'
import Disconnected from '../components/Disconnected'
import DrawerContent from '../components/DrawerContent'
import EToroIcon from '../icons/EToro'
import Browser from './Browser'
import EToro from './EToro'
import Filter from './Filter'
import Input from './Input'
import Market from './Market'

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
    flexGrow: 1,
    position: 'relative',
  },
  page: {
    overflow: 'auto',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 3,
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing.unit * 2,
    },
  },
  pageEnter: {
    zIndex: 1,
    opacity: 0,
    top: 30,
  },
  pageEnterActive: {
    opacity: 1,
    top: 0,
    transition: theme.transitions.create(['opacity', 'top'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.complex,
    }),
  },
  pageExit: {
    opacity: 1,
  },
  pageExitActive: {
    opacity: 0,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
  },
})

const routes = [
  {
    path: '/browser',
    icon: BrowserIcon,
    title: 'Backend browser',
    component: Browser,
  },
  {
    path: '/etoro',
    icon: EToroIcon,
    title: 'eToro',
    component: EToro,
  },
  {
    path: '/market',
    icon: MarketIcon,
    title: 'Market discovery',
    component: Market,
  },
  {
    path: '/filter',
    icon: FilterIcon,
    title: 'Instruments filter',
    component: Filter,
  },
  {
    path: '/input',
    icon: InputIcon,
    title: 'Prices input',
    component: Input,
  },
]

const App = ({ classes, theme, isConnected, isDrawerOpen, onToggleDrawer }) => (
  <div className={classes.root}>
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={onToggleDrawer}
          className={classes.menuButton}
        >
          <MenuIcon />
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
      <Route
        render={({ location }) => (
          <TransitionGroup className={classes.content}>
            <CSSTransition
              key={location.key}
              timeout={{
                enter: theme.transitions.duration.complex,
                exit: theme.transitions.duration.shortest,
              }}
              classNames={{
                enter: classes.pageEnter,
                enterActive: classes.pageEnterActive,
                exit: classes.pageExit,
                exitActive: classes.pageExitActive,
              }}
            >
              <main className={classes.page}>
                <Switch location={location}>
                  {routes.map(({ path, component }, i) => (
                    <Route key={i} path={path} component={component} />
                  ))}
                </Switch>
              </main>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
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
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(App)

import amber from '@material-ui/core/colors/amber'
import blue from '@material-ui/core/colors/blue'
import cyan from '@material-ui/core/colors/cyan'
import deepOrange from '@material-ui/core/colors/deepOrange'
import deepPurple from '@material-ui/core/colors/deepPurple'
import green from '@material-ui/core/colors/green'
import indigo from '@material-ui/core/colors/indigo'
import lightBlue from '@material-ui/core/colors/lightBlue'
import lightGreen from '@material-ui/core/colors/lightGreen'
import lime from '@material-ui/core/colors/lime'
import orange from '@material-ui/core/colors/orange'
import pink from '@material-ui/core/colors/pink'
import purple from '@material-ui/core/colors/purple'
import red from '@material-ui/core/colors/red'
import teal from '@material-ui/core/colors/teal'
import yellow from '@material-ui/core/colors/yellow'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import React from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export const colors = [
  blue,
  pink,
  green,
  amber,
  lightBlue,
  purple,
  lightGreen,
  orange,
  indigo,
  red,
  teal,
  yellow,
  cyan,
  deepPurple,
  lime,
  deepOrange,
].map(color => color[500])

const chartColor = index => colors[index % colors.length]

const styles = theme => ({
  paper: {
    overflow: 'hidden',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  title: {
    marginLeft: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit,
  },
})

const Chart = ({ classes, title, keys, data }) => (
  <Grid item xs={12} md={6} lg={4}>
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant="title">
        {title}
      </Typography>
      <ResponsiveContainer height={250}>
        <LineChart data={data}>
          <CartesianGrid vertical={false} />
          {keys.map((key, i) => (
            <Line key={key} dataKey={key} stroke={chartColor(i)} dot={false} />
          ))}
          <XAxis
            dataKey="date"
            hide={true}
            type="number"
            scale="time"
            domain={['auto', 'auto']}
          />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fontSize: 12 }}
            tickFormatter={value => +value.toFixed(4)}
          />
          <Tooltip
            itemStyle={{ fontSize: 14 }}
            labelStyle={{ fontSize: 14 }}
            labelFormatter={date => moment(date).format('YYYY-MM-DD HH:mm')}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  </Grid>
)

export default withStyles(styles)(Chart)

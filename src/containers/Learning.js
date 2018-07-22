import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  Tooltip,
  Brush,
} from 'recharts'

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 3,
  },
})

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const Learning = ({ classes, data }) =>
  data && data.length ? (
    <ResponsiveContainer
      className={classes.container}
      width="100%"
      height={300}
    >
      <LineChart data={data}>
        {Object.keys(data[0]).map(i => (
          <Line
            key={i}
            dataKey={i}
            dot={false}
            stroke={colors[i % colors.length]}
          />
        ))}
        <CartesianGrid vertical={false} />
        <YAxis />
        <Tooltip />
        <Brush />
      </LineChart>
    </ResponsiveContainer>
  ) : null

const mapStateToProps = state => ({
  data: state.learning,
})

export default connect(mapStateToProps)(withStyles(styles)(Learning))

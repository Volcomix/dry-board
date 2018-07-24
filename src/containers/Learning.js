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

import chartColors from '../constants/chartColors'

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 3,
  },
})

const Learning = ({ classes, data }) =>
  data ? (
    <div>
      {data.map((item, i) => (
        <ResponsiveContainer key={i} height={300} className={classes.container}>
          <LineChart data={item} margin={{ left: 24, right: 64 }}>
            {Object.keys(item[0]).map(j => (
              <Line key={j} dataKey={j} dot={false} stroke={chartColors(j)} />
            ))}
            <CartesianGrid vertical={false} />
            <YAxis />
            <Tooltip />
            <Brush />
          </LineChart>
        </ResponsiveContainer>
      ))}
    </div>
  ) : null

const mapStateToProps = state => ({
  data: state.learning,
})

export default connect(mapStateToProps)(withStyles(styles)(Learning))

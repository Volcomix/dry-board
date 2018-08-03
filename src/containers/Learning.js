import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Brush,
} from 'recharts'

import chartColors from '../constants/chartColors'

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 3,
  },
  label: {
    ...theme.typography.body1,
  },
  history: {
    display: 'flex',
    height: 200,
  },
})

const margin = { left: 24, right: 64 }

const Learning = ({ classes, data, history }) =>
  data ? (
    <div>
      {data.map((chart, i) => (
        <ResponsiveContainer key={i} height={200} className={classes.container}>
          <LineChart data={chart} margin={margin} syncId="learning">
            {Object.keys(chart[0]).map(j => (
              <Line key={j} dataKey={j} dot={false} stroke={chartColors(j)} />
            ))}
            <CartesianGrid vertical={false} />
            <YAxis />
            <Tooltip />
            {i === 0 ? <Brush /> : null}
          </LineChart>
        </ResponsiveContainer>
      ))}
      <div className={classNames(classes.container, classes.history)}>
        <ResponsiveContainer>
          <LineChart data={history} margin={margin} syncId="history">
            <Line dataKey="loss" dot={false} isAnimationActive={false} />
            <CartesianGrid />
            <XAxis dataKey="epoch" />
            <YAxis>
              <Label
                value="Loss"
                position="left"
                angle={-90}
                className={classes.label}
              />
            </YAxis>
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer>
          <LineChart data={history} margin={margin} syncId="history">
            <Line dataKey="accuracy" dot={false} isAnimationActive={false} />
            <CartesianGrid />
            <XAxis dataKey="epoch" />
            <YAxis>
              <Label
                position="left"
                angle={-90}
                value="Accuracy"
                className={classes.label}
              />
            </YAxis>
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  ) : null

const mapStateToProps = state => ({
  data: state.learningData,
  history: state.learningHistory,
})

export default connect(mapStateToProps)(withStyles(styles)(Learning))

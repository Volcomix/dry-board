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

const Learning = ({ classes, data, history }) => (
  <React.Fragment>
    {data &&
      data.map((chart, i) => (
        <ResponsiveContainer key={i} height={200} className={classes.container}>
          <LineChart data={chart} margin={margin} syncId="learning">
            {Object.keys(chart[0]).map(j => (
              <Line key={j} dataKey={j} dot={false} stroke={chartColors(j)} />
            ))}
            <CartesianGrid vertical={false} />
            <YAxis />
            <Tooltip isAnimationActive={false} />
            {i === 0 ? <Brush /> : null}
          </LineChart>
        </ResponsiveContainer>
      ))}
    {history && (
      <div className={classNames(classes.container, classes.history)}>
        <ResponsiveContainer>
          <LineChart data={history} margin={margin} syncId="history">
            <Line dataKey="loss" dot={false} isAnimationActive={false} />
            <CartesianGrid />
            <XAxis dataKey="epoch" type="number" allowDecimals={false} />
            <YAxis>
              <Label
                value="Loss"
                position="left"
                angle={-90}
                className={classes.label}
              />
            </YAxis>
            <Tooltip isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer>
          <LineChart data={history} margin={margin} syncId="history">
            <Line dataKey="accuracy" dot={false} isAnimationActive={false} />
            <CartesianGrid />
            <XAxis dataKey="epoch" type="number" allowDecimals={false} />
            <YAxis>
              <Label
                position="left"
                angle={-90}
                value="Accuracy"
                className={classes.label}
              />
            </YAxis>
            <Tooltip isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}
  </React.Fragment>
)

const mapStateToProps = state => ({
  data: state.learningData,
  history: state.learningHistory,
})

export default connect(mapStateToProps)(withStyles(styles)(Learning))

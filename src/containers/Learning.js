import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import classNames from 'classnames'
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Line,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Brush,
} from 'recharts'

import chartColors from '../constants/chartColors'

const chartHeight = 300
const margin = { left: 24, right: 42, bottom: 24 }

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  card: {
    marginTop: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
  },
  label: {
    ...theme.typography.body1,
  },
  inputs: {
    paddingBottom: theme.spacing.unit * 2,
  },
  historyContainer: {
    display: 'flex',
    height: chartHeight,
  },
  history: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  historyLabel: {
    marginLeft: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit,
  },
})

const Learning = ({ classes, inputs, data, history }) => (
  <div className={classes.container}>
    {inputs && (
      <Paper className={classNames(classes.card, classes.inputs)}>
        <ResponsiveContainer height={chartHeight}>
          <LineChart data={inputs} margin={margin} syncId="inputs">
            <CartesianGrid vertical={false} />
            <Tooltip isAnimationActive={false} />
            {Object.keys(inputs[0])
              .filter(j => !['date', 'target'].includes(j))
              .map((j, i) => (
                <Line key={j} dataKey={j} dot={false} stroke={chartColors(i)} />
              ))}
            <XAxis dataKey="date" hide={true} />
            <YAxis />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer height={chartHeight}>
          <BarChart data={inputs} margin={margin} syncId="inputs">
            <CartesianGrid vertical={false} />
            <Tooltip isAnimationActive={false} />
            <Bar dataKey="target" dot={false} fill={chartColors(0)} />
            <XAxis dataKey="date" hide={true} />
            <YAxis ticks={[-1, 0, 1]} />
            <Brush y={chartHeight - 40} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    )}
    {data && (
      <Paper className={classes.card}>
        {data.map((chart, i) => (
          <ResponsiveContainer key={i} height={chartHeight}>
            <LineChart data={chart} margin={margin} syncId="data">
              <CartesianGrid vertical={false} />
              <Tooltip isAnimationActive={false} />
              {Object.keys(chart[0]).map(j => (
                <Line key={j} dataKey={j} dot={false} stroke={chartColors(j)} />
              ))}
              <YAxis />
            </LineChart>
          </ResponsiveContainer>
        ))}
      </Paper>
    )}
    {history &&
      history.length && (
        <Paper className={classNames(classes.card, classes.historyContainer)}>
          <div className={classes.history}>
            <Typography className={classes.historyLabel}>
              Last loss: {history[history.length - 1].loss.toFixed(2)}
            </Typography>
            <ResponsiveContainer>
              <LineChart data={history} margin={margin} syncId="history">
                <CartesianGrid />
                <Tooltip isAnimationActive={false} />
                <Line dataKey="loss" dot={false} isAnimationActive={false} />
                <XAxis dataKey="epoch" type="number" allowDecimals={false}>
                  <Label
                    value="Epoch"
                    position="bottom"
                    className={classes.label}
                  />
                </XAxis>
                <YAxis>
                  <Label
                    value="Loss"
                    position="left"
                    angle={-90}
                    className={classes.label}
                  />
                </YAxis>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className={classes.history}>
            <Typography className={classes.historyLabel}>
              Last accuracy:{' '}
              {(history[history.length - 1].accuracy * 100).toFixed(2)}%
            </Typography>
            <ResponsiveContainer>
              <LineChart data={history} margin={margin} syncId="history">
                <CartesianGrid />
                <Tooltip isAnimationActive={false} />
                <Line
                  dataKey="accuracy"
                  dot={false}
                  isAnimationActive={false}
                />
                <XAxis dataKey="epoch" type="number" allowDecimals={false}>
                  <Label
                    value="Epoch"
                    position="bottom"
                    className={classes.label}
                  />
                </XAxis>
                <YAxis>
                  <Label
                    position="left"
                    angle={-90}
                    value="Accuracy"
                    className={classes.label}
                  />
                </YAxis>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      )}
  </div>
)

const mapStateToProps = state => ({
  inputs: state.learningInputs,
  data: state.learningData,
  history: state.learningHistory,
})

export default connect(mapStateToProps)(withStyles(styles)(Learning))

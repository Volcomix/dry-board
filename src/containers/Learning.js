import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
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
    marginTop: theme.spacing.unit * 11,
  },
  label: {
    ...theme.typography.body1,
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
    {inputs && [
      <ResponsiveContainer key="features" height={chartHeight}>
        <LineChart data={inputs} margin={margin} syncId="inputs">
          {Object.keys(inputs[0])
            .filter(j => !['date', 'target'].includes(j))
            .map((j, i) => (
              <Line key={j} dataKey={j} dot={false} stroke={chartColors(i)} />
            ))}
          <CartesianGrid vertical={false} />
          <XAxis dataKey="date" hide={true} />
          <YAxis />
          <Tooltip isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>,
      <ResponsiveContainer key="target" height={chartHeight}>
        <BarChart data={inputs} margin={margin} syncId="inputs">
          <CartesianGrid vertical={false} />
          <XAxis dataKey="date" hide={true} />
          <YAxis ticks={[-1, 0, 1]} />
          <Tooltip isAnimationActive={false} />
          <Bar dataKey="target" dot={false} fill={chartColors(5)} />
          <Brush />
        </BarChart>
      </ResponsiveContainer>,
    ]}
    {data &&
      data.map((chart, i) => (
        <ResponsiveContainer key={i} height={chartHeight}>
          <LineChart data={chart} margin={margin} syncId="data">
            {Object.keys(chart[0]).map(j => (
              <Line key={j} dataKey={j} dot={false} stroke={chartColors(j)} />
            ))}
            <CartesianGrid vertical={false} />
            <YAxis />
            <Tooltip isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      ))}
    {history &&
      history.length && (
        <div className={classes.historyContainer}>
          <div className={classes.history}>
            <Typography className={classes.historyLabel}>
              Last loss: {history[history.length - 1].loss.toFixed(2)}
            </Typography>
            <ResponsiveContainer>
              <LineChart data={history} margin={margin} syncId="history">
                <Line dataKey="loss" dot={false} isAnimationActive={false} />
                <CartesianGrid />
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
                <Tooltip isAnimationActive={false} />
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
                <Line
                  dataKey="accuracy"
                  dot={false}
                  isAnimationActive={false}
                />
                <CartesianGrid />
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
                <Tooltip isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
  </div>
)

const mapStateToProps = state => ({
  inputs: state.learningInputs,
  data: state.learningData,
  history: state.learningHistory,
})

export default connect(mapStateToProps)(withStyles(styles)(Learning))

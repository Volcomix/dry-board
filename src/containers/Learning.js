import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Line,
  Bar,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Brush,
} from 'recharts'
import moment from 'moment'

import chartColors from '../constants/chartColors'
import {
  changeInputsView,
  changeInputsPage,
  changeInputsRowsPerPage,
} from '../actions'

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
  tableCell: {
    paddingRight: 12,
  },
  chartLabel: {
    marginLeft: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit,
  },
  axisLabel: {
    ...theme.typography.body1,
  },
  inputsCharts: {
    paddingTop: theme.spacing.unit * 2,
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
})

const Learning = ({
  classes,
  inputs,
  data,
  history,
  predictions,
  inputsView,
  inputsPage,
  inputsRowsPerPage,
  onInputsChangeView,
  onInputsChangePage,
  onInputsChangeRowsPerPage,
}) => (
  <div className={classes.container}>
    {inputs && (
      <Paper>
        <Tabs
          value={inputsView}
          onChange={onInputsChangeView}
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <Tab icon={<Icon>show_chart</Icon>} value="charts" />
          <Tab icon={<Icon>grid_on</Icon>} value="table" />
        </Tabs>
        <Divider />
        {inputsView === 'charts' && (
          <div className={classes.inputsCharts}>
            <ResponsiveContainer height={chartHeight}>
              <LineChart data={inputs} margin={margin} syncId="inputs">
                <CartesianGrid vertical={false} />
                <Tooltip
                  isAnimationActive={false}
                  labelFormatter={date =>
                    moment.utc(date).format('YYYY-MM-DD HH:mm')
                  }
                />
                {Object.keys(inputs[0])
                  .filter(j => !['date', 'target'].includes(j))
                  .map((j, i) => (
                    <Line
                      key={j}
                      dataKey={j}
                      dot={false}
                      isAnimationActive={false}
                      stroke={chartColors(i)}
                    />
                  ))}
                <XAxis dataKey="date" hide={true} />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer height={chartHeight}>
              <BarChart data={inputs} margin={margin} syncId="inputs">
                <CartesianGrid vertical={false} />
                <Tooltip
                  isAnimationActive={false}
                  labelFormatter={date =>
                    moment.utc(date).format('YYYY-MM-DD HH:mm')
                  }
                />
                <Bar
                  dataKey="target"
                  dot={false}
                  isAnimationActive={false}
                  fill={chartColors(0)}
                />
                <XAxis dataKey="date" hide={true} />
                <YAxis ticks={[-1, 0, 1]} />
                <Brush y={chartHeight - 40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        {inputsView === 'table' && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCell}>date</TableCell>
                {Object.keys(inputs[0])
                  .filter(key => !['date', 'target'].includes(key))
                  .map(key => (
                    <TableCell key={key} className={classes.tableCell} numeric>
                      {key}
                    </TableCell>
                  ))}
                <TableCell className={classes.tableCell} numeric>
                  target
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inputs
                .slice(
                  inputsPage * inputsRowsPerPage,
                  inputsPage * inputsRowsPerPage + inputsRowsPerPage,
                )
                .map(row => (
                  <TableRow key={row.date}>
                    <TableCell className={classes.tableCell}>
                      {moment.utc(row.date).format('YYYY-MM-DD HH:mm')}
                    </TableCell>
                    {Object.entries(row)
                      .filter(([key]) => !['date', 'target'].includes(key))
                      .map(([key, value]) => (
                        <TableCell
                          key={key}
                          className={classes.tableCell}
                          numeric
                        >
                          {value && value.toFixed(4)}
                        </TableCell>
                      ))}
                    <TableCell className={classes.tableCell} numeric>
                      {row.target}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={inputs.length}
                  page={inputsPage}
                  rowsPerPage={inputsRowsPerPage}
                  onChangePage={onInputsChangePage}
                  onChangeRowsPerPage={onInputsChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        )}
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
                <Line
                  key={j}
                  dataKey={j}
                  dot={false}
                  isAnimationActive={false}
                  stroke={chartColors(j)}
                />
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
            <Typography className={classes.chartLabel}>
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
                    className={classes.axisLabel}
                  />
                </XAxis>
                <YAxis>
                  <Label
                    value="Loss"
                    position="left"
                    angle={-90}
                    className={classes.axisLabel}
                  />
                </YAxis>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className={classes.history}>
            <Typography className={classes.chartLabel}>
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
                    className={classes.axisLabel}
                  />
                </XAxis>
                <YAxis>
                  <Label
                    position="left"
                    angle={-90}
                    value="Accuracy"
                    className={classes.axisLabel}
                  />
                </YAxis>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      )}
    {predictions && (
      <Paper className={classes.card}>
        <Typography className={classes.chartLabel}>
          Correct predictions:
          {(() => {
            const strongest = predictions.filter(
              entry => 1 - Math.abs(entry.prediction) < 0.5,
            )
            const sum = strongest.reduce((sum, entry) => {
              if (Math.abs(entry.target - entry.prediction) < 0.5) {
                return sum + 1
              }
              return sum
            }, 0)
            return ` ${((100 * sum) / strongest.length).toFixed(2)}%`
          })()}
        </Typography>
        <ResponsiveContainer height={chartHeight}>
          <BarChart data={predictions} margin={margin}>
            <CartesianGrid vertical={false} />
            <Tooltip isAnimationActive={false} />
            <Bar dataKey="prediction" dot={false} isAnimationActive={false}>
              {predictions.map((entry, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={(() => {
                    if (1 - Math.abs(entry.prediction) >= 0.5) {
                      return 'rgba(0, 0, 0, 0.2)'
                    } else if (
                      Math.abs(entry.target - entry.prediction) < 0.5
                    ) {
                      return 'green'
                    } else {
                      return 'red'
                    }
                  })()}
                />
              ))}
            </Bar>
            <YAxis ticks={[-1, -0.5, 0, 0.5, 1]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    )}
  </div>
)

const mapStateToProps = state => ({
  inputs: state.learningInputs,
  data: state.learningData,
  history: state.learningHistory,
  predictions: state.learningPredictions,
  inputsView: state.inputsView,
  inputsPage: state.inputsPage,
  inputsRowsPerPage: state.inputsRowsPerPage,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onInputsChangeView: (event, view) => dispatch(changeInputsView(view)),
  onInputsChangePage: (event, page) => dispatch(changeInputsPage(page)),
  onInputsChangeRowsPerPage: event =>
    dispatch(changeInputsRowsPerPage(event.target.value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Learning))

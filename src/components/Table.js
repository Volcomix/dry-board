import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import MuiTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import React from 'react'
import { compose } from 'recompose'

const styles = {
  paper: {
    overflow: 'hidden',
  },
  overflow: {
    overflow: 'auto',
  },
  cell: {
    paddingLeft: 12,
    paddingRight: 12,
  },
}

const Table = ({
  classes,
  width,
  data,
  rowsPerPage,
  page,
  order,
  orderBy,
  onChangeRowsPerPage,
  onChangePage,
  onChangeOrder,
}) =>
  data && data.length ? (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <div className={classes.overflow}>
          <MuiTable padding="dense">
            <TableHead>
              <TableRow>
                {Object.keys(data[0]).map(key => (
                  <TableCell key={key} classes={{ paddingDense: classes.cell }}>
                    <TableSortLabel
                      active={orderBy === key}
                      direction={order}
                      onClick={() => onChangeOrder(key)}
                    >
                      {key}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .sort((a, b) => {
                  if (orderBy === undefined) {
                    return 0
                  }
                  if (a[orderBy] < b[orderBy]) {
                    return order === 'asc' ? -1 : 1
                  }
                  if (a[orderBy] > b[orderBy]) {
                    return order === 'asc' ? 1 : -1
                  }
                  return 0
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, i) => (
                  <TableRow key={i} hover={true}>
                    {Object.entries(item).map(([key, value]) => {
                      let display
                      if (
                        typeof value === 'boolean' ||
                        value instanceof Array
                      ) {
                        display = value.toString()
                      } else if (typeof value === 'number') {
                        display = +value.toFixed(4)
                      } else {
                        display = value
                      }
                      return (
                        <TableCell
                          key={key}
                          classes={{ paddingDense: classes.cell }}
                        >
                          {display}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </MuiTable>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPageOptions={isWidthDown('xs', width) ? [5] : undefined}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangeRowsPerPage={event => {
            onChangeRowsPerPage(event.target.value)
          }}
          onChangePage={(event, page) => {
            onChangePage(page)
          }}
        />
      </Paper>
    </Grid>
  ) : null

export default compose(
  withStyles(styles),
  withWidth(),
)(Table)

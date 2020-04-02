import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FilterListIcon from '@material-ui/icons/FilterList';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

function createData(pic, name, username, repos, followers , email, hireable, link) {
	if (hireable == null){
		hireable = "-";
	}
	else if (hireable === true){
		hireable = "Yes"
	}
	else if(hireable === false){
		hireable = "No"
	}
	if (email ==null){
		email = "-"
	}
	if (name == null){
		name = "-"
	}
  return { pic, name, username, repos, followers, email, hireable, link};
}



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'pic', numeric: false, disablePadding: true, label: '' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
  { id: 'username', numeric: true, disablePadding: false, label: 'Username' },
  { id: 'repos', numeric: true, disablePadding: false, label: 'Repos' },
  { id: 'followers', numeric: true, disablePadding: false, label: 'Followers' },
  { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
  { id: 'hireable', numeric: true, disablePadding: false, label: 'Hireable' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, rowCount, onRequestSort} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  

  return (
    <TableHead>
    
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  sendUsers: PropTypes.func,
};


const useToolbarStyles = makeStyles((theme) => ({
  root: {
   flex: 1, flexDirection: 'row'
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {sendUsers} = props;
  const [searchValue, setSearch] = React.useState('');
  const [minRepos, setRepos] = React.useState('0');
  const [minFollowers, setFollowers] = React.useState('0');
  const getGithubUsers = (event) => {	
  	console.log(minRepos)
  	if(minRepos === ''){
  		setRepos('0');
  	}
  	if (minFollowers === ''){
  		setFollowers('0');
  	}
	var searchRequest = "https://api.github.com/search/users?q=" + searchValue + "+repos:%3E" + minRepos+
	"+followers:%3E" + minFollowers + "&per_page=100";
	console.log(searchRequest);
	fetch(searchRequest)
	.then(res => res.json())
	.then((result) =>{props.sendUsers(result);});

  };
  const searchHandleOnChange = event => {
	setSearch(event.target.value);
	};
const reposHandleOnChange = event => {
	setRepos(event.target.value);
	};
	const followerHandleOnChange = event => {
	setFollowers(event.target.value);
	};
	const handleKeyDown = event => {
	if(event.key === 'Enter' ){
		getGithubUsers.bind(this);
	}
	};
  return (
    <Toolbar className={classes.root}>
        <form  noValidate autoComplete="off">
      <TextField id="standard-basic" label="Search" onChange={event => searchHandleOnChange(event)}
      />
      </form>
      <form  noValidate autoComplete="off">
      <TextField id="standard-basic" label="Minimum Repos" onChange={event => reposHandleOnChange(event)} 
      value = {minRepos}/>
      </form>
      <form  onSubmit = {getGithubUsers.bind(this)} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Minimum Followers" onChange={event => followerHandleOnChange(event)} 

      value = {minFollowers}/>
      <button type="submit"></button>
      </form>
      <IconButton onClick = {getGithubUsers.bind(this)} aria-label="search">
            <SearchIcon />
          </IconButton>

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  sendUsers: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },

}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('repos');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
const updateRows = (event) => {
	var	results = [];
	var count = 0;
	if(event.total_count< 60){
	event.items.forEach(user =>{ 
	fetch(user.url)
	.then(res => res.json())
	.then((result) =>{results.push(createData(result.avatar_url, result.name, result.login, result.public_repos, result.followers, 
		result.email, result.hireable, result.html_url));
	count = count +1;
	if(count === event.total_count){
	console.log(results);
		setRows(results);
	}
	})
});}
	else{
		event.items.forEach(user => {
			results.push(createData(user.avatar_url, "-", user.login, "-","-","-","-", user.html_url))
		})
		setRows(results)
	}
	/*results = [createData("https://avatars3.githubusercontent.com/u/24359011?v=4", "David", "D", 2, 1, "david@hotmail.com", null, "https://github.com/Tomino98sv"),
	createData("https://avatars3.githubusercontent.com/u/43435793?v=4", "Robaer", "hidenl", 10, 100,"david@hotmail.com", "yes" , "https://github.com/Tomino98sv")]
*/
;
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (

    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
        sendUsers = {updateRows}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}

                    >
                      <TableCell><img src={row.pic}  height = "50" width = "50"/>
                      </TableCell> 
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right" ><a href = {row.link}>{row.username}</a></TableCell>
                      <TableCell align="right">{row.repos}</TableCell>
                      <TableCell align="right">{row.followers}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.hireable}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

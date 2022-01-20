import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import { Table } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/styles'; //apply scc to material-us
import { Paper } from '@material-ui/core';  //wrap outside of components

const styles =  theme => ({
  //findout how to use theme here?
  root:{
    width: '100%',
    // marginTop: theme.spacing.unit *3, 
    // marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table:{
    minWidth: 1080
  }
})

const customers =[
  {
  "id":1,
  "image": "https://placeimg.com/64/64/1",
  "name" : 'jin',
  "birthday":"951212",
  "gender":"male",
  "job":"student"
},
  {
  "id":2,
  "image": "https://placeimg.com/64/64/2",
  "name" : 'james',
  "birthday":"951212",
  "gender":"male",
  "job":"student"
},
  {
  "id":3,
  "image": "https://placeimg.com/64/64/3",
  "name" : 'kfje',
  "birthday":"951212",
  "gender":"male",
  "job":"student"
},
]


class App extends Component {

  render() { 
    const{classes} = this.props
    return (
      //jsx는 렌더하기전 요소가 여러개면 무조건 div같은 요소로 전체를 감싸야 한다 
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Job</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map( c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender}job={c.job}/>);})}
          </TableBody>
        </Table>
      </Paper>
      
    );
  }
}

export default withStyles(styles)(App);
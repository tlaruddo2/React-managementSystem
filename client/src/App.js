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
});


class App extends Component {
  //props: 변경될수 없는 데이터 , state: 변결할 수 있는 데이터 
  state = {
    customers:""
  }

  //api에 접근해서 data받아오는경우 
  //생명주기가 존재
  //모든 component가 mount가 된 후 실행 
  componentDidMount(){
    //body가 res로
    //then: 받아서 설정 
    //catch: 에러 핸들
    this.callApi()
      .then(res => this.setState({customers:res}))
      .catch(err => console.log(err)); 
  }
  

  //비동기적으로 : 처음에느 리액트 컴포넌트 구성되면 state값이 처음에 비어있다 
  //약간 시간이 지나야 채워진다 그래서 존재하지 않는 경우도 다르게 설정
  callApi = async() => {
    //response: 접속하고자하는 api주소 
    //고객목록을 body변수에 담기
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  render() { 
    const{classes} = this.props
    return (
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
            {/* 존재하지않는경우도 설정 */}
            {this.state.customers ? this.state.customers.map( c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender}job={c.job}/>);})
            :""}
          </TableBody>
        </Table>
      </Paper>
      
    );
  }
}

export default withStyles(styles)(App);
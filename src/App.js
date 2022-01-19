import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';

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
    return (
      //jsx는 렌더하기전 요소가 여러개면 무조건 div같은 요소로 전체를 감싸야 한다 
      <div>
        {/* map은 key component 필수  */}
        {customers.map( c =>{
          return(
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          );
        })}
      </div>
      
    );
  }
}

export default App;
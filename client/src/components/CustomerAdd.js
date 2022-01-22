import React, { Component } from 'react';
import {post} from 'axios';

class CustomerAdd extends Component { 
    
    constructor(props){
        super(props);
        //초기화 작업
        this.state = {
            file: null,  //실제 바이트 형식의 파일
            userName: "",
            birthday: "",
            gender: "",
            job: '',
            fileName:'' // 이미지 이름
        }
    }

    // event변수 : e
    handleFormSubmit = (e) => {
        // 데이터가 서버로 전달될떄 오류 발생하지않게 방지
        e.preventDefault()
        this.addCustomer()
        //서버로 부터 리스폰 왓을때 결과 넘겨오는 것
            .then( (resonse) =>{
                console.log(resonse.data);
            })
    }

    handleFileChange = (e) => {
        this.setState({
            //e.tager : 이벤트가 발생한 이벤트값 자체 
            // files[0] 하는 이유는 몇몇사이트는 여러 파일 올려주게 하는데 우리는 첫번쨰 , 하나의 파일만 선택
            file: e.target.files[0],
            filename: e.target.value
        })
    }

    handleValueChange = (e) =>{
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => { 
        const url = '/api/cusoers';
        //formData라는 객체를 이용해서 데이터를 서버로 보낸다 
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gernder);
        formData.append('job', this.state.job);
        //데이터에 파일이 포함되어 있을떄는 html양식의 헤더를 추가한다 
        const config = {
            headers: {
                'content-type':'multipart/form-data'
            }
        }
        //axio라이브러리의 post로 데이터 보낸다 
        return post(url,formData,config);
    }

    



    render() { 
        return (
            //고객 추가양식
            //form의 경우는 내부적으로 어떤 값을 서버로 보낼지 설정 가능하다 
            <form onSubmit={this.handleFormSubmit}>
                <h1>Add customer</h1>
                {/* type: 인풋양식 name: 서버로 전달되는 인풋 변수 명, file : 파일 , value: 값 , onchange: 사용자가 값 입력시 이벤트 처리하는 함수 불러오기 */}
                Profile image : <input type = "file" name = "file" file = {this.state.file} value={this.state.fileName} onChange={this.handleFileChange} / ><br/>
                Name : <input type = "text" name = "userName" value={this.state.userName} onChange={this.handleValueChange} / ><br/>
                birthday : <input type = "text" name = "birthday" value={this.state.birthday} onChange={this.handleValueChange} / ><br/>
                Gender : <input type = "text" name = "gender" value={this.state.gender} onChange={this.handleValueChange} / ><br/>
                Job : <input type = "text" name = "job" value={this.state.job} onChange={this.handleValueChange} / ><br/>
                {/* 이 버튼 불리면 handleFormsubmit함수 불러진다 */}
                <button type='submit'> ADD</button>
            </form>
        );
    }
}

export default CustomerAdd;
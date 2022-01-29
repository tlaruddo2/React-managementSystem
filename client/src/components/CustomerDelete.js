import React, { Component } from 'react';

class CustomerDelete extends Component {

    deleteCusotmer(id){
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() { 
        return (
            <button onClick={(e) => this.deleteCusotmer(this.props.id)}>Delete</button>
        );
    }
}
 
export default CustomerDelete;
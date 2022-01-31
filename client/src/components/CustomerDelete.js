import React, { Component } from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Typography } from '@material-ui/core';
class CustomerDelete extends Component {

    constructor(props){
        super(props);
        this.state = {
            open:false
        }
    }

    handleClickOpen = () => {
        this.setState({
        open: true,
        });
    };

    handleClose = () => {
        this.setState({
        open:false
        });
    };

    deleteCusotmer(id){
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() { 
        return ( 
            <div>
                <Button variant = "contained" color = "secondary" onClick={this.handleClickOpen}>Delete</Button>
                <Dialog open = {this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose = {this.handleClose}>
                        Warning
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            Are you sure that you delete a customer?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant = "contained" color = "primary" onClick = {(e) => {this.deleteCusotmer(this.props.id)}}>
                            Delete
                        </Button>
                        <Button variant = "outlined" color = "primary" onClick = {this.handleClose}>
                            Close
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
 
export default CustomerDelete;
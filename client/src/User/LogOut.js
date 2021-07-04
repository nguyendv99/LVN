import React, { Component } from 'react';

import { Redirect } from "react-router-dom";

class LogOut extends Component {
    constructor(props) {
        super(props);
        this.state ={
            isLogOut: false
        }
    }
    
    
    render() {
        if(localStorage.getItem("UserId")){
            localStorage.clear();
            window.location.reload();
            return (<Redirect to="/" />)
        } else {
            return (<Redirect to="/" />)
        }
        
        return (
            <div>
                <Redirect from='dang-xuat' to="/" />
            </div>
        );
    }
}

export default LogOut;
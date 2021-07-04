import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


class Manage extends Component {

    render() {
        // if(localStorage.getItem('UserId') !== 1){
        //     return(<Redirect to="/" />)
        // }
        return (
            <div className="container">
                <br/>
                <h2 className='center'>Quản lý</h2>
                <br/>
                <Link to='/admin/user' className='nav-link'>
                    <div className="card bg-danger text-white">
                    <div className="card-body">Quản lý người dùng</div>
                </div>
                </Link>
                <Link to='/admin/courses' className='nav-link'>
                    <div className="card bg-success text-white">
                    <div className="card-body">Quản lý khóa học</div>
                </div>
                </Link><Link to='/admin/test' className='nav-link'>
                    <div className="card bg-info text-white">
                    <div className="card-body">Quản lý bài kiểm tra</div>
                </div>
                </Link>
            </div>
        );
    }
}

export default Manage;
import React, { Component } from 'react';
import axios from 'axios';
// import { useCookies } from 'react-cookie';
import { Redirect } from "react-router-dom";


class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: "",
            login: false,
            err: ""
        }
        this.onHangleChange = this.onHangleChange.bind(this);
        this.LogIn = this.LogIn.bind(this);
    }

    onHangleChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    LogIn(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3030/user/login/',
            data: {
                username: this.state.username,
                password: this.state.password,
            }
        }).then(res => {
            if(res.data.token){
                localStorage.setItem('Username', res.data.username);
                localStorage.setItem('UserId', res.data.UserId);
                localStorage.setItem('Token', res.data.token);
                this.setState({
                    reload: true
                })
            } else (
                this.setState({
                    err: "Tài khoản hoặc mật khẩu không chính xác"
                })
            )
            console.log(res.data);
        }).catch(error => console.log(error));

        this.myFormRef.reset();

        this.setState({
            username: "",
            password: ""
        })
    }

    render() {
        if(this.state.reload){
            return window.location.reload();
        }
        if(localStorage.getItem('Username')){
            return (<Redirect to="/" />)
        }
        return (
            <div className="container">
                <div className="login-form">
                    <form onSubmit={this.LogIn} ref={(el) => this.myFormRef = el}>
                        <div className="form-group">
                            <h2>Đăng ký tài khoản</h2>
                            <label htmlFor="username">Tên đăng nhập:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập tài khoản"
                                name="username"
                                value={this.state.username}
                                onChange={this.onHangleChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Mật khẩu:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Nhập mật khẩu"
                                name="password"
                                value={this.state.password}
                                onChange={this.onHangleChange}
                                required />
                        </div>
                        <span className="text-danger">{this.state.err}</span>
                        <div className=" text-center">
                            <button type="submit" className="btn btn-primary">Đăng nhập</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LogIn;
import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            repassword: "",
            error: "",
            signup: false
        }
        this.onHangleChange = this.onHangleChange.bind(this);
        this.SignUp = this.SignUp.bind(this);
    }

    onHangleChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    SignUp(event) {
        event.preventDefault();

        if (this.state.password === this.state.repassword) {
            axios({
                method: 'post',
                url: 'http://localhost:3030/user/signup/',
                data: {
                    Username: this.state.username,
                    Email: this.state.email,
                    Password: this.state.password,
                    Level: 0,
                    Avatar: "",
                    Usertoken: ""
    
                }
            }).then(res => {
                if (res.data === "SignUpEd") {
                    this.setState({
                        signup: true
                    })
                } else (
                    this.setState({
                        error: "Tên đăng nhập hoặc email đã tồn tại!"
                    })
                )
                console.log(res.data);
            }).catch(error => console.log(error));

        } else {
            this.setState({
                error: "Mật khẩu không khớp nhau!",
                password: "",
                repassword: ""
                
            })
        }
    }
    render() {
        if(this.state.signup){
            return (<Redirect to="/dang-nhap" />)
        }
        return (
            <div>
                <div className="container">
                    <div className="login-form">
                        <form onSubmit={this.SignUp} ref={(el) => this.myFormRef = el}>
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
                                <label htmlFor="pwd">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Nhập email"
                                    name="email"
                                    value={this.state.email}
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
                            <div className="form-group">
                                <label htmlFor="pwd">Nhập lại mật khẩu:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Nhập mật lại khẩu"
                                    name="repassword"
                                    value={this.state.repassword}
                                    onChange={this.onHangleChange}
                                    required />
                            </div>
                            <span className="text-danger">{this.state.error}</span>
                            <div className=" text-center">
                                <button type="submit" className="btn btn-primary">Đăng ký</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div >
        );
    }
}

export default SignUp;
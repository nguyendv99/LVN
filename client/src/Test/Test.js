import axios from 'axios';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Test: []
        }
    }
    componentDidMount() {
        this.getAllTest();
    }
    getAllTest(event) {
        axios({
            method: 'get',
            url: 'http://localhost:3030/Test',
            // header: {
            //     token: localStorage.getItem('Token'),
            //     UserId: localStorage.getItem('UserId')
            // }
        }).then(res => {
            this.setState({
                Test: res.data
            });
            console.log(res.data)
        }).catch(error => console.log(error));
    }

    render() {
        if(!localStorage.getItem('UserId')){
            return(<Redirect to="/dang-nhap" />)
        }
        
        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Bài kiểm tra</td>
                            <td>Độ khó</td>
                            <td>Hành động</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.Test.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{value.TestId}</td>
                                        <td>{value.TestTitle}</td>
                                        <td>{value.TestLevel}</td>
                                        <td>
                                            <Link to={'/kiem-tra/' + value.TestId}><button className="btn btn-primary">Làm bài</button></Link>&nbsp;
                                
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot></tfoot>
                </table>

            </div>
        );
    }
}

export default Test;
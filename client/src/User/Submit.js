import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Submit extends Component {

    constructor(props){
        super(props);
        this.state = {
            UserId: props.match.params.UserId,
            Submit: []
        }
    }


    componentDidMount() {
        this.getSubmitOfUser();
    }

    getSubmitOfUser(){
        axios({
            method: 'get',
            url: 'http://localhost:3030/Submit/' + this.state.UserId,
        }).then(res => {
            this.setState({
                Submit: res.data
            });
            console.log(res.data);
            // console.log(this.state.Lesson);
        }).catch(error => console.log(error));
    }
    render() {
        return (
            <div>
                <h5>Bài kiểm tra đã làm</h5>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Bài kiểm tra</td>
                            <td>Điểm</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.Submit.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{value.TestId}</td>
                                        <td><Link to={"/kiem-tra/" + value.TestId}>{value.TestTitle}</Link></td>
                                        <td>{value.Scores}</td>
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

export default Submit;
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            Courses: [],
            Test: []
        })
    }

    componentDidMount() {
        this.getAllCourses();
        this.getAllTest();
    }

    getAllCourses() {
        axios({
            method: 'get',
            url: 'http://localhost:3030/Courses',
        }).then(res => {
            this.setState({
                Courses: res.data
            });
            console.log(res.data)
        })
            .catch(error => console.log(error));
    }

    getAllTest() {
        axios({
            method: 'get',
            url: 'http://localhost:3030/Test',
        }).then(res => {
            this.setState({
                Test: res.data
            });
            console.log(res.data)
        }).catch(error => console.log(error));
    }
    render() {
        return (
            <div>
                <h4>Khóa học:</h4>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Khóa học</td>
                            <td>Độ khó</td>
                            <td>Hành động</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.Courses.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{value.CoursesId}</td>
                                        <td>{value.CoursesTitle}</td>
                                        <td>{value.CoursesLevel}</td>
                                        <td>
                                            <Link to={'/khoa-hoc/' + value.CoursesId}><button className="btn btn-primary">Học bài</button></Link>&nbsp;
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot></tfoot>
                </table>
                <h4>Bài kiểm tra:</h4>
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

export default Home;
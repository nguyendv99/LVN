import React, { Component } from 'react';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
class ManageCourses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Courses: [],
            CoursesTitle: "",
            CoursesLevel: "A1",
            CoursesImage: ""
        }
        this.onHandleChange = this.onHandleChange.bind(this);
        this.addCourses = this.addCourses.bind(this);
    }

    componentDidMount() {
        this.getAllCourses();
    }

    onHandleChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    addCourses(event) {
        event.preventDefault();

        axios({
            method: 'post',
            url: 'http://localhost:3030/Courses',
            data: {
                CoursesTitle: this.state.CoursesTitle,
                CoursesLevel: this.state.CoursesLevel,
                CoursesImage: this.state.CoursesImage
            }
        }).then(res => {
            this.getAllCourses()
            console.log(res.data);
        }).catch(error => console.log(error));


        this.setState({
            CoursesTitle: "",
            CoursesLevel: "A1"
        })
        this.myFormRef.reset();
    }

    deleteCourses(CoursesId) {
        if (window.confirm("Chắc chắc xóa khóa học?")) {
            axios({
                method: 'delete',
                url: 'http://localhost:3030/Courses/' + CoursesId,

            }).then(res => {
                this.getAllCourses()
                console.log(res.data);
            }).catch(error => console.log(error));
        }
    };

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
    render() {
        // if(localStorage.getItem('UserId') !== 1){
        //     return(<Redirect to="/" />)
        // }
        return (
            <div className="container">
                <div className="card border-primary mb-3">
                    <div className="card-header">
                        <button data-toggle="collapse" data-target="#addCourses" className="btn btn-outline-primary">Thêm khóa học</button>
                    </div>
                    <div className="card-body">
                        <div id="addCourses" className="collapse">
                            <form onSubmit={this.addCourses} ref={(el) => this.myFormRef = el}>
                                <div className="form-group">
                                    <div className="mb-2">
                                        <label>Tiêu đề khóa học:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="CoursesTitle"
                                            required
                                            onChange={this.onHandleChange}
                                            value={this.state.CoursesTitle}
                                        />
                                    </div>
                                    <div className="input-group mb-2">
                                        <label className="input-group-text">Độ khó</label>
                                        <select
                                            className="form-control"
                                            id="sel1"
                                            name="CoursesLevel"
                                            onChange={this.onHandleChange}
                                            value={this.state.CoursesLevel}
                                        >
                                            <option value="A1">A1</option>
                                            <option value="A2">A2</option>
                                            <option value="B1">B1</option>
                                            <option value="B2">B2</option>
                                        </select>
                                    </div>
                                    <input type="file" id="myFile" name="filename2"></input>
                                    <div className="text-center">
                                        <button className="btn btn-primary center ">Thêm</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
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
                                            <Link to={'/admin/courses/' + value.CoursesId}><button className="btn btn-primary">Chi tiết</button></Link>&nbsp;
                                            <button className="btn btn-danger" onClick={() => this.deleteCourses(value.CoursesId)}>Xóa</button>
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

export default ManageCourses;
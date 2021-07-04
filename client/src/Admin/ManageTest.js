import React, { Component } from 'react';
import axios from 'axios';
import { Link , Redirect} from 'react-router-dom';

class ManageTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Test: [],
            TestTitle: "",
            TestLevel: "A1",
            TestIntroduction: ""
        }
        this.onHandleChange = this.onHandleChange.bind(this);
        this.addTest = this.addTest.bind(this);
    }

    componentDidMount() {
        this.getAllTest();
    }

    onHandleChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    addTest(event) {
        event.preventDefault();

        axios({
            method: 'post',
            url: 'http://localhost:3030/Test',
            data: {
                TestTitle: this.state.TestTitle,
                TestLevel: this.state.TestLevel,
                TestIntroduction: this.state.TestIntroduction
            }
        }).then(res => {
            this.getAllTest()
            console.log(res.data);
        }).catch(error => console.log(error));



        this.setState({
            TestTitle: "",
            TestLevel: "A1",
            TestIntroduction: ""
        })
        this.myFormRef.reset();
    }

    deleteTest(TestId) {
        if (window.confirm("Chắc chắc xóa khóa học?")) {
            axios({
                method: 'delete',
                url: 'http://localhost:3030/Test/' + TestId,

            }).then(res => {
                this.getAllTest()
                console.log(res.data);
            }).catch(error => console.log(error));
        }
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
        // if(localStorage.getItem('UserId') !== 1){
        //     return(<Redirect to="/" />)
        // }
        return (
            <div className="container">
                <div className="card border-primary mb-3">
                    <div className="card-header">
                        <button data-toggle="collapse" data-target="#addTest" className="btn btn-outline-primary">Thêm bài kiểm tra</button>
                    </div>
                    <div className="card-body">
                        <div id="addTest" className="collapse">
                            <form onSubmit={this.addTest} ref={(el) => this.myFormRef = el}>
                                <div className="form-group">
                                    <div className="mb-2">
                                        <label>Tiêu đề bài kiểm tra:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="TestTitle"
                                            required
                                            onChange={this.onHandleChange}
                                            value={this.state.TestTitle}
                                        />
                                    </div>
                                    <div className="input-group mb-2">
                                        <label className="input-group-text">Độ khó</label>
                                        <select
                                            className="form-control"
                                            id="sel1"
                                            name="TestLevel"
                                            onChange={this.onHandleChange}
                                            value={this.state.TestLevel}
                                        >
                                            <option value="A1">A1</option>
                                            <option value="A2">A2</option>
                                            <option value="B1">B1</option>
                                            <option value="B2">B2</option>
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label>Giới thiệu:</label>
                                        <textarea
                                            className="form-control"
                                            type="text"
                                            name="TestIntroduction"
                                            rows="5"
                                            required
                                            onChange={this.onHandleChange}
                                            value={this.state.TestIntroduction}
                                        />
                                    </div>
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
                                            <Link to={'/admin/test/' + value.TestId}><button className="btn btn-primary">Chi tiết</button></Link>&nbsp;
                                            <button className="btn btn-danger" onClick={() => this.deleteTest(value.TestId)}>Xóa</button>
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

export default ManageTest;
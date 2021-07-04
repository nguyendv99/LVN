import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';


class ManageQuestionCourses extends Component {


    constructor(props) {
        super(props);
        this.state = {
            CoursesId: props.match.params.CoursesId,
            Courses: [],
            CoursesIdUpdate: 0,
            CoursesTitleUpdate: "",
            CoursesLevelUpdate: "",
            CoursesIntroductionUpdate: "",
            QuestionCourses: [],
            Question: "",
            ChoiceA: "",
            ChoiceB: "",
            ChoiceC: "",
            ChoiceD: "",
            Answer: "",

            QuestionCoursesUpdate: [],
            QuestionCoursesIdUpdate: 0,
            QuestionUpdate: "",
            ChoiceUpdate: "",
            AnswerUpdate: "",
            deletedCourses: false
        }
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleChangeQuesCourses = this.onHandleChangeQuesCourses.bind(this);
        this.updateCourses = this.updateCourses.bind(this);
        this.addQuesCourses = this.addQuesCourses.bind(this);
        this.onHandleChangeUpdateQuestionCourses = this.onHandleChangeUpdateQuestionCourses.bind(this);
        this.updateQuestCourses = this.updateQuestCourses.bind(this);
    }


    onHandleChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    onHandleChangeQuesCourses(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    onHandleChangeUpdateQuestionCourses(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }


    showUpdateCoursesModal() {
        let CoursesUpdate = this.state.Courses;
        this.setState({
            CoursesIdUpdate: CoursesUpdate.CoursesId,
            CoursesTitleUpdate: CoursesUpdate.CoursesTitle,
            CoursesLevelUpdate: CoursesUpdate.CoursesLevel,
            CoursesIntroductionUpdate: CoursesUpdate.CoursesIntroduction
        })


        console.log(this.state.Courses);

    }

    updateCourses(event) {
        event.preventDefault();
        axios({
            method: 'put',
            url: 'http://localhost:3030/Courses/' + this.state.CoursesIdUpdate,
            data: {
                CoursesTitle: this.state.CoursesTitleUpdate,
                CoursesLevel: this.state.CoursesLevelUpdate,
                CoursesIntroduction: this.state.CoursesIntroductionUpdate
            }
        }).then(res => {
            this.getCoursesById();
            console.log(res.data);
        }).catch(error => console.log(error));

        this.myFormRef.reset();

        this.setState({
            CoursesIdUpdate: 0,
            CoursesTitleUpdate: "",
            CoursesLevelUpdate: "",
            CoursesIntroductionUpdate: ""
        })
    }

    addQuesCourses(event) {
        event.preventDefault();
        let Choice = this.state.ChoiceA + '#' + this.state.ChoiceB + '#' + this.state.ChoiceC + '#' + this.state.ChoiceD
        console.log(Choice);
        axios({
            method: 'post',
            url: 'http://localhost:3030/QuestionCourses',
            data: {
                Question: this.state.Question,
                Choice: Choice,
                Answer: this.state.Answer,
                CoursesId: this.state.CoursesId,
                ExplainAnswer: ""
            }
        }).then(res => {
            this.getAllQuestionCoursesByCourses()
            console.log(res.data);
        }).catch(error => console.log(error));


        this.setState({
            Question: "",
            ChoiceA: "",
            ChoiceB: "",
            ChoiceC: "",
            ChoiceD: "",
            Answer: ""
        })
        this.myFormRef.reset();
    }

    deleteQuestionCourses(QuestionCouesesId) {
        if (window.confirm("Chắc chắc xóa khóa học?")) {
            axios({
                method: 'delete',
                url: 'http://localhost:3030/QuestionCourses/' + QuestionCouesesId,

            }).then(res => {
                this.getAllQuestionCoursesByCourses()
                console.log(res.data);
            }).catch(error => console.log(error));
        }
    };

    deleteCourses() {
        if (window.confirm("Chắc chắc xóa khóa học?")) {
            axios({
                method: 'delete',
                url: 'http://localhost:3030/Courses/' + this.state.CoursesId,

            }).then(res => {
                this.getAllCourses()
                console.log(res.data);
            }).catch(error => console.log(error));

            axios({
                method: 'delete',
                url: 'http://localhost:3030/QuestionCoursesByCourses/' + this.state.CoursesId,

            }).then(res => {
                this.getAllCourses()
                console.log(res.data);
            }).catch(error => console.log(error));

            this.setState({
                deletedCourses: true
            })
        }
    }

    showUpdateQestCoursesModal(key) {
        console.log(key);
        let QuestionCoursesUpdate = this.state.QuestionCourses[key];
        console.log(QuestionCoursesUpdate);

        this.setState({
            QuestionCoursesIdUpdate: QuestionCoursesUpdate.QuestionCouesesId,
            QuestionUpdate: QuestionCoursesUpdate.Question,
            ChoiceUpdate: QuestionCoursesUpdate.Choice,
            AnswerUpdate: QuestionCoursesUpdate.Answer,
        })

        // console.log(this.state.QuestionCoursesIdUpdate);
    }


    updateQuestCourses(event) {
        event.preventDefault();

        axios({
            method: 'put',
            url: 'http://localhost:3030/QuestionCourses/' + this.state.QuestionCoursesIdUpdate,
            data: {
                Question: this.state.QuestionUpdate,
                Choice: this.state.ChoiceUpdate,
                Answer: this.state.AnswerUpdate,
                CoursesId: this.state.CoursesId
            }
        }).then(res => {
            this.getAllQuestionCoursesByCourses();
            console.log(res.data);
        }).catch(error => console.log(error));

        this.myFormRef.reset();

        this.setState({
            QuestionCoursesIdUpdate: 0,
            QuestionUpdate: "",
            ChoiceUpdate: "",
            AnswerUpdate: ""
        })
    }

    componentDidMount() {
        this.getAllQuestionCoursesByCourses();
        this.getCoursesById();
    }

    getCoursesById() {
        axios({
            method: 'get',
            url: 'http://localhost:3030/Courses/' + this.state.CoursesId,
        }).then(res => {
            this.setState({
                Courses: res.data
            });
            console.log(this.state.Courses);
        }).catch(error => console.log(error));
    }

    getAllQuestionCoursesByCourses() {
        axios({
            method: 'get',
            url: 'http://localhost:3030/QuestionCoursesByCourses/' + this.state.CoursesId,
        }).then(res => {
            this.setState({
                QuestionCourses: res.data
            });
            console.log(this.state.QuestionCourses);
        }).catch(error => console.log(error));
    }

    render() {
        // if(localStorage.getItem('UserId') !== 1){
        //     return(<Redirect to="/" />)
        // }
        // if (this.state.deletedCourses) {
        //     return (<Redirect to="/admin/Courses" />)
        // }
        return (
            <div>
                <div>
                    <div>
                        <div className="">
                            <div className="">
                                <h5>Tiêu đề: {this.state.Courses.CoursesTitle}</h5>
                                <h5>Độ khó: {this.state.Courses.CoursesLevel}</h5>
                                <h5>Thông tin:</h5>
                                <p>{this.state.Courses.CoursesIntroduction}</p>
                            </div>
                            <div className="">
                                <button className="btn btn-primary" data-toggle="modal" data-target="#updateCourses"
                                    onClick={() => this.showUpdateCoursesModal()}
                                >Sửa</button>&nbsp;
                                <button className="btn btn-danger" onClick={() => this.deleteCourses()}>Xóa</button>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-3 text-center">
                                <Link to={'/admin/courses/' + this.state.CoursesId + '/lesson'} className='nav-link'>
                                    <div className="card bg-danger text-white">
                                        <div className="card-body">Bài đọc</div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-3 text-center">
                                <Link to={'/admin/courses/' + this.state.CoursesId + '/syllables'} className='nav-link'>
                                    <div className="card bg-danger text-white">
                                        <div className="card-body">Âm tiết</div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-3 text-center">
                                <Link to={'/admin/courses/' + this.state.CoursesId + '/sentences'} className='nav-link'>
                                    <div className="card bg-danger text-white">
                                        <div className="card-body">Đặt câu</div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-3 text-center">
                                <Link to={'/admin/courses/' + this.state.CoursesId + '/question'} className='nav-link'>
                                    <div className="card bg-danger text-white">
                                        <div className="card-body">Câu hỏi</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="modal fade" id="updateCourses" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Sửa bài kiểm tra</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.updateCourses} ref={(el) => this.myFormRef = el}>
                                            <div className="form-group">
                                                <div className="mb-2">
                                                    <label>Tiêu đề khóa học:</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="CoursesTitleUpdate"
                                                        required
                                                        onChange={this.onHandleChange}
                                                        value={this.state.CoursesTitleUpdate}
                                                    />
                                                </div>
                                                <div className="input-group mb-2">
                                                    <label className="input-group-text">Độ khó</label>
                                                    <select
                                                        className="form-control"
                                                        id="sel1"
                                                        name="CoursesLevelUpdate"
                                                        onChange={this.onHandleChange}
                                                        value={this.state.CoursesLevelUpdate}
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
                                                        name="CoursesIntroductionUpdate"
                                                        rows="5"
                                                        required
                                                        onChange={this.onHandleChange}
                                                        value={this.state.CoursesIntroductionUpdate}
                                                    />
                                                </div>
                                                <div className="text-center">
                                                    <button className="btn btn-primary center " >Lưu</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="card border-secondary mb-2">
                            <div className="card-header">
                                <button data-toggle="collapse" data-target="#addQuesCourses" className="btn btn-outline-primary">Thêm câu hỏi</button>
                            </div>
                            <div className="card-body">
                                <div id="addQuesCourses" className="collapse">
                                    <form onSubmit={this.addQuesCourses} ref={(el) => this.myFormRef = el}>
                                        <div className="form-group">
                                            <div className="mb-2">
                                                <label>Câu hỏi:</label>
                                                <textarea
                                                    className="form-control"
                                                    type="text"
                                                    name="Question"
                                                    rows="2"
                                                    required
                                                    onChange={this.onHandleChangeQuesCourses}
                                                    value={this.state.Question}
                                                />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Lựa chọn A:</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="ChoiceA"
                                                    required
                                                    onChange={this.onHandleChangeQuesCourses}
                                                    value={this.state.ChoiceA} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Lựa chọn B:</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="ChoiceB"
                                                    required
                                                    onChange={this.onHandleChangeQuesCourses}
                                                    value={this.state.ChoiceB} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Lựa chọn C:</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="ChoiceC"
                                                    required
                                                    onChange={this.onHandleChangeQuesCourses}
                                                    value={this.state.ChoiceC} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Lựa chọn D:</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="ChoiceD"
                                                    required
                                                    onChange={this.onHandleChangeQuesCourses}
                                                    value={this.state.ChoiceD} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Đáp án đúng:</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="Answer"
                                                    required
                                                    onChange={this.onHandleChangeQuesCourses}
                                                    value={this.state.Answer} />
                                            </div>
                                            <div className="text-center">
                                                <button className="btn btn-primary center ">Thêm</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div>
                            {
                                this.state.QuestionCourses.map((value, key) => {
                                    return (
                                        <div key={value.QuestionCouesesId}>
                                            <div className="">
                                                <div className="">
                                                    <div>{key + 1} - {value.QuestionCouesesId}: Câu hỏi: {value.Question}</div>
                                                    <div>
                                                        <div className="input-group mb-1">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">Lựa chọn A:</span>
                                                            </div>
                                                            <div className="form-control">{value.Choice.split("#")[0]}</div>
                                                        </div>
                                                        <div className="input-group mb-1">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">Lựa chọn B:</span>
                                                            </div>
                                                            <div className="form-control">{value.Choice.split("#")[0]}</div>
                                                        </div>
                                                        <div className="input-group mb-1">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">Lựa chọn C:</span>
                                                            </div>
                                                            <div className="form-control">{value.Choice.split("#")[0]}</div>
                                                        </div>
                                                        <div className="input-group mb-1">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">Lựa chọn D:</span>
                                                            </div>
                                                            <div className="form-control">{value.Choice.split("#")[0]}</div>
                                                        </div>
                                                    </div>
                                                    <div className="input-group mb-1">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">Đáp án đúng:</span>
                                                        </div>
                                                        <div className="form-control">{value.Answer}</div>
                                                    </div>
                                                </div>
                                                <hr style={{ width: "70%" }} />
                                                <div className="">
                                                <button className="btn btn-primary" data-toggle="modal" data-target="#updateQuestCourses"
                                                onClick={() => this.showUpdateQestCoursesModal(key)}
                                            >Sửa</button>&nbsp;
                                                    <button className="btn btn-danger float-right" onClick={() => this.deleteQuestionCourses(value.QuestionCouesesId)}>Xóa</button>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="updateQuestCourses" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Chỉnh sửa bài học</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.updateQuestCourses} ref={(el) => this.myFormRef = el}>
                                    <div className="form-group">
                                        <div className="mb-2">
                                            <label>Câu hỏi:</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="QuestionUpdate"
                                                required
                                                onChange={this.onHandleChangeUpdateQuestionCourses}
                                                value={this.state.QuestionUpdate}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Lựa chọn: </label>
                                            <textarea
                                                className="form-control"
                                                type="text"
                                                name="ChoiceUpdate"
                                                rows="3"
                                                required
                                                onChange={this.onHandleChangeUpdateQuestionCourses}
                                                value={this.state.ChoiceUpdate}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Đáp án đúng: </label>
                                            <textarea
                                                className="form-control"
                                                type="text"
                                                name="AnswerUpdate"
                                                rows="2"
                                                required
                                                onChange={this.onHandleChangeUpdateQuestionCourses}
                                                value={this.state.AnswerUpdate}
                                            />
                                        </div>

                                        <div className="text-center">
                                            <button className="btn btn-primary center " >Lưu</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManageQuestionCourses;
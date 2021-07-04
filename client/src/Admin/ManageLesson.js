import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class ManageLesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Courses: [],
            CoursesId: props.match.params.CoursesId,
            Lesson: [],
            LessonIdUpdate: 0,
            LessonTitleUpdate: "",
            LessonIntroductionUpdate: "",
            LessonTranscriptUpdate: "",
            LessonVocabularyUpdate: "",
            LessonTitleAdd: "",
            LessonIntroductionAdd: "",
            LessonTranscriptAdd: "",
            LessonVocabularyAdd: "",

        }
        this.onHandleChangeLesson = this.onHandleChangeLesson.bind(this);
        this.updateLesson = this.updateLesson.bind(this);
        this.onHangleAdd = this.onHangleAdd.bind(this);
        this.addLesson = this.addLesson.bind(this);
    }

    componentDidMount() {
        this.getLessonByCourses();
        this.getCoursesById();
    }


    updateLesson(event) {
        event.preventDefault();

        axios({
            method: 'put',
            url: 'http://localhost:3030/Lesson/' + this.state.LessonIdUpdate,
            data: {
                LessonTitle: this.state.LessonTitleUpdate,
                LessonIntroduction: this.state.LessonIntroductionUpdate,
                LessonVocabulary: this.state.LessonVocabularyUpdate,
                LessonTranscript: this.state.LessonTranscriptUpdate,
                LessonImage: "",
                LessonAudio: "",
                CoursesId: this.state.CoursesId
            }
        }).then(res => {
            this.getLessonByCourses();
            console.log(res.data);
        }).catch(error => console.log(error));

        this.myFormRef.reset();

        this.setState({
            LessonIdUpdate: 0,
            LessonTitleUpdate: "",
            LessonIntroductionUpdate: "",
            LessonTranscriptUpdate: "",
            LessonVocabularyUpdate: ""
        })
    }



    showUpdateLessonModal(key) {
        console.log(key);
        let LessonUpdate = this.state.Lesson[key];
        console.log(LessonUpdate.LessonId);

        this.setState({
            LessonIdUpdate: LessonUpdate.LessonId,
            LessonTitleUpdate: LessonUpdate.LessonTitle,
            LessonIntroductionUpdate: LessonUpdate.LessonIntroduction,
            LessonTranscriptUpdate: LessonUpdate.LessonTranscript,
            LessonVocabularyUpdate: LessonUpdate.LessonVocabulary
        })
        console.log(LessonUpdate.LessonTitle);
    }

    onHandleChangeLesson(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
            ;
    }

    deleteLesson(LessonId) {
        if (window.confirm("Chắc chắc xóa khóa học?")) {
            axios({
                method: 'delete',
                url: 'http://localhost:3030/Lesson/' + LessonId,

            }).then(res => {
                this.getLessonByCourses()
                console.log(res.data);
            }).catch(error => console.log(error));
        }

    }

    getLessonByCourses() {
        axios({
            method: 'get',
            url: 'http://localhost:3030/LessonByCourses/' + this.state.CoursesId,
        }).then(res => {
            this.setState({
                Lesson: res.data
            });
            // console.log(this.state.Lesson);
        }).catch(error => console.log(error));
    }

    getCoursesById() {
        axios({
            method: 'get',
            url: 'http://localhost:3030/Courses/' + this.state.CoursesId,
        }).then(res => {
            this.setState({
                Courses: res.data
            });
            console.log(res);
        }).catch(error => console.log(error));
    }

    onHangleAdd(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    addLesson(event) {

        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3030/Lesson',
            data: {
                LessonTitle: this.state.LessonTitleAdd,
                LessonIntroduction: this.state.LessonIntroductionAdd,
                LessonTranscript: this.state.LessonTranscriptAdd,
                LessonVocabulary: this.state.LessonVocabularyAdd,
                LessonImage: "",
                LessonAudio: "",
                CoursesId: this.state.CoursesId
            }
        }).then(res => {
            this.getLessonByCourses()
            console.log(res.data);
        }).catch(error => console.log(error));



        this.setState({
            LessonTitleAdd: "",
            LessonIntroductionAdd: "",
            LessonTranscriptAdd: "",
            LessonVocabularyAdd: "",
        })
        this.myFormRef.reset();
    }

    render() {
        // if(localStorage.getItem('UserId') !== 1){
        //     return(<Redirect to="/" />)
        // }
        return (
            <div>
                <div className="row">
                    <div className="col-sm-9">
                        <h5>Tiêu đề: {this.state.Courses.CoursesTitle}</h5>
                        <h5>Độ khó: {this.state.Courses.CoursesLevel}</h5>
                    </div>
                </div>
                <hr />
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
                <div className="card border-secondary mb-3">
                    <div className="card-header">
                        <button data-toggle="collapse" data-target="#addLesson" className="btn btn-outline-primary">Thêm bài đọc:</button>
                    </div>
                    <div className="card-body">
                        <div id="addLesson" className="collapse">
                            <form onSubmit={this.addLesson} ref={(el) => this.myFormRef = el}>
                                <div className="form-group">
                                    <div className="mb-2">
                                        <label>Tiêu đề bài đọc:</label>
                                        <textarea
                                            className="form-control"
                                            type="text"
                                            name="LessonTitleAdd"
                                            rows="2"
                                             
                                            onChange={this.onHangleAdd}
                                            value={this.state.LessonTitleAdd}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Giới thiệu:</label>
                                        <textarea
                                            className="form-control"
                                            type="text"
                                            name="LessonIntroductionAdd"
                                            rows="2"
                                            onChange={this.onHangleAdd}
                                            value={this.state.LessonIntroductionAdd}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Nội dung bài đọc:</label>
                                        <textarea
                                            className="form-control"
                                            type="text"
                                            name="LessonTranscriptAdd"
                                            rows="5"
                                             
                                            onChange={this.onHangleAdd}
                                            value={this.state.LessonTranscriptAdd}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Từ vựng:</label>
                                        <textarea
                                            className="form-control"
                                            type="text"
                                            name="LessonVocabularyAdd"
                                            rows="2"
                                             
                                            onChange={this.onHangleAdd}
                                            value={this.state.LessonVocabularyAdd}
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
                <hr />
                <div>
                    {
                        this.state.Lesson.map((value, key) => {
                            return (
                                <div>
                                    <div className="">
                                        <div className="">
                                            <h5>{key + 1}. Bài học: {value.LessonTitle}</h5>
                                            <h6 >Thông tin bài học: </h6>
                                            <p style={{ whiteSpace: 'pre-wrap' }}>{value.LessonIntroduction}</p>
                                            <audio style={{ border: '2px', double: '#b1154a', width: '100%' }} controls>
                                                <source src="horse.ogg" type="audio/ogg" />
                                                <source src="/audio/hoitham.mp3" type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                        </audio>
                                            <h6>Nội dung bài học</h6>
                                            <p style={{ whiteSpace: 'pre-wrap' }}>{value.LessonTranscript}</p>
                                            <h6>Từ vựng:</h6>
                                            <p style={{ whiteSpace: 'pre-wrap' }}>{value.LessonVocabulary}</p>
                                        </div>
                                        <hr style={{ width: "70%" }} />
                                        <div className="">
                                            <button className="btn btn-primary" data-toggle="modal" data-target="#updateLesson"
                                                onClick={() => this.showUpdateLessonModal(key)}
                                            >Sửa</button>&nbsp;
                                            <button className="btn btn-danger float-right" onClick={() => this.deleteLesson(value.LessonId)}>Xóa</button>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="modal fade" id="updateLesson" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Chỉnh sửa bài học</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.updateLesson} ref={(el) => this.myFormRef = el}>
                                    <div className="form-group">
                                        <div className="mb-2">
                                            <label>Tiêu đề bài học:{this.state.LessonIdUpdate}</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="LessonTitleUpdate"
                                                 
                                                onChange={this.onHandleChangeLesson}
                                                value={this.state.LessonTitleUpdate}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Thông tin: </label>
                                            <textarea
                                                className="form-control"
                                                type="text"
                                                name="LessonIntroductionUpdate"
                                                rows="2"
                                                onChange={this.onHandleChangeLesson}
                                                value={this.state.LessonIntroductionUpdate}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Nội dung: </label>
                                            <textarea
                                                className="form-control"
                                                type="text"
                                                name="LessonTranscriptUpdate"
                                                rows="4"
                                                 
                                                onChange={this.onHandleChangeLesson}
                                                value={this.state.LessonTranscriptUpdate}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Từ vựng: </label>
                                            <textarea
                                                className="form-control"
                                                type="text"
                                                name="LessonVocabularyUpdate"
                                                rows="3"
                                                 
                                                onChange={this.onHandleChangeLesson}
                                                value={this.state.LessonVocabularyUpdate}
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

export default ManageLesson;
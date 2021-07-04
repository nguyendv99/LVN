import React, { Component } from 'react';
import { Link , Redirect} from 'react-router-dom';
import axios from 'axios';

class ManageSentences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Courses: [],
            CoursesId: props.match.params.CoursesId,
            Sentences: [],

            SentencesIdUpdate: 0,
            SentencesTitleUpdate: "",
            SentencesUpdate: "",
            SentencesVocabularyUpdate: "",

            SentencesTitleAdd: "",
            SentencesAdd: "",
            SentencesVocabularyAdd: "",

        }
        this.onHandleChangeSentences = this.onHandleChangeSentences.bind(this);
        this.updateSentences = this.updateSentences.bind(this);
        this.onHangleAdd = this.onHangleAdd.bind(this);
        this.addSentences = this.addSentences.bind(this);
    }

    componentDidMount() {
        this.getSentencesByCourses();
        this.getCoursesById();
    }


    updateSentences(event) {
        event.preventDefault();

        axios({
            method: 'put',
            url: 'http://localhost:3030/Sentences/' + this.state.SentencesIdUpdate,
            data: {
                SentencesTitle: this.state.SentencesTitleUpdate,
                Sentences: this.state.SentencesUpdate,
                SentencesVocabulary: this.state.SentencesVocabularyUpdate,
                CoursesId: this.state.CoursesId
            }
        }).then(res => {
            this.getSentencesByCourses();
            console.log(res.data);
        }).catch(error => console.log(error));

        this.myFormRef.reset();

        this.setState({
            SentencesIdUpdate: 0,
            SentencesTitleUpdate: "",
            SentencesUpdate: "",
            SentencesVocabularyUpdate: ""
        })
    }



    showUpdateSentencesModal(key) {
        console.log(key);
        let SentencesUpdated = this.state.Sentences[key];
        console.log(SentencesUpdated);

        this.setState({
            SentencesIdUpdate: SentencesUpdated.SentencesId,
            SentencesTitleUpdate: SentencesUpdated.SentencesTitle,
            SentencesUpdate: SentencesUpdated.Sentences,
            SentencesVocabularyUpdate: SentencesUpdated.SentencesVocabulary
        })
        console.log(this.state.SentencesIdUpdated);
    }

    onHandleChangeSentences(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    deleteSentences(SentencesId) {
        if (window.confirm("Chắc chắc xóa khóa học?")) {
            axios({
                method: 'delete',
                url: 'http://localhost:3030/Sentences/' + SentencesId,

            }).then(res => {
                this.getSentencesByCourses()
                console.log(res.data);
            }).catch(error => console.log(error));
        }

    }

    getSentencesByCourses() {
        axios({
            method: 'get',
            url: 'http://localhost:3030/SentencesByCourses/' + this.state.CoursesId,
        }).then(res => {
            this.setState({
                Sentences: res.data
            });
            console.log(this.state.Sentences);
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
            console.log(res.data);
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

    addSentences(event) {

        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3030/Sentences',
            data: {
                SentencesTitle: this.state.SentencesTitleAdd,
                SentencesIntroduction: this.state.SentencesIntroductionAdd,
                SentencesTranscript: this.state.SentencesTranscriptAdd,
                SentencesVocabulary: this.state.SentencesVocabularyAdd,
                Sentences: this.state.SentencesAdd,
                SentencesImage: "",
                SentencesAudio: "",
                CoursesId: this.state.CoursesId
            }
        }).then(res => {
            this.getSentencesByCourses()
            console.log(res.data);
        }).catch(error => console.log(error));



        this.setState({
            SentencesTitleAdd: "",
            SentencesIntroductionAdd: "",
            SentencesTranscriptAdd: "",
            SentencesVocabularyAdd: "",
            SentencesAdd: ""
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
                <hr/>
                <div className="card border-secondary mb-3">
                    <div className="card-header">
                        <button data-toggle="collapse" data-target="#addSentences" className="btn btn-outline-primary">Thêm bài đọc:</button>
                    </div>
                    <div className="card-body">
                        <div id="addSentences" className="collapse">
                            <form onSubmit={this.addSentences} ref={(el) => this.myFormRef = el}>
                                <div className="form-group">
                                    <div className="mb-2">
                                        <label>Tiêu đề bài đọc:</label>
                                        <textarea
                                            className="form-control"
                                            type="text"
                                            name="SentencesTitleAdd"
                                            rows="2"
                                            required
                                            onChange={this.onHangleAdd}
                                            value={this.state.SentencesTitleAdd}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Đặt câu:</label>
                                        <textarea
                                            className="form-control"
                                            type="text"
                                            name="SentencesAdd"
                                            rows="4"
                                            required
                                            onChange={this.onHangleAdd}
                                            value={this.state.SentencesAdd}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Từ vựng:</label>
                                        <textarea
                                            className="form-control"
                                            type="text"
                                            name="SentencesVocabularyAdd"
                                            rows="3"
                                            
                                            onChange={this.onHangleAdd}
                                            value={this.state.SentencesVocabularyAdd}
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
                        this.state.Sentences.map((value, key) => {
                            return (
                                <div>
                                    <div className="">
                                        <div className="">
                                            <h5>{key + 1} - {value.SentencesId}. Bài học: {value.SentencesTitle}</h5>
                                            <h6 >Đặt câu: </h6>
                                            <p style={{ whiteSpace: 'pre-wrap' }}>{value.Sentences}</p>
                                            <h6>Từ vựng:</h6>
                                            <p style={{ whiteSpace: 'pre-wrap' }}>{value.SentencesVocabulary}</p>
                                        </div>
                                        <hr style={{width:"70%"}}/>
                                        <div className="">
                                            <button className="btn btn-primary" data-toggle="modal" data-target="#updateSentences"
                                                onClick={() => this.showUpdateSentencesModal(key)}
                                            >Sửa</button>&nbsp;
                                            <button className="btn btn-danger float-right" onClick={() => this.deleteSentences(value.SentencesId)}>Xóa</button>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="modal fade" id="updateSentences" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Chỉnh sửa bài học</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.updateSentences} ref={(el) => this.myFormRef = el}>
                                    <div className="form-group">
                                        <div className="mb-2">
                                            <label>Tiêu đề bài học:{this.state.SentencesIdUpdate}</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="SentencesTitleUpdate"
                                                required
                                                onChange={this.onHandleChangeSentences}
                                                value={this.state.SentencesTitleUpdate}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Đặt câu: </label>
                                            <textarea
                                                className="form-control"
                                                type="text"
                                                name="SentencesUpdate"
                                                rows="2"
                                                required
                                                onChange={this.onHandleChangeSentences}
                                                value={this.state.SentencesUpdate}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Từ vựng: </label>
                                            <textarea
                                                className="form-control"
                                                type="text"
                                                name="SentencesVocabularyUpdate"
                                                rows="3"
                                                
                                                onChange={this.onHandleChangeSentences}
                                                value={this.state.SentencesVocabularyUpdate}
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

export default ManageSentences;
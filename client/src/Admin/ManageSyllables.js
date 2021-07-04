import React, { Component } from 'react';
import axios from 'axios';
import { Link ,Redirect} from 'react-router-dom';
class ManageSyllables extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Courses: [],
            CoursesId: props.match.params.CoursesId,
            Syllables: [],

            SyllableIdUpdate: 0,
            SyllablesTitleUpdate: "",
            SyllableUpdate: "",
            SyllablesVocabularyUpdate: "",
            NumSyllableUpdate: 0,
            SyllableSentencesUpdate: "",

            SyllablesTitleAdd: "",
            SyllableAdd: "",
            SyllablesVocabularyAdd: "",
            NumSyllableAdd: 0,
            SyllableSentencesAdd: "",

        }
        this.onHangleUpdate = this.onHangleUpdate.bind(this);
        this.updateSyllables = this.updateSyllables.bind(this);
        this.onHangleAdd = this.onHangleAdd.bind(this);
        this.addLesson = this.addLesson.bind(this);
    }

    componentDidMount() {
        this.getAllSyllableByCOurses();
        this.getCoursesById();
    }

    deleteSyllable(SyllableId) {
        if (window.confirm("Chắc chắc xóa bài học?")) {
            axios({
                method: 'delete',
                url: 'http://localhost:3030/Syllables/' + SyllableId,
            }).then(res => {
                this.getAllSyllableByCOurses()
                console.log(res.data);
            }).catch(error => console.log(error));
        }
    }

    showUpdateModal(key) {
        console.log(key);
        let SyllableUpdate = this.state.Syllables[key];
        console.log(SyllableUpdate);

        this.setState({
            SyllableIdUpdate: SyllableUpdate.SyllableId,
            SyllablesTitleUpdate: SyllableUpdate.SyllableTitle,
            SyllableUpdate: SyllableUpdate.Syllable,
            SyllablesVocabularyUpdate: SyllableUpdate.SyllableVocabulary,
            NumSyllableUpdate: SyllableUpdate.NumSyllable,
            SyllableSentencesUpdate: SyllableUpdate.SyllableSentences
        })
    }

    onHangleUpdate(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    updateSyllables(event) {
        event.preventDefault();

        axios({
            method: 'put',
            url: 'http://localhost:3030/Syllables/' + this.state.SyllableIdUpdate,
            data: {
                SyllableTitle: this.state.SyllablesTitleUpdate,
                Syllable: this.state.SyllableUpdate,
                SyllableVocabulary: this.state.SyllablesVocabularyUpdate,
                NumSyllable: this.state.NumSyllableUpdate,
                SyllableSentences: this.state.SyllableSentencesUpdate,
                CoursesId: this.state.CoursesId
            }
        }).then(res => {
            this.getAllSyllableByCOurses();
            console.log(res.data);
        }).catch(error => console.log(error));

        this.myFormRef.reset();

        this.setState({
            SyllableIdUpdate: 0,
            SyllablesTitleUpdate: "",
            SyllableUpdate: "",
            SyllablesVocabularyUpdate: "",
            NumSyllableUpdate: 0,
            SyllableSentencesUpdate: "",
        })
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
            url: 'http://localhost:3030/Syllables',
            data: {
                SyllableTitle: this.state.SyllablesTitleAdd,
                Syllable: this.state.SyllableAdd,
                SyllableVocabulary: this.state.SyllablesVocabularyAdd,
                NumSyllable: this.state.NumSyllableAdd,
                SyllableSentences: this.state.SyllableSentencesAdd,
                CoursesId: this.state.CoursesId
            }
        }).then(res => {
            this.getAllSyllableByCOurses()
            console.log(res.data);
        }).catch(error => console.log(error));

        this.setState({
            SyllablesTitleAdd: "",
            SyllableAdd: "",
            SyllablesVocabularyAdd: "",
            NumSyllableAdd: 0,
            SyllableSentencesAdd: "",
        })
        this.myFormRef.reset();
    }

    getAllSyllableByCOurses() {
        axios({
            method: 'get',
            url: 'http://localhost:3030/SyllablesByCourses/' + this.state.CoursesId,
        }).then(res => {
            this.setState({
                Syllables: res.data
            });
            console.log(this.state.Syllables);
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
            console.log(this.state.Courses);
        }).catch(error => console.log(error));
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
                <hr />
                <div className="card border-secondary mb-3">
                    <div className="card-header">
                        <button data-toggle="collapse" data-target="#addLesson" className="btn btn-outline-primary">Thêm bài học</button>
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
                                            name="SyllablesTitleAdd"
                                            rows="2"
                                            required
                                            onChange={this.onHangleAdd}
                                            value={this.state.SyllablesTitleAdd}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Từ vựng:</label>
                                        <textarea
                                            className="form-control"
                                            type="text"
                                            name="SyllablesVocabularyAdd"
                                            rows="2"
                                            
                                            onChange={this.onHangleAdd}
                                            value={this.state.SyllablesVocabularyAdd}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Âm tiết:</label>
                                        <textarea
                                            className="form-control"
                                            type="text"
                                            name="SyllableAdd"
                                            rows="5"
                                            required
                                            onChange={this.onHangleAdd}
                                            value={this.state.SyllableAdd}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Số âm tiết trong 1 nhóm</label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="NumSyllableAdd"
                                            required
                                            onChange={this.onHangleAdd}
                                            value={this.state.NumSyllableAdd}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Câu ví dụ:</label>
                                        <textarea
                                            className="form-control"
                                            type="text"
                                            name="SyllableSentencesAdd"
                                            rows="2"
                                            
                                            onChange={this.onHangleAdd}
                                            value={this.state.SyllableSentencesAdd}
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
                        this.state.Syllables.map((value, key) => {
                            return (
                                <div>
                                    <div className="">
                                        <div className="">
                                            <div>
                                                <h5>{key + 1} - {value.SyllableId} Bài: {value.SyllableTitle}</h5>
                                            </div>
                                            <div>
                                                <h6>Âm tiết</h6>
                                                <table className="table">
                                                    <tbody>
                                                        {
                                                            value.Syllable.split(",").map((val, index) => {
                                                                // if(index % 5 === 1)return(<p>{index}</p>)

                                                                if ((index + 1) % value.NumSyllable === 0) {
                                                                    return (
                                                                        <>
                                                                            <td>{val}</td>
                                                                            <tr />
                                                                        </>
                                                                    );
                                                                } else if ((index + 1) % value.NumSyllable === 1) {
                                                                    return (
                                                                        <>
                                                                            <tr />
                                                                            <td>{val}</td>
                                                                        </>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <td key={index}>{val}</td>
                                                                    );
                                                                }
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div>
                                                <h6>Từ vựng:</h6>
                                                <p style={{ whiteSpace: 'pre-wrap' }}>{value.SyllableVocabulary}</p>
                                            </div>
                                            <div>
                                                <h6>Câu ví dụ:</h6>
                                                <p style={{ whiteSpace: 'pre-wrap' }}>{value.SyllableSentences}</p>
                                            </div>

                                        </div>
                                        <hr style={{ width: "70%" }} />
                                        <div className="">
                                            <button className="btn btn-primary" data-toggle="modal" data-target="#updateSyllables"
                                                onClick={() => this.showUpdateModal(key)}
                                            >Sửa</button>&nbsp;
                                            <button className="btn btn-danger float-right" onClick={() => this.deleteSyllable(value.SyllableId)}>Xóa</button>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="modal fade" id="updateSyllables" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="updateSyllables">Chỉnh sửa bài học</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.updateSyllables} ref={(el) => this.myFormRef = el}>
                                    <div className="form-group">
                                        <div className="mb-2">
                                            <label>Tiêu đề bài đọc:</label>
                                            <textarea
                                                className="form-control"
                                                type="text"
                                                name="SyllablesTitleUpdate"
                                                rows="2"
                                                required
                                                onChange={this.onHangleUpdate}
                                                value={this.state.SyllablesTitleUpdate}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Từ vựng:</label>
                                            <textarea
                                                className="form-control"
                                                type="text"
                                                name="SyllablesVocabularyUpdate"
                                                rows="2"
                                                
                                                onChange={this.onHangleUpdate}
                                                value={this.state.SyllablesVocabularyUpdate}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Âm tiết:</label>
                                            <textarea
                                                className="form-control"
                                                type="text"
                                                name="SyllableUpdate"
                                                rows="5"
                                                required
                                                onChange={this.onHangleUpdate}
                                                value={this.state.SyllableUpdate}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Số âm tiết trong 1 nhóm</label>
                                            <input
                                                className="form-control"
                                                type="number"
                                                name="NumSyllableUpdate"
                                                required
                                                onChange={this.onHangleUpdate}
                                                value={this.state.NumSyllableUpdate}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label>Câu ví dụ:</label>
                                            <textarea
                                                className="form-control"
                                                type="text"
                                                name="SyllableSentencesUpdate"
                                                rows="2"
                                                
                                                onChange={this.onHangleUpdate}
                                                value={this.state.SyllableSentencesUpdate}
                                            />
                                        </div>

                                        <div className="text-center">
                                            <button className="btn btn-primary center ">Lưu</button>
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

export default ManageSyllables;
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

class ManageQuestionTest extends Component {


    constructor(props) {
        super(props);
        this.state = {
            TestId: props.match.params.TestId,
            Test: [],
            TestIdUpdate: 0,
            TestTitleUpdate: "",
            TestLevelUpdate: "",
            TestIntroductionUpdate: "",
            QuestionTest: [],
            Question: "",
            ChoiceA: "",
            ChoiceB: "",
            ChoiceC: "",
            ChoiceD: "",
            Answer: "",

            // QuestionUpdate: [],
            QuestionIdUpdate: 0,
            QuestionUpdate: "",
            ChoiceUpdate: "",
            AnswerUpdate: "",
            deletedTest: false
        }
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleChangeQuesTest = this.onHandleChangeQuesTest.bind(this);
        this.updateTest = this.updateTest.bind(this);
        this.addQuesTest = this.addQuesTest.bind(this);
        this.onHandleChangeUpdate = this.onHandleChangeUpdate.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);
    }


    onHandleChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    onHandleChangeQuesTest(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }


    showUpdateTestModal() {
        let TestUpdate = this.state.Test;
        this.setState({
            TestIdUpdate: TestUpdate.TestId,
            TestTitleUpdate: TestUpdate.TestTitle,
            TestLevelUpdate: TestUpdate.TestLevel,
            TestIntroductionUpdate: TestUpdate.TestIntroduction
        })


        console.log(this.state.Test);

    }

    updateTest(event) {
        event.preventDefault();
        axios({
            method: 'put',
            url: 'http://localhost:3030/Test/' + this.state.TestIdUpdate,
            data: {
                TestTitle: this.state.TestTitleUpdate,
                TestLevel: this.state.TestLevelUpdate,
                TestIntroduction: this.state.TestIntroductionUpdate
            }
        }).then(res => {
            this.getTestById();
            console.log(res.data);
        }).catch(error => console.log(error));

        this.myFormRef.reset();

        this.setState({
            TestIdUpdate: 0,
            TestTitleUpdate: "",
            TestLevelUpdate: "",
            TestIntroductionUpdate: ""
        })
    }

    addQuesTest(event) {
        event.preventDefault();
        let Choice = this.state.ChoiceA + '#' + this.state.ChoiceB + '#' + this.state.ChoiceC + '#' + this.state.ChoiceD
        console.log(Choice);
        axios({
            method: 'post',
            url: 'http://localhost:3030/QuestionTest',
            data: {
                Question: this.state.Question,
                Choice: Choice,
                Answer: this.state.Answer,
                TestId: this.state.TestId,
                ExplainAnswer: ""
            }
        }).then(res => {
            this.getAllQuestionTestByTest()
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

    showUpdateQuestionModal(key){
        console.log(key);
        let QuesUpdate = this.state.QuestionTest[key];

        this.setState({
            QuestionIdUpdate: QuesUpdate.QuestionTestId,
            QuestionUpdate: QuesUpdate.Question,
            ChoiceUpdate: QuesUpdate.Choice,
            AnswerUpdate: QuesUpdate.Answer,
        })
    }

    onHandleChangeUpdate(event){
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    updateQuestion(event){
        event.preventDefault();

        axios({
            method: 'put',
            url: 'http://localhost:3030/QuestionTest/' + this.state.QuestionIdUpdate,
            data: {
                Question: this.state.QuestionUpdate,
                Choice: this.state.ChoiceUpdate,
                Answer: this.state.AnswerUpdate,
                TestId: this.state.TestId,
                ExplainAnswer: ""
            }
        }).then(res => {
            this.getAllQuestionTestByTest();
            console.log(res.data);
        }).catch(error => console.log(error));

        this.myFormRef.reset();

        this.setState({
            QuestionIdUpdateUpdate: 0,
            QuestionUpdate: "",
            ChoiceUpdate: "",
            AnswerUpdate: ""
        })
    }

    deleteQuestionTest(QuestionTestId) {
        if (window.confirm("Chắc chắc xóa khóa học?")) {
            axios({
                method: 'delete',
                url: 'http://localhost:3030/QuestionTest/' + QuestionTestId,

            }).then(res => {
                this.getAllQuestionTestByTest()
                console.log(res.data);
            }).catch(error => console.log(error));
        }
    };

    deleteTest() {
        if (window.confirm("Chắc chắc xóa khóa học?")) {
            axios({
                method: 'delete',
                url: 'http://localhost:3030/Test/' + this.state.TestId,

            }).then(res => {
                this.getAllTest()
                console.log(res.data);
            }).catch(error => console.log(error));

            axios({
                method: 'delete',
                url: 'http://localhost:3030/QuestionTestByTest/' + this.state.TestId,

            }).then(res => {
                this.getAllTest()
                console.log(res.data);
            }).catch(error => console.log(error));

            this.setState({
                deletedTest: true
            })
        }
    }

    componentDidMount() {
        this.getAllQuestionTestByTest();
        this.getTestById();
    }

    getTestById() {
        axios({
            method: 'get',
            url: 'http://localhost:3030/Test/' + this.state.TestId,
        }).then(res => {
            this.setState({
                Test: res.data
            });
            console.log(this.state.Test);
        }).catch(error => console.log(error));
    }

    getAllQuestionTestByTest() {
        axios({
            method: 'get',
            url: 'http://localhost:3030/QuestionTestByTest/' + this.state.TestId,
        }).then(res => {
            this.setState({
                QuestionTest: res.data
            });
            console.log(this.state.QuestionTest);
        }).catch(error => console.log(error));
    }

    render() {
        // if(localStorage.getItem('UserId') !== 1){
        //     return(<Redirect to="/" />)
        // }
        // if (this.state.deletedTest) {
        //     return (<Redirect to="/admin/test" />)
        // }
        return (
            <div>
                <div>
                    <div>
                        <div className="">
                            <div className="">
                                <h5>Tiêu đề: {this.state.Test.TestTitle}</h5>
                                <h5>Độ khó: {this.state.Test.TestLevel}</h5>
                                <h5>Thông tin:</h5>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{this.state.Test.TestIntroduction}</p>
                            </div>
                            <div className="">
                                <button className="btn btn-primary" data-toggle="modal" data-target="#updateTest"
                                    onClick={() => this.showUpdateTestModal()}
                                >Sửa</button>&nbsp;
                                <button className="btn btn-danger" onClick={() => this.deleteTest()}>Xóa</button>
                            </div>
                        </div>
                        <div className="modal fade" id="updateTest" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Sửa bài kiểm tra</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.updateTest} ref={(el) => this.myFormRef = el}>
                                            <div className="form-group">
                                                <div className="mb-2">
                                                    <label>Tiêu đề khóa học:</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="TestTitleUpdate"
                                                        required
                                                        onChange={this.onHandleChange}
                                                        value={this.state.TestTitleUpdate}
                                                    />
                                                </div>
                                                <div className="input-group mb-2">
                                                    <label className="input-group-text">Độ khó</label>
                                                    <select
                                                        className="form-control"
                                                        id="sel1"
                                                        name="TestLevelUpdate"
                                                        onChange={this.onHandleChange}
                                                        value={this.state.TestLevelUpdate}
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
                                                        name="TestIntroductionUpdate"
                                                        rows="5"
                                                        required
                                                        onChange={this.onHandleChange}
                                                        value={this.state.TestIntroductionUpdate}
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
                        <div className="card border-secondary mb-3">
                            <div className="card-header">
                                <button data-toggle="collapse" data-target="#addQuesTest" className="btn btn-outline-primary">Thêm câu hỏi</button>
                            </div>
                            <div className="card-body">
                                <div id="addQuesTest" className="collapse">
                                    <form onSubmit={this.addQuesTest} ref={(el) => this.myFormRef = el}>
                                        <div className="form-group">
                                            <div className="mb-2">
                                                <label>Câu hỏi:</label>
                                                <textarea
                                                    className="form-control"
                                                    type="text"
                                                    name="Question"
                                                    rows="2"
                                                    required
                                                    onChange={this.onHandleChangeQuesTest}
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
                                                    onChange={this.onHandleChangeQuesTest}
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
                                                    onChange={this.onHandleChangeQuesTest}
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
                                                    onChange={this.onHandleChangeQuesTest}
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
                                                    onChange={this.onHandleChangeQuesTest}
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
                                                    onChange={this.onHandleChangeQuesTest}
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
                                this.state.QuestionTest.map((value, key) => {
                                    return (
                                        <div key={value.QuestionTestId}>
                                            <div className="">
                                                <div className="">
                                                    <div>{key + 1} - {value.QuestionTestId}: Câu hỏi: {value.Question}</div>
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
                                                            <div className="form-control">{value.Choice.split("#")[1]}</div>
                                                        </div>
                                                        <div className="input-group mb-1">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">Lựa chọn C:</span>
                                                            </div>
                                                            <div className="form-control">{value.Choice.split("#")[2]}</div>
                                                        </div>
                                                        <div className="input-group mb-1">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">Lựa chọn D:</span>
                                                            </div>
                                                            <div className="form-control">{value.Choice.split("#")[3]}</div>
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
                                                    <button className="btn btn-primary" data-toggle="modal" data-target="#updateQuestion"
                                                        onClick={() => this.showUpdateQuestionModal(key)}
                                                    >Sửa</button>&nbsp;
                                            <button className="btn btn-danger float-right" onClick={() => this.deleteQuestionTest(value.QuestionTestId)}>Xóa</button>
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
                <div className="modal fade" id="updateQuestion" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Chỉnh sửa bài học</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.updateQuestion} ref={(el) => this.myFormRef = el}>
                                    <div className="form-group">
                                        <div className="mb-2">
                                            <label>Câu hỏi:</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="QuestionUpdate"
                                                required
                                                onChange={this.onHandleChangeUpdate}
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
                                                onChange={this.onHandleChangeUpdate}
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
                                                onChange={this.onHandleChangeUpdate}
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

export default ManageQuestionTest;
import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';

class TestDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TestId: props.match.params.TestId,
            Test: [],
            QuestionTest: [],
            score: 0,
            count: 0,
            status: 0,
            high_score: "Chúc mừng đạt điểm cao mới!"




        }
        this.started = this.started.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.ready = this.ready.bind(this);

    }

    componentDidMount() {
        this.getAllQuestionTestByTest();
        this.getTestById();
    }

    checkAnswer(choice, index){
        let QT = this.state.QuestionTest[index];
        let answer = QT.Answer;
        if(answer === choice){
            this.setState({
                score: this.state.score + 1
            })
        }
        if(index + 1 === this.state.QuestionTest.length){
            axios({
                method: 'post',
                url: 'http://localhost:3030/CheckScore',
                data: {
                    UserId: localStorage.getItem('UserId'),
                    TestId: this.state.TestId
                }
            }).then(res => {
                console.log(res.data)
                if(res.data === false){
                    axios({
                        method: 'post',
                        url: 'http://localhost:3030/AddSubmit',
                        data: {
                            UserId: localStorage.getItem('UserId'),
                            TestId: this.state.TestId,
                            Scores: this.state.score
                        }
                    }).then(res => {
                        console.log(res.data);
                    }).catch(error => console.log(error));
                } else {     
                    if(res.data.Scores < this.state.score){
                        console.log(res.data.SubmitId);
                        axios({
                            method: 'put',
                            url: 'http://localhost:3030/UpdateSubmit/' + res.data.SubmitId,
                            data: {
                                UserId: localStorage.getItem('UserId'),
                                TestId: this.state.TestId,
                                Scores: this.state.score
                            }
                        }).then(res => {
                            console.log(res.data);
                        }).catch(error => console.log(error));
                    }

                }
            }).catch(error => console.log(error));
            
            this.setState({
                status : 2
            })
        } else {
            this.setState({
                count : index + 1
            })
        }
        
    }



    started() {
        this.setState({
            status: 1,
        })
    }

    ready(){
        this.setState({
            status: 3
        })
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
        if(!localStorage.getItem('UserId')){
            return(<Redirect to="/dang-nhap" />)
        }
        if(this.state.status === 3){
            window.location.reload();
        }
        if(this.state.status === 0){
            return (
                <div className="text-center">
                    <button className="btn btn-secondary" onClick={() => this.started()}>
                        Bắt đầu
                    </button>
                </div>
            )
        } else if(this.state.status === 1){
            return (
                <div>
                    <div className="">
                        <div className="">
                            <h5>Tiêu đề: {this.state.Test.TestTitle}</h5>
                            <h6>Độ khó: {this.state.Test.TestLevel}</h6>
                            <h6>Thông tin:</h6>
                            <p style={{ whiteSpace: 'pre-wrap', textAlign: 'justify' }}>{this.state.Test.TestIntroduction}</p>
                        </div>
                        <hr />
                        <div>
                            <h5>{this.state.QuestionTest[0].Question}</h5>
                            {
                                
                                this.state.QuestionTest.map((value, index) => {
                                    if (index === this.state.count) {
                                        return (
                                            <div>
                                                <div className="text-center" disabled>
                                                    <h6>Câu {index + 1}: {value.Question}</h6>
                                                    <div className="btn btn-default btn-sm btn-block border border-dark sm-2" 
                                                        onClick={() => this.checkAnswer(value.Choice.split("#")[0], index)}
                                                    >
                                                        A: {value.Choice.split("#")[0]}</div>
                                                    <div className="btn btn-default btn-sm btn-block border border-dark  mb-2"
                                                        onClick={() => this.checkAnswer(value.Choice.split("#")[1], index)}
                                                    >
                                                        B: {value.Choice.split("#")[1]}
                                                    </div>
                                                    <div className="btn btn-default btn-sm btn-block border border-dark mb-2"
                                                        onClick={() => this.checkAnswer(value.Choice.split("#")[2], index)}
                                                    >
                                                        C: {value.Choice.split("#")[2]}
                                                    </div>
                                                    <div className="btn btn-default btn-sm btn-block border border-dark mb-2"
                                                        onClick={() => this.checkAnswer(value.Choice.split("#")[3], index)}
                                                        disabled={true}
                                                    >
                                                        D: {value.Choice.split("#")[3]}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
    
                        </div>
                    </div>
    
                </div>
            )
        } else if(this.state.status === 2){
            return(
                <div className="text-center">
                    {
                        <h5>{this.state.QuestionTest[1].Question}</h5>
                    }
                    <h4>{this.state.high_score}</h4>
                    <h5>Bạn đã làm đúng {this.state.score} / {this.state.QuestionTest.length}</h5>
                    <button className="btn btn-secondary" onClick={() => this.ready()}>Làm lại</button>
                </div>
            )
        }
    }
}

export default TestDetail;
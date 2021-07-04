import axios from 'axios';
import React, { Component } from 'react';


class QuestionCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // CoursesId: props.match.params.CoursesId,
            QuestionCourses: [],
            index: 0,
            score: 0,
            status: 0,
            length: 0

        }
        this.checkAnswer = this.checkAnswer.bind(this);
        this.ready = this.ready.bind(this);
    }

    checkAnswer(choice, index) {
        let QT = this.state.QuestionCourses[index];
        let answer = QT.Answer;
        if (answer === choice) {
            this.setState({
                score: this.state.score + 1
            })
        }
        if (index + 1 === this.state.QuestionCourses.length) {
            this.setState({
                status: 1
            })
        } else {
            this.setState({
                index: index + 1
            })
        }

    }

    ready() {
        this.setState({
            status: 0,
            index: 0
        })
    }


    componentDidMount() {
        this.getAllQuestionCourses();
    }

    getAllQuestionCourses() {
        axios({
            method: 'get',
            url: 'http://localhost:3030/QuestionCoursesByCourses/' + this.props.CoursesId,
        }).then(res => {
            this.setState({
                QuestionCourses: res.data,
                length: res.data.length
            });
            console.log(this.state.length)
        })
            .catch(error => console.log(error));
    }
    render() {
        if (this.state.status === 1) {
            return (
                <div className="text-center">
                    <h5>Bạn đã làm đúng {this.state.score} / {this.state.QuestionCourses.length}</h5>
                    <button className="btn btn-secondary" onClick={() => this.ready()}>Làm lại</button>
                </div>
            )
        }

        if (this.state.length) {
            return (
                <div>
                    <div>
                        <div className="text-center" disabled>
                            <h6>Câu {this.state.index + 1}: {this.state.QuestionCourses[this.state.index]?.Question}</h6>
                            <div className="btn btn-default btn-sm btn-block border border-dark sm-2"
                                onClick={() => this.checkAnswer(this.state.QuestionCourses[this.state.index]?.Choice.split("#")[0], this.state.index)}
                            >
                                A: {this.state.QuestionCourses[this.state.index]?.Choice.split("#")[0]}</div>
                            <div className="btn btn-default btn-sm btn-block border border-dark  mb-2"
                                onClick={() => this.checkAnswer(this.state.QuestionCourses[this.state.index]?.Choice.split("#")[1], this.state.index)}
                            >
                                B: {this.state.QuestionCourses[this.state.index]?.Choice.split("#")[1]}
                            </div>
                            <div className="btn btn-default btn-sm btn-block border border-dark mb-2"
                                onClick={() => this.checkAnswer(this.state.QuestionCourses[this.state.index]?.Choice.split("#")[2], this.state.index)}
                            >
                                C: {this.state.QuestionCourses[this.state.index]?.Choice.split("#")[2]}
                            </div>
                            <div className="btn btn-default btn-sm btn-block border border-dark mb-2"
                                onClick={() => this.checkAnswer(this.state.QuestionCourses[this.state.index]?.Choice.split("#")[3], this.state.index)}
                                disabled={true}
                            >
                                D: {this.state.QuestionCourses[this.state.index]?.Choice.split("#")[3]}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div></div>
            )
        }

    }
}

export default QuestionCourses;
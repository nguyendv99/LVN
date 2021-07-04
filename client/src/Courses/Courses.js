import React, { Component } from 'react';
import axios from 'axios';

import LessonDetail from './Lesson';
import SyllablesDetail from './Syllables';
import SentencesDetail from './Sentences';
import QuestionCourses from './QuestionCourses'
import { Redirect } from 'react-router';


class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CoursesId: props.match.params.CoursesId,
            Lesson: [],
            Syllables: [],
            Sentences: [],
            statusSave: "Lưu",
            needLogIn: false,
            save: false
        }
    }


    componentDidMount() {
        this.getLessonByCourses();
        this.getSyllableByCourses();
        this.checkSaveCourses();
        this.getSentencesByCourses();
    }

    getLessonByCourses() {
        // let CoursesId = this.state.id;
        axios.get('http://localhost:3030/lessonbycourses/' + this.state.CoursesId)
            .then(res => {
                this.setState({
                    Lesson: res.data
                });
                console.log(res.data)
            })
            .catch(error => console.log(error));
    }

    checkSaveCourses() {
        axios({
            method: 'post',
            url: 'http://localhost:3030/CheckFavorites',
            data: {
                UserId: localStorage.getItem('UserId'),
                CoursesId: this.state.CoursesId
            }
        }).then(res => {
            this.setState({
                Courses: res.data
            });
            console.log(res.data)
            if (res.data) {
                this.setState({
                    statusSave: "Hủy lưu"
                })
            } else {
                this.setState({
                    statusSave: "Lưu"
                })
            }
        })
            .catch(error => console.log(error));
    }

    saveCourses(event) {
        if (!localStorage.getItem('UserId')) {
            this.setState({
                needLogIn: true
            })
            return
        } else {
            if (this.state.statusSave === "Lưu") {
                axios({
                    method: 'post',
                    url: 'http://localhost:3030/AddFavorites',
                    data: {
                        UserId: localStorage.getItem('UserId'),
                        CoursesId: this.state.CoursesId
                    }
                }).then(res => {
                    console.log(res.data)
                }).catch(error => console.log(error));

                this.setState({
                    statusSave: "Hủy lưu"
                })
                return

            } else {

                axios({
                    method: 'post',
                    url: 'http://localhost:3030/DeleteFavorites',
                    data: {
                        UserId: localStorage.getItem('UserId'),
                        CoursesId: this.state.CoursesId
                    }
                }).then(res => {
                    console.log(res.data)
                }).catch(error => console.log(error));
                
                this.setState({
                    statusSave: "Hủy lưu"
                })


                this.setState({
                    statusSave: "Lưu"
                })
            }
        }

    }


    getSyllableByCourses() {
        // let CoursesId = this.state.id;
        axios.get('http://localhost:3030/syllablesbycourses/' + this.state.CoursesId)
            .then(res => {
                this.setState({
                    Syllables: res.data
                });
                console.log(res.data)
            })
            .catch(error => console.log(error));
    }

    getSentencesByCourses() {
        // let CoursesId = this.state.id;
        axios.get('http://localhost:3030/sentencesbycourses/' + this.state.CoursesId)
            .then(res => {
                this.setState({
                    Sentences: res.data
                });
                console.log(res)
            })
            .catch(error => console.log(error));
    }

    render() {
        if (this.state.needLogIn) {
            if (window.confirm("Bạn cần đăng nhập để lưu khóa học!")) {
                return (<Redirect to="/dang-nhap" />)
            }
        }
        return (
            <div className="container">
                <div className="float-right">
                    <button className="btn btn-info" onClick={() => this.saveCourses()}>{this.state.statusSave}</button>
                </div>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#lesson">Tập đọc</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#syllables">Học vần</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#sentences">Tập đặt câu</a>
                    </li>
                </ul>
                {/* Tab panes */}
                <div className="tab-content">
                    <div id="lesson" className="container tab-pane active"><br />
                        {
                            this.state.Lesson.map((value, key) => {
                                return (
                                    <LessonDetail key={value.LessonId}
                                        LessonTitle={value.LessonTitle}
                                        LessonIntroduction={value.LessonIntroduction}
                                        LessonVocabulary={value.LessonVocabulary}
                                        LessonTranscript={value.LessonTranscript}>
                                    </LessonDetail>
                                )
                            })
                        }
                        <QuestionCourses CoursesId={this.state.CoursesId}/>

                    </div>
                    <div id="syllables" className="container tab-pane fade"><br />
                        {
                            this.state.Syllables.map((value, key) => {
                                return (
                                    <SyllablesDetail key={value.SyllableId}
                                        num={value.NumSyllable}
                                        SyllableTitle={value.SyllableTitle}
                                        Syllable={value.Syllable}
                                        SyllableVocabulary={value.SyllableVocabulary}
                                        SyllableSentences={value.SyllableSentences}>
                                    </SyllablesDetail   >
                                )
                            })
                        }
                    </div>
                    <div id="sentences" className="container tab-pane fade"><br />
                        {
                            this.state.Sentences.map((value, key) => {
                                return (
                                    <SentencesDetail key={value.SentencesId}
                                        SentencesTitle={value.SentencesTitle}
                                        Sentences={value.Sentences}
                                        SentencesVocabulary={value.SentencesVocabulary}>
                                    </SentencesDetail>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Courses;
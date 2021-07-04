import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListLesson extends Component {
    constructor(props){
        super(props);
        this.state = ({
            Lesson: [],
        })
    }

    componentDidMount() {
        this.getAllLesson();
    }

    getAllLesson() {
        axios({
            method: 'get',
            url: 'http://localhost:3030/Lesson',
        }).then(res => {
            this.setState({
                Lesson: res.data
            });
            console.log(res.data)
        })
            .catch(error => console.log(error));
    }
    render() {
        return (
            <div>
                {
                            this.state.Lesson.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{key +1}: </td>
                                        <td></td> 
                                        <td>
                                            <Link to={'/khoa-hoc/' + value.CoursesId}>{value.LessonTitle}</Link>&nbsp;
                                        </td>
                                    </tr>
                                )
                            })
                        }
                
            </div>
        );
    }
}

export default ListLesson;
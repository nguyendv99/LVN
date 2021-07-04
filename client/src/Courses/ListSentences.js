import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListSentences extends Component {
    constructor(props){
        super(props);
        this.state = ({
            Sentences: [],
        })
    }

    componentDidMount() {
        this.getAllSentences();
    }

    getAllSentences() {
        axios({
            method: 'get',
            url: 'http://localhost:3030/Sentences',
        }).then(res => {
            this.setState({
                Sentences: res.data
            });
            console.log(res.data)
        })
            .catch(error => console.log(error));
    }
    render() {
        return (
            <div>
                {
                            this.state.Sentences.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{key +1}: </td>
                                        <td></td> 
                                        <td>
                                            <Link to={'/khoa-hoc/' + value.CoursesId}>{value.SentencesTitle}</Link>&nbsp;
                                        </td>
                                    </tr>
                                )
                            })
                        }
                
            </div>
        );
    }
}

export default ListSentences;
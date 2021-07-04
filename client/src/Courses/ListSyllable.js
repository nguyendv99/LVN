import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListSyllable extends Component {
    constructor(props){
        super(props);
        this.state = ({
            Syllable: [],
        })
    }

    componentDidMount() {
        this.getAllSyllable();
    }

    getAllSyllable() {
        axios({
            method: 'get',
            url: 'http://localhost:3030/Syllables',
        }).then(res => {
            this.setState({
                Syllable: res.data
            });
            console.log(res.data)
        })
            .catch(error => console.log(error));
    }
    render() {
        return (
            <div>
                {
                            this.state.Syllable.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{key +1}: </td>
                                        <td></td> 
                                        <td>
                                            <Link to={'/khoa-hoc/' + value.CoursesId}>{value.SyllableTitle}</Link>&nbsp;
                                        </td>
                                    </tr>
                                )
                            })
                        }
                
            </div>
        );
    }
}

export default ListSyllable;
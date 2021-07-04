import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Favorite extends Component {

    constructor(props) {
        super(props);
        this.state = {
            UserId: props.match.params.UserId,
            Favorites: []
        }
    }

    componentDidMount() {
        this.getFavoriteOfUser();
    }

    CancelSave(CoursesId) {
        if (window.confirm("Chắc chắc xóa khóa học?")) {
            axios({
                method: 'post',
                url: 'http://localhost:3030/DeleteFavorites',
                data: {
                    UserId: localStorage.getItem('UserId'),
                    CoursesId: CoursesId
                }
            }).then(res => {
                console.log(res.data)
                this.getFavoriteOfUser();
            }).catch(error => console.log(error));
        }
    }
    getFavoriteOfUser() {
        axios({
            method: 'get',
            url: 'http://localhost:3030/Favorites/' + this.state.UserId,
        }).then(res => {
            this.setState({
                Favorites: res.data
            });
            console.log(res.data);
            // console.log(this.state.Lesson);
        }).catch(error => console.log(error));
    }
    render() {
        return (
            <div>
                <h5>Khóa học đã lưu</h5>
                <table className="table table-hover">
                    <tbody>
                        {
                            this.state.Favorites.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{value.CoursesId}</td>
                                        <td><Link to={"/khoa-hoc/" + value.CoursesId}>{value.CoursesTitle}</Link></td>
                                        <td>
                                            <button className="btn btn-info" onClick={() => this.CancelSave(value.CoursesId)}>Hủy lưu</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Favorite;
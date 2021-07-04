import axios from 'axios';
import React, { Component } from 'react';

class ManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      User: [],
    })
  }

  componentDidMount() {
    this.getAllUser();
  }

  getAllUser() {
    axios({
      method: 'get',
      url: 'http://localhost:3030/User',
    }).then(res => {
      this.setState({
        User: res.data
      });
      console.log(res.data)
    })
      .catch(error => console.log(error));
  }


  render() {
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <td>Username</td>
              <td>Email</td>
              <td>Password</td>
            </tr>
          </thead>
          <tbody>
            {
              this.state.User.map((value, key) => {
                return (
                  <tr key={key}>
                    <td>{value.Username}</td>
                    <td>{value.Email}</td>
                    <td>{"**********"}</td>
                  </tr>
                )
              })
            }
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}

export default ManageUser;
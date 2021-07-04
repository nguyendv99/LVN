import React, { Component } from 'react';

class SideBar extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5>Bảng xếp hạng</h5>
                    <table className="table">
                        <tr>
                            <td>Admin</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>Block</td>
                            <td>90</td>
                        </tr>
                        <tr>
                            <td>Clock</td>
                            <td>80</td>
                        </tr>


                    </table>
                </div>
            </div>

        );
    }
}

export default SideBar;
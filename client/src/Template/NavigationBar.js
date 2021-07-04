import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavigationBar extends Component {
    render() {
        if (localStorage.getItem('UserId') === "1") {
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className='container'>
                            <Link to="/" className="navbar-brand">Trang chủ</Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse container" id="navbarText">
                                <ul className="navbar-nav mr-auto">
                                    <li className='nav-item'><Link to='/khoa-hoc' className="nav-link">Khóa học</Link></li>
                                    <li className='nav-item'><Link to='/bai-doc' className="nav-link">Bài đọc</Link></li>
                                    <li className='nav-item'><Link to='/am-tiet' className="nav-link">Âm tiết</Link></li>
                                    <li className='nav-item'><Link to='/dat-cau' className="nav-link">Đặt câu</Link></li>
                                    <li className='nav-item'><Link to='/kiem-tra' className="nav-link">Kiểm tra</Link></li>
                                    <li className='nav-item'><Link to={'/user/' + localStorage.getItem('UserId')+'/khoa-hoc'} className="nav-link">Khóa học đã lưu</Link></li>
                                    <li className='nav-item'><Link to={'/user/' + localStorage.getItem('UserId')+'/bai-kiem-tra'} className="nav-link">Bài kiểm tra đã làm</Link></li>
                                    <li className='nav-item'><Link to='/admin' className="nav-link">Quản lý</Link></li>
                                
                                </ul>
                                <div className="navbar-text">
                                    <Link to='/dang-nhap' className="nav-link">{localStorage.getItem('Username')}</Link>
                                </div>&nbsp;&nbsp;
                        <div className="navbar-text">
                                    <Link to='/dang-xuat' className="nav-link">Đăng xuất</Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            )
        } else if (localStorage.getItem('UserId') > 1) {
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className='container'>
                            <Link to="/" className="navbar-brand">Trang chủ</Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse container" id="navbarText">
                                <ul className="navbar-nav mr-auto">
                                    <li className='nav-item'><Link to='/khoa-hoc' className="nav-link">Khóa học</Link></li>
                                    <li className='nav-item'><Link to='/bai-doc' className="nav-link">Bài đọc</Link></li>
                                    <li className='nav-item'><Link to='/am-tiet' className="nav-link">Âm tiết</Link></li>
                                    <li className='nav-item'><Link to='/dat-cau' className="nav-link">Đặt câu</Link></li>
                                    <li className='nav-item'><Link to='/kiem-tra' className="nav-link">Kiểm tra</Link></li>
                                    <li className='nav-item'><Link to={'/user/' + localStorage.getItem('UserId')+'/khoa-hoc'} className="nav-link">Khóa học đã lưu</Link></li>
                                    <li className='nav-item'><Link to={'/user/' + localStorage.getItem('UserId')+'/bai-kiem-tra'} className="nav-link">Bài kiểm tra đã làm</Link></li>
                                </ul>
                                <div className="navbar-text">
                                    <Link to='/dang-nhap' className="nav-link">{localStorage.getItem('Username')}</Link>
                                </div>&nbsp;&nbsp;
                        <div className="navbar-text">
                                    <Link to='/dang-xuat' className="nav-link">Đăng xuất</Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            )
        } else {
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className='container'>
                            <Link to="/" className="navbar-brand">Trang chủ</Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse container" id="navbarText">
                                <ul className="navbar-nav mr-auto">
                                    <li className='nav-item'><Link to='/khoa-hoc' className="nav-link">Khóa học</Link></li>
                                    <li className='nav-item'><Link to='/bai-doc' className="nav-link">Bài đọc</Link></li>
                                    <li className='nav-item'><Link to='/am-tiet' className="nav-link">Âm tiết</Link></li>
                                    <li className='nav-item'><Link to='/dat-cau' className="nav-link">Đặt câu</Link></li>
                                    <li className='nav-item'><Link to='/kiem-tra' className="nav-link">Kiểm tra</Link></li>
                                    {/* <li className='nav-item'><Link to='/admin' className="nav-link">Quản lý</Link></li> */}
                                </ul>
                                <div className="navbar-text">
                                    <Link to='/dang-nhap' className="nav-link">Đăng nhập</Link>
                                </div>&nbsp;&nbsp;
                            <div className="navbar-text">
                                    <Link to='/dang-ky' className="nav-link">Đăng ký</Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            )
        }

    }
}

export default NavigationBar;
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LogIn from './User/LogIn';
import LogOut from './User/LogOut';
import SignUp from './User/SignUp';

import Header from './Template/Header';
import Nav from './Template/NavigationBar';
import SideBar from './Template/SideBar';
import Footer from './Template/Footer'

import Manage from './Admin/Manage';
import ManageUser from './Admin/ManageUser';
import ManageCourses from './Admin/ManageCourses';
import ListLesson from './Courses/ListLesson';
import ListSyllable from './Courses/ListSyllable';
import ListSentences from './Courses/ListSentences';
import ManageLesson from './Admin/ManageLesson';
import ManageSyllables from './Admin/ManageSyllables';
import ManageSentences from './Admin/ManageSentences';
import ManageQuestinCourses from './Admin/ManageQuestionCourses';
import ManageTest from './Admin/ManageTest'
import ManageQuestionTest from './Admin/ManageQuestionTest'


import Test from './Test/Test'
import TestDetail from './Test/TestDetail'
import Courses from './Courses/Courses'
import CoursesList from './Courses/CoursesList'
import Home from './Template/Home'


import SaveCourse from './User/Favorite'
import Submit from './User/Submit'


class App extends Component {
	render() {
		return (
			<Router>
				<Header />
				<Nav />
				<hr></hr>
				<div className="container">
					<div className="row">
						<div className="col-sm-9">
							<div className="card">
								<div className="card-body">
									<Switch>
										<Route path='/' exact component={Home}></Route>
										<Route path='/dang-nhap' exact component={LogIn}></Route>
										<Route path='/dang-xuat' exact component={LogOut}></Route>
										<Route path='/dang-ky' exact component={SignUp}></Route>
										<Route path='/dang-xuat' exact component={LogOut}></Route>
										<Route path='/kiem-tra' exact component={Test}></Route>
										<Route path='/kiem-tra/:TestId' exact component={TestDetail}></Route>
										<Route path='/admin' exact component={Manage}></Route>
										<Route path='/admin/user' exact component={ManageUser}></Route>
										<Route path='/admin/courses' exact component={ManageCourses}></Route>
										<Route path='/admin/courses/:CoursesId' exact component={ManageLesson}></Route>
										<Route path='/admin/courses/:CoursesId/Lesson' exact component={ManageLesson}></Route>
										<Route path='/admin/courses/:CoursesId/syllables' exact component={ManageSyllables}></Route>
										<Route path='/admin/courses/:CoursesId/sentences' exact component={ManageSentences}></Route>
										<Route path='/admin/courses/:CoursesId/question' exact component={ManageQuestinCourses}></Route>
										<Route path='/admin/test' exact component={ManageTest}></Route>
										<Route path='/admin/test/:TestId' exact component={ManageQuestionTest}></Route>
										<Route path='/khoa-hoc' exact component={CoursesList}></Route>
										<Route path='/bai-doc' exact component={ListLesson}></Route>
										<Route path='/am-tiet' exact component={ListSyllable}></Route>
										<Route path='/dat-cau' exact component={ListSentences}></Route>
										<Route path='/khoa-hoc/:CoursesId' exact component={Courses}></Route>
										<Route path='/user/:UserId/khoa-hoc' exact component={SaveCourse}></Route>
										<Route path='/user/:UserId/bai-kiem-tra' exact component={Submit}></Route>
									</Switch>
								</div>
							</div>
						</div>
						<div className="col-sm-3">
							<SideBar />
						</div>
					</div>
				</div>
				<hr></hr>
				<Footer />
			</Router>
		);
	}
}

export default App;
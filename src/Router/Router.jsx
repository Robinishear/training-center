import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../All-Page/Home/Home";

import Error from "../All-Page/Error/Error";
import BranchesList from "../All-Page/BranchesList/BranchesList";

import CourseList from "../All-Page/CourseList/CourseList";
import StudentResult from "../All-Page/StudentResult/StudentResult";
import OnlineExam from "../All-Page/OnlineExam/OnlineExam";

import Institutes from "../All-Page/Institutes/Institutes";
import PrivateRouts from "../Routs/PrivateRouts";
import Login from "../All-Page/Authintications/Login";

import Register from "../All-Page/Authintications/Register";
import DashBoardLayout from "../layouts/DashBoardLayout";
import AddCourse from "../DashBoardPages/AddCourse";

import UserProfileAndAgreement from "../DashBoardPages/Profile/UserProfileAndAgreement";
import RemoveCourses from "../DashBoardPages/RemoveCourse/RemoveCourses";
import StudentsList from "../DashBoardPages/StudentsList/StudentsList";

import ALLStudents from "../All-Page/ALLStudents/ALLStudents";

import ExamSuggestion from "../DashBoardPages/Branches-All-Page/ExamSuggestion/ExamSuggestion";
import OMRSheet from "../DashBoardPages/Branches-All-Page/OMRSheet/OMRSheet";
import UpdatePassword from "../DashBoardPages/Branches-All-Page/UpdatePassword/UpdatePassword";
import ExamQuestion from "../DashBoardPages/Branches-All-Page/ExamQuestion/ExamQuestion";
import NewStudent from "../DashBoardPages/Branches-All-Page/NewStudent/NewStudent";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "CourseList",
        element: <CourseList />,
        loader: () => fetch("http://localhost:5000/numberOfCourses"),
      },
      {
        path: "Login",
        element: <Login></Login>,
      },
      {
        path: "Register",
        element: <Register></Register>,
      },
      {
        path: "BranchesList",
        element: <BranchesList />,
      },

      {
        path: "StudentResult",
        element: <StudentResult />,
      },
      {
        path: "OnlineExam",
        element: <OnlineExam />,
      },
      {
        path: "Institutes",
        element: <Institutes />,
      },
      {
        path: "ALLStudents",
        element: <ALLStudents />,
      },

      {
        path: "*",
        element: <Error />,
      },
    ],
  },
  {
    path: "/dashBoard",
    element: (
      <PrivateRouts>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRouts>
    ),
    children: [
      {
        path: "/dashBoard/addCourse",
        Component: AddCourse,
      },
      {
        path: "/dashBoard/profile",
        Component: UserProfileAndAgreement,
      },
      {
        path: "/dashBoard/removeCourses",
        Component: RemoveCourses,
      },
      {
        path: "/dashBoard/ExamQuestion",
        Component: ExamQuestion,
      },
      {
        path: "/dashBoard/ExamSuggestion",
        Component: ExamSuggestion,
      },
      {
        path: "/dashBoard/NewStudent",
        Component: NewStudent,
      },
      {
        path: "/dashBoard/OMRSheet",
        Component: OMRSheet,
      },
      {
        path: "/dashBoard/UpdatePassword",
        Component: UpdatePassword,
      },
      {
        path: "/dashBoard/StudentsList",
        Component: StudentsList,
      },
    ],
  },
]);

export default Router;

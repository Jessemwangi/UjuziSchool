import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './pages/Layout';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Main from './Component/Main/Main';
import SignUp from './Component/SignUp';
import Terms from './Component/Terms';
import Privacy from './Component/Privacy';
import SignIn from './Component/SignIn';
import ProductCategories from './Component/modules/views/LessonsCategories';
import LessonHowItWorks from './Component/modules/views/LessonHowItWorks';
import Home from './pages/Home/Home';

const router = createBrowserRouter(
  [{
    path:'/',
    element:<Home />,
    children:[
  {
    path:'/sign-in',
    element:<SignIn />
  },
  {
    path:'/logout',
    element:<Logout/>
  },
  {
    path:'/sign-up',
    element:<SignUp />
  },
  {
    path:'/home',
    element:<Main/>

  },{
    path:'/lessons',
    element:<ProductCategories/>
  },{
    path:'/lessonhow',
    element:<LessonHowItWorks/>
  }
]
  },
  {
    path:'/terms',
    element:<Terms/>

  },
  {
    path:'/privacy',
    element:<Privacy/>

  }
  
]
  // createRoutesFromElements(
  //   <>
  //     <Route element={<Layout />}>
  //       <Route path="/" element={<Login />}></Route>
  //       {/* <Route element={<ProtectedRoutes />}> */}
  //         {/* <Route path="/dashboard" element={<Dashboard />}></Route> */}
  //         {/* <Route path="/picking" element={<PicksUser />}></Route> */}
  //         {/* <Route path="/userview" element={<UserView />}></Route> */}
  //         {/* <Route path="/feedback" element={<Feedback />}></Route> */}
  //         {/* <Route path="/template" element={<Template />}></Route> */}
  //         {/* <Route path="/profile" element={<Profile />}></Route> */}
  //         {/* <Route
  //           path="/report/:revieweeId"
  //           element={<Report />}
  //         ></Route> */}
  //         {/* <Route path="/profiles/:userId" element={<Profile />}></Route> */}
  //         {/* <Route path="/*" element={<Navigate to="/" replace />}></Route> */}
  //       {/* </Route> */}
  //     </Route>
  //   </>
  // )
);
function App() {

  return (
    <div className="App">
      <h1>hello world</h1>
       <RouterProvider router={router} />
    </div>
  );
}

export default App;

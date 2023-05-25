import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './pages/Layout';


import Main from './pages/Main/Main';
import SignUp from './Component/SignUp';
import Terms from './Component/Terms';
import Privacy from './Component/Privacy';
import SignIn from './Component/SignIn';
import ProductCategories from './Component/modules/views/LessonsCategories';
import LessonHowItWorks from './Component/modules/views/LessonHowItWorks';
import Home from './pages/Home/Home';
import Attribute from './Component/modules/views/Attribute';
import Videos from './pages/Videos/Videos';
import Category from './pages/Category/Category';

const router = createBrowserRouter(
  [
    {
    path:'/',
    element:<Layout />,
    children:[
  {
    path:'/',
    element:<Home />},
    {
    path:'/sign-in',
    element:<SignIn />
  },
  {
    path:'/sign-up',
    element:<SignUp />
  },
  {
    path:'/videohome',
    element:<Videos/>,

  },
  {
    path:'/category/:id', 
    element:<Category/>,

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
  },
  {
    path:'/terms',
    element:<Terms/>

  },
  {
    path:'/privacy',
    element:<Privacy/>

  }
  ,
  {
    path:'/attrib',
    element:<Attribute/>

  }
]
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
       <RouterProvider router={router} />
    </div>
  );
}

export default App;

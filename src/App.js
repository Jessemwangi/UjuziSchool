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
import LessonHowItWorks from './Component/modules/views/LessonHowItWorks';
import Home from './pages/Home/Home';
import Attribute from './Component/modules/views/Attribute';
import Videos from './pages/Videos/Videos';
// import Category from './pages/Category/SingleCategory';
// import LessonValues from './Component/modules/views/LessonValues';
import SingleVideo from './pages/SingleVideo/SingleVideo';
import PasswordChange from './Component/Passwords/PasswordChange';
import SubCategories from './pages/SubCategories/SubCategories';
import ForgotPassword from './Component/ForgotPassword';
import SignOut from './Component/SignOut';
import Profile from './Component/profile/Profile';
import { UserProvider } from './hooks/UserContext';
import Dashboard from './Admin/Dashboard';
import MemberVideos from './Admin/Videos/MemberVideos';
import AdminMain from './Admin/AdminMain';
import SingleCategory from './pages/Category/SingleCategory';
import AboutUjuzi from './Component/modules/components/pages/AboutUjuzi';
import ContactUs from './contact-us/Contact_Us';
import WriteUs from './contact-me/WriteUs';
import OurTeamInfo from './Component/team-member/team-details/OurTeamInfo';
import PartnersPage from './Component/WhoIsUjuzi/AboutUjuzi/PartnersArea/PartnersPage';
import HowToBeMember from './pages/HowTo/HowToBeMember';
import ErrorPage from './pages/404';
import ComingSoon from './pages/coming-soon';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
     
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/join-us',
          element: <HowToBeMember />
        }, {
          path: '/sign-out',
          element: <SignOut />
        },
        {
          path: '*',
          element: <ErrorPage />
        },
        {
          path: '/contact',
          element: <ContactUs />
        },
        {
          path: '/writeus',
          element: <WriteUs />
        },
        
        
        {
          path: '/sign-in',
          element: <SignIn />
        },
        {
          path: '/sign-up',
          element: <SignUp />
        },
        {
          path: '/videohome',
          element: <Videos />,

        },
        {
          path: '/category/:id',
          element: <SingleCategory />,

        },
        {
          path: '/singlevideo/:id',
          element: <SingleVideo />

        },
        {
          path: '/home',
          element: <Main />

        }, {
          path: '/teamdetails/:id',
          element: <OurTeamInfo />
        }, {
          path: '/lessonhow',
          element: <LessonHowItWorks />
        },
        {
          path: '/terms',
          element: <Terms />

        },
        {
          path: '/privacy',
          element: <Privacy />

        }
        ,
        {
          path: '/attrib',
          element: <Attribute />

        },
        {
          path: '/partners',
          element: <PartnersPage />

        },
        {
          path: '/comingsoon',
          element: <ComingSoon />

        },
        {
          path: '/aboutus',
          element: <AboutUjuzi />

        },
        {
          path: '/newpassword',
          element: <PasswordChange />

        }
        ,
        {
          path: '/forgot-password',
          element: <ForgotPassword />

        },
        {
          path: '/res/:id',
          element: <SubCategories />

        },
     
        {
          path: '/member',
          element: <Dashboard />,

          children: [{
            path: '/member/admin',
            element: <AdminMain />,

            children: [
              {
              path: '/member/admin/profile',
              element: <Profile />
            },
            {
              path: '/member/admin/video',
              element: <MemberVideos />
            },
           
            
           
          ]

          }
        // {
        //   path:'/dash',
        //   element:<DashboardAppPage/>
        // }
      ]


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
const App = () => {

  return (
    <div className="App">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
      
    </div>
  );
}

export default App;

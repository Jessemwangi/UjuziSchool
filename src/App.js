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
import Attribute from './Component/WhoIsUjuzi/AboutUjuzi/PartnersArea/Attribute';
import Videos from './pages/Videos/Videos';
import SingleVideo from './pages/SingleVideo/SingleVideo';
import PasswordChange from './Component/Passwords/PasswordChange';
import SubCategories from './pages/SubCategories/SubCategories';
import ForgotPassword from './Component/ForgotPassword';
import SignOut from './Component/SignOut';
import Profile from './Admin/pages/profile/Profile';
import { UserProvider } from './hooks/UserContext';
import Dashboard from './Admin/Dashboard';
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
import Pricing from './Admin/pages/pricing-table/Pricing';
import SinglePrice from './Admin/pages/pricing-table/singlePrice/SinglePrice';
import RegisterStudent from './Admin/pages/RegisterStudent/RegisterStudent';
import StudentDetails from './Admin/pages/RegisterStudent/StudentDetails/StudentDetails';
import EventListArea from './events/event-list/event-list-area';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import EventDetailsArea from './events/event-list/event-details-area';
import Instructions from './pages/Resources/Instructions';
import InstructionsDetails from './pages/Resources/InstructionsDetails';
import PartnersArea from './Component/WhoIsUjuzi/AboutUjuzi/PartnersArea/PartnersArea';
import Certificates from './pages/Certificates/Certificates';
import ViewCertificate from './pages/Certificates/ViewCertificate';
import CoursesLessonsCategories from './Component/modules/views/CoursesLessonsCategories';
import AgentDashboard from './Admin/pages/subscription/AgentDashboard ';
import AgentRegistration from './Admin/AgentRegistration';

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
          path:'/cats',
          element:<CoursesLessonsCategories/>
        },
        {
          path: '/contact',
          element: <ContactUs />
        },
        {
          path:'/resources',
          element:<Instructions/>
        },
        {
          path:'certificates',
          element:<Certificates/>
        },
        {
          path: '/events',
          element: <EventListArea />
        },
        {
          path: '/event-details/:id',
          element: <EventDetailsArea />
        },
        {
          path:'/instruction/:id',
          element:<InstructionsDetails/>
        },
        {
          path: '/writeus',
          element: <WriteUs />
        },
        {
          path: '/viewcert',
          element: <ViewCertificate />
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
          path: '/champions',
          element: <PartnersArea />

        },
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

          children: [ 
            {
            path: '/member/agent-dashboard',
            element: <AgentDashboard />
          },
          {
            path: '/member/agent-registration',
            element: <AgentRegistration />
          },
          {
            path: '/member/admin',
            element: <AdminMain />,

            children: [
              {
              path: '/member/admin/profile',
              element: <Profile />
            },
            {
              path: '/member/admin/packages',
              element: <Pricing />
            },
            {
              path: '/member/admin/student',
              element: <RegisterStudent />
            },
            {
              path: '/member/admin/student/details',
              element: <StudentDetails />
            },
            {
              path: '/member/admin/package/:id',
              element: <SinglePrice />
            },
            {
              path: '/member/admin/soon',
              element: <ComingSoon />
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
        <Provider store={ store }>

      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
        </Provider>
      
    </div>
  );
}

export default App;

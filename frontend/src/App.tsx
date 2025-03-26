
import { } from "./utils/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./Components/navbar";
import Footer from "./Components/footer";
import MovieList from "./Components/Movie/Movielist";
import ReviewList from "./Components/Review/ReviewList";
import MovieDetail from "./Components/Movie/Moviedetail";
import SignUpForm from "./Components/auth/Signup";
import Login from "./Pages/login";
import Home from "./Pages/Home";
import ContactPage from "./Pages/contact/contact";
import AboutPage from "./Pages/about/about";
import DashboardPage from "./Pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar/>
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <MovieList />,
      },
      {
        path: "/reviews",
        element: <ReviewList/>,
      },
      {
        path: "/movies/:movieId",
        element: <MovieDetail />,
      },
      {
        path: "/signup",
        element: <SignUpForm />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage/>,
      },
      
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const queryclient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryclient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
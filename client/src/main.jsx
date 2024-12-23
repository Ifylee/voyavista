// client/src/main.jsx
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import { Home } from "./pages/Home/Home.jsx";
import { SingleTrip } from "./pages/One Trip/SingleTrip.jsx";
import { MyTrips } from "./pages/My Trips/myTrips.jsx";

// These are the different routes to be hit that will display a corresponding component
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/trip/:id",
        element: <SingleTrip />,
      },
      {
        path:"my/trips",
        element:<MyTrips/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // This will redirect user to the corresponding page depending on the route
  <RouterProvider router={router} />
);

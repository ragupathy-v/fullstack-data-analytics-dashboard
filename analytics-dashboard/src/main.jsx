import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Datainfo } from "./Components/Datainfo.jsx";
import DataCleaning from "./Components/DataCleaning.jsx";
import Visualization from "./Components/Visualization.jsx";
import Download from "./Components/Download.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Datainfo />,
      },
      {
        path: "datacleaning",
        element: <DataCleaning />,
      },
      {
        path:'visualization',
        element:<Visualization/>
      },
      {
        path:'downloaddataset',
        element:<Download/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}/>
      
  </StrictMode>,
);

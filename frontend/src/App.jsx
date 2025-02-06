import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import RT_Editor from "./pages/RT_Editor";
import RichTextEditor from "./pages/RichTextEditor";

const appRouter = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/lexical",
    element: <RT_Editor />,
  },
  {
    path : "editor",
    element : <RichTextEditor/>
  }
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;

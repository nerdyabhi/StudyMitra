import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp';

const appRouter = createBrowserRouter([
  {
    path: "/auth",
    element: <SignUp />,
  }
]);

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
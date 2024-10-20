import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TaskPage as Task1Page } from "./pages/task1";
import { TaskPage as Task2Page } from "./pages/task2";
import { TaskPage as Task3Page } from "./pages/task3";
import { TaskPage as Task4Page } from "./pages/task4";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/task1",
        element: <Task1Page />,
      },
      {
        path: "/task2",
        element: <Task2Page />,
      },
      {
        path: "/task3",
        element: <Task3Page />,
      },
      {
        path: "/task4",
        element: <Task4Page />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

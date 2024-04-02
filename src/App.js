
import './App.css';
import Navbar from './components/Navbar';
import Body from './components/Body';
import Watch from './components/Watch';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Feed from './components/Feed';


//we have to pass the array in a function createBrowserRouter
const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Body/>,
    children:[
      {
        path: '/',
        element: <Feed/>
      },
      {
        path: '/watch',
        element: <Watch/>
    }]
  }

])
function App() {
  return (
    <div>
    <Navbar />
    <RouterProvider router={appRouter}>
    </RouterProvider>
   
    </div>
  );
}

export default App;

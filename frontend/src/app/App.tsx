import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
// import { useColorScheme } from '@mantine/hooks';
import Test from "./pages/Test";
import Test2 from "./pages/Test2";
import NotFound from "./pages/NotFound";
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Test />} />
      <Route path="test2" element={<Test2 />} />
      <Route path='*' element={<NotFound />}/>
    </Route>
  )
)

function App() {
  // const systemScheme = useColorScheme();

  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          // colorScheme: systemScheme,
          fontFamily: "Roboto, sans-serif",
          colors: {
            ['gray']: ['#F2F2F2', '#DBDBDB', '#C4C4C4', '#ADADAD', '#969696', '#808080', '#666666', '#4D4D4D', '#333333', '#1A1A1A']
          }
        }}>
        <RouterProvider router={router}/>
      </MantineProvider>
    </>
  );
}

export default App;

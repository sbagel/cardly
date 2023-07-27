import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Test from "./pages/Test";
import Test2 from "./pages/Test2";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Test />} />
      <Route path="test2" element={<Test2 />} />
    </Route>
  )
)

function App() {

  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: "Roboto, sans-serif"
        }}>
        <RouterProvider router={router}/>
      </MantineProvider>
    </>
  );
}

export default App;

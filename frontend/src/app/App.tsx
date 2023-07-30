import { useEffect } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
// import { useColorScheme } from '@mantine/hooks';
import Test from "./pages/Test";
import Add from "./pages/Add";
import UserDecks from './pages/UserDecks';
import NotFound from "./pages/NotFound";
import Header from './components/Header.tsx'
import SelectedDeck from './pages/SelectedDeck.tsx';
import { AuthProvider } from '../context/AuthContext.tsx';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header/>}>
      <Route index element={<Test />} />
      <Route path="add" element={<Add />} />
      <Route path="decks" element={<UserDecks />} />
      <Route path="decks/:deckId" element={<SelectedDeck />} />
      <Route path='*' element={<NotFound />}/>
    </Route>
  )
)

  function App() {
    // const systemScheme = useColorScheme();

    return (
      <AuthProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            // colorScheme: systemScheme,
            fontFamily: "Roboto, sans-serif",
            colors: {
              ['gray']: ['#f9f9f9', '#DBDBDB', '#C4C4C4', '#ADADAD', '#969696', '#808080', '#666666', '#4D4D4D', '#333333', '#1A1A1A']
            }
          }}>
          <RouterProvider router={router}/>
        </MantineProvider>
      </AuthProvider>
    );
  }

export default App;

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
// import { useColorScheme } from '@mantine/hooks';
import Home from './pages/Home.tsx';
import Add from "./pages/Add";
import UserFolders from './pages/UserFolders.tsx';
import SelectedFolder from './pages/SelectedFolder.tsx';
import UserDecks from './pages/UserDecks';
import SelectedDeck from './pages/SelectedDeck.tsx';
import NotFound from "./pages/NotFound";
import Header from './components/Header.tsx';

import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header/>}>
      <Route index element={<Home />} />
      <Route path="add" element={<Add />} />
      <Route path="decks" element={<UserDecks />} />
      <Route path="decks/:deckId" element={<SelectedDeck />} />
      <Route path="folders" element={<UserFolders />} />
      <Route path="folders/:folderId" element={<SelectedFolder />} />
      <Route path='*' element={<NotFound />}/>
    </Route>
  )
)

  function App() {
    // const systemScheme = useColorScheme();

    return (
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
    );
  }

export default App;

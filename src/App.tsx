import * as React from "react";
import "./styles.css";
import { BrowserRouter, Route, Routes, Link as RouterLink } from 'react-router-dom';
import DefaultGrid from "./components/TripsGrid/DefaultGrid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Box, Container, Link, ListItemText, Typography } from "@mui/material";
import Toaster from "./components/Toaster";
import NavigationHeader from "./components/NavigationHeader";
import { Provider } from 'react-redux';
import store from './store/globalStore';
const queryClient = new QueryClient();
import Markdown from 'react-markdown'
export default function App() {
  const [readmeContent, setReadmeContent] = React.useState<string>("");
  React.useEffect(() => {
    fetch("https://raw.githubusercontent.com/Silverium/nyc-taxis-demo/master/README.md")
      .then(res => res.text())
      .then(setReadmeContent)
      .catch(console.error);
  }, [])

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Box className="App">
            <NavigationHeader />
            <Routes>
              <Route path="/" Component={() => {
                return (
                  <Container maxWidth="md">
                    <Markdown>{readmeContent}</Markdown>
                  </Container>
                )
              }} />
              <Route path="/taxi-trips" Component={DefaultGrid} />
            </Routes>
            <Toaster />
          </Box>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

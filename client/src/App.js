import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import React from "react";

import styled from "styled-components/macro";
import { GlobalStyle } from "./styles";

import { accessToken, logout } from "./spotify";

import {
  Login,
  Profile,
  TopArtists,
  TopTracks,
  Playlists,
  Playlist,
} from "./pages";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px){
    rightL var(--spacing-lg);
  }
`;

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <>
            <StyledLogoutButton onClick={() => logout()}>
              Log out
            </StyledLogoutButton>
            <Router>
              <ScrollToTop />
              <Routes>
                <Route path="/top-artists" element={<TopArtists />}></Route>
                <Route path="/top-tracks" element={<TopTracks />}></Route>
                <Route path="/playlists/:id" element={<Playlist />}></Route>
                <Route path="/playlists" element={<Playlists />}></Route>
                <Route path="/" element={<Profile />}></Route>
              </Routes>
            </Router>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

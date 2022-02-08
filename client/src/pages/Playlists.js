import React from "react";
import { PlaylistsGrid, SectionWrapper, Loader } from "../components";
import { useEffect, useState } from "react";
import { getCurrentUserPlaylists } from "../spotify";
import { catchErrors } from "../utils";

import axios from "axios";

const Playlists = () => {
  const [playlistsData, setPlaylistsData] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylistsData(userPlaylists.data);
    };
    catchErrors(fetchData());
  }, []);

  useEffect(() => {
    if (!playlistsData) {
      return;
    }

    const fetchMoreData = async () => {
      if (playlistsData.next) {
        const { data } = await axios.get(playlistsData.next);
        setPlaylistsData(data);
      }
    };
    setPlaylists((playlists) => [
      ...(playlists ? playlists : []),
      ...playlistsData.items,
    ]);

    catchErrors(fetchMoreData());
  }, [playlistsData]);

  return (
    <main>
      <SectionWrapper title="Playlists" breadcrumb={true}>
        {playlists ? <PlaylistsGrid playlists={playlists} /> : <Loader />}
      </SectionWrapper>
    </main>
  );
};

export default Playlists;

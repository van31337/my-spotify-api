import { useState, useEffect } from "react";
import { getTopArtists } from "../spotify";
import { catchErrors } from "../utils";
import {
  ArtistsGrid,
  SectionWrapper,
  TimeRangeButtons,
  Loader,
} from "../components";

import React from "react";
const TopArtists = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopArtists(`${activeRange}_term`);
      setTopArtists(data);
    };

    catchErrors(fetchData());
  }, [activeRange]);

  return (
    <main>
      <SectionWrapper title="Top Artists" breadcrumb={true}>
        <TimeRangeButtons
          activeRange={activeRange}
          setActiveRange={setActiveRange}
        />

        {topArtists ? (
          <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
        ) : (
          <Loader />
        )}
      </SectionWrapper>
    </main>
  );
};

export default TopArtists;

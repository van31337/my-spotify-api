import React from "react";

import { useState, useEffect } from "react";
import { getTopTracks } from "../spotify";
import { catchErrors } from "../utils";
import {
  TrackList,
  SectionWrapper,
  TimeRangeButtons,
  Loader,
} from "../components";

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState(null);
  const [activeRange, setActiveRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      const userTopTracks = await getTopTracks(`${activeRange}_term`);
      setTopTracks(userTopTracks.data);
    };

    catchErrors(fetchData());
  }, [activeRange]);
  console.log(topTracks);

  return (
    <main>
      {topTracks ? (
        <SectionWrapper title="Top Artists" breadcrumb={true}>
          <TimeRangeButtons
            activeRange={activeRange}
            setActiveRange={setActiveRange}
          />

          <TrackList tracks={topTracks.items} />
        </SectionWrapper>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default TopTracks;

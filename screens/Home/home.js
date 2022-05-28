import React, { useState } from 'react';
import { ViewPager } from '@ui-kitten/components';
import Timer from './timer';
import Stopwatch from './stopwatch';

const Home = ({}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <ViewPager
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      <Timer />
      <Stopwatch />
    </ViewPager>
  );
};

export default Home;

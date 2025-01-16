import React from 'react';
import { activity } from '@/constants/activity';

const LEVEL_1 = 180;
const LEVEL_2 = 300;
const LEVEL_3 = 350;

const Activity = () => {
  return (
    <>
      {activity
        .sort((a, b) => a.value - b.value)
        .map((item, index) => {
          return <div key={index}>{item.activityName}</div>;
        })}
    </>
  );
};

export default Activity;

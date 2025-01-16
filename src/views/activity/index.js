import React, { useState } from 'react';
import { activity } from '@/constants/activity';
import classNames from 'classnames';
import './index.css';

const LEVEL_1 = 180;
const LEVEL_2 = 300;
const LEVEL_3 = 350;

const Activity = () => {
  const [playerLevel] = useState(90);
  let score = 0;

  return (
    <div>
      {activity
        .sort((a, b) => a.difficulty - b.difficulty)
        .map((item, index) => {
          const currentScore = (score += item.point[playerLevel]);
          return (
            <div
              className={classNames({
                cold: currentScore < LEVEL_1,
                ordinary: currentScore >= LEVEL_1 && currentScore < LEVEL_2,
                hot: currentScore >= LEVEL_2 && currentScore < LEVEL_3,
                excellent: currentScore >= LEVEL_3
              })}
              key={index}>
              {item.activityName}
            </div>
          );
        })}
    </div>
  );
};

export default Activity;

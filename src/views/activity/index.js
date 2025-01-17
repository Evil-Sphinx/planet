import React, { useState } from 'react';
import { Checkbox, Col, Row, Card } from 'antd';
import { activity } from '@/constants/activity';

import classNames from 'classnames';
import './index.less';

const { Group } = Checkbox;

const LEVEL_1 = 180;
const LEVEL_2 = 300;
const LEVEL_3 = 350;

const CHECK_BOX_NUM_PER_LINE = 3;

const Activity = () => {
  const [playerLevel] = useState(90);

  const [doubleActivitys, setDoubleActivitys] = useState([]);
  // const [currentScore, setCurrentScore] = useState(0);

  let score = 0;

  const dayOfWeek = new Date().getDay();

  const todayActivity = activity
    .filter((item) => !item.period || item.period.includes(dayOfWeek))
    .sort((a, b) => a.difficulty - b.difficulty);

  const handleChooseDoubleActivity = (doubleActivitys) => {
    setDoubleActivitys(doubleActivitys);
  };

  return (
    <div className="activityWrap">
      <div className="pointWrap">350</div>
      <div className="checkBoxWrap">
        <Card>
          <Group onChange={handleChooseDoubleActivity}>
            <Row>
              {Array.from(
                { length: Math.ceil(todayActivity.length / CHECK_BOX_NUM_PER_LINE) },
                (_, index) =>
                  todayActivity.slice(
                    index * CHECK_BOX_NUM_PER_LINE,
                    (index + 1) * CHECK_BOX_NUM_PER_LINE
                  )
              ).map((activitys) =>
                activitys.map((item, index) => {
                  const currentScore = (score += doubleActivitys.includes(item.activityName)
                    ? item.point[playerLevel] * 2
                    : item.point[playerLevel]);
                  return (
                    <Col key={index} span={24 / CHECK_BOX_NUM_PER_LINE}>
                      <Checkbox style={{ fontSize: 'large' }} value={item.activityName}>
                        <span
                          className={classNames({
                            cold: currentScore < LEVEL_1,
                            ordinary: currentScore >= LEVEL_1 && currentScore < LEVEL_2,
                            hot: currentScore >= LEVEL_2 && currentScore < LEVEL_3,
                            excellent: currentScore >= LEVEL_3
                          })}>
                          {item.activityName}
                        </span>

                        {item.times && (
                          <span className="pointDes">{`(${
                            (item.point[playerLevel] / item.times) *
                            (doubleActivitys.includes(item.activityName) ? 2 : 1)
                          } 分 / ${item.times}次)`}</span>
                        )}

                        {!item.times && (
                          <span className="pointDes">{`(${
                            item.point[playerLevel] *
                            (doubleActivitys.includes(item.activityName) ? 2 : 1)
                          } 分)`}</span>
                        )}

                        <span className="scoreDes">{currentScore}</span>
                      </Checkbox>

                      <Checkbox value={`_${item.activityName}`} />
                    </Col>
                  );
                })
              )}
            </Row>
          </Group>
        </Card>
      </div>
    </div>
  );
};

export default Activity;

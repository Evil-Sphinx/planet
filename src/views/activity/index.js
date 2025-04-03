import React, { useEffect, useState } from 'react';
import { Checkbox, Col, Row, Card, Modal, Input, InputNumber, Button } from 'antd';
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
  const [completeActivityModalVisible, setCompleteActivityModalVisible] = useState(false);
  const [completeActivitys, setCompleteActivitys] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [curActivity, setCurActivity] = useState(null);

  let score = 0;

  const dayOfWeek = new Date().getDay();

  const todayActivity = activity
    .filter((item) => !item.period || item.period.includes(dayOfWeek))
    .sort((a, b) => a.difficulty - b.difficulty);

  const handleChooseDoubleActivity = (doubleActivitys) => {
    setDoubleActivitys(doubleActivitys);
  };

  useEffect(() => {
    setCurrentScore(
      completeActivitys.reduce((pre, cur) => {
        return pre + (cur.point * cur.times) / cur.totalTimes;
      }, 0)
    );
  }, [completeActivitys]);
  const handleCompleteActivity = (item) => (e) => {
    if (e.target.checked) {
      if (item.times) {
        setCompleteActivityModalVisible(true);
        setCurActivity(item);
        return;
      }

      setCompleteActivitys([
        ...completeActivitys,
        {
          activityName: e.target.value,
          times: e.target.checked ? 1 : 0,
          totalTimes: item.times || 1,
          point: item.point[playerLevel] * (doubleActivitys.includes(item.activityName) ? 2 : 1)
        }
      ]);
    } else {
      setCompleteActivitys(
        completeActivitys.filter((item) => item.activityName !== e.target.value)
      );
    }
  };

  const handleCompleteActivityTimes = (times) => {
    setCompleteActivitys([
      ...completeActivitys,
      {
        activityName: `_${curActivity.activityName}`,
        times: times,
        totalTimes: curActivity.times || 1,
        point:
          curActivity.point[playerLevel] *
          (doubleActivitys.includes(curActivity.activityName) ? 2 : 1)
      }
    ]);
    setCompleteActivityModalVisible(false);
  };
  return (
    <div className="activityWrap">
      <div className="pointWrap">{currentScore}</div>
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
                      <Checkbox value={item.activityName} style={{ fontSize: 'large' }}>
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

                      <Checkbox
                        value={`_${item.activityName}`}
                        onClick={handleCompleteActivity(item)}
                      />
                    </Col>
                  );
                })
              )}
            </Row>
          </Group>
        </Card>

        {completeActivityModalVisible && (
          <CompleteActivityModal
            visible={completeActivityModalVisible}
            onOK={handleCompleteActivityTimes}
            onCancel={() => {
              setCompleteActivityModalVisible(false);
            }}
            maxTimes={curActivity.times}
          />
        )}
      </div>
    </div>
  );
};

const CompleteActivityModal = (props) => {
  const { visible, onOK, onCancel, maxTimes } = props;

  const [times, setTimes] = useState(maxTimes);

  const onChange = (value) => {
    setTimes(Math.min(value, maxTimes));
  };

  const onOk = () => {
    onOK(times);
  };

  return (
    <Modal
      centered
      open={visible}
      onCancel={onCancel}
      width={200}
      footer={null}
      closable={false}
      destroyOnClose>
      <div className="completeModal">
        <h1>完成次数</h1>
        <InputNumber onChange={onChange} max={maxTimes} min={1} value={times} />
        <Button
          onClick={onOk}
          type="primary"
          style={{
            marginTop: '10px'
          }}>
          完成
        </Button>
      </div>
    </Modal>
  );
};

export default Activity;

import React, { useEffect, useState } from 'react';
import './index.less';
import { Card, Input, Table } from 'antd';

import questions from '@/constants/questions';

const Question = () => {
  const [data, setData] = useState(questions);
  const handleSearch = (e) => {
    const value = e.target.value;

    if (!value || value.trim().length === 0) {
      setData(questions);
      return;
    }

    const filteredQuestions = questions.filter((q) => {
      return q.indexes.includes(value);
    });
    setData(filteredQuestions);
  };

  const columns = [
    {
      title: '题目',
      dataIndex: 'question',
      key: 'question'
    },
    {
      title: '答案',
      dataIndex: 'answer',
      key: 'answer'
    }
  ];
  return (
    <div className="questionWrap">
      <Input size="large" onChange={handleSearch} />
      {/* <Card> */}
      <Table columns={columns} dataSource={data} />
      {/* </Card> */}
    </div>
  );
};
export default Question;

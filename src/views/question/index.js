import React, { useEffect, useState } from 'react';
import './index.less';
import { Card, Input, Table } from 'antd';

import questions from '@/constants/questions';
import { render } from 'less';

const PAGE_SIZE = 10;
const Question = () => {
  const [data, setData] = useState(questions);

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
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

  const pagination = {
    current: pageNo,
    pageSize: pageSize,
    total: data ? data.size : 0,
    hideOnSinglePage: true,
    onChange: (page, pageSize) => {
      setPageNo(page);
      setPageSize(pageSize);
    }
  };

  const columns = [
    {
      title: '题目',
      dataIndex: 'question',
      key: 'question',
      render: (text) => {
        return <span className="question">{text}</span>;
      }
    },
    {
      title: '答案',
      dataIndex: 'answer',
      key: 'answer',
      render: (text) => {
        return <span className="answer">{text}</span>;
      }
    }
  ];
  return (
    <div className="questionWrap">
      <Input size="large" onChange={handleSearch} />
      <Card
        style={{
          marginTop: '20px'
        }}>
        <Table columns={columns} dataSource={data} pagination={pagination} />
      </Card>
    </div>
  );
};
export default Question;

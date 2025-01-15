import React from 'react';
import { Spin } from 'antd';
import './index.css';

const PageLoading = () => {
  return (
    <div className="spin-wrapper">
      <Spin></Spin>
    </div>
  );
};

export default PageLoading;

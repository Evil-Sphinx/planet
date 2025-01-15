import { Layout } from 'antd';
import React from 'react';
import Sidebar from './sidebar';

const { Content } = Layout;
const Wrapper = (props) => {
  const { children } = props;
  return (
    <Layout>
      <Sidebar />
      <Content>{React.Children.map(children, (child) => React.cloneElement(child))}</Content>
    </Layout>
  );
};

export default Wrapper;

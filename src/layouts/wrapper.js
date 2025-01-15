import React from 'react';

const Wrapper = (props) => {
  const { children } = props;
  return <>{React.Children.map(children, (child) => React.cloneElement(child))}</>;
};

export default Wrapper;

import { Spin } from 'antd';
import { Helmet } from 'react-helmet-async';

function LoadingPage() {
  return (
    <div className="loading-component">
      <Helmet>
        <title>Loading</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </div>
    </div>
  );
}

export default LoadingPage;

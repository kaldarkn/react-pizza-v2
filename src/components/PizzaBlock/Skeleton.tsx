import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="134" cy="136" r="125" />
    <circle cx="105" cy="90" r="9" />
    <rect x="0" y="279" rx="10" ry="10" width="280" height="19" />
    <rect x="0" y="318" rx="10" ry="10" width="280" height="88" />
    <rect x="1" y="437" rx="10" ry="10" width="95" height="30" />
    <rect x="55" y="455" rx="0" ry="0" width="2" height="9" />
    <rect x="126" y="428" rx="25" ry="25" width="152" height="46" />
  </ContentLoader>
);

export default Skeleton;

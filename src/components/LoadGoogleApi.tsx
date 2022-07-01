import React from 'react';

type ILoadProps = {
  onLoad: () => void;
};

const LoadGoogleApi: React.FC<ILoadProps> = ({ onLoad, children }) => {
  const exists = document.getElementById('google-api');

  if (!exists) {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';

    script.id = 'google-api';
    document.body.appendChild(script);

    script.onload = () => {
      onLoad();
    };
  }

  // if (exists && onLoad) {
  //   onLoad();
  // }

  return <>{children}</>;
};

export default LoadGoogleApi;

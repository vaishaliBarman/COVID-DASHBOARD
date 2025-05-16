const Loader = () => {
  // This component displays a loading spinner and message while data is being fetched.
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Loading data, please wait...</p>
      <img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/55080c95539523.5e99b0ff3a9b1.gif' 
      style={{width: '100%', height: 'auto'}}
      alt="Loading animation"
      
      />

    </div>
  );
};

export default Loader;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//         <div className="container">
//   <div className="row">
//   <h3 className='text-center'>{uploadedFiles.fileName}</h3>
//     <div className="col-sm">
//     <img style={{ width: '100%' }} src={uploadedFiles.filePath} alt='' />
//     </div>
//     <div className="col-sm">
//     <img style={{ width: '100%' }} src={uploadedFiles.preview} alt='' />
//     </div>
//     <div className="col-sm">
//     <img style={{ width: '100%' }} src={uploadedFiles.thumbnail} alt='' />
//     </div>
//   </div>
// </div>
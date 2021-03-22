import React, { Fragment, useState} from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import Dropzone from "react-dropzone";

const FileUpload = () => {
  const [files, setFile] = useState([]);
  const [filenames, setFilenames] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const[ uploadProgress,setProgress]=useState(0);
  const[zip,setZip]=useState([]);
  
   const handleDrop = acceptedFiles =>
    setFilenames(acceptedFiles.map(file => file.name));
    const onChange = e => {
      setFile(e.target.files);
    };
    const onSubmit = async e =>{
      e.preventDefault();
      const formData = new FormData();
      if (!uploadedFiles) {
        setMessage('Select a file first');
      }else{
        for(var x = 0; x<files.length; x++) {
          formData.append('file', files[x]);  
      } 
    }
    try {
      const res = await axios.post("/multiple", formData,{
         headers: {
          'Content-Type': 'multipart/form-data',
        },
       
        onUploadProgress: progressEvent => {
          
          setUploadPercentage(
            
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
  
          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      
      });
      if (Object.keys(files).length !== 0) {
        setMessage('File Uploaded');
      setZip(res.data.zip);
      setUploadedFiles(res.data.results)
      } else {
        setMessage("File is required")
      }
      
    } catch (err) {
      if (err) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  }
 
    const downloadZip = async ()  =>{
      
       axios({
        url: zip,
        method:'GET',
        responseType: "blob",
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onDownloadProgress: progressEvent => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentage);
          if (percentage === 100) {
            setTimeout(() => setProgress(0), 10000);
          }
        }
        })
        .then(res => {
          const Fileurl = window.URL.createObjectURL(new Blob([res.data]));
          const filelink = document.createElement("a");
          filelink.href = Fileurl;
          var filename = zip.substring(zip.lastIndexOf('/')+1);
          filename.toString();
          filelink.setAttribute("download", filename); 
          document.body.appendChild(filelink);
          filelink.click();
          
        })
        .catch(error => {
          setMessage('There was an error downloading the image');
          return  [];
        });
    }
    
  return (
    <Fragment>
      
      {message ? <Message msg={message} /> : null}
      
      <form onSubmit={onSubmit} >
        <div>
        <Dropzone onDrop={handleDrop}> 
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
             
            <input {...getInputProps()} 
            type="file"
           onChange={onChange}
            /> 
            <p>Drag'n'drop files, or click to select file</p>

            {filenames}  
          </div> 
        )}  
      </Dropzone>
      
      <div>
        <ul>
          {filenames.map(fileName => (
            <li key={fileName}>{fileName}</li>
          ))}
        </ul>
      </div>
      <div>
          <h1 className="text-center">
              Compress Files to ZIP File
          </h1>
         <div >
         <Progress percentage={uploadProgress} />
       
                <button className="btn btn-block btn-danger" onClick={downloadZip}> 
                 Download ZIP File
                </button>
                </div> 
            </div>  
      
      </div>
      <Progress percentage={uploadPercentage} />
      <input
        type='submit'
        value='Upload'
        className='btn btn-primary btn-block mt-4' 
           
        />
      </form> 
     
        <div className="image">
        <table className="image">
        <tr>
          <th>Original</th>
          <th>Preview</th>
          <th>Thumbnail</th>
         
        </tr>
        <tbody>
        {uploadedFiles.map(file =>(
          <tr>
              <td><img style={{ width: '50%' }} src={file.filePath} alt='' /></td>
              <td><img style={{ width: '50%' }} src={file.preview} alt='' /></td>
              <td><img style={{ width: '50%' }} src={file.thumbnail} alt='' /></td>        
            </tr>
          ))}
          </tbody>
          
         </table>
        
        </div> 

    </Fragment>
  );
    
};

export default FileUpload;
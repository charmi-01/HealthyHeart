import {  useState } from 'react';
import axios from 'axios';
import "./fileuploader.css"
import {BiImageAdd} from "react-icons/bi"

function Fileuploader() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    if (!selectedFile) {
      return;
    }

    console.log(selectedFile)
    // Uploading the file using the fetch API to the server
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
  
    const url = '/your-upload-url';
  
    const data = new Blob([selectedFile], { type: selectedFile.type });
  
    axios.post(url, data, config)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    
  };

  return (
    <div className='uploadBox'>
      <div className='imgInput'>
      <label for="inputTag">
        Select Image <br/>
        <BiImageAdd size={50}/>
        <input id="inputTag" type="file" onChange={handleFileChange}/>
        <br/>
        {selectedFile && (
        <p className='filename'>Selected file: {selectedFile.name}</p>
        )}
      </label>
       </div>
    <button  className='uploadbutton' onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default Fileuploader;


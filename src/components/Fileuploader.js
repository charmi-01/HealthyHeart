import { useState } from 'react';
import axios from 'axios';
import "./fileuploader.css"
import { Dna } from 'react-loader-spinner'
import { BiImageAdd } from "react-icons/bi"
import { FaArrowAltCircleLeft } from "react-icons/fa"

function Fileuploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    setIsLoading(true)
    if (!selectedFile) {
      setIsLoading(false)
      console.log("hello");
      return;
    }

    console.log(selectedFile)

    //Uploading the file using the fetch API to the server
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    const url = '/your-upload-url';

    const formData = new FormData();
    formData.append('image', selectedFile);
    console.log(formData.get('image'))


    axios.post(url, formData, config)
      .then(response => {
        setIsLoading(false)
        console.log(response);
        setShowResult(true);
        setResultData(response.data);
      })
      .catch(error => {
        setIsLoading(false)
        console.log(error);
        setShowResult(true);
        setResultData("false");
      });
  };

  const handleBackClick = () => {
    setShowResult(false);
  }

  return (
    <div className='container'>
      {!showResult && !isLoading && (
        <div className='uploadBox'>
          <div className='imgInput'>
            <label for="inputTag">
              Select Image <br />
              <BiImageAdd size={50} />
              <input id="inputTag" type="file" onChange={handleFileChange} />
              <br />
              {selectedFile && (
                <p className='filename'>Selected file: {selectedFile.name}</p>
              )}
            </label>
          </div>
          <button className='uploadbutton' onClick={handleUploadClick}>Upload</button>
        </div>
      )}

      {isLoading && (
        <div className='loader'>
          <Dna
            visible={true}
            height="150"
            color="#4fa94d"
            width="150"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}

      {showResult && (
        <div className='resultBox'>
          <FaArrowAltCircleLeft onClick={handleBackClick} className='backbutton' size={50} />
          <h1 className='resultdata'>{resultData ? "Congrats!!! you are healthy" :"Opps!!! you need to consult a doctor"}</h1>
        </div>
      )}
    </div>
  )
}


export default Fileuploader;


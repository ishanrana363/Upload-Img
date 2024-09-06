import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState();

  const [images,setImages] = useState([]);

  const handleUpload = (e) => {
    let formdata = new FormData(); // Fixed typo: 'fromdata' -> 'formdata'
    formdata.append("file", file);

    axios
      .post("http://localhost:8000/upload", formdata, {
        headers: {
          "Content-Type": "multipart/form-data", // Set appropriate headers for file upload
        },
      })
      .then((res) => {
        // console.log(res);
      })
      .catch((e) => {
        // console.log(e);
      });

    console.log(file);
  };

  useEffect(()=>{
    axios.get("http://localhost:8000/all-image")
    .then((res)=>{
      setImages(res.data.data)
    }).catch((err)=>{
        console.log(err)
    })
  },[])

  return (
    <>
      <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
      />
      <button onClick={handleUpload}>Upload</button>

      <div>
        {
          images.map((item,i)=>{
            return(
              <div key={i} >
                <img src={item.image} alt="" />
                <h1>ishan</h1>
              </div>
            )
          })
        }
      </div>

    </>
  );
};

export default App;

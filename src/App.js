import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import { key } from './config';
  
function App() {
  let page=1;
  let perpage=12;

    let [search,setsearch]=useState('')

    let [image,setimage]=useState([])

    let [button,setbutton]=useState(false)

   async function imagesearch(){
     const url=`https://api.unsplash.com/search/collections?page=${page}&query=${search}&per_page=${perpage}&client_id=${key}`;
     const response=await fetch(url)
     const data=await response.json()
     let results=data.results;
     console.log(results)
     setimage(results)
     setbutton(!button)
    }

    function shownextimages(){
      perpage=perpage+12;
      imagesearch();
    }
    return (
    <div>
      <div className="container">
        <h1 className='text-center mt-5'>Image <span className='bg-red'>Search App</span></h1>
        <div className="row mt-3">
          <div className="col-sm-12"> 
          <div className="input-container mt-5">
            <input type="text" onChange={(e)=>setsearch(e.target.value)} placeholder="Enter the image name"/>
            <button type="submit" onClick={imagesearch} className='ms-3 sub-btn'>Submit</button>
          </div>
          </div> 
          </div>
          <div className="row mt-4">
          {image.map((data,index)=>{
            return(
              <div className="col-sm-12 col-md-6 col-lg-3">
              <div className='image'>
              <img src={data.cover_photo.urls.small} id='' className='mt-2 image' width='100%' height='250px' alt="" />
              </div>
              </div>
            )
          })
          }
          </div>
          <div className='text-center'>
          {button ?<button className='mt-3' onClick={shownextimages}>Next</button>:null}
        </div>
        </div>
        </div>
  )
}

export default App;

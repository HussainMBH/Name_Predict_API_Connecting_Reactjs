import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [resonse, setResponse] = useState([]);
  
  

  const search = (e) => {
    e.preventDefault();
    console.log(name);
    axios.get('https://api.nationalize.io/?name=' + name).then(res => {
      console.log(res.data);
      setResponse(res.data.country);
    })
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card border-0" style={{width: '25rem'}}>
  {/*Header Start */}
          <nav className="navbar navbar-dark bg-dark rounded">
      <form className="d-flex w-100" onSubmit={search}>
        <input 
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        if(e.target.value === ''){
          setResponse(null);
        }
        }}
          className="form-control mr-sm-2" 
          type="search" 
          placeholder="Enter Your Name..." 
          aria-label="Search" />
          <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Predict</button>
      </form>
    </nav>
    {/*Header End */}
  
  {/*User Image */}
  <img 
  src="https://w7.pngwing.com/pngs/184/113/png-transparent-user-profile-computer-icons-profile-heroes-black-silhouette-thumbnail.png" 
  className="card-img-top w-50 mx-auto  p-2" alt="User profile" />
        
        {/*Card body start */}
        <div className="card-body">
          <h5 className="card-title">Your name is {name}</h5>

            <ul className="list-group">
              {
                (resonse?.length === 0) ? 
               <div className="alert alert-danger text-center" role="alert">
                No result found
               </div>
                :
                 (
                  resonse?.map(country => {
                    return(
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <div className='ms-2 me-auto'>
                          <div className='fw-bold'>{country.country_id}</div>
                        </div>
                        <span className="badge badge-primary badge-pill">{(country.probability * 100).toFixed(2)}%</span>
                        </li>
                    )
                  })
                )
              }
             
             </ul>
        </div>
        {/*Card body end */}
      </div>
    </div>
  );
}

export default App;

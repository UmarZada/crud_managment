import {useState,useEffect} from 'react'; 
const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const savedData = localStorage.getItem("myData") || null;

    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      name: e.target.name.value,
      email: e.target.email.value,
      country: e.target.country.value,
    };

    setData([...data, newData]);
    localStorage.setItem("myData", JSON.stringify([...data, newData]));

    e.target.reset();
  };
  
  const handleEdit = (index) => {
    const itemToEdit = data[index];
    document.getElementById("nameInput").value = itemToEdit.name;
    document.getElementById("emailInput").value = itemToEdit.email;
    document.getElementById("countryInput").value = itemToEdit.country;

    const newname = document.getElementById("nameInput").value;
    const newEmail = document.getElementById("emailInput").value;
    const newCountry = document.getElementById("countryInput").value;

    const newData = [...data];
    newData[index] = {
    name : newname,
    email: newEmail,
    country : newCountry,
    };
    let updatedData = [...data.slice(0,index),newData,...data.slice(index+1)]
    updatedData = data.filter((item, i) => i !== index);
    setData(updatedData);
    localStorage.setItem("myData", JSON.stringify(updatedData));

  };

  const handleDelete = (index) => {
    const filteredData = data.filter((item, i) => i !== index);
    setData(filteredData);
    localStorage.setItem("myData", JSON.stringify(filteredData));
  };

  return (
    <>
    <div className='container'>
      <nav className="navbar bg-dark">
       <div className="container-fluid d-flex justify-content-center ">
      <input className="form-control py-2 mx-2 px-3"  type="search" placeholder="Search" aria-label="Search" value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} />  
      </div>
      </nav>
       <div className="container">
        <div className="row d-flex justify-content-center">
        <div className="col-md-4 mt-5 ">
        <form onSubmit={handleSubmit}>
        <div> 
        <input type="text" className="form-control" id="nameInput" name="name" placeholder="Enter your Name" required /><br />
        
        <input type="text" className="form-control" id="emailInput" name="email" placeholder="Enter Your address" required /><br />

        <select className="form-select mb-4" id="countryInput" name="country" aria-label="Default select example">
        <option selected>Open this select menu</option>
        <option value="pakistan">Pakistan</option>
        <option value="china">China</option>
        <option value="japan">Japan</option>
      </select>
        </div>
        <button type="submit" className='btn btn-primary'>Submit</button>
      </form>
       </div>
       <div className="col-md-8 ">
        {data.filter((item) => {
          if (!searchTerm) return true; // show all items if search term is empty
          return (
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.country.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }).map((item, index) => (
        <div className='mt-5' key={index}>
          <ul className="list-group list-group-horizontal d-flex justify-content-between border">
            <li className="list-group-item ">{item.name}</li>
            <li className="list-group-item ">{item.email}</li>
            <li className="list-group-item ">{item.country}</li>
            <li className="list-group-item "><button className='btn btn-primary' onClick={() => handleEdit(index)}>Edit</button></li>
            <li className="list-group-item "><button className='btn btn-danger' onClick={() => handleDelete(index)}>Delete</button></li>
          </ul>

        </div>
      ))}
       </div>
       </div>
       </div> 
       </div>
    </>
  )
}

export default App
import React, { useEffect, useState } from "react";
import './App.css';
import ComboBox from './ComboBos';

function App() {
  
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [DropDownfilter, setDropDownFilter] = useState("");
  const [notFound, setNotFound] = useState(false);


// fun for Drop Down 
  const handleByDrop =(e)=>{
    if (!e.target.value.trim() == "") {
      
      const temp_userData = users.filter(user =>
         // check credentionals from to given by input 
        JSON.stringify(user[DropDownfilter]).includes(e.target.value)
        
        );
      if (temp_userData.length == 0)
        return setNotFound(true);
      setNotFound(false) ;
      console.log(temp_userData);
      return setSearchedUsers(temp_userData);
    }
    setSearchedUsers([]);

    // setUsername(e.target.value) ;
 };



 //function for get BY direct ID, PINCODE, Name, Address

  const handleChange = (e) => {
    setFilter(e.target.value);

    
    if (!e.target.value.trim() == "") {

      const temp_user = users.filter(user => {  
        // check credentionals from to given by input 
       const something = JSON.stringify(Object.values(user));

        console.log('something : ', something);

        if (something.includes(e.target.value))
          return true;
        return false;

      });

      console.log('temp_user', temp_user);

      if (temp_user.length == 0)
        return setNotFound(true);
      setNotFound(false);
      console.log('temp value-->', temp_user);
      return setSearchedUsers(temp_user);
    }
    setSearchedUsers([]);
    // setUsername(e.target.value) ;
  };



  //Fun for select dropDown
  const handleOnDropdownChange = (e) => {
    console.log('selected value is : ', e.target.value) ;
    if(e.target.value == "")
      return ;
    setDropDownFilter(e.target.value) ;
  }




  useEffect(async () => {
    const temp = await (await fetch("http://localhost:8080/")).json();
    console.log('temp : ', temp);
    setUsers(temp);
  }, []);




  return (
    <div className="App">

      <div className="Heading">
      <h1 style={{fontSize:"10px"}}>Find-out by Username,Address,pin, order</h1>
      <h1 style={{fontSize:"10px"}}>Find-out By ComboBox Click to given Credentials</h1>
      </div>

      <div className="Searching">

     <div>
     <input type="text"  onChange={handleChange} placeholder=" Enter here Search" />
     </div>

     <div>
     <input type="text" onChange={handleByDrop} placeholder="enter username" />
    <select id="Key" onChange={handleOnDropdownChange}>
    <option className="element" value="">Search By</option>
    <option className="element" value='_id'>Id</option>
    <option className="element" value='name'>Name</option>
    <option  className="element" value='address'>Address</option>
    <option  className="element" value='items'>Items</option>
    <option className="element" value='pin'>Pin Code</option>
    </select> 
       </div>
    


  
      </div>
      {/* true when NO ITEM FOUND FALSE show details */}
      {
        notFound ?
          <h3 className="NotFound-Headline">User not found</h3> :
          searchedUsers.map(user => (
            <div  className="UserList"> 
              <p  className='user-details'>{user.name}</p>
              <p className='user-details'>{user._id}</p>
              <p className='user-details'>{user.address}</p>
              <p className='user-details'>{user.pin}</p>
              <p className='user-details'>{JSON.stringify(user.items)}</p>
            </div>
          ))
      }
    </div>
  );
}

export default App;

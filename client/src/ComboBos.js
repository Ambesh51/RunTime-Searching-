/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function ComboBox() {

    const top100Films = [  
        { title: 'Monty Python and the Holy Grail', year: 1975 },
      ];

  return (
    <Autocomplete
      id="combo-box-demo"
      options={top100Films}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />
  );
}

export default ComboBox;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

// const [searchedUsers, setSearchedUsers] = useState([]);
// const users = ["prasheet", "ambesh", "prashant", "anshul"];
// const handleChange = (e) => {
//     // setUsername(e.target.value) ;
//     const temp_user = users.filter(user => user.includes(e.target.value));
//     console.log(temp_user);
//     setSearchedUsers(temp_user);
    
//     if (temp_user.length == 0){
//         return handleClose() ;
//     }

// };



//         <input onChange={handleChange} placeholder="ente username" />
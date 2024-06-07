import React, { useState } from 'react';

export default function Player({initialName , symbol , isActive , onChangeName}) {

   const [isEditing , setIsEditing] = useState(false);

   const [playerName , setPlayerName] = useState(initialName);

    function handleEditClick(){
        setIsEditing((editing) => !editing) ;   // handles the button set to ==> EDIT ,  again after saving the username
                    // first click ==> makes false value to true (value is stored in editing variable)
                    // secondclicl ==> makes true value to false again (value is stored in editing variable)
                    if(isEditing){
                      onChangeName(symbol , playerName);  
                    }
       
     }

     function handleChange(event){ // handles the username to update and save
      setPlayerName(event.target.value)
     }

    let editablePlayerName =   <span className="player-name">{playerName}</span> 

    if(isEditing){
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />
                                             // above line code also called as two way binding (About Onchange)!
}

  return (
    // if isActive returns true from app.jsx then the css style is set to the player
    <li className={isActive ? 'active' : undefined}> 
    <span className="player">
        {editablePlayerName}
      <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
  </li>
  )
}

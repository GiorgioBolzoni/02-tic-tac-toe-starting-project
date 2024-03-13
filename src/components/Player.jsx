import { useState } from "react";

export default function Player({initialName, symbol, isActive}){
    const [playerName, setPlayerName] = useState(initialName);
    const [ isEditing, setIsEditing ] = useState(false);

    function handleEditClick(){
        setIsEditing((editing) => !editing); //BEST PRACTICE: usare funzione () => ...  per aggiornare uno stato in base a quello subito precedente
        console.log(isEditing);
    }
    
    function handleChange(event){
        console.log(event)
        setPlayerName(event.target.value); // event.target.value TARGET forma per accedere al valore inserito dall'utente. Permette il BINDING BIDIREZIONALE tra l'onChange e il value nell' input
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    // let btnCaption = 'Edit'
    if(isEditing){
        editablePlayerName= <input type="text" required value={playerName} onChange={handleChange} />
        // btnCaption= 'Save'
    }
    return (
    <li className={isActive ? 'active' : undefined}>
        <span className="player">
          {editablePlayerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        {/* <button onClick={handleEditClick}>{btnCaption}</button> */}
        <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
      </li>
    )
}
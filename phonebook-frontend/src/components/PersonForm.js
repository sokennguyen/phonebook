const PersonForm = (props) => {
    return (
      <form onSubmit={props.handleAddClick}>
          <div>
            name: <input 
              value={props.newName}
              onChange={props.handleNameChange}
            />
          </div>
            phone: <input
              value={props.newPhone}
              onChange={props.handlePhoneChange}
            />
          <div>
  
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

  export default PersonForm
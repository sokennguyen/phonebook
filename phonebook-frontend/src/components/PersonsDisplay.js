import personsServices from "../services/persons"

const PersonsDisplay = ({persons,filter,handleDelete,handleDeleteError}) => {
  return (
    <>
      {persons
      .filter((person) => person.name.toLowerCase().includes(filter))
      .map((person) => (
        <div key={person.id}>
          {person.name} {person.phone} <button 
            onClick={()=>{
              if (window.confirm(`Delete ${person.name}?`))
              {
                personsServices.erase(person.id)
                .then(()=>{
                  handleDelete(person.id)
                })
                .catch(error=>{
                  handleDeleteError(error.config.url)
                })
              }
         }}>delete</button>
        </div>
     ))}
    </>
  )
}
  


  export default PersonsDisplay
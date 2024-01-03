import { useState,useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import PersonsDisplay from './components/PersonsDisplay'
import Filter from './components/Filter'
import personsServices from './services/persons'
import Notification from './components/notification'
import Faulty from './components/faulty'

const App = () => {
  const [persons,setPersons]=useState([])
  const [newName, setNewName] = useState('')
  const [newPhone,setNewPhone] =useState('')
  const [filter,setFilter]=useState('')
  const [successMessage,setSuccessMessage]=useState('')
  const [messageId,setMessageId] = useState(0)
  const [faultyMessage,setFaultyMessagae]=useState('')
  useEffect(()=>{
    axios
      .get('/api/persons')
      .then(response=>{
        setPersons(response.data)
      })
  },[])

  const handleFilterChange = (event) => setFilter(event.target.value.toLowerCase())   
  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)
  const handleDeleteError = (errorUrl)=>{
    console.log([errorUrl])
    const deletedPerson=persons.find(person=>person.id===errorUrl.slice(errorUrl.indexOf('persons/')+'persons/'.length))
    console.log(deletedPerson)
    setFaultyMessagae(`Information for ${deletedPerson.name} was already deleted`)
    setPersons(persons => persons.map((person)=>person).filter((person) => person.name !== deletedPerson.name))
  }
  const handleDelete=(id)=>{
    const removedPerson=persons.filter(person=>person.id!==id)
    const foundPerson=persons.find(person=>person.id===id)
    setSuccessMessage(`Deleted ${foundPerson.name}`)
    setPersons(removedPerson)
    setMessageId(messageId+1)
  }
  const handleAddClick = (event) => {
    event.preventDefault()
    if (persons.find(person=>newName===person.name)){
      const foundPerson=persons.find(person=>newName===person.name)
      if (window.confirm(`${foundPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        const newPersonObject = {
          ...foundPerson,
          phone: newPhone,
        }
        return (
          personsServices
            .update(foundPerson.id, newPersonObject)
            .then(() => {
              setPersons(persons.map((person) =>
                person.id === newPersonObject.id ? newPersonObject : person
              ))
              setNewName('')
              setNewPhone('')
              setSuccessMessage(`Changed ${foundPerson.name} phone number`)
              setMessageId(messageId+1)
            })
            .catch(error=> {
              console.log(error.response.data.error)
              setFaultyMessagae(error.response.data.error)
            })
        )    
      } 
      else return
    }
    
    const newPersonObject = {
      name: newName,
      phone: newPhone,
    }
    personsServices
      .create(newPersonObject)
      .then(response=>{
        setPersons(persons.concat(response))
        setNewName('')
        setNewPhone('')
        setSuccessMessage(`Added ${newPersonObject.name} phone number`)
        setMessageId(messageId+1)
      })
      .catch(error=> {
        console.log(error.response.data.error)
        setFaultyMessagae(error.response.data.error)
      })
  }
  

  return (
    <div>
      <Notification 
        message={successMessage}
        messageId={messageId}
      />
      <Faulty
        message={faultyMessage}
        messageId={messageId}
      />
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      
      <h3>Add a new</h3>

      <PersonForm 
        handleNameChange={handleNameChange} 
        handlePhoneChange={handlePhoneChange} 
        handleAddClick={handleAddClick}
        newName={newName}
        newPhone={newPhone}
      />

      <h2>Numbers</h2>

      <PersonsDisplay 
        persons={persons} 
        filter={filter}
        handleDelete={handleDelete}
        handleDeleteError={handleDeleteError}
      />

    </div>
  )
}

export default App
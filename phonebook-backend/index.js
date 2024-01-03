const path=require('path')
const express = require('express')
const cors=require('cors')

require('dotenv').config()
const Person=require('./models/person')

const app=express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))





app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

app.get('/info', (req,res) => {
  Person.countDocuments()
    .then(docNumber => {
      res.end(
        `<div>
                <p>Phonebook has info for ${docNumber} people</p>
                <p>${new Date}</p>
            </div>`)
    })

})

app.get('/api/persons',(request,response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/api/persons/:id',(request,response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.post('/api/persons',(request,response,next) => {
  const body=request.body

  if((!body.name)||(!body.phone)){
    console.log(body);
    return response.status(400).json({
      error:'missing name or phone number'
    })
  }

  const person = new Person({
    name:body.name,
    phone:body.phone,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => {
      next(error)
    })

})

app.delete('/api/persons/:id',(request,response,next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id',(request,response,next) => {
  const body= request.body

  const person = {
    name:body.name,
    phone:body.phone
  }

  Person.findByIdAndUpdate(request.params.id, person, { new:true, runValidators:true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => {
      next(error)
    })
})


const unknownEndpoint=(request,response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler=(error,request,response,next) => {
  console.error(error.message)

  if(error.name==='CastError'){
    return response.status(500).send({ error:'malformatted id' })
  }
  else if (error.name==='ValidationError'){
    return response.status(400).json({ error:error.message })
  }

  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`);
})
const mongoose=require('mongoose')

if (process.argv.length<3){
  console.log('give password as the next argument');
  process.exit(1)
}

const password=process.argv[2]

const url =   `mongodb+srv://nsongkien:${password}@cluster0.nycamti.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema=new mongoose.Schema({
  name:String,
  phone:String,
})

const Person=mongoose.model('Person',personSchema)


if (process.argv.length>5){
  console.log('name with spacing must be in quotations');
  mongoose.connection.close()
}
else if (process.argv.length>3) {
  const person=new Person({
    name:process.argv[3],
    phone:process.argv[4],
  })
  person.save().then(() => {
    console.log(`Added ${person.name} ${person.phone} to phonebook`);
    mongoose.connection.close()
  })
}
else if (process.argv.length===3){
  console.log('phonebook:');
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.phone}`);
    });
    mongoose.connection.close()
  })
}



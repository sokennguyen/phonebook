const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB: ', error.message);
  })

const personSchema=new mongoose.Schema({
  name:{
    type:String,
    minLength:5,
    required:[true,'name is required']
  },
  phone:{
    type:String,
    minLength:8,
    validate:{
      validator: function (v) {
        return /^\d{2,3}-\d{5,}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number`
    }
  },
})

personSchema.set('toJSON',{
  transform:(document,returendObject) => {
    returendObject.id=returendObject._id.toString()
    delete returendObject._id
    delete returendObject.__v
  }
})

module.exports = mongoose.model('Person',personSchema)


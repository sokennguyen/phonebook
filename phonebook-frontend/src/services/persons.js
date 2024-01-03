import axios from "axios";
const basePath = '/api/persons'

const create=(newPerson)=>{
    const request=axios.post(basePath,newPerson)
    return request
            .then(response=>response.data)
}

const erase=(id)=>{
    return axios.delete(`${basePath}/${id}`)
                .then(response=>response.data)
}

const update=(id,updateObject)=>{
    const request=axios.put(`${basePath}/${id}`,updateObject)
    return request
            .then(response=>response.data)
}

const personsServices = {
    create,
    erase,
    update,
}

export default personsServices
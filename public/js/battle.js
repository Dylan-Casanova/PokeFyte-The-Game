const { default: axios } = require("axios")

const getPoke = (pokeName) =>{
    axios.get(`/api/pokemon/${pokeName}`)
    .then(data => {
        axios.post(`/api/users/${data.userId}`, data)
    })
}


const { roles } = require("./authen")



const endPoint={

user:{
    home:[roles.organizer],
    appointment:[roles.organizer ],
},
organizer:{
    getData:[roles.organizer]
}

}

module.exports = {endPoint}
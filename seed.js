const {connectToMongo} = require('./utils/connectToMongo')

module.exports = async ()=>{
    const db = await connectToMongo()
    const users = "users"
    //create test users we can use
    
    const allUsers = await db.collection(users).countDocuments()
    if(allUsers<1)
    {
        //create  one admin
        await db.collection(users).insertOne({
            name:"Mark Essien",
            email:"admin@goals.com",
            password:"password",
            role:"admin"
        })


        //add mentors to the db
        const mentors = ['dorime', 'naza', 'seun', 'sammybloom']

        for(let i=0; i<mentors.length; i++)
        {
            await db.collection(users).insertOne({
                name:mentors[i],
                email:"mentor"+i+"@goals.com",
                password:"password",
                role:"mentor"
            })
        }

        const interns = ['Depeju', 'Chairman', "Diac", "Odinga", "Dev Abba" ]

        //add interns to db
        for(let i=0; i<mentors.length; i++)
        {
            await db.collection(users).insertOne({
                name:interns[i],
                email:"intern"+i+"@goals.com",
                password:"password",
                role:"intern"
            })
        }
    }
   

}
class Goal{
    
    
    constructor(goal)
    {
        const required = ['name','companyId']

        let allfields = new Set(Object.keys(goal))
        
        //check that all required fields are given
        for(const field of required)
        {
            if(!allfields.has(field))
            {
                throw(`${field} is required`)
            }
        }

        for(let key of Object.keys(goal))
        {
            this[key] = goal[key]
        }
    }
}


const goal = new Goal({name:"new goal",companyId:"companyId"})

console.log(Object(goal))
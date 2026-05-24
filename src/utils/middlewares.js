const adminmiddleware = (req, res, next) => {
        const token ="admion";
        const isAuthenticated = token === "admin";        
        if(!isAuthenticated){
            return res.status(401).json({message:"Unauthorized"});
        }else{
            next()
        }
    }

    const usermiddleware = (req, res, next) => {
        const token="user";
        const isAuthenticated = token === "user";
        if(!isAuthenticated){
            return res.status(401).send("Unauthorized");
        }else{
            next()
        }
    }

    module.exports={
        adminmiddleware,usermiddleware
    }
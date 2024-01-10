import UserModals from "../Modals/User.modals.js";

export const checkUserID = async (req, res, next) => {
    try{
        const {id} = req.body
        const user = await UserModals.findById(id);
        if(user) {
            next();
        }
        else{
            return res.status(404).json({message : "Id not found" , success : false});
        }
    }catch(error){
        return res.status(500).json({message : error.message , success : false});
    }
}
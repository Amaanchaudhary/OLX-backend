import ProductModals from "../Modals/Product.modals.js";
import UserModals from "../Modals/User.modals.js";

export const addCart = async (req, res) => {
    try {
        const { productId, userId } = req.body;

        if (!productId || !userId) return res.status(404).json({ success: false, message: "User and Product ID are Mandatory" })

        await UserModals.findByIdAndUpdate({ _id: userId }, { $push: { cart: productId } })

        return res.status(201).json({ success: true, message: "Product Added to Cart Successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error })
    }
}

export const allCartProducts = async (req, res) => {
    try {
        const { id } = req.body
        // console.log(id)
        if (!id) return res.status(404).json({ success: false, message: "Id not found" })

        const productIds = await UserModals.findById(id).select("cart -_id")

        // console.log(productIds.cart)
        
        if (productIds) {
            var finalProducts = [];
            for (var i = 0; i < productIds.cart.length; i++) {
                const productData = await ProductModals.findById(productIds.cart[i])
                finalProducts.push(productData)
            }
            if(finalProducts.length == 0) return res.status(200).json({ success: true, message: "Cart is Empty.", products: finalProducts });
            // console.log(products)
            return res.status(200).json({ success: true, message: "Products Found.", products: finalProducts });
        }
        return res.status(404).json({ sucess: false, message: "Product Not found" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const deleteCartProduct = async (req , res) => {
    try{
        const {productId , userId} = req.body

        if(!productId || !userId) return res.status(404).json({success : false , message : "User and Product are mandatory"})
        
        const user = await UserModals.findById(userId)

        if (!user) return res.status(404).json({ success: false, message: "User not found.." })

        const index = user.cart.indexOf(productId)
        // console.log(index , "immdx") 
        user.cart.splice(index , 1);
        await user.save()

        var userCart = []
        for(var i = 0 ; i < user.cart.length ; i++){
            const productData = await ProductModals.findById(user.cart[i])
            userCart.push(productData)
        }
        return res.status(200).json({success : true , message : "Product Deleted Successfully" , products : userCart })

    }catch(error){
        return res.status(500).json({ success: false, message: error.message })
    }
}
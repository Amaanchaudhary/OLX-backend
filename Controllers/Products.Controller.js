import ProductModals from "../Modals/Product.modals.js"
import UserModals from "../Modals/User.modals.js"

export const getllProducts = async (req, res) => {
    try {
        const products = await ProductModals.find({}).select("-createdAt -updatedAt -__v")

        if (!products) return res.status(404).json({ sucess: false, message: "product Not Found!" })
        
        if (products.length) {
            return res.status(200).json({ success: true, message: "Products Found.", products })
        }
    

    } catch (error) {
        // console.log(error.message)  
        return res.status(500).json({ message: error, success: false });
    }
}


export const addProduct = async (req, res) => {
    try {
        const { name, price, category, image, id } = req.body

        if (!name || !price || !category, !image) return res.status(404).json({ success: false, message: "All Field are required." })

        const product = new ProductModals({
            name, price, category, image: image, userId: id
        })
        // console.log(product , "products here");
        const resss = await product.save();
        // console.log(resss , "Response from mongodb");

        return res.status(201).json({ success: true, message: "Product added successfully." })

    } catch (error) {
        return res.status(500).json({ message: error, success: false });
    }
}


export const yourProducts = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) return res.status(404).json({ success: false, message: "Id not found" })

        const allProducts = await ProductModals.find({ userId: id })

        return res.status(200).json({ success: true, products: allProducts })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const getSingleProducts = async (req, res) => {
    try {
        const { id: ProductId } = req.query
        console.log(ProductId , 'ads')
        if (!ProductId) return res.status(404).json({ success: false, message: "Product ID is required" })

        const product = await ProductModals.findById(ProductId).select("-createdAt -updatedAt -__v");
        console.log(product , 'product')

        const user = await UserModals.findById(product.userId).select("-_id -email -password -cart -__v")
        console.log(user, 'user')

        if (product) {
            return res.status(200).json({ success: true, message: "Product Found.", data :{ product , user}})
        }
        
        return res.status(404).json({ sucess: false, message: "Product Not found" })

    } catch (error) {
        res.status(500).json({ sucess: false, message: error })
    }
}


export const updateProduct = async (req, res) => {
    try {
        const { name, image, category, price, _id } = req.body.productData
        console.log(req.body)

        if (!name || !image || !category || !price || !_id) return res.status(404).json({ success: false, message: "All Fields are required." })

        await ProductModals.findByIdAndUpdate(_id, { name, image, category, price })

        return res.status(200).json({ success: true, message: "Product updated succesfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.query
        // console.log(id , 'id')
        if (!id) return res.status(404).json({ success: false, message: "Id not Found" })

        await ProductModals.findByIdAndDelete(id)
        await UserModals.updateMany(
            {},
            { $pull : {cart : id}}
        )
        // const cartS = await UserModals.find({}).select("cart -_id")

        // console.log(cartS , 'before')

        // for(var i = 0 ; i < cartS.length ; i++){
        //     for(var j = 0 ; j < cartS[i].cart.length ; j++){
        //         if(id == cartS[i].cart[j]){
        //             cartS[i].cart.splice(j,1)
        //             await UserModals.update({cart : cartS[i].cart})
        //             j--
        //         }
        //     }
        // }
        // console.log(cartS[0].cart[2] , "ids")
        // console.log(cartS , 'after')

        return res.status(200).json({ success: true, message: "Product Deleted successfully" })
    }
    catch (error) {
        console.log(error)
    }

}




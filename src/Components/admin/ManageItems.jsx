import AddCategory from "./subManagers/AddCategory"
import AddProduct from "./subManagers/AddProduct"
import DeleteItems from "./subManagers/DeleteItems"


function ManageItems(){

    return(
    <>
    <div className="addContainer">
    <AddCategory/>
    <AddProduct/>
    </div>
   
    <DeleteItems/>
    </>

    )
}

export default ManageItems
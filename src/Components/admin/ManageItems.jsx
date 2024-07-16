import AddCategory from "./subManagers/AddCategory"
import AddProduct from "./subManagers/AddProduct"
import DeleteItems from "./subManagers/DeleteItems"


function ManageItems() {

    return (
        <>
            <div className='title2 title3'>
                <h2>Add Items</h2>
            </div>
            <div className="addContainer">
                <AddCategory />
                <AddProduct />
            </div>
            <DeleteItems />
        </>

    )
}

export default ManageItems
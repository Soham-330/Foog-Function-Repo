import AddCategory from "./admin/AddCategory"
import AddProduct from "./admin/AddProduct"

import DeleteItems from "./admin/DeleteItems"
import AdminAvailability from "./admin/DieticianUn"
import FeedbackList from "./admin/FeedbackList"


function AdminPage() {

    return (

        <>
            <div className="addContainer">
                <AddCategory />
                <AddProduct />
            </div>

            <DeleteItems />
            <FeedbackList />
            <AdminAvailability />


        </>
    )

}

export default AdminPage
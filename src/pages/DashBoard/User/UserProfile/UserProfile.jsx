import { AwesomeButton } from "react-awesome-button";
import { Link } from "react-router-dom";

const UserProfile = () => {

    return (
        <div className="h-[calc(100vh-40px)] flex justify-center items-center">
            <div className="text-center">
            <p className="text-red-500 font-medium text-lg mb-3 capitalize"> No Posts added yet! </p>
            <Link to="/dashboard/addPost">
                <AwesomeButton>Add Post</AwesomeButton>
            </Link>
            </div>
        </div>
    )
};
export default UserProfile;
import "./Profile.scss";
import { useState } from "react";
import ContentTop from "../components/ContentTop/ContentTop.jsx";
import "../expenses/Expenses.css";
// import { useQuery } from "@tanstack/react-query";

// const columns: GridColDef[] = [
//     { field: "id", headerName: "ID", width: 90 },
//     {
//         field: "img",
//         headerName: "Avatar",
//         width: 100,
//         renderCell: (params) => {
//             return <img src={params.row.img || "/noavatar.png"} alt="" />;
//         },
//     },
//     {
//         field: "firstName",
//         type: "string",
//         headerName: "First name",
//         width: 150,
//     },
//     {
//         field: "lastName",
//         type: "string",
//         headerName: "Last name",
//         width: 150,
//     },
//     {
//         field: "email",
//         type: "string",
//         headerName: "Email",
//         width: 200,
//     },
//     {
//         field: "phone",
//         type: "string",
//         headerName: "Phone",
//         width: 200,
//     },
//     {
//         field: "createdAt",
//         headerName: "Created At",
//         width: 200,
//         type: "string",
//     },
//     {
//         field: "verified",
//         headerName: "Verified",
//         width: 150,
//         type: "boolean",
//     },
// ];

const Users = () => {
    const [open, setOpen] = useState(false);

    const user = {
        username: "Johndoe99",
        fullName: "John Doe",
        email: "johndoe@gmail.com",
        phone: "456 789",
        status: "verified"
    };


    // TEST THE API

    // const { isLoading, data } = useQuery({
    //   queryKey: ["allusers"],
    //   queryFn: () =>
    //     fetch("http://localhost:8800/api/users").then(
    //       (res) => res.json()
    //     ),
    // });

    return (
        <div className="main-content">
            <ContentTop/>
            <div className="grid-two-item grid-common grid-c4">
            <div className="grid-items">

            <div className="grid-item-l">
                    <span className="text-silver-v1">Username:</span>
                    {user.username}
            </div>
            <div className="grid-item-r">
                    <span className="text-silver-v1">Fullname:</span>
                    {user.fullName}
            </div>
            <div className="grid-item-r">
                    <span>Email:</span>
                    {user.email}
            </div>
            <div className="grid-item-r">
                    <span>Phone:</span>
                    {user.phone}
            </div>
            <div className="grid-item-r">
                    <span>Status:</span>
                    {user.status}
            </div>
            </div>
        <div >
        </div>
        </div>
        </div>
    );
};

export default Users;

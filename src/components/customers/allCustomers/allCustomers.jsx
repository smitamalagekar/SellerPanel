import { Ban, ChevronDownIcon, Delete, Trash2 } from "lucide-react"
import "./allCustomers.scss"
import { useState } from "react";

export default function AllCustomers() {

    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const users = [
        { id: 1, name: "Test User", phone: "+121313122123", status: "Unverified" },
        { id: 2, name: "Askks Ad", phone: "+881914271070", status: "Verified" },
        { id: 3, name: "Hiren", phone: "+917069526319", status: "Unverified" },
        { id: 4, name: "H M Athir Al Azad", phone: "+8801717434427", status: "Unverified" },
        { id: 5, name: "demo", phone: "+881524274244", status: "Unverified" },
        { id: 6, name: "Test", phone: "+919876543210", status: "Unverified" }
    ];

    // Function to handle individual row selection
    const handleCheckboxChange = (user) => {
        let updatedSelected;
        if (selected.some((item) => item.id === user.id)) {
            // If already selected, remove from the array
            updatedSelected = selected.filter((item) => item.id !== user.id);
        } else {
            // Otherwise, add to the array
            updatedSelected = [...selected, user];
        }

        setSelected(updatedSelected);
        setSelectAll(updatedSelected.length === users.length);

        // Console logs
        console.log("Selected Users:", updatedSelected);
        console.log("Select All Status:", updatedSelected.length === users.length);
    };

    // Function to handle "Select All"
    const handleSelectAll = () => {
        if (selectAll) {
            setSelected([]); // Deselect all
            console.log("Deselecting All Users");
        } else {
            setSelected(users); // Select all users
            console.log("Selecting All Users:", users);
        }
        setSelectAll(!selectAll);
        console.log("Select All Checkbox:", !selectAll);
    };
    
    return (
        <div className="AllCustomers">
            <div className="allCustomersBox">
                <div className="allCustromersHeader">
                    <p className="allCustomersHead">
                        All Customers
                    </p>
                    <div className="allCustomersButtonBox">
                        <button className="allCustomersButton" >
                            Add New Customer
                        </button>
                    </div>
                </div>

                <div className="allCustomersLowerBox">
                    <div className="allCustomersLowerHeader">
                        <p className="customersText">
                            Customers
                        </p>
                        <div className="lower-menu">
                            <div className="bulkButtonBox">
                                <div className="bulkButton">
                                    <p className="bulkText">Bulk Action</p>
                                    <ChevronDownIcon size={18} />
                                </div>

                            </div>
                            <div className="bulkButtonBox">
                                <div className="bulkButton">
                                    <p className="bulkText">Filter by verification status</p>
                                    <ChevronDownIcon size={18} color="grey" />
                                </div>

                            </div>
                            <input type="text" placeholder="Type email to search" className="searchInput" />
                        </div>
                    </div>
                    <div className="allCustomersLower">
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                        <th>Name</th>

                                        <th className="pstatH">Phone</th>
                                        <th className="ehead">Email</th>

                                        <th className="vstath">Verification Status</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selected.some((item) => item.id === user.id)}
                                                    onChange={() => handleCheckboxChange(user)}
                                                />
                                            </td>
                                            <td>{user.name}</td>
                                            <td className="pstatH">{user.phone}</td>
                                            <td className="ehead">{user.email}</td>
                                            <td className="vstath" >
                                                <span className={user.status == "Verified" ? "badge badgeVerified" : "badge"}>{user.status}</span>
                                            </td>
                                            <td>
                                                <div className="actions">
                                                    <div className="action">
                                                        <Ban color="blue" size={18} />
                                                    </div>
                                                    <div className="action">
                                                        <Trash2 color="blue" size={18} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
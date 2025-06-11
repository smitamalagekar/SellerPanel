import { Delete, Edit, Trash } from "lucide-react"
import "./Warranties.css"
import { useState } from "react";
// import img1 from "../img1.png";

export default function PreOrderFaq() {

    const [fileName, setFileName] = useState("Choose file");

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("Choose file");
    }}

    const faqs = [
        {
            id: 1,
            warrantytext: "1 Year",
            img: "",
        },
        {
            id: 2,
            warrantytext: "2 Year",
            img:"",
        },
        {
            id: 3,
            warrantytext: "3 Year",
            img:"",
        },
        {
            id: 4,
            warrantytext: "4  Year",
            img:"",
        }
    ]


    return (
        <div className="PreOrderFaq ma10">
            <div className="preOrderFaqBox">
                <div className="preOrderFaqLeft">
                    <div className="preOrderLeftUpper">
                        <p className="allFaq">All Warranties</p>
                        <input type="text" placeholder="Type to search...." className="searchFaq" />
                    </div>
                    <div className="preOrderLeftLower">
                        <div className="table-container faqTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            #
                                        </th>


                                        <th >Warranty Text</th>


                                        <th >Logo</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {faqs.map((n) => (
                                        <tr key={n.id}>
                                            <td>
                                                {n.id}
                                            </td>

                                            <td>{n.warrantytext}</td>

                                    

                                            <td>
                                                <div className="actions">
                                                    <div className="action">
                                                        <Edit color="blue" size={18} />
                                                    </div>
                                                    <div className="action">
                                                        <Trash color="blue" size={18} />
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


                <div className="preOrderFaqRight">
                    <div className="preOrderFaqRightHead">
                        <p className="allFaq">Add new FAQ</p>
                    </div>

                    <div className="faqForm-warranty">
                        <label>Warranty Text</label>
                        <input type="text" placeholder="Warranty Text" className="faqInp-warranty" />
                        <label>Logo</label>
                        <div className="file-upload-container">
                            <label className="file-upload-label">
                                <span className="file-upload-button">Browse</span>
                                <span className="file-upload-text">{fileName}</span>
                                <input type="file" className="file-upload-input" onChange={handleFileChange} />
                            </label>
                            <p className="file-upload-info">Minimum dimensions required: 40px width × 40px height.</p>
                        </div>
                        <div className="inpSubBox">
                            <input type="submit" value="Save" className="inpSub" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
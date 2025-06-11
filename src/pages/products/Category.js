import React, { useState } from "react";
import "./category.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useCategoryContext } from "../../categoryContext";
import api from "../../utils/axios"
import { Link } from "react-router-dom";
import CategoryEdit from "./CategoryEdit"; 




const Category = () => {


  const { categoryData, setCategoryData } = useCategoryContext()

  const [expandedRows, setExpandedRows] = useState([]);
  const handleRowToggle = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };




 
  const handleDeleteCategory = async (id) => {
    await api.delete(`categories/Delete-category/${id}`);
    setCategoryData((prevData) =>
      prevData.filter((c) => c._id !== id)
    )
    alert("Category deleted!!")
  }


  

  return (
    <div className="container14 my-5">
      <div className="top-header">
        <h5 className="table-title">All Categories</h5>
        <Link to="create">
        <button className="add-category-btn">Add New Category</button>
        </Link>
      </div>
      <div className="search-section">
        <h6 className="table-title">Categories</h6>
        <input
          type="text"
          className="search-bar"
          placeholder="Type name & Enter"
        />
      </div>
      <div className="card shadow p-4">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Parent Category</th>
              <th>Order Level</th>
              <th>Level</th>
              <th>Banner</th>
              <th>Icon</th>
              <th>Cover Image</th>
              <th>Featured</th>
              <th>Options</th>
            </tr>

          </thead>
          


          


          <tbody>
            {categoryData.map((category, index) => (
              <React.Fragment key={category.id}>
                <tr>
                  <td className="serial-column">{index + 1}</td>
                  <td>
                    <span
                      className={`plus-icon ${expandedRows.includes(category.id) ? "rotate" : ""
                        }`}
                      onClick={() => handleRowToggle(category.id)}
                    >
                      +
                    </span>{" "}
                    {category.name}
                  </td>

                  <td className="hide-on-small">{category.parentCategory}</td>
                  <td className="hide-on-small">{category.orderLevel}</td>
                  <td className="hide-on-small">{category.level}</td>
                  <td className="hide-on-small">
                    <img src={category.banner} alt="banner" className="table-img" />
                  </td>
                  <td className="hide-on-small">
                    <img src={category.icon} alt="icon" className="table-icon" />
                  </td>
                  <td className="hide-on-small">
                    <img src={category.coverImage} alt="cover" className="table-img" />
                  </td>
                  <td className="hide-on-small">
                    <label className="featured-switch">
                      <input
                        type="checkbox"
                        checked={category.featured}

                        disabled
                        className="cursor-not-allowed "
                      />
                      <span className="slider cursor-not-allowed"></span>
                    </label>
                  </td>
                  <td>
                    <Link to={`/products/category/edit/${category._id}`}>
                    <button className="btn btn-outline-primary me-1">
                      <FaEdit />
                    </button>
                    </Link>
                    <button onClick={() => { handleDeleteCategory(category._id) }} className="btn btn-outline-danger">
                      <FaTrash />
                    </button>
                  </td>
                </tr>

                {/* Hidden Row Section */}
                {expandedRows.includes(category.id) && (
                  <tr className="row-details">
                    <td colSpan="10">
                      <div className="details-container">
                        <strong>Parent Category:</strong> {category.parentCategory} |{" "}
                        <strong>Order Level:</strong> {category.orderLevel} |{" "}
                        <strong>Level:</strong> {category.level} |{" "}
                        <strong>Banner:</strong>{" "}
                        <img
                          src={category.banner}
                          alt="banner"
                          className="table-img"
                        />{" "}
                        | <strong>Icon:</strong>{" "}
                        <img src={category.icon} alt="icon" className="table-icon" /> |{" "}
                        <strong>Cover Image:</strong>{" "}
                        <img
                          src={category.coverImage}
                          alt="cover"
                          className="table-img"
                        />{" "}
                        | <strong>Featured:</strong>{" "}
                        {category.featured ? "Yes" : "No"}
                      </div>
                      <CategoryEdit categoryId={category._id} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
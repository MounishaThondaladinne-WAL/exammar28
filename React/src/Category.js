import { useState, useEffect } from "react";
import axios from "axios";
const Categories = () => {
  const [category, setCategory] = useState([]);
  const [edit, setEdit] = useState(false);
  const [updateCategory, setUpdateCategory] = useState({});
  const getCategories = () => {
    axios
      .get("/categories")
      .then((res) => {
        setCategory(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCategories();
  }, []);
  const AddCategory = (event) => {
    event.preventDefault();
    const categoryObject = {
      id: event.target.id.value,
      name: event.target.name.value,
      description: event.target.description.value,
    };
    axios
      .post("/categories", categoryObject)
      .then((res) => {
        getCategories();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteCategory = (id) => {
    axios
      .delete("/categories/" + id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getCategories();
  };
  const deleteAll = () => {
    axios
      .delete("/categories")
      .then((res) => {
        getCategories();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const categoryUpdate = (id) => {
    setEdit(true);
    setUpdateCategory(id);
  };
  const saveCategory = (event) => {
    event.preventDefault();
    const categoryObject = {
      name: event.target.name.value,
      description: event.target.description.value,
    };
    axios
      .put(`/categories/update/${updateCategory}`, categoryObject)
      .then((res) => {
        getCategories();
        setEdit(false);
        console.log(res.data);
      });
  };
  return (
    <div>
      {edit ? (
        <form
          onSubmit={saveCategory}
          className="w-50 m-auto p-3 mt-4 mb-4 text-center border border-dark rounded"
        >
          <h1>Update Category</h1>
          <input
            type="text"
            name="name"
            placeholder="Enter Category Name"
            className="form-control w-75 m-auto mt-3 mb-4"
          />
          <textarea
            name="description"
            className="form-control w-75 m-auto mt-3 mb-4"
            placeholder="Enter Category Description"
          ></textarea>
          <button className="btn btn-primary">Update Category</button>
        </form>
      ) : (
        <div className="text-center">
          <form
            onSubmit={AddCategory}
            className="w-50 m-auto p-3 mt-4 text-center border border-dark rounded"
          >
            <h1>Category</h1>
            <div className="form-group">
              <input
                type="number"
                name="id"
                placeholder="Enter Category Id"
                className="form-control w-75 m-auto mt-3 mb-4"
              />
              <input
                type="text"
                name="name"
                placeholder="Enter Category Name"
                className="form-control w-75 m-auto mt-3 mb-4"
              />
              <textarea
                name="description"
                className="form-control w-75 m-auto mt-3 mb-4"
                placeholder="Category Description"
              ></textarea>
              <button className="btn btn-primary">Add Category</button>
              <br />
            </div>
          </form>
          <button className="btn btn-danger mt-3 mb-3" onClick={deleteAll}>
            Delete All
          </button>
          <br />
        </div>
      )}
      <div className="table table-bordered table-striped text-center  ">
        <table className="text-center w-50 m-auto ">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
          {category.map((val, index) => {
            return (
              <tr>
                <td>{val.id}</td>
                <td>{val.name}</td>
                <td>{val.description}</td>
                <td>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                      categoryUpdate(val.id);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      deleteCategory(val.id);
                    }}
                  >
                    Delete
                  </button>
                  <br />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};
export default Categories;

import { useState, useEffect } from "react";
import axios from "axios";
const Car = () => {
  const [car, setCars] = useState([]);
  const getCars = () => {
    axios
      .get("/cars")
      .then((res) => {
        setCars(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCars();
  }, []);
  const AddCars = (event) => {
    event.preventDefault();
    const carObj = {
      carname: event.target.name.value,
      price: event.target.price.value,
      color: event.target.color.value,
      instock: event.target.instock.value,
    };
    axios
      .post("/cars", carObj)
      .then((res) => {
        getCars();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteCars = (id) => {
    axios
      .delete("/cars/" + id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getCars();
  };
  const deleteAll = () => {
    axios
      .delete("/cars")
      .then((res) => {
        getCars();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="text-center">
        <form
          onSubmit={AddCars}
          className="w-50 m-auto p-3 mt-4 text-center border border-dark rounded"
        >
          <h1>Car App</h1>
          <input
            type="text"
            name="name"
            placeholder="Enter Car Name"
            className="form-control w-75 m-auto mt-3 mb-4"
          />
          <div className="form-group">
            <input
              type="number"
              name="price"
              placeholder="Enter Car Price"
              className="form-control w-75 m-auto mt-3 mb-4"
            />
            <select name="color" className="form-select w-75 m-auto mt-3 mb-4">
              <option>Color</option>
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="Grey">Grey</option>
            </select>
            <select
              name="instock"
              className="form-select w-75 m-auto mt-3 mb-4"
            >
              <option value="1">Available</option>
              <option value="0">Un Available</option>
            </select>
            <button className="btn btn-primary">Add Car</button>
            <br />
          </div>
        </form>
        <button className="btn btn-danger mt-3 mb-3" onClick={deleteAll}>
          Delete All
        </button>
        <br />
      </div>
      <div className="table table-bordered table-striped text-center  ">
        <table className="text-center w-50 m-auto ">
          <tr>
            <th>Id</th>
            <th>Car Name</th>
            <th>Price</th>
            <th>Color</th>
            <th>Instock</th>
            <th>Delete</th>
          </tr>
          {car.map((val, index) => {
            return (
              <tr>
                <td>{val.id}</td>
                <td>{val.carname}</td>
                <td>{val.price}</td>
                <td>{val.color}</td>
                <td>{val.instock}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      deleteCars(val.id);
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
export default Car;

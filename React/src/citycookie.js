import axios from "axios";
export default function Cookie() {
  const addCookie = (event) => {
    event.preventDefault();
    axios
      .get(`/cookie/setcookie/city/${event.target.city.value}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form
      onSubmit={addCookie}
      className="w-50 m-auto p-3 mt-4 text-center border border-dark rounded"
    >
      <h1>CITY COOKIE</h1>
      <div className="form-group">
        <label>Enter City</label>
        <input
          type="text"
          name="city"
          className="form-control w-75 m-auto mt-3 mb-4"
        />
        <button type="submit" className="btn btn-primary ">
          Add Cookie
        </button>
      </div>
    </form>
  );
}

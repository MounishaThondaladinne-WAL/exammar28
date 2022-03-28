import axios from "axios";
export default function CookieTime() {
  const addCookie = (event) => {
    event.preventDefault();
    axios
      .get(
        `/cookie/setcookiewithtime/${event.target.item.value}/${event.target.itemvalue.value}/${event.target.time.value}`
      )
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
      <h1>Cookies</h1>
      <div className="form-group">
        <input
          type="text"
          name="item"
          placeholder="Enter Cookie"
          className="form-control w-75 m-auto mt-3 mb-4 text-center"
        />
        <input
          type="text"
          placeholder="Enter value"
          name="itemvalue"
          className="form-control w-75 m-auto mt-3 mb-4 text-center"
        />
        <input
          type="number"
          placeholder="Enter Time"
          name="time"
          className="form-control w-75 m-auto mt-3 mb-4 text-center"
        />
        <button type="submit" className="btn btn-primary ">
          Add Cookie
        </button>
      </div>
    </form>
  );
}

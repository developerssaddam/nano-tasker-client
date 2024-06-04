import Chart from "../../../../components/Chart/Chart";

const TaskCreatorHome = () => {
  return (
    <div className="max-w-5xl mx-auto md:py-10">
      <div className="states_area flex justify-center md:mb-5">
        <Chart />
      </div>

      <div className="review_table">
        <h1 className="text-2xl md:text-4xl text-gray-600 font-semibold text-center mb-3">
          Task-Review
        </h1>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-[#EEF1F4]">
              <tr className="text-lg">
                <th>Sl-No</th>
                <th>Worker-Name</th>
                <th>Worker-Email</th>
                <th>Payable-Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality@gmail.com</td>
                <td>$30</td>
                <td>
                  <button
                    className="btn btn-sm bg-primary_color text-white"
                    onClick={() =>
                      document.getElementById("viewModal").showModal()
                    }
                  >
                    View
                  </button>
                  <button className="btn btn-sm bg-green-500 text-white">
                    Approve
                  </button>
                  <button className="btn btn-sm bg-red-500 text-white">
                    Reject
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal-area */}
      <dialog id="viewModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default TaskCreatorHome;

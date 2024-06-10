import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import "./MySubmission.css";
import { useEffect, useState } from "react";

const MySubmissions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState([]);

  // Load Page Count Data.
  const { data, isPending } = useQuery({
    queryKey: ["TotalPage"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my/all/submission?email=${user.email}`
      );
      return res.data;
    },
  });

  // Load per page data.
  useEffect(() => {
    axiosSecure
      .get(
        `/nanotasker/pagination?email=${
          user.email
        }&page=${currentPage}&size=${10}`
      )
      .then((res) => {
        setPerPageData(res.data);
      });
  }, [axiosSecure, currentPage, user.email]);

  // If pending
  if (isPending) {
    return;
  }

  // pagination
  const totalItems = data.totalItems;
  const pages = Math.ceil(totalItems / 10);
  const totalPages = [...Array(pages).keys()];

  // handleCurrentPage
  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  // handlePrevButton
  const handlePrevButton = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // handleNextButton
  const handleNextButton = () => {
    if (currentPage < totalPages?.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto py-4 md:py-10">
        <Helmet>
          <title>Dashboard | My-Submission</title>
        </Helmet>
        <h2 className="font-bold text-2xl text-gray-600 text-center mb-3">
          My Submission-List
        </h2>
        <div>
          <div className="overflow-x-auto min-h-[400px]">
            <table className="table">
              {/* head */}
              <thead className="bg-[#EEF1F4] text-base font-semibold">
                <tr>
                  <th>Sl-No</th>
                  <th>Title</th>
                  <th>Payable-Amount</th>
                  <th>Buyer-Name</th>
                  <th>Submission-Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {perPageData.map((submission, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{submission.title}</td>
                    <td>{submission.amount} Coin</td>
                    <td>{submission.creator_name}</td>
                    <td>{submission.date}</td>
                    <td>
                      {submission.status === "Pending" ? (
                        <p className="bg-warning py-2 px-3 rounded-lg text-center text-white">
                          {submission.status}
                        </p>
                      ) : submission.status === "Rejected" ? (
                        <p className="bg-red-500 py-2 px-3 rounded-lg text-center text-white">
                          {submission.status}
                        </p>
                      ) : (
                        <p className="bg-green-600 py-2 px-3 rounded-lg text-center text-white">
                          {submission.status}
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Paginations */}
      <div className="pagination_area flex justify-center items-center py-3">
        <button onClick={handlePrevButton}>Prev</button>
        {totalPages.map((page, index) => (
          <button
            onClick={() => handleCurrentPage(page)}
            className={currentPage === page ? "active" : ""}
            key={index}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextButton}>Next</button>
      </div>
    </>
  );
};

export default MySubmissions;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../services/customerService";
import { setCustomers } from "../redux/customersSlice";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardCustomerStatistics from "../components/DashboardCustomerStatistics";

const Customers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customers = useSelector(
    (state: { customers: { customers: any } }) => state.customers.customers
  );
  const user = useSelector((state: { user: { user: any } }) => state.user.user);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 30;

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const data = await fetchCustomers(user.email, page, limit);
        dispatch(setCustomers(data.customers));
        setTotalPages(data.totalPages);
      } catch (error) {
        // console.error("Error fetching customers:", error);
      }
    };

    getCustomers();
  }, [dispatch, page]);

  const handleViewDetails = (customerId: string) => {
    navigate(`/view-customer-details/${customerId}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="customers content-container">
        <div className="container">
          <h2>
            <i className="bi bi-people-fill"></i>Customers
          </h2>
          <hr />
          <DashboardCustomerStatistics />
          {customers.length === 0 ? (
            <p>No customers found.</p>
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer: any) => (
                    <tr key={customer.email}>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.contact}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleViewDetails(customer.customerId)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;

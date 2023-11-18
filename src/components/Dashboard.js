import SearchBar from "./Search";
import trash from "../img/trash-2.svg";
import edit from "../img/edit-2.svg";
import DepartmentCard from "./DepartmentCard";
import { useState, useEffect } from "react";
import AddPopup from "./AddPopup";

const Dashboard = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const authToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGZlMTc4MjMyMzIwNmVmMjViOWJiOSIsImlhdCI6MTcwMDI4NDA2MywiZXhwIjoxNzAwNTQzMjYzfQ.rSQ0blzVCB5LfqJDagQW78YUkfsb7Cmt2bf97Fetems";

        const response = await fetch(
          "https://shlok-mittal-lawyer-backend.vercel.app/api/v1/admin/department",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDepartments(data.data);
        } else {
          setError("Failed to fetch departments");
        }
      } catch (error) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div>
      <div className="p-6 px-12 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className=" text-3xl font-medium">Departments</h1>
          <div className="flex justify-center items-center gap-6">
            <SearchBar />
            <button
              className="bg-[#0F2C64] text-white py-1 px-2 rounded"
              onClick={handleOpenPopup}
            >
              Create Department
            </button>
            <img src={trash} alt="" />
            <img src={edit} alt="" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap p-10 gap-10">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {departments.map((department) => (
          <DepartmentCard
            key={department._id}
            departmentName={department.name}
          />
        ))}
      </div>
      {isPopupVisible && <AddPopup setIsPopupVisible={setIsPopupVisible} />}
    </div>
  );
};

export default Dashboard;

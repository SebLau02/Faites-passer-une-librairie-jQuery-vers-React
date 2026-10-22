import { Link } from "react-router";
import Input from "../../components/ui/Input/Input";
import Select from "../../components/ui/Select/Select";
import { useState } from "react";

function EmployeesList() {
  const [employes, setEmployes] = useState(
    JSON.parse(localStorage.getItem("employees") || "{}"),
  );
  return (
    <div
      style={{
        maxWidth: "1140px",
      }}
      className="mx-auto"
    >
      <h1 className="text-center mt-4">Current Employees</h1>
      <div className="d-flex justify-space-between align-items-center mb-2 mt-4">
        <div className="d-flex align-center gap-1">
          <span>Show </span>

          <Select
            value={10}
            options={[
              {
                label: "10",
                value: 10,
              },
              {
                label: "25",
                value: 25,
              },
              {
                label: "50",
                value: 50,
              },
              {
                label: "100",
                value: 100,
              },
            ]}
          />
          <span>entries </span>
        </div>
        <div>
          <label>Search:</label>
          <Input name="search" />
        </div>
      </div>
      <Link to="create" className="text-center mx-auto d-block underline">
        Home
      </Link>
    </div>
  );
}

export default EmployeesList;

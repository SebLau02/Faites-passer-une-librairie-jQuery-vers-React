import { Link } from "react-router";
import Input from "../../components/ui/Input/Input";
import Select from "../../components/ui/Select/Select";
import { useState } from "react";
import TableContainer from "../../../../OC-UI/src/ui/TableContainer";
import TableCell from "../../../../OC-UI/src/ui/TableCell";
import TableRow from "../../../../OC-UI/src/ui/TableRow";

const heads = [
  { label: "First Name" },
  { label: "Last Name" },
  { label: "Start Date" },
  { label: "Department" },
  { label: "Date of Birth" },
  { label: "Street" },
  { label: "City" },
  { label: "State" },
  { label: "Zip Code" },
];
function EmployeesList() {
  const [employes, setEmployes] = useState(
    JSON.parse(localStorage.getItem("employees") || "[]"),
  );
  console.log(employes);
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
      <TableContainer
        style={{
          width: "100%",
        }}
      >
        <TableRow>
          {heads.map((head, i) => (
            <TableCell
              key={i}
              style={{
                backgroundColor: "var(--oc-primary200)",
                borderColor: "var(--oc-primary300)",
                borderWidth: 0,
                borderLeftWidth: i === 0 ? 0 : 1,
                borderStyle: "solid",
                flex: 1,
              }}
            >
              {head.label}
            </TableCell>
          ))}
        </TableRow>
        {employes.map((emp, i) => (
          <TableRow
            key={i}
            style={{
              backgroundColor: i % 2 ? "var(--oc-grey100)" : "",
            }}
          >
            <TableCell
              style={{
                flex: 1,
              }}
            >
              {emp["first-name"]}
            </TableCell>
            <TableCell
              style={{
                flex: 1,
              }}
            >
              {emp["last-name"]}
            </TableCell>
            <TableCell
              style={{
                flex: 1,
              }}
            >
              {emp["start-date"]}
            </TableCell>
            <TableCell
              style={{
                flex: 1,
              }}
            >
              {emp["department"]}
            </TableCell>
            <TableCell
              style={{
                flex: 1,
              }}
            >
              {emp["date-of-birth"]}
            </TableCell>
            <TableCell
              style={{
                flex: 1,
              }}
            >
              {emp["street"]}
            </TableCell>
            <TableCell
              style={{
                flex: 1,
              }}
            >
              {emp["city"]}
            </TableCell>
            <TableCell
              style={{
                flex: 1,
              }}
            >
              {emp["state"]}
            </TableCell>
            <TableCell
              style={{
                flex: 1,
              }}
            >
              {emp["zip-code"]}
            </TableCell>
          </TableRow>
        ))}
      </TableContainer>
      <Link to="create" className="text-center mx-auto d-block underline mt-2">
        Home
      </Link>
    </div>
  );
}

export default EmployeesList;

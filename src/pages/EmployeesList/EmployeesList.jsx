import { Link } from "react-router";
import { useState, useMemo } from "react";
import {
  Input,
  TableContainer,
  TableCell,
  TableRow,
  PaginationSummary,
} from "@seblau02/oc-ui";
import { useContext } from "react";
import { EmployeesContext } from "../../hooks/context";

const compareText = (a, b) =>
  String(a ?? "").localeCompare(String(b ?? ""), "fr");
const compareDate = (a, b) => new Date(a) - new Date(b);
const compareNumeric = (a, b) =>
  String(a ?? "").localeCompare(String(b ?? ""), "fr", { numeric: true });

const sortBy = (key, compare) => (list, direction) =>
  [...list].sort((a, b) =>
    direction === "up"
      ? compare(a?.[key], b?.[key])
      : compare(b?.[key], a?.[key]),
  );

const heads = [
  { label: "First Name", onSort: sortBy("first-name", compareText) },
  { label: "Last Name", onSort: sortBy("last-name", compareText) },
  { label: "Start Date", onSort: sortBy("start-date", compareDate) },
  { label: "Department", onSort: sortBy("department", compareText) },
  { label: "Date of Birth", onSort: sortBy("date-of-birth", compareDate) },
  { label: "Street", onSort: sortBy("street", compareNumeric) },
  { label: "City", onSort: sortBy("city", compareText) },
  { label: "State", onSort: sortBy("state", compareText) },
  { label: "Zip Code", onSort: sortBy("zip-code", compareNumeric) },
];

const paginate = (list, perPage, page) => {
  const start = (page - 1) * perPage;
  const tranch = list.slice(start, start + perPage);
  const totalPages = Math.max(1, Math.ceil(list.length / perPage));
  const totalCount = list.length;

  return { tranch, totalPages, totalCount };
};

function EmployeesList() {
  const { employees } = useContext(EmployeesContext);

  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const sorted = useMemo(() => {
    let sorted = employees;
    if (sort) {
      sorted = heads[sort.index].onSort(employees, sort.direction);
    }
    if (searchValue)
      sorted = sorted.filter((e) => {
        return (
          e["first-name"].toLowerCase().includes(searchValue.toLowerCase()) ||
          e["last-name"].toLowerCase().includes(searchValue.toLowerCase()) ||
          e["start-date"].toLowerCase().includes(searchValue.toLowerCase()) ||
          e["department"].toLowerCase().includes(searchValue.toLowerCase()) ||
          e["date-of-birth"]
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          e["street"].toLowerCase().includes(searchValue.toLowerCase()) ||
          e["city"].toLowerCase().includes(searchValue.toLowerCase()) ||
          e["state"].toLowerCase().includes(searchValue.toLowerCase()) ||
          e["zip-code"].toLowerCase().includes(searchValue.toLowerCase())
        );
      });

    return sorted;
  }, [employees, sort, searchValue]);
  const {
    tranch: employes,
    totalCount,
    totalPages,
  } = paginate(sorted, perPage, page);

  return (
    <div
      style={{
        maxWidth: "1140px",
      }}
      className="mx-auto"
    >
      <h1 className="text-center mt-4">Current Employees</h1>
      <div className="d-flex justify-space-between align-items-center mb-2 mt-4">
        <div>
          <label>Search:</label>
          <Input
            name="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <TableContainer
        paginationSummary={
          <PaginationSummary
            totalCount={totalCount}
            page={page}
            totalPages={totalPages}
            perPage={perPage}
            setPerPage={(e) => setPerPage(e)}
            setPage={(e) => setPage(e)}
          />
        }
      >
        <TableRow
          style={{
            width: "fit-content",
          }}
        >
          {heads.map((head, i) => (
            <TableCell
              key={i}
              sortable
              onSort={(direction) => {
                setSort({ index: i, direction });
              }}
              style={{
                backgroundColor: "var(--oc-primary200)",
                borderColor: "var(--oc-primary300)",
                borderWidth: 0,
                borderLeftWidth: i === 0 ? 0 : 1,
                borderStyle: "solid",
                flex: 1,
                minWidth: 200,
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
              flex: 1,
              width: "fit-content",
            }}
          >
            <TableCell
              style={{
                flex: 1,
                minWidth: 200,
              }}
            >
              {emp["first-name"]}
            </TableCell>
            <TableCell
              style={{
                flex: 1,
                minWidth: 200,
              }}
            >
              {emp["last-name"]}
            </TableCell>
            <TableCell
              style={{
                flex: 1,
                minWidth: 200,
              }}
            >
              {emp["start-date"]}
            </TableCell>
            <TableCell
              style={{
                flex: 1,
                minWidth: 200,
              }}
            >
              {emp["department"]}
            </TableCell>
            <TableCell
              style={{
                flex: 1,
                minWidth: 200,
              }}
            >
              {emp["date-of-birth"]}
            </TableCell>
            <TableCell
              style={{
                flex: 1,
                minWidth: 200,
              }}
            >
              {emp["street"]}
            </TableCell>
            <TableCell
              style={{
                flex: 1,
                minWidth: 200,
              }}
            >
              {emp["city"]}
            </TableCell>
            <TableCell
              style={{
                flex: 1,
                minWidth: 200,
              }}
            >
              {emp["state"]}
            </TableCell>
            <TableCell
              style={{
                flex: 1,
                minWidth: 200,
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

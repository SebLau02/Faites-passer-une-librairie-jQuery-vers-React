import { lazy } from "react";

const EmployeesList = lazy(() => import("./EmployeesList/EmployeesList.jsx"));
const CreateEmployee = lazy(
  () => import("./CreateEmployee/CreateEmployee.jsx"),
);
export { EmployeesList, CreateEmployee };

import { Suspense } from "react";
import { Routes, Route } from "react-router";
import { CreateEmployee, EmployeesList } from "./pages";
import { createTheme, ThemeProvider } from "@seblau02/oc-ui";
import { EmployeesContext } from "./hooks/context";
import { useState } from "react";
import { useEffect } from "react";

const theme = {
  palette: {
    primary: "#93ad18",
    grey: "#5a6b7b",
  },
  radius: "4px",
  components: {},
};

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/employees.json", { signal: controller.signal })
      .then((res) => res.json())
      .then(setEmployees)
      .catch((error) => {
        if (error.name !== "AbortError") console.error(error);
      });

    return () => controller.abort();
  }, []);

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <EmployeesContext.Provider value={{ employees, setEmployees }}>
        <Suspense fallback={<>Je charge</>}>
          <Routes>
            <Route path="/employees/">
              <Route index element={<EmployeesList />} />
              <Route path="create" element={<CreateEmployee />} />
            </Route>
          </Routes>
        </Suspense>
      </EmployeesContext.Provider>
    </ThemeProvider>
  );
}

export default App;

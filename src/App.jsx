import { Suspense } from "react";
import { Routes, Route } from "react-router";
import { CreateEmployee, EmployeesList } from "./pages";
import ThemeProvider from "./components/ui/Modal/ThemeProvider";
import { createTheme } from "./components/ui/Modal/createTheme";

const theme = {
  palette: {
    primary: "#93ad18",
    grey: "#5a6b7b",
  },
  radius: "4px",
  components: {},
};

function App() {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Suspense fallback={<>Je charge</>}>
        <Routes>
          <Route path="/employees/">
            <Route index element={<EmployeesList />} />
            <Route path="create" element={<CreateEmployee />} />
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

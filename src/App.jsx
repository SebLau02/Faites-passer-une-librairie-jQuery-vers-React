import { Suspense } from "react";
import { Routes, Route } from "react-router";
import { CreateEmployee, EmployeesList } from "./pages";

function App() {
  return (
    <Suspense fallback={<>Je charge</>}>
      <Routes>
        <Route path="/employees/">
          <Route index element={<EmployeesList />} />
          <Route path="create" element={<CreateEmployee />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

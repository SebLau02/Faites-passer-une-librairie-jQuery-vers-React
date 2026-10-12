import { Link } from "react-router";
import Select from "../../components/ui/Select/Select";

function CreateEmployee() {
  return (
    <div
      class="d-flex flex-column align-items-center mx-auto"
      style={{
        maxWidth: "300px",
      }}
    >
      <div class="title">
        <h1>HRnet</h1>
      </div>
      <div>
        <Link to="/employees">View Current Employees</Link>
        <h2>Create Employee</h2>

        <form id="create-employee" className="d-flex flex-column gap-2 w-full">
          <div className="d-flex flex-column">
            <label for="first-name">First Name</label>
            <input type="text" id="first-name" />
          </div>

          <div className="d-flex flex-column">
            <label for="last-name">Last Name</label>
            <input type="text" id="last-name" />
          </div>

          <div className="d-flex flex-column">
            <label for="date-of-birth">Date of Birth</label>
            <input id="date-of-birth" type="text" />
          </div>

          <div className="d-flex flex-column">
            <label for="start-date">Start Date</label>
            <input id="start-date" type="text" />
          </div>

          <fieldset class="p-2">
            <legend>Address</legend>

            <div className="d-flex flex-column">
              <label for="street">Street</label>
              <input id="street" type="text" />
            </div>

            <div className="d-flex flex-column">
              <label for="city">City</label>
              <input id="city" type="text" />
            </div>

            <div className="d-flex flex-column">
              <label for="state">State</label>
              <select name="state" id="state"></select>
            </div>

            <div className="d-flex flex-column">
              <label for="zip-code">Zip Code</label>
              <input id="zip-code" type="number" />
            </div>
          </fieldset>

          <div className="d-flex flex-column">
            <label for="department">Department</label>
            <select name="department" id="department">
              <option>Sales</option>
              <option>Marketing</option>
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Legal</option>
            </select>
          </div>

          <Select
            label="Department"
            options={[
              {
                label: "Sales",
                value: "sales",
              },
              {
                label: "Marketing",
                value: "marketing",
              },
              {
                label: "Engineering",
                value: "engineering",
              },
              {
                label: "Human Resources",
                value: "human-resources",
              },
              {
                label: "Legal",
                value: "legal",
              },
            ]}
          />
        </form>

        <button onclick="saveEmployee()">Save</button>
      </div>
    </div>
  );
}

export default CreateEmployee;

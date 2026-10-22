import { Link } from "react-router";
import { useState } from "react";
import { STATES } from "../../lib/constants";
import { DatePicker, Select } from "@seblau02/oc-ui";
import { Input } from "@seblau02/oc-ui";
import { Button } from "@seblau02/oc-ui";
import { Modal } from "@seblau02/oc-ui";

// import Select from "../../components/ui/Select/Select";
// import DatePicker from "../../components/ui/DatePicker/DatePicker.jsx";

function CreateEmployee() {
  const [formData, setFormData] = useState();
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    localStorage.setItem("employees", JSON.stringify([...employees, formData]));
    setOpen(true);
  };
  return (
    <div
      className="d-flex flex-column align-items-center mx-auto"
      style={{
        maxWidth: "300px",
      }}
    >
      <h1 className="mb-2 text-center">HRnet</h1>
      <div>
        <Link to="/employees" className="text-center mx-auto d-block underline">
          View Current Employees
        </Link>
        <h2 className="my-2">Create Employee</h2>

        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column gap-2 w-full"
        >
          <div className="d-flex flex-column gap-1">
            <label htmlFor="first-name">First Name</label>
            <Input onChange={handleChange} type="text" name="first-name" />
          </div>

          <div className="d-flex flex-column gap-1">
            <label htmlFor="last-name">Last Name</label>
            <Input onChange={handleChange} type="text" name="last-name" />
          </div>

          <DatePicker
            label="Date of Birth"
            name="date-of-birth"
            onChange={handleChange}
          />
          <DatePicker
            label="Start Date"
            name="start-date"
            onChange={handleChange}
          />

          <fieldset className="p-2 d-flex flex-column gap-2">
            <legend>Address</legend>

            <div className="d-flex flex-column gap-1">
              <label htmlFor="street">Street</label>
              <Input onChange={handleChange} name="street" type="text" />
            </div>

            <div className="d-flex flex-column gap-1">
              <label htmlFor="city">City</label>
              <Input onChange={handleChange} name="city" type="text" />
            </div>

            <Select
              label="State"
              name="state"
              value={formData?.state ?? ""}
              onChange={handleChange}
              options={STATES}
            />

            <div className="d-flex flex-column gap-1">
              <label htmlFor="zip-code">Zip Code</label>
              <Input onChange={handleChange} name="zip-code" type="number" />
            </div>
          </fieldset>

          <Select
            label="Department"
            name="department"
            value={formData?.department ?? ""}
            onChange={handleChange}
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
          <Button type="submit" className={"w-fit mx-auto"}>
            Save
          </Button>
        </form>
        <Modal open={open} onClose={() => setOpen(!open)}>
          <div>Employee Created!</div>
        </Modal>
      </div>
    </div>
  );
}

export default CreateEmployee;

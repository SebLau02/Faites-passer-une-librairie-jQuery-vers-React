import { Link } from "react-router";
import Select from "../../components/ui/Select/Select";
import Input from "../../components/ui/Input/Input";
import { useState } from "react";
import { STATES } from "../../lib/constants";
import Button from "../../components/ui/Button/Button";
import DatePicker from "../../components/ui/DatePicker/DatePicker";

function CreateEmployee() {
  const [department, setDepartment] = useState("sales");
  const [formData, setFormData] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
            <label for="first-name">First Name</label>
            <Input onChange={handleChange} type="text" name="first-name" />
          </div>

          <div className="d-flex flex-column gap-1">
            <label for="last-name">Last Name</label>
            <Input onChange={handleChange} type="text" name="last-name" />
          </div>

          <div className="d-flex flex-column gap-1">
            <label for="date-of-birth">Date of Birth</label>
            <Input onChange={handleChange} name="date-of-birth" type="date" />
          </div>

          <DatePicker
            label="Date of Birth"
            name="date-of-birth"
            onChange={handleChange}
          />

          <div className="d-flex flex-column gap-1">
            <label for="start-date">Start Date</label>
            <Input onChange={handleChange} name="start-date" type="date" />
          </div>

          <fieldset className="p-2 d-flex flex-column gap-2">
            <legend>Address</legend>

            <div className="d-flex flex-column gap-1">
              <label for="street">Street</label>
              <Input onChange={handleChange} name="street" type="text" />
            </div>

            <div className="d-flex flex-column gap-1">
              <label for="city">City</label>
              <Input onChange={handleChange} name="city" type="text" />
            </div>

            <Select
              label="State"
              value={department}
              onChange={(value) => {
                setDepartment(value);
              }}
              options={STATES}
            />

            <div className="d-flex flex-column gap-1">
              <label for="zip-code">Zip Code</label>
              <Input onChange={handleChange} name="zip-code" type="number" />
            </div>
          </fieldset>

          <Select
            label="Department"
            value={department}
            onChange={(value) => {
              setDepartment(value);
            }}
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
      </div>
    </div>
  );
}

export default CreateEmployee;

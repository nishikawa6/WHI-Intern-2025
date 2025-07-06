import express, { Request, Response } from "express";
import { EmployeeDatabaseInMemory } from "./employee/EmployeeDatabaseInMemory";
import { v5 as uuidv5 } from "uuid";

const app = express();
const port = process.env.PORT ?? 8080;
const database = new EmployeeDatabaseInMemory();
const NAMESPACE_UUID = "f47ac10b-58cc-4372-a567-0e02b2c3d479"; // Example namespace UUID

app.use(express.json());

app.get("/api/employees", async (req: Request, res: Response) => {
  const filterText = req.query.filterText ?? "";
  // req.query is parsed by the qs module.
  // https://www.npmjs.com/package/qs
  if (Array.isArray(filterText)) {
    // Multiple filterText is not supported
    res.status(400).send();
    return;
  }
  if (typeof filterText !== "string") {
    // Nested query object is not supported
    res.status(400).send();
    return;
  }
  try {
    const employees = await database.getEmployees(filterText);
    res.status(200).send(JSON.stringify(employees));
  } catch (e) {
    console.error(`Failed to load the users filtered by ${filterText}.`, e);
    res.status(500).send();
  }
});

app.get("/api/employees/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const employee = await database.getEmployee(userId);
    if (employee == undefined) {
      res.status(404).send();
      return;
    }
    res.status(200).send(JSON.stringify(employee));
  } catch (e) {
    console.error(`Failed to load the user ${userId}.`, e);
    res.status(500).send();
  }
});

app.post("/api/employee/registration", async (req: Request, res: Response) => {
  const employee = req.body;
  if (employee == null) {
    res.status(400).send("Employee data is required.");
    return;
  }
  console.log("employee", employee);
  const newEmployeeId = uuidv5(employee.name + employee.age, NAMESPACE_UUID);
  const newEmployee = {
    id: newEmployeeId,
    name: employee.name,
    age: Number(employee.age),
  };
  console.log("newEmployeeId", newEmployeeId, "newEmployee", newEmployee);
  database.addEmployee(newEmployeeId, newEmployee);
  // 登録完了のレスポンス
  res.status(201).send(JSON.stringify(newEmployee));
});

app.listen(port, () => {
  console.log(`App listening on the port ${port}`);
});

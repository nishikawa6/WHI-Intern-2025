import type {
  LambdaFunctionURLEvent,
  LambdaFunctionURLResult,
} from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Employee } from "./employee/Employee";
import { EmployeeDatabaseDynamoDB } from "./employee/EmployeeDatabaseDynamoDB";
import { EmployeeDatabase } from "./employee/EmployeeDatabase";

const getEmployeeHandler = async (
  database: EmployeeDatabase,
  id: string
): Promise<LambdaFunctionURLResult> => {
  const employee: Employee | undefined = await database.getEmployee(id);
  if (employee == null) {
    console.log("A user is not found.");
    return { statusCode: 404 };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(employee),
  };
};

const getEmployeesHandler = async (
  database: EmployeeDatabase,
  filterText: string
): Promise<LambdaFunctionURLResult> => {
  const employees: Employee[] = await database.getEmployees(filterText);
  return {
    statusCode: 200,
    body: JSON.stringify(employees),
  };
};

const addEmployeeHandler = async (
  database: EmployeeDatabase,
  body: string
): Promise<LambdaFunctionURLResult> => {
  try {
    const requestData = JSON.parse(body);
    const { id, name, age, department, position } = requestData;

    if (!id || !name || age === undefined || !department || !position) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message:
            "Missing required fields: id, name, age, department, position",
        }),
      };
    }

    const employee: Employee = {
      id,
      name,
      age: parseInt(age, 10),
      department,
      position,
    };

    await database.addEmployee(id, employee);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Employee added successfully",
        employee,
      }),
    };
  } catch (error) {
    console.error("Error parsing request body:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid request body",
      }),
    };
  }
};

export const handle = async (
  event: LambdaFunctionURLEvent
): Promise<LambdaFunctionURLResult> => {
  console.log("event", event);
  try {
    const tableName = process.env.EMPLOYEE_TABLE_NAME;
    if (tableName == null) {
      throw new Error(
        "The environment variable EMPLOYEE_TABLE_NAME is not specified."
      );
    }
    const client = new DynamoDBClient();
    const database = new EmployeeDatabaseDynamoDB(client, tableName);
    // https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/urls-invocation.html
    const path = normalizePath(event.requestContext.http.path);
    const query = event.queryStringParameters;
    console.log("path", path);
    if (path === "/api/employees") {
      console.log(
        "Getting employees with filterText:",
        query?.filterText ?? ""
      );
      return getEmployeesHandler(database, query?.filterText ?? "");
    } else if (path.startsWith("/api/employees/")) {
      console.log("Getting an employee by ID");
      const id = path.substring("/api/employees/".length);
      return getEmployeeHandler(database, id);
    } else if (path === "/api/employee/registration") {
      console.log("Adding a new employee");
      const body = event.body || "";
      return addEmployeeHandler(database, body);
    } else {
      console.log("Invalid path", path);
      return { statusCode: 400 };
    }
    console.log("Request processed successfully");
  } catch (e) {
    console.error("Internal Server Error", e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
      }),
    };
  }
};

function normalizePath(path: string): string {
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

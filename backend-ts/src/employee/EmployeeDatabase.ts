import { Employee } from "./Employee";

export interface EmployeeDatabase {
  getEmployee(id: string): Promise<Employee | undefined>;
  getEmployees(filterText: string): Promise<Employee[]>;
  addEmployee(employeeId: string, employee: Employee): Promise<void>;
}

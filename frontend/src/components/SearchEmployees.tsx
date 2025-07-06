"use client";
import {
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { EmployeeListContainer } from "./EmployeeListContainer";
import { RegisterationEmployeeButton } from "./RegistrationEmployeeButton";
import { Employee } from "../models/Employee";


export function SearchEmployees() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [departments, setDepartments] = useState<string[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data: Employee[]) => {
        const departmentList = [
          ...new Set(data.map((emp) => emp.department)),
        ].sort();
        const positionList = [
          ...new Set(data.map((emp) => emp.position)),
        ].sort();
        setDepartments(departmentList);
        setPositions(positionList);
      });
  }, []);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flex: 1,
        p: 2,
      }}
    >
      <TextField
        placeholder="検索キーワードを入力してください"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <RegisterationEmployeeButton />
      <Box sx={{ display: "flex", gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>部署</InputLabel>
          <Select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            label="部署"
          >
            <MenuItem value="">全て</MenuItem>
            {departments.map((department) => (
              <MenuItem key={department} value={department}>
                {department}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>役職</InputLabel>
          <Select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            label="役職"
          >
            <MenuItem value="">全て</MenuItem>
            {positions.map((position) => (
              <MenuItem key={position} value={position}>
                {position}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <EmployeeListContainer
        key="employeesContainer"
        filterText={searchKeyword}
        selectedDepartment={selectedDepartment}
        selectedPosition={selectedPosition}
      />
    </Paper>
  );
}

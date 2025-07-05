"use client";
import { useEffect } from "react";
import useSWR from "swr";
import { isLeft } from "fp-ts/Either";
import { Employee, EmployeeT } from "../models/Employee";
import { useParams } from "next/navigation";
import { EmployeeDetails } from "./EmployeeDetails";

const employeeFetcher = async (url: string): Promise<Employee> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch employee at ${url}`);
  }
  const body = await response.json();
  const decoded = EmployeeT.decode(body);
  if (isLeft(decoded)) {
    throw new Error(`Failed to decode employee ${JSON.stringify(body)}`);
  }
  return decoded.right;
};

export function EmployeeDetailsContainer() {
  const params = useParams<{id: string}>();
  const id = params.id;
  const { data, error, isLoading } = useSWR<Employee, Error>(
    `/api/employees/${id}`,
    employeeFetcher
  );
  useEffect(() => {
    if (error != null) {
      console.error(`Failed to fetch employee ${id}`, error);
    }
  }, [error, id]);
  if (error != null) {
    return (
      <p>
        社員の詳細の取得に失敗しました: {error.message} <br />
      </p>
    );
  }
  if (data != null) {
    return <EmployeeDetails employee={data} />;
  }
  if (isLoading) {
    return <p>Loading employee {id}...</p>;
  }
}

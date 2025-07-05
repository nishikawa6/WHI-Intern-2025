import { EmployeeDetailsContainer } from "@/components/EmployeeDetailsContainer";
import { GlobalContainer } from "@/components/GlobalContainer";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "従業員",
};

export default function EmployeePage() {
  return (
    <GlobalContainer>
      <Suspense>
        <EmployeeDetailsContainer />
      </Suspense>
    </GlobalContainer>
  );
}

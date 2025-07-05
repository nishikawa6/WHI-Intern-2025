import { EmployeeDetailsContainer } from "@/components/EmployeeDetailsContainer";
import { GlobalContainer } from "@/components/GlobalContainer";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "タレントマネジメントシステム - 従業員詳細",
  description: "シンプルなタレントマネジメントシステム",
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

import { EmployeeDetailsContainer } from "@/components/EmployeeDetailsContainer";
import { GlobalContainer } from "@/components/GlobalContainer";
import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "社員詳細",
};

export default function EmployeePage() {
  return (
    <GlobalContainer pageTitle="社員詳細">
      {/* Mark EmployeeDetailsContainer as CSR */}
      <Suspense>
        <button
          style={{
            backgroundColor: "rgb(60, 131, 212)",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          <Link href="/">検索画面へ戻る</Link>
        </button>
        <EmployeeDetailsContainer />
      </Suspense>
    </GlobalContainer>
  );
}

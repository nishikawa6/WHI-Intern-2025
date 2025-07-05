import { EmployeeDetailsContainer } from "@/components/EmployeeDetailsContainer";
import { GlobalContainer } from "@/components/GlobalContainer";
import { Suspense } from 'react';

export default function EmployeePage() {
  return (
    <GlobalContainer pageTitle="社員詳細">
      {/* Mark EmployeeDetailsContainer as CSR */}
      <Suspense>
        <EmployeeDetailsContainer />
      </Suspense>
    </GlobalContainer>
  );
}

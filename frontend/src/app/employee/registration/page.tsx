import { GlobalContainer } from "@/components/GlobalContainer";
import { Suspense } from "react";
import { Metadata } from "next";
import { RegistrationEmployeeContainer } from "@/components/RegistraitionEmployeeContainer";

export const metadata: Metadata = {
  title: "社員登録",
};

export default function RegistrationEmployeePage() {
  return (
    <GlobalContainer pageTitle="社員登録">
      {/* Mark EmployeeDetailsContainer as CSR */}
      <Suspense>
        <RegistrationEmployeeContainer />
      </Suspense>
    </GlobalContainer>
  );
}

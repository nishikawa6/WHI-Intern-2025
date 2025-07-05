import { SearchEmployees } from "../components/SearchEmployees";
import { GlobalContainer } from "@/components/GlobalContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "タレントマネジメントシステム",
  description: "シンプルなタレントマネジメントシステム",
};

export default function Home() {
  return (
    <GlobalContainer>
      <SearchEmployees />
    </GlobalContainer>
  );
}

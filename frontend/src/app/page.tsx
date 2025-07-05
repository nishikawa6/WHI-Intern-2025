import { SearchEmployees } from "../components/SearchEmployees";
import { GlobalContainer } from "@/components/GlobalContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "社員検索",
};

export default function Home() {
  return (
    <GlobalContainer pageTitle="社員検索">
      <SearchEmployees />
    </GlobalContainer>
  );
}

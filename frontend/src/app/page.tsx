import { SearchEmployees } from "../components/SearchEmployees";
import { GlobalContainer } from "@/components/GlobalContainer";

export default function Home() {
  return (
    <GlobalContainer pageTitle="社員検索">
      <SearchEmployees />
    </GlobalContainer>
  );
}

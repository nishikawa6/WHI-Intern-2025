import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { EmployeeListContainer } from "./EmployeeListContainer";
import { Employee } from "../models/Employee";

// SWRをモック
jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// EmployeeListItemをモック
jest.mock("./EmployeeListItem", () => {
  const React = require("react");
  return {
    EmployeeListItem: ({ employee }: { employee: any }) =>
      React.createElement(
        "div",
        { "data-testid": `employee-${employee.id}` },
        `${employee.name} - ${employee.department} - ${employee.position}`
      ),
  };
});

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Jane Doe",
    age: 22,
    department: "エンジニアリング",
    position: "ソフトウェアエンジニア",
  },
  {
    id: "2",
    name: "John Smith",
    age: 28,
    department: "マーケティング",
    position: "マーケティングマネージャー",
  },
  {
    id: "3",
    name: "山田 太郎",
    age: 27,
    department: "デザイン",
    position: "UI/UX デザイナー",
  },
  {
    id: "4",
    name: "田中 花子",
    age: 25,
    department: "エンジニアリング",
    position: "フロントエンドエンジニア",
  },
];

describe("EmployeeListContainer", () => {
  const mockSWR = require("swr").default;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("フィルタリング機能", () => {
    it("部署でフィルタリングできる", async () => {
      mockSWR.mockReturnValue({
        data: mockEmployees,
        error: null,
        isLoading: false,
      });

      render(
        <EmployeeListContainer
          filterText=""
          selectedDepartment="エンジニアリング"
          selectedPosition=""
        />
      );

      await waitFor(() => {
        expect(screen.getByTestId("employee-1")).toBeInTheDocument();
        expect(screen.getByTestId("employee-4")).toBeInTheDocument();
        expect(screen.queryByTestId("employee-2")).not.toBeInTheDocument();
        expect(screen.queryByTestId("employee-3")).not.toBeInTheDocument();
      });
    });

    it("役職でフィルタリングできる", async () => {
      mockSWR.mockReturnValue({
        data: mockEmployees,
        error: null,
        isLoading: false,
      });

      render(
        <EmployeeListContainer
          filterText=""
          selectedDepartment=""
          selectedPosition="ソフトウェアエンジニア"
        />
      );

      await waitFor(() => {
        expect(screen.getByTestId("employee-1")).toBeInTheDocument();
        expect(screen.queryByTestId("employee-2")).not.toBeInTheDocument();
        expect(screen.queryByTestId("employee-3")).not.toBeInTheDocument();
        expect(screen.queryByTestId("employee-4")).not.toBeInTheDocument();
      });
    });

    it("部署と役職の両方でフィルタリングできる", async () => {
      mockSWR.mockReturnValue({
        data: mockEmployees,
        error: null,
        isLoading: false,
      });

      render(
        <EmployeeListContainer
          filterText=""
          selectedDepartment="エンジニアリング"
          selectedPosition="ソフトウェアエンジニア"
        />
      );

      await waitFor(() => {
        expect(screen.getByTestId("employee-1")).toBeInTheDocument();
        expect(screen.queryByTestId("employee-2")).not.toBeInTheDocument();
        expect(screen.queryByTestId("employee-3")).not.toBeInTheDocument();
        expect(screen.queryByTestId("employee-4")).not.toBeInTheDocument();
      });
    });

    it("フィルタ条件がない場合は全ての社員を表示する", async () => {
      mockSWR.mockReturnValue({
        data: mockEmployees,
        error: null,
        isLoading: false,
      });

      render(
        <EmployeeListContainer
          filterText=""
          selectedDepartment=""
          selectedPosition=""
        />
      );

      await waitFor(() => {
        expect(screen.getByTestId("employee-1")).toBeInTheDocument();
        expect(screen.getByTestId("employee-2")).toBeInTheDocument();
        expect(screen.getByTestId("employee-3")).toBeInTheDocument();
        expect(screen.getByTestId("employee-4")).toBeInTheDocument();
      });
    });

    it("存在しない部署でフィルタリングした場合は何も表示されない", async () => {
      mockSWR.mockReturnValue({
        data: mockEmployees,
        error: null,
        isLoading: false,
      });

      render(
        <EmployeeListContainer
          filterText=""
          selectedDepartment="存在しない部署"
          selectedPosition=""
        />
      );

      await waitFor(() => {
        expect(screen.queryByTestId("employee-1")).not.toBeInTheDocument();
        expect(screen.queryByTestId("employee-2")).not.toBeInTheDocument();
        expect(screen.queryByTestId("employee-3")).not.toBeInTheDocument();
        expect(screen.queryByTestId("employee-4")).not.toBeInTheDocument();
      });
    });

    it("存在しない役職でフィルタリングした場合は何も表示されない", async () => {
      mockSWR.mockReturnValue({
        data: mockEmployees,
        error: null,
        isLoading: false,
      });

      render(
        <EmployeeListContainer
          filterText=""
          selectedDepartment=""
          selectedPosition="存在しない役職"
        />
      );

      await waitFor(() => {
        expect(screen.queryByTestId("employee-1")).not.toBeInTheDocument();
        expect(screen.queryByTestId("employee-2")).not.toBeInTheDocument();
        expect(screen.queryByTestId("employee-3")).not.toBeInTheDocument();
        expect(screen.queryByTestId("employee-4")).not.toBeInTheDocument();
      });
    });
  });

  describe("データ取得状態", () => {
    it("データ取得中はローディングメッセージを表示する", () => {
      mockSWR.mockReturnValue({
        data: null,
        error: null,
        isLoading: true,
      });

      render(
        <EmployeeListContainer
          filterText=""
          selectedDepartment=""
          selectedPosition=""
        />
      );

      expect(screen.getByText("Loading employees...")).toBeInTheDocument();
    });

    it("データがnullの場合は何も表示されない", () => {
      mockSWR.mockReturnValue({
        data: null,
        error: null,
        isLoading: false,
      });

      render(
        <EmployeeListContainer
          filterText=""
          selectedDepartment=""
          selectedPosition=""
        />
      );

      expect(screen.queryByText("Loading employees...")).not.toBeInTheDocument();
      expect(screen.queryByTestId(/employee-/)).not.toBeInTheDocument();
    });

    it("エラーが発生した場合は何も表示されない", () => {
      mockSWR.mockReturnValue({
        data: null,
        error: new Error("API Error"),
        isLoading: false,
      });

      render(
        <EmployeeListContainer
          filterText=""
          selectedDepartment=""
          selectedPosition=""
        />
      );

      expect(screen.queryByText("Loading employees...")).not.toBeInTheDocument();
      expect(screen.queryByTestId(/employee-/)).not.toBeInTheDocument();
    });
  });

  describe("SWRの呼び出し", () => {
    it("正しいURLでSWRが呼び出される", () => {
      mockSWR.mockReturnValue({
        data: mockEmployees,
        error: null,
        isLoading: false,
      });

      render(
        <EmployeeListContainer
          filterText="test search"
          selectedDepartment=""
          selectedPosition=""
        />
      );

      expect(mockSWR).toHaveBeenCalledWith(
        "/api/employees?filterText=test%20search",
        expect.any(Function)
      );
    });

    it("特殊文字を含む検索キーワードが正しくエンコードされる", () => {
      mockSWR.mockReturnValue({
        data: mockEmployees,
        error: null,
        isLoading: false,
      });

      render(
        <EmployeeListContainer
          filterText="test & search"
          selectedDepartment=""
          selectedPosition=""
        />
      );

      expect(mockSWR).toHaveBeenCalledWith(
        "/api/employees?filterText=test%20%26%20search",
        expect.any(Function)
      );
    });
  });
}); 
import { EmployeeDatabaseDynamoDB } from "./EmployeeDatabaseDynamoDB";
import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { Employee } from "./Employee";

// DynamoDBClientをモック
jest.mock("@aws-sdk/client-dynamodb");

describe("EmployeeDatabaseDynamoDB", () => {
  let database: EmployeeDatabaseDynamoDB;
  let mockClient: jest.Mocked<DynamoDBClient>;
  const tableName = "test-employee-table";

  beforeEach(() => {
    // モックをリセット
    jest.clearAllMocks();
    
    // DynamoDBClientのモックインスタンスを作成
    mockClient = {
      send: jest.fn(),
    } as any;

    database = new EmployeeDatabaseDynamoDB(mockClient, tableName);
  });

  describe("getEmployee", () => {
    it("存在するIDで社員を取得できる", async () => {
      const mockItem = {
        id: { S: "1" },
        name: { S: "Jane Doe" },
        age: { N: "22" },
        department: { S: "エンジニアリング" },
        position: { S: "ソフトウェアエンジニア" },
      };

      (mockClient.send as jest.Mock).mockResolvedValueOnce({
        Item: mockItem,
      });

      const employee = await database.getEmployee("1");

      expect(mockClient.send).toHaveBeenCalledWith(expect.any(GetItemCommand));

      expect(employee).toEqual({
        id: "1",
        name: "Jane Doe",
        age: 22,
        department: "エンジニアリング",
        position: "ソフトウェアエンジニア",
      });
    });

    it("存在しないIDで検索した場合はundefinedを返す", async () => {
      (mockClient.send as jest.Mock).mockResolvedValueOnce({
        Item: undefined,
      });

      const employee = await database.getEmployee("999");

      expect(employee).toBeUndefined();
    });

    it("必須フィールドが不足している場合はエラーを投げる", async () => {
      const mockItem = {
        id: { S: "1" },
        // nameフィールドが不足
        age: { N: "22" },
      };

      (mockClient.send as jest.Mock).mockResolvedValueOnce({
        Item: mockItem,
      });

      await expect(database.getEmployee("1")).rejects.toThrow(
        "Employee 1 is missing required field 'name'"
      );
    });

    it("departmentとpositionがnullの場合は空文字列として扱う", async () => {
      const mockItem = {
        id: { S: "1" },
        name: { S: "Jane Doe" },
        age: { N: "22" },
        department: { S: null },
        position: { S: null },
      };

      (mockClient.send as jest.Mock).mockResolvedValueOnce({
        Item: mockItem,
      });

      const employee = await database.getEmployee("1");

      expect(employee).toEqual({
        id: "1",
        name: "Jane Doe",
        age: 22,
        department: "",
        position: "",
      });
    });
  });

  describe("getEmployees", () => {
    it("空の検索キーワードで全ての社員を取得できる", async () => {
      const mockItems = [
        {
          id: { S: "1" },
          name: { S: "Jane Doe" },
          age: { N: "22" },
          department: { S: "エンジニアリング" },
          position: { S: "ソフトウェアエンジニア" },
        },
        {
          id: { S: "2" },
          name: { S: "John Smith" },
          age: { N: "28" },
          department: { S: "マーケティング" },
          position: { S: "マーケティングマネージャー" },
        },
      ];

      (mockClient.send as jest.Mock).mockResolvedValueOnce({
        Items: mockItems,
      });

      const employees = await database.getEmployees("");

      expect(mockClient.send).toHaveBeenCalledWith(expect.any(ScanCommand));

      expect(employees).toHaveLength(2);
      expect(employees[0]).toEqual({
        id: "1",
        name: "Jane Doe",
        age: 22,
        department: "エンジニアリング",
        position: "ソフトウェアエンジニア",
      });
      expect(employees[1]).toEqual({
        id: "2",
        name: "John Smith",
        age: 28,
        department: "マーケティング",
        position: "マーケティングマネージャー",
      });
    });

    it("大文字小文字を区別しない検索ができる", async () => {
      const mockItems = [
        {
          id: { S: "1" },
          name: { S: "Jane Doe" },
          age: { N: "22" },
          department: { S: "エンジニアリング" },
          position: { S: "ソフトウェアエンジニア" },
        },
        {
          id: { S: "2" },
          name: { S: "John Smith" },
          age: { N: "28" },
          department: { S: "マーケティング" },
          position: { S: "マーケティングマネージャー" },
        },
      ];

      (mockClient.send as jest.Mock).mockResolvedValueOnce({
        Items: mockItems,
      });

      // "jane"で検索しても"Jane Doe"が見つかる（大文字小文字を区別しない）
      const employees = await database.getEmployees("jane");

      expect(employees).toHaveLength(1);
      expect(employees[0]).toEqual({
        id: "1",
        name: "Jane Doe",
        age: 22,
        department: "エンジニアリング",
        position: "ソフトウェアエンジニア",
      });
    });

    it("名前の部分一致で検索できる", async () => {
      const mockItems = [
        {
          id: { S: "1" },
          name: { S: "Jane Doe" },
          age: { N: "22" },
          department: { S: "エンジニアリング" },
          position: { S: "ソフトウェアエンジニア" },
        },
        {
          id: { S: "2" },
          name: { S: "John Smith" },
          age: { N: "28" },
          department: { S: "マーケティング" },
          position: { S: "マーケティングマネージャー" },
        },
      ];

      (mockClient.send as jest.Mock).mockResolvedValueOnce({
        Items: mockItems,
      });

      const employees = await database.getEmployees("Smith");

      expect(employees).toHaveLength(1);
      expect(employees[0]).toEqual({
        id: "2",
        name: "John Smith",
        age: 28,
        department: "マーケティング",
        position: "マーケティングマネージャー",
      });
    });

    it("存在しない名前で検索した場合は空の配列を返す", async () => {
      const mockItems = [
        {
          id: { S: "1" },
          name: { S: "Jane Doe" },
          age: { N: "22" },
          department: { S: "エンジニアリング" },
          position: { S: "ソフトウェアエンジニア" },
        },
      ];

      (mockClient.send as jest.Mock).mockResolvedValueOnce({
        Items: mockItems,
      });

      const employees = await database.getEmployees("存在しない名前");

      expect(employees).toHaveLength(0);
      expect(employees).toEqual([]);
    });

    it("Itemsがnullの場合は空の配列を返す", async () => {
      (mockClient.send as jest.Mock).mockResolvedValueOnce({
        Items: null,
      });

      const employees = await database.getEmployees("");

      expect(employees).toHaveLength(0);
      expect(employees).toEqual([]);
    });

    it("不正なデータはスキップされる", async () => {
      const mockItems = [
        {
          id: { S: "1" },
          name: { S: "Jane Doe" },
          age: { N: "22" },
          department: { S: "エンジニアリング" },
          position: { S: "ソフトウェアエンジニア" },
        },
        {
          id: { S: "2" },
          // nameフィールドが不足している不正なデータ
          age: { N: "28" },
        },
      ];

      (mockClient.send as jest.Mock).mockResolvedValueOnce({
        Items: mockItems,
      });

      const employees = await database.getEmployees("");

      expect(employees).toHaveLength(1);
      expect(employees[0]).toEqual({
        id: "1",
        name: "Jane Doe",
        age: 22,
        department: "エンジニアリング",
        position: "ソフトウェアエンジニア",
      });
    });

    it("nameフィールドがnullの場合は空文字列として扱う", async () => {
      const mockItems = [
        {
          id: { S: "1" },
          name: { S: null }, // nameがnull
          age: { N: "22" },
          department: { S: "エンジニアリング" },
          position: { S: "ソフトウェアエンジニア" },
        },
      ];

      (mockClient.send as jest.Mock).mockResolvedValueOnce({
        Items: mockItems,
      });

      const employees = await database.getEmployees("test");

      expect(employees).toHaveLength(0);
    });
  });
}); 
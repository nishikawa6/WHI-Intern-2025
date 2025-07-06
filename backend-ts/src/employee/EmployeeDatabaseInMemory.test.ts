import { EmployeeDatabaseInMemory } from "./EmployeeDatabaseInMemory";
import { Employee } from "./Employee";

describe("EmployeeDatabaseInMemory", () => {
  let database: EmployeeDatabaseInMemory;

  beforeEach(() => {
    database = new EmployeeDatabaseInMemory();
  });

  describe("getEmployees", () => {
    it("空の検索キーワードで全ての社員を取得できる", async () => {
      const employees = await database.getEmployees("");
      
      expect(employees).toHaveLength(3);
      expect(employees).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: "1",
            name: "Jane Doe",
            age: 22,
            department: "エンジニアリング",
            position: "ソフトウェアエンジニア",
          }),
          expect.objectContaining({
            id: "2",
            name: "John Smith",
            age: 28,
            department: "マーケティング",
            position: "マーケティングマネージャー",
          }),
          expect.objectContaining({
            id: "3",
            name: "山田 太郎",
            age: 27,
            department: "デザイン",
            position: "UI/UX デザイナー",
          }),
        ])
      );
    });

    it("名前の部分一致で検索できる", async () => {
      const employees = await database.getEmployees("Jane");
      
      expect(employees).toHaveLength(1);
      expect(employees[0]).toEqual({
        id: "1",
        name: "Jane Doe",
        age: 22,
        department: "エンジニアリング",
        position: "ソフトウェアエンジニア",
      });
    });

    it("名前の一部で検索できる", async () => {
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

    it("日本語名で検索できる", async () => {
      const employees = await database.getEmployees("山田");
      
      expect(employees).toHaveLength(1);
      expect(employees[0]).toEqual({
        id: "3",
        name: "山田 太郎",
        age: 27,
        department: "デザイン",
        position: "UI/UX デザイナー",
      });
    });

    it("存在しない名前で検索した場合は空の配列を返す", async () => {
      const employees = await database.getEmployees("存在しない名前");
      
      expect(employees).toHaveLength(0);
      expect(employees).toEqual([]);
    });

    it("大文字小文字を区別して検索する", async () => {
      // "jane"で検索しても"Jane Doe"は見つからない（大文字小文字を区別）
      const employees = await database.getEmployees("jane");
      
      expect(employees).toHaveLength(0);
      expect(employees).toEqual([]);
    });

    it("空文字列で検索した場合は全ての社員を返す", async () => {
      const employees = await database.getEmployees("");
      
      expect(employees).toHaveLength(3);
    });
  });

  describe("getEmployee", () => {
    it("存在するIDで社員を取得できる", async () => {
      const employee = await database.getEmployee("1");
      
      expect(employee).toEqual({
        id: "1",
        name: "Jane Doe",
        age: 22,
        department: "エンジニアリング",
        position: "ソフトウェアエンジニア",
      });
    });

    it("存在しないIDで検索した場合はundefinedを返す", async () => {
      const employee = await database.getEmployee("999");
      
      expect(employee).toBeUndefined();
    });
  });
}); 
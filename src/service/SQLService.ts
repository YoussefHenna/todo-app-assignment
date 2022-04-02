import * as SQLite from "expo-sqlite";

export class SQLService {
  private static instance: SQLService | undefined = undefined;

  static getInstance(): SQLService {
    if (!this.instance) {
      this.instance = new SQLService();
    }
    return this.instance;
  }

  db: SQLite.WebSQLDatabase | undefined = undefined;

  private constructor() {
    this.db = SQLite.openDatabase("db.main");
    this.initTable();
  }

  initTable() {
    this.db!!.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT, item TEXT, groupLabel TEXT, completed INTEGER)",
        [],
        (trans, result) => {},
        (trans, error) => {
          console.log(error);
          return true;
        }
      );
    });
  }

  addItem(item: TodoItem): Promise<void> {
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO todo (item, completed) values (?,?)";
      let args = [item.item, +item.completed];
      if (item.groupLabel) {
        query =
          "INSERT INTO todo (item, groupLabel, completed) values (?, ?,?)";
        args = [item.item, item.groupLabel, +item.completed];
      }
      this.db!!.transaction((tx) => {
        tx.executeSql(
          query,
          args,
          (trans, result) => {
            resolve();
          },
          (trans, error) => {
            console.log(error);
            reject();
            return true;
          }
        );
      });
    });
  }

  updateItemCompleteStatus(item: TodoItem, completed: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db!!.transaction((tx) => {
        tx.executeSql(
          "UPDATE todo SET completed = ? WHERE item = ?",
          [+completed, item.item],
          (trans, result) => {
            resolve();
          },
          (trans, error) => {
            console.log(error);
            reject();
            return true;
          }
        );
      });
    });
  }

  async getAllItems(): Promise<TodoItem[]> {
    return new Promise((resolve, reject) => {
      this.db!!.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM todo",
          [],
          (trans, result) => {
            resolve(result.rows._array as TodoItem[]);
          },
          (trans, error) => {
            console.log(error);
            reject();
            return true;
          }
        );
      });
    });
  }
}

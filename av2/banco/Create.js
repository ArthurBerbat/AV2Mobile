import * as SQLite from 'expo-sqlite';

export const create = async () => {
  try {
    let db = SQLite.openDatabase('databaseName');
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS passwords (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          password TEXT NOT NULL
        );`
      );
    });
    console.log("[LOG] Table created");
    return db;
  } catch (error) {
    console.log(error);
  }
};

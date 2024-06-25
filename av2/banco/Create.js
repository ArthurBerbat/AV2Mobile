import * as SQLite from 'expo-sqlite';

export const create = async () => {
  try {
    let db = SQLite.openDatabase('passwordDB');
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS passwords (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          password TEXT NOT NULL
        );`,
        [],
        () => {
          console.log("[LOG] Table 'passwords' created successfully");
          alert('Table "passwords" created successfully');
        },
        (_, error) => {
          console.log("[LOG] Error creating table 'passwords'", error);
          alert('Error creating table "passwords": ' + error.message);
        }
      );
    });
    return db;
  } catch (error) {
    console.log("[LOG] Error opening database", error);
    alert('Error opening database: ' + error.message);
  }
};

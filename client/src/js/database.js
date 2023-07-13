import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: false });
      console.log("jate database created");
    },
  });

const dbPrmoise = initdb();

export const putDb = async (content) => {
  const db = await dbPrmoise;
  try {
    await db.put('jate', {value: content, id: 1});
  } catch(err) {
    console.log(err)
  }
  console.log("Content added to the database.");
};

export const getDb = async () => {
  const db = await dbPrmoise;
  const content = await db.get('jate', 1);
  return content?.value;
}


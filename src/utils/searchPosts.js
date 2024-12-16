import { db } from "../db/database";
import { collection, query, where, getDocs } from "firebase/firestore";

async function searchPosts(queryText) {
  const postsCollection = collection(db, "blogs");

  // Tạo các query riêng biệt cho từng trường
  const titleQuery = query(
    postsCollection,
    where("title", ">=", queryText),
    where("title", "<=", queryText + "\uf8ff")
  );

  const contentQuery = query(
    postsCollection,
    where("content", ">=", queryText),
    where("content", "<=", queryText + "\uf8ff")
  );

  const categoryQuery = query(
    postsCollection,
    where("category", ">=", queryText),
    where("category", "<=", queryText + "\uf8ff")
  );

  const tagsQuery = query(
    postsCollection,
    where("tags", "array-contains", queryText) // Tìm kiếm trong mảng tags
  );

  // Lấy kết quả từ tất cả các query
  const results = [];

  // Chạy các query
  const querySnapshots = await Promise.all([
    getDocs(titleQuery),
    getDocs(contentQuery),
    getDocs(categoryQuery),
    getDocs(tagsQuery),
  ]);

  querySnapshots.forEach((snapshot) => {
    snapshot.forEach((doc) => {
      results.push(doc.data());
    });
  });

  return results;
}

export default searchPosts;

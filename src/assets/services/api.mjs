export async function getProducts({
  orderBy = "favorite",
  pageSize = 10,
  page = 1,
  searchQuery = "",
}) {
  const query = `orderBy=${orderBy}&pageSize=${pageSize}&page=${page}&keyword=${searchQuery}`;
  const res = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const data = await res.json();
  return data.list;
}

export async function getTotalCount(searchQuery = "") {
  const query = `keyword=${searchQuery}`;
  const res = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const data = await res.json();
  return data.totalCount;
}

export async function getDatabase({
  page = 1,
  order = "recent",
  pageSize = 12,
  searchQuery = "",
}) {
  const query = `page=${page}&order=${order}&pageSize=${pageSize}&keyword=${searchQuery}`;
  try {
    const res = await fetch(
      `https://one-sprint-mission-be-svjo.onrender.com/products?${query}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();

    console.log(data.totalCount);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { error: "Failed to fetch data" };
  }
}

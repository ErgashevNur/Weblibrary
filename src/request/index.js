export async function login(data) {
  const res = await fetch("https://library-1dmu.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(data),
  });
  if (res.status === 200 || res.status === 201) return await res.json();
  if (res.status === 400 || res.status === 401) throw new Error(res.message);
  else throw new Error("Someting went wrong !");
}

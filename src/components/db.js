// FETCH all data
export const fetchTasks = async () => {
  const res = await fetch("http://localhost:5000/tasks");
  const data = await res.json();

  console.log(data);
  return data;
};

// FETCH particular data
export const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`);
  const data = res.json();

  console.log(data);
  return data;
};

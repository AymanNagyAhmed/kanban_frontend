import API from "../api";

const ENDPOINT = "/kanban_columns";
const index = async () => {
  return API.get(ENDPOINT).then((res) => res.data?.data ?? []);
};
const add = async (title: string) => {
  return API.post(ENDPOINT, { title }).then((res) => res.data?.data);
};
const update = async (id: number, title: string) => {
  return API.put(`${ENDPOINT}/${id}`, { title }).then((res) => res.data?.data);
};

const remove = async (id: number) => {
  return API.delete(`${ENDPOINT}/${id}`);
};

export default {
  index,
  add,
  remove,
  update,
};

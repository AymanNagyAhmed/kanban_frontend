import API from "../api";

export type Card = {
  title: string;
  description: string;
  id: number;
  kanban_column_id: number;
};
const ENDPOINT = "/cards";
type Filters = {
  date?: string;
  status?: string;
};
const index = async (filters: Filters): Promise<Array<Card>> => {
  const searchParams = new URLSearchParams(Object.entries(filters));
  return API.get(ENDPOINT + searchParams.toString()).then(
    (res) => res.data?.data ?? []
  );
};
const move = async (card: Card, kanban_column_id: number) => {
  return API.put(`${ENDPOINT}/${card.id}`, {
    ...card,
    kanban_column_id,
  });
};
const add = async (card: {
  title: string;
  description: string;
  kanban_column_id: number;
}) => {
  return API.post(ENDPOINT, {
    ...card,
  }).then((res) => res.data.data);
};
const update = async (id: number, card: Card) => {
  return API.put(`${ENDPOINT}/${id}`, {
    ...card,
  });
};
const remove = async (id: number) => {
  return API.delete(`${ENDPOINT}/${id}`);
};

export default {
  index,
  add,
  move,
  update,
  remove,
};

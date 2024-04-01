export type TCard = {
  front: string;
  back: string;
};

export type TDeck = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  cards: TCard[];
}

export type TApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
}

export type TActions = {
  delete: (_id: string) => void,
  open: (_id: string) => void,
};
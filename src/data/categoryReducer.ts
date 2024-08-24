import { atom } from "jotai";
import { stateAtom } from "src/data/state";
import { persistCategory } from "src/data/dbConnector";
import { Data, Category } from "src/types";
import { v4 as uuidv4 } from 'uuid';

export enum CategoryReducerAction {
  CREATE_CATEGORY = "CREATE_CATEGORY",
  UPDATE_CATEGORY = "UPDATE_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",
}

interface PayloadBase {
  action: CategoryReducerAction;
}

interface CategoryCreatePayload extends PayloadBase {
  action: CategoryReducerAction.CREATE_CATEGORY;
  category: Pick<Category, "name">;
}

interface CategoryUpdatePayload extends PayloadBase  {
  action: CategoryReducerAction.UPDATE_CATEGORY;
  category: Category;
}

interface CategoryDeletePayload extends PayloadBase  {
  action: CategoryReducerAction.DELETE_CATEGORY;
  categoryId: string;
}

type Payload = CategoryCreatePayload | CategoryUpdatePayload | CategoryDeletePayload;

const categoryCreate = (prevState: Data, payload: CategoryCreatePayload) => {
  const newCategory = {
    id: uuidv4(),
    ...payload.category,
    sets: []
  }
  persistCategory(newCategory);
  return {
    ...prevState,
    categories: [
      ...prevState.categories,
      newCategory
    ]
  };
}

const categoryUpdate = (prevState: Data, payload: CategoryUpdatePayload) => {
  persistCategory(payload.category, payload.category.id);
  return {
    ...prevState,
    categories: prevState.categories.map((category) => {
      if (category.id !== payload.category.id) {
        return category;
      }
      return payload.category
    })
  };
}

const categoryDelete = (prevState: Data, payload: CategoryDeletePayload) => {
  return {
    ...prevState,
    categories: prevState.categories.filter(({ name }) => name !== payload.categoryId)
  };
}

const categoryReducer = (prevState: Data, payload: Payload): Data => {
  switch (payload.action) {
    case CategoryReducerAction.CREATE_CATEGORY:
      return categoryCreate(prevState, payload);
    case CategoryReducerAction.UPDATE_CATEGORY:
      return categoryUpdate(prevState, payload);
    case CategoryReducerAction.DELETE_CATEGORY:
      return categoryDelete(prevState, payload);
    default:
      return prevState;
  }
}

export const categoriesAtom = atom(
  (get) => get(stateAtom).categories,
  (get, set, action: Payload) => {
    set(stateAtom, categoryReducer(get(stateAtom), action))
  }
);

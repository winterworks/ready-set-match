import { atom } from "jotai";
import { stateAtom } from "src/data/state";
import { persistCategory } from "src/data/dbConnector";
import { Data, Category } from "src/types";

export enum CategoryReducerAction {
  CREATE_CATEGORY = "CREATE_CATEGORY",
  UPDATE_CATEGORY = "UPDATE_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",
}

export type NewCategory = Pick<Category, "name">;

interface PayloadBase {
  action: CategoryReducerAction;
  categoryId: string;
}

interface CategoryCreatePayload extends PayloadBase {
  action: CategoryReducerAction.CREATE_CATEGORY;
  category: NewCategory;
}

interface CategoryUpdatePayload extends PayloadBase  {
  action: CategoryReducerAction.UPDATE_CATEGORY;
  category: Category;

  oldCategoryId?: string;
}

interface CategoryDeletePayload extends PayloadBase  {
  action: CategoryReducerAction.DELETE_CATEGORY;
  categoryId: string;
}

type Payload = CategoryCreatePayload | CategoryUpdatePayload | CategoryDeletePayload;

const categoryCreate = (prevState: Data, payload: CategoryCreatePayload) => {
  const newCategory = {
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
  persistCategory(payload.category, payload.categoryId);
  return {
    ...prevState,
    categories: prevState.categories.map((category) => {
      if (category.name !== payload.categoryId) {
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

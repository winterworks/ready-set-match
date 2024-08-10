import { atom } from "jotai";
import { stateAtom } from "src/data/state";
import { Data, Category, Categories } from "src/types";

export enum CategoryReducerAction {
  CREATE_CATEGORY = "CREATE_CATEGORY",
  UPDATE_CATEGORY = "UPDATE_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",
}

export type NewCategory = Pick<Category, "name" | "icon">;

interface PayloadBase {
  action: CategoryReducerAction;
  categoryId: string;
}

interface CategoryAddPayload extends PayloadBase {
  action: CategoryReducerAction.CREATE_CATEGORY;
  category: NewCategory;
}

interface CategoryUpdatePayload extends PayloadBase  {
  action: CategoryReducerAction.UPDATE_CATEGORY;
  category: Category;
}

interface CategoryDeletePayload extends PayloadBase  {
  action: CategoryReducerAction.DELETE_CATEGORY;
  categoryId: string;
}

type Payload = CategoryAddPayload | CategoryUpdatePayload | CategoryDeletePayload;

const categoryReducer = (prevState: Data, payload: Payload): Data => {
  switch (payload.action) {
    case CategoryReducerAction.CREATE_CATEGORY: {
      const newCategory = {
        ...payload.category,
        sets: []
      }
      return {
        ...prevState,
        categories: {
          ...prevState.categories,
          [newCategory.name]: newCategory
        }
      };
    }
    case CategoryReducerAction.UPDATE_CATEGORY:
      return {
        ...prevState,
        categories: {
          ...prevState.categories,
          [payload.categoryId]: payload.category
        }
      };
    case CategoryReducerAction.DELETE_CATEGORY:{
      const filteredCategories: Categories = {};
      Object.keys(prevState.categories).forEach((key) => {
        if (key !== payload.categoryId) {
          filteredCategories[key] = prevState.categories[key];
        }
      });
      return {
        ...prevState,
        categories: filteredCategories
      };
    }
    default:
      return prevState;
  }
}

export const categoryAtom = atom(
  (get) => (categoryId: string): Category | undefined => get(stateAtom).categories[categoryId],
  (get, category, action: Payload) => {
    category(stateAtom, categoryReducer(get(stateAtom), action))
  }
);


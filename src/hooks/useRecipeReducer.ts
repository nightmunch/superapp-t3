import { useReducer } from "react";

export enum RecipeActionKind {
  SET_TITLE = "title",
  SET_DESCRIPTION = "description",
  SET_INGREDIENT = "ingredient",
  SET_STEP = "step",
  CLEAR_ALL = "clear_all",
}

// An interface for our actions
export interface RecipeAction {
  type: RecipeActionKind;
  payload: string;
}

// An interface for our state
export interface RecipeState {
  title: string;
  description: string;
  ingredient: string;
  step: string;
}

export function useRecipeReducer() {
  // initial state of the database
  const initialState = {
    title: "",
    description: "",
    ingredient: `<ul>
            <li>Ingredient 2</li>
            <li>Ingredient 2</li>
            <li>Ingredient 3</li>
            </ul>`,
    step: `<ol>
            <li>Step 1</li>
            <li>Step 2</li>
            <li>Step 3</li>
            </ol>`,
  };

  function reducer(state: RecipeState, action: RecipeAction) {
    const { type, payload } = action;

    if (type == RecipeActionKind.CLEAR_ALL) {
      return initialState;
    } else {
      return { ...state, [type]: payload };
    }
  }

  return useReducer(reducer, initialState);
}

import type { Dispatch, SetStateAction } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "../MenuBar";
import type { RecipeAction, RecipeState } from "../../hooks/useRecipeReducer";
import { RecipeActionKind } from "../../hooks/useRecipeReducer";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dispatch: Dispatch<RecipeAction>;
  state: RecipeState;
  onSubmit: () => void;
};

export const ModalAdd = ({
  isOpen,
  setIsOpen,
  dispatch,
  state,
  onSubmit,
}: Props) => {
  const ingredients = useEditor({
    extensions: [StarterKit],
    // intial content
    content: state.ingredient,
    editorProps: {
      attributes: {
        class: "textarea textarea-bordered pl-2 mt-2 border rounded-md",
      },
    },
    onUpdate: ({ editor }) => {
      dispatch({
        type: RecipeActionKind.SET_INGREDIENT,
        payload: editor.getHTML(),
      });
    },
  });
  const steps = useEditor({
    extensions: [StarterKit],
    // intial content
    content: state.step,
    editorProps: {
      attributes: {
        class: "textarea textarea-bordered pl-2 mt-2 border rounded-md",
      },
    },
    onUpdate: ({ editor }) => {
      dispatch({
        type: RecipeActionKind.SET_STEP,
        payload: editor.getHTML(),
      });
    },
  });

  return (
    <>
      <input type="checkbox" className="modal-toggle" />
      <div
        className={`modal ${isOpen ? "modal-open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsOpen(false);
          }
        }}
      >
        <div className="modal-box">
          <div className="flex flex-row-reverse">
            <button
              className="btn-sm btn-circle btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              ✕
            </button>
            <h1 className="grow text-xl font-semibold text-primary">
              Add Recipe
            </h1>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="title..burp"
                className="input-bordered input input-md w-full"
                value={state.title}
                onChange={(e) => {
                  dispatch({
                    type: RecipeActionKind.SET_TITLE,
                    payload: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                placeholder="description..burp"
                className="input-bordered input input-md w-full"
                value={state.description}
                onChange={(e) => {
                  dispatch({
                    type: RecipeActionKind.SET_DESCRIPTION,
                    payload: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Ingredients</span>
              </label>
              <MenuBar editor={ingredients} />
              <EditorContent editor={ingredients} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Steps</span>
              </label>
              <MenuBar editor={steps} />
              <EditorContent editor={steps} />
            </div>
            <button className="btn-primary input btn" onClick={onSubmit}>
              Add Recipe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

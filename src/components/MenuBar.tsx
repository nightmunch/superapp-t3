export const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="hide-scroll flex gap-2 overflow-x-auto">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`btn-ghost btn-sm btn ${
            editor.isActive("bold") ? "btn-active" : ""
          }`}
        >
          bold
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`btn-ghost btn-sm btn ${
            editor.isActive("heading", { level: 1 }) ? "btn-active" : ""
          }`}
        >
          h1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`btn-ghost btn-sm btn ${
            editor.isActive("bulletList") ? "btn-active" : ""
          }`}
        >
          bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`btn-ghost btn-sm btn ${
            editor.isActive("orderedList") ? "btn-active" : ""
          }`}
        >
          ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="btn-ghost btn-sm btn"
        >
          undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="btn-ghost btn-sm btn"
        >
          redo
        </button>
      </div>
    </>
  );
};

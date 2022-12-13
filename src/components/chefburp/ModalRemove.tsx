import { BiErrorCircle } from "react-icons/bi";
import { trpc } from "../../utils/trpc";
import Router from "next/router";
import toast from "react-hot-toast";

type Props = {
  htmlfor: string;
  title: string;
  description: string;
  buttonTitle: string;
  id: string;
  alertMessage: string;
};

export const ModalRemove = ({
  htmlfor,
  title,
  description,
  buttonTitle,
  id,
  alertMessage,
}: Props) => {
  const deleteRecipe = trpc.recipe.delete.useMutation({
    onSuccess: () => {
      // Back
      setTimeout(() => {
        toast.success(alertMessage);
        Router.push("/chefburp");
      }, 500);
    },
  });
  return (
    <>
      <input type="checkbox" id={htmlfor} className="modal-toggle" />
      <label htmlFor={htmlfor} className="modal cursor-pointer">
        <div className="modal-box">
          <div className="modal-action m-5 flex-col items-center gap-5">
            <BiErrorCircle size={100} className="text-error" />
            <h1 className="text-2xl text-error">{title}</h1>
            <span>{description}</span>
            <label
              htmlFor={htmlfor}
              className="btn-error btn"
              onClick={async () => {
                await deleteRecipe.mutateAsync({ id });
              }}
            >
              {buttonTitle}
            </label>
          </div>
        </div>
      </label>
    </>
  );
};

import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { ApplicationHeader } from "../../components/ApplicationHeader";
import { ModalAdd } from "../../components/chefburp/ModalAdd";
import { useRecipeReducer } from "../../hooks/useRecipeReducer";
import { trpc } from "../../utils/trpc";

const ChefBurp: NextPage = () => {
  const [searchBar, setSearchBar] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [handleAddModal, setHandleAddModal] = useState(false);
  const [recipeState, recipeDispatch] = useRecipeReducer();

  const recipeQuery = trpc.recipe.list.useQuery({ search });

  const addRecipe = trpc.recipe.create.useMutation({
    onSuccess: () => {
      recipeQuery.refetch();
    },
  });

  useEffect(() => {
    const timeOutId = setTimeout(() => setSearch(searchBar), 500);
    return () => clearTimeout(timeOutId);
  }, [searchBar]);

  const [parent] = useAutoAnimate<HTMLDivElement>();
  return (
    <>
      <ApplicationHeader
        application={{
          title: "Chef Burp",
          description:
            "Community-based recipe library to find your favourite recipe. Burp!",
        }}
      />
      <div className="card bg-neutral text-neutral-content">
        <div className="card-body flex-row items-center">
          <input
            type="text"
            name="searchbar"
            id="searchbar"
            className="input input-sm grow"
            placeholder="...food. burp."
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
          />
          <div className="tooltip" data-tip="Add Recipe">
            <button
              className="btn-ghost btn"
              onClick={() => setHandleAddModal(true)}
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2" ref={parent}>
        {recipeQuery.data?.map((item) => (
          <RecipeCard
            key={item.id}
            title={item.title}
            description={item.description}
            id={item.id}
          />
        ))}
      </div>
      <ModalAdd
        state={recipeState}
        dispatch={recipeDispatch}
        isOpen={handleAddModal}
        setIsOpen={setHandleAddModal}
        onSubmit={() => {
          addRecipe.mutateAsync(recipeState);
          setHandleAddModal(false);
          toast.success("Recipe has successfully added!");
        }}
      />
    </>
  );
};

export default ChefBurp;

type RecipeCardType = {
  title: string;
  description: string | null;
  id: string;
};

const RecipeCard = ({ title, description, id }: RecipeCardType) => {
  return (
    <Link href={`/chefburp/${id}`}>
      <div className="card bg-neutral hover:border hover:border-primary">
        <div className="card-body">
          <h1 className="text-lg font-semibold capitalize text-primary">
            {title}
          </h1>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};

import type { NextPage } from "next";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { formatDate, separator } from "../../helpers/helpers";
import MoneyTrackLayout from "../../layouts/MoneyTrackLayout";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Modal } from "../../components/Modal";
import { Form } from "../../components/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { trpc } from "../../utils/trpc";
import type { Claim as ClaimsProps } from "@prisma/client";
import { useSession } from "next-auth/react";

const Claim: NextPage = () => {
  const { data: sessionData } = useSession();

  const [selectedID, setSelectedID] = useState<string>("");
  const [handleAddModal, setHandleAddModal] = useState(false);
  const [handleDeleteModal, setHandleDeleteModal] = useState(false);
  const [handleShowModal, setHandleShowModal] = useState(false);

  const claims = trpc.claim.listall.useQuery({
    userId: sessionData?.user?.id ?? "cl5qwgu6k0015zwv8jt19n94s",
  });

  const addClaims = trpc.claim.create.useMutation({
    onSuccess: () => {
      claims.refetch();
    },
  });

  const updateClaims = trpc.claim.update.useMutation({
    onSuccess: () => {
      claims.refetch();
    },
  });

  const deleteClaims = trpc.claim.delete.useMutation({
    onSuccess: () => {
      claims.refetch();
    },
  });

  const showClaims = trpc.claim.show.useQuery({
    id: selectedID,
  });

  const initialValues = {
    item: {
      type: "text",
      placeholder: "Mekdi",
    },
    amount: {
      type: "number",
      placeholder: "10.00",
    },
    date: {
      type: "date",
      placeholder: new Date(),
    },
  };

  const initialShowValues = {
    item: {
      type: "text",
      placeholder: "Mekdi",
      currentValue: showClaims.data?.item,
    },
    amount: {
      type: "number",
      placeholder: "10.00",
      currentValue: showClaims.data?.amount,
    },
    date: {
      type: "date",
      placeholder: new Date(),
      currentValue: showClaims.data?.date,
    },
  };

  const formSchema = z.object({
    item: z.string().min(1),
    amount: z.number().positive().min(1),
    date: z.date(),
  });

  type formType = z.infer<typeof formSchema>;

  const useAddFormReturn = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  const useShowFormReturn = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  return (
    <MoneyTrackLayout>
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold text-primary">Claim List</h1>
        <div className="flex flex-row-reverse gap-2">
          <div className="tooltip" data-tip="Add Claim">
            <button
              className="btn-ghost btn"
              onClick={() => setHandleAddModal(true)}
            >
              <FaPlus />
            </button>
          </div>
        </div>
        <Table
          data={claims.data}
          setIsOpen={setHandleDeleteModal}
          setIsShow={setHandleShowModal}
          setSelectedID={setSelectedID}
        />
        <Modal
          type="form"
          title="Claim"
          isOpen={handleShowModal}
          setIsOpen={setHandleShowModal}
          haveCloseButton={true}
        >
          <Form<typeof initialShowValues, formType>
            initialValues={initialShowValues}
            onSubmit={(data: formType) => {
              updateClaims.mutateAsync({
                id: selectedID,
                item: data.item,
                amount: data.amount,
                date: data.date,
              });
              useShowFormReturn.reset();
              setHandleShowModal(false);
              toast.success("Claim is successfully updated!");
            }}
            submitButton="Update Claim"
            useFormReturn={useShowFormReturn}
          />
        </Modal>
        <Modal
          type="form"
          title="Add Claim"
          isOpen={handleAddModal}
          setIsOpen={setHandleAddModal}
          haveCloseButton={true}
        >
          <Form<typeof initialValues, formType>
            initialValues={initialValues}
            onSubmit={(data: formType) => {
              addClaims.mutateAsync({
                userId: sessionData?.user?.id ?? "cl5qwgu6k0015zwv8jt19n94s",
                item: data.item,
                amount: data.amount,
                date: data.date,
              });
              useAddFormReturn.reset();
              setHandleAddModal(false);
              toast.success("Claim is successfully added!");
            }}
            submitButton="Add Claim"
            useFormReturn={useAddFormReturn}
          />
        </Modal>
        <Modal
          type="confirmation"
          title="Delete this claim?"
          description="Are you sure you want to delete this claim?"
          isOpen={handleDeleteModal}
          setIsOpen={setHandleDeleteModal}
          haveCloseButton={false}
          onConfirm={() => {
            if (selectedID) {
              deleteClaims.mutateAsync({ id: selectedID });
              setSelectedID("");
            }
            setHandleDeleteModal(false);
            toast.success("Claim is successfully deleted!");
          }}
        />
      </div>
    </MoneyTrackLayout>
  );
};

export default Claim;

const Table = ({
  data,
  setIsOpen,
  setIsShow,
  setSelectedID,
}: {
  data: ClaimsProps[] | undefined;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  setSelectedID: Dispatch<SetStateAction<string>>;
}) => {
  const [parentTBody] = useAutoAnimate<HTMLTableSectionElement>();
  const sum = data?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );
  return (
    <div className="overflow-x-auto">
      <table className="table-zebra table w-full table-auto">
        <thead>
          <tr>
            <td></td>
            <td>Item</td>
            <td>Amount</td>
            <td>Date</td>
            <td className="text-center">Action</td>
          </tr>
        </thead>
        <tbody ref={parentTBody}>
          {data?.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                <small>
                  Press{" "}
                  <kbd className="kbd">
                    <FaPlus />
                  </kbd>{" "}
                  to add one.
                </small>
              </td>
            </tr>
          ) : (
            data?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <div
                    className="flex flex-col"
                    onClick={() => {
                      setSelectedID(item.id);
                      setIsShow(true);
                    }}
                  >
                    <div className="pb-1">{item.item}</div>
                  </div>
                </td>
                <td>RM {separator(item.amount.toFixed(2))}</td>
                <td>{formatDate(item.date)}</td>
                <td className="text-center">
                  <div className="tooltip" data-tip="Delete Claim">
                    <button
                      className="btn-ghost btn"
                      onClick={() => {
                        setSelectedID(item.id);
                        setIsOpen(true);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
          {sum ? (
            <tr>
              <th></th>
              <th className="text-primary">Total</th>
              <th className="text-primary">RM {separator(sum.toFixed(2))}</th>
              <th></th>
              <th></th>
            </tr>
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

import type { NextPage } from "next";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  getTextColor,
  networthcategories,
  separator,
} from "../../helpers/helpers";
import MoneyTrackLayout from "../../layouts/MoneyTrackLayout";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Modal } from "../../components/Modal";
import { Form } from "../../components/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { trpc } from "../../utils/trpc";
import type { NetWorth as NetWorthProps } from "@prisma/client";
import { useSession } from "next-auth/react";

const NetWorth: NextPage = () => {
  const { data: sessionData } = useSession();

  const [selectedID, setSelectedID] = useState<string>("");
  const [handleAddModal, setHandleAddModal] = useState(false);
  const [handleDeleteModal, setHandleDeleteModal] = useState(false);
  const [handleShowModal, setHandleShowModal] = useState(false);

  const networths = trpc.networth.listall.useQuery({
    userId: sessionData?.user?.id ?? "cl5qwgu6k0015zwv8jt19n94s",
  });

  const addNetWorths = trpc.networth.create.useMutation({
    onSuccess: () => {
      networths.refetch();
    },
  });

  const updateNetWorths = trpc.networth.update.useMutation({
    onSuccess: () => {
      networths.refetch();
    },
  });

  const deleteNetWorths = trpc.networth.delete.useMutation({
    onSuccess: () => {
      networths.refetch();
    },
  });

  const showNetWorths = trpc.networth.show.useQuery({
    id: selectedID,
  });

  const initialValues = {
    item: {
      type: "text",
      placeholder: "Bank Islam",
    },
    amount: {
      type: "number",
      placeholder: "10.00",
    },
    currency: {
      type: "select",
      placeholder: "Select Currency",
      options: [{ category: "RM" }, { category: "ETH" }],
    },
    category: {
      type: "select",
      placeholder: "Select Category",
      options: networthcategories,
    },
    remarks: {
      type: "text",
      placeholder: "To the moon! 🌙",
    },
  };

  const initialShowValues = {
    item: {
      type: "text",
      placeholder: "Bank Islam",
      currentValue: showNetWorths.data?.item,
    },
    amount: {
      type: "number",
      placeholder: "10.00",
      currentValue: showNetWorths.data?.amount,
    },
    currency: {
      type: "select",
      placeholder: "Select Currency",
      options: [{ category: "RM" }, { category: "ETH" }],
      currentValue: showNetWorths.data?.currency,
    },
    category: {
      type: "select",
      placeholder: "Select Category",
      options: [{ category: "Bank" }, { category: "Investment" }],
      currentValue: showNetWorths.data?.category,
    },
    remarks: {
      type: "text",
      placeholder: "To the moon! 🌙",
      currentValue: showNetWorths.data?.remarks,
    },
  };

  const formSchema = z.object({
    item: z.string().min(1),
    amount: z.number().positive().min(1),
    category: z.string().min(1),
    currency: z.string().min(1),
    remarks: z.string().optional(),
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
        <h1 className="text-xl font-semibold text-primary">Net Worth</h1>
        <div className="flex flex-row-reverse gap-2">
          <div className="tooltip" data-tip="Add Net Worth">
            <button
              className="btn-ghost btn"
              onClick={() => setHandleAddModal(true)}
            >
              <FaPlus />
            </button>
          </div>
        </div>
        <Table
          data={networths.data}
          setIsOpen={setHandleDeleteModal}
          setIsShow={setHandleShowModal}
          setSelectedID={setSelectedID}
        />
        <Modal
          type="form"
          title="Net Worth"
          isOpen={handleShowModal}
          setIsOpen={setHandleShowModal}
          haveCloseButton={true}
        >
          <Form<typeof initialShowValues, formType>
            initialValues={initialShowValues}
            onSubmit={(data: formType) => {
              updateNetWorths.mutateAsync({
                id: selectedID,
                item: data.item,
                amount: data.amount,
                currency: data.currency,
                category: data.category,
                remarks: data.remarks,
              });
              useShowFormReturn.reset();
              setHandleShowModal(false);
              toast.success("Net Worth is successfully updated!");
            }}
            submitButton="Update Net Worth"
            useFormReturn={useShowFormReturn}
          />
        </Modal>
        <Modal
          type="form"
          title="Add Net Worth"
          isOpen={handleAddModal}
          setIsOpen={setHandleAddModal}
          haveCloseButton={true}
        >
          <Form<typeof initialValues, formType>
            initialValues={initialValues}
            onSubmit={(data: formType) => {
              addNetWorths.mutateAsync({
                userId: sessionData?.user?.id ?? "cl5qwgu6k0015zwv8jt19n94s",
                item: data.item,
                amount: data.amount,
                currency: data.currency,
                category: data.category,
                remarks: data.remarks,
              });
              useAddFormReturn.reset();
              setHandleAddModal(false);
              toast.success("Net Worth is successfully added!");
            }}
            submitButton="Add Net Worth"
            useFormReturn={useAddFormReturn}
          />
        </Modal>
        <Modal
          type="confirmation"
          title="Delete this net worth?"
          description="Are you sure you want to delete this claim?"
          isOpen={handleDeleteModal}
          setIsOpen={setHandleDeleteModal}
          haveCloseButton={false}
          onConfirm={() => {
            if (selectedID) {
              deleteNetWorths.mutateAsync({ id: selectedID });
              setSelectedID("");
            }
            setHandleDeleteModal(false);
            toast.success("Net Worth is successfully deleted!");
          }}
        />
      </div>
    </MoneyTrackLayout>
  );
};

export default NetWorth;

const Table = ({
  data,
  setIsOpen,
  setIsShow,
  setSelectedID,
}: {
  data: NetWorthProps[] | undefined;
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
            <td>Bank/Investment</td>
            <td>Amount</td>
            <td>Remarks</td>
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
                    <div
                      className="badge text-xs"
                      style={{
                        backgroundColor: `${
                          networthcategories.find((x) => {
                            return x.category == item.category;
                          })?.color
                        }`,
                        color: `${getTextColor(
                          networthcategories.find((x) => {
                            return x.category == item.category;
                          })?.color as string,
                          "#181A20",
                          "#C8CDDA"
                        )}`,
                      }}
                    >
                      {item.category}
                    </div>
                  </div>
                </td>
                <td>
                  {item.currency} {separator(item.amount.toFixed(2))}
                </td>
                <td>{item.remarks}</td>
                <td className="text-center">
                  <div className="tooltip" data-tip="Delete Net Worth">
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

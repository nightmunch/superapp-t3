import type { NextPage } from "next/types";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { categories, months } from "../../helpers/helpers";
import MoneyTrackLayout from "../../layouts/MoneyTrackLayout";
import { Modal } from "../../components/Modal";
import { Form } from "../../components/Form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { trpc } from "../../utils/trpc";
import { Table } from "../../components/moneytrack/TransactionsTable";
import { useSession } from "next-auth/react";

const Transactions: NextPage = () => {
  const { data: sessionData } = useSession();

  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedID, setSelectedID] = useState<string>("");
  const [handleAddModal, setHandleAddModal] = useState(false);
  const [handleDeleteModal, setHandleDeleteModal] = useState(false);
  const [handleShowModal, setHandleShowModal] = useState(false);

  const transactions = trpc.transactions.listbymonth.useQuery({
    userId: sessionData?.user?.id ?? "cl5qwgu6k0015zwv8jt19n94s",
    month: selectedMonth,
  });

  const showTransactions = trpc.transactions.show.useQuery({
    id: selectedID,
  });

  const addTransactions = trpc.transactions.create.useMutation({
    onSuccess: () => {
      transactions.refetch();
      showTransactions.refetch();
    },
  });

  const updateTransactions = trpc.transactions.update.useMutation({
    onSuccess: () => {
      transactions.refetch();
      showTransactions.refetch();
    },
  });

  const deleteTransactions = trpc.transactions.delete.useMutation({
    onSuccess: () => {
      transactions.refetch();
      showTransactions.refetch();
    },
  });

  const initialValues = {
    expense: {
      type: "text",
      placeholder: "Mekdi",
    },
    amount: {
      type: "number",
      placeholder: "10.00",
    },
    category: {
      type: "select",
      placeholder: "Select Category",
      options: categories,
    },
    remarks: {
      type: "text",
      placeholder: "Noice Food!",
    },
    date: {
      type: "date",
      placeholder: new Date(),
    },
  };

  const initialShowValues = {
    expense: {
      type: "text",
      placeholder: "Mekdi",
      currentValue: showTransactions.data?.item,
    },
    amount: {
      type: "number",
      placeholder: "10.00",
      currentValue: showTransactions.data?.amount,
    },
    category: {
      type: "select",
      placeholder: "Select Category",
      currentValue: showTransactions.data?.category,
      options: categories,
    },
    remarks: {
      type: "text",
      placeholder: "Noice Food!",
      currentValue: showTransactions.data?.remarks,
    },
    date: {
      type: "date",
      placeholder: new Date(),
      currentValue: showTransactions.data?.date,
    },
  };

  const formSchema = z.object({
    expense: z.string().min(1),
    amount: z.number().positive().min(1),
    category: z.string().min(1),
    remarks: z.string().optional(),
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
    <>
      <MoneyTrackLayout>
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-semibold text-primary">Transactions</h1>
          <div className="flex gap-2">
            <select
              className="select-bordered select grow"
              defaultValue={currentMonth}
              onChange={(e) => {
                setSelectedMonth(Number(e.target.value));
              }}
            >
              <option disabled value={0}>
                Select Month
              </option>
              {months.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <div className="tooltip" data-tip="Add Transaction">
              <button
                className="btn-ghost btn"
                onClick={() => setHandleAddModal(true)}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <Table
            data={transactions.data}
            setIsOpen={setHandleDeleteModal}
            setIsShow={setHandleShowModal}
            setSelectedID={setSelectedID}
          />
        </div>
        <Modal
          type="form"
          title="Transaction"
          isOpen={handleShowModal}
          setIsOpen={setHandleShowModal}
          haveCloseButton={true}
        >
          <Form<typeof initialShowValues, formType>
            initialValues={initialShowValues}
            onSubmit={(data: formType) => {
              updateTransactions.mutateAsync({
                id: selectedID,
                item: data.expense,
                amount: data.amount,
                category: data.category,
                remarks: data.remarks,
                date: data.date,
              });
              setHandleShowModal(false);
              toast.success("Transaction is successfully updated!");
            }}
            submitButton="Update Transaction"
            useFormReturn={useShowFormReturn}
          />
        </Modal>
        <Modal
          type="form"
          title="Add Transaction"
          isOpen={handleAddModal}
          setIsOpen={setHandleAddModal}
          haveCloseButton={true}
        >
          <Form<typeof initialValues, formType>
            initialValues={initialValues}
            onSubmit={(data: formType) => {
              addTransactions.mutateAsync({
                userId: sessionData?.user?.id ?? "cl5qwgu6k0015zwv8jt19n94s",
                item: data.expense,
                amount: data.amount,
                category: data.category,
                date: data.date,
                remarks: data.remarks,
              });
              useAddFormReturn.reset();
              setHandleAddModal(false);
              toast.success("Transaction is successfully added!");
            }}
            submitButton="Add Transaction"
            useFormReturn={useAddFormReturn}
          />
        </Modal>
        <Modal
          type="confirmation"
          title="Delete this transaction?"
          description="Are you sure you want to delete this transaction?"
          isOpen={handleDeleteModal}
          setIsOpen={setHandleDeleteModal}
          haveCloseButton={false}
          onConfirm={() => {
            if (selectedID) {
              deleteTransactions.mutateAsync({ id: selectedID });
              setSelectedID("");
            }
            setHandleDeleteModal(false);
            toast.success("Transaction is successfully deleted!");
          }}
        />
        {/* TODO:
        [] Different type of Modal 
          [x] Form
          [x] Confirmation (Warning)
          [] Confirmation
          [] Basic
        */}
      </MoneyTrackLayout>
    </>
  );
};

export default Transactions;

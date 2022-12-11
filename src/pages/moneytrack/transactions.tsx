import type { NextPage } from "next/types";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import { months } from "../../helpers/helpers";
import MoneyTrackLayout from "../../layouts/MoneyTrackLayout";
import { Modal } from "../../components/Modal";

import { Form } from "../../components/Form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const Transactions: NextPage = () => {
  const currentMonth = new Date().getMonth() + 1;
  const [, setSelectedMonth] = useState<number>(currentMonth);
  const [handleAddModal, setHandleAddModal] = useState(false);
  const [handleDeleteModal, setHandleDeleteModal] = useState(false);

  const initialValues = {
    expense: {
      placeholder: "Example: Breakfast",
    },
    remarks: {
      placeholder: "Example: Noice Food",
    },
  };

  const formSchema = z.object({
    expense: z
      .string()
      .min(1)
      .regex(/^[\d]*\.?[\d]{0,2}$/),
    remarks: z.string().min(1),
  });

  const useFormReturn = useForm<typeof initialValues>({
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
                onClick={() => setHandleDeleteModal(true)}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <td></td>
                <td>Item</td>
                <td>Amount</td>
                <td>Date</td>
                <td className="text-center">Action</td>
              </tr>
            </thead>
          </table>
        </div>
        <Modal
          title="Add Transactions"
          isOpen={handleAddModal}
          setIsOpen={setHandleAddModal}
          haveCloseButton={true}
        >
          <Form<typeof initialValues>
            initialValues={initialValues}
            onSubmit={() => {
              useFormReturn.reset();
              toast.success("Transaction is successfully added!");
              setHandleAddModal(false);
            }}
            submitButton="Add Transactions"
            useFormReturn={useFormReturn}
          />
        </Modal>
        <Modal
          isOpen={handleDeleteModal}
          setIsOpen={setHandleDeleteModal}
          haveCloseButton={false}
        >
          <div className="modal-action m-5 flex-col items-center gap-5">
            <BiErrorCircle size={100} className="text-error" />
            <h1 className="text-2xl text-error">Delete this transaction?</h1>
            <span>Are you sure you want to delete this transaction?</span>
            <button
              className="btn-error btn"
              onClick={() => {
                toast.error("Transaction is successfully deleted!");
                setHandleDeleteModal(false);
              }}
            >
              Delete
            </button>
          </div>
        </Modal>
        {/* TODO:
        [] Different type of Modal 
          [] Form
          [] Confirmation
          [] Basic
        */}
      </MoneyTrackLayout>
    </>
  );
};

export default Transactions;

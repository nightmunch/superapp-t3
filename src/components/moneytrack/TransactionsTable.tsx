import type { Dispatch, SetStateAction } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import type { Transactions as TransactionsProps } from "@prisma/client";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  categories,
  formatDate,
  getTextColor,
  separator,
} from "../../helpers/helpers";

export const Table = ({
  data,
  setIsOpen,
  setIsShow,
  setSelectedID,
}: {
  data: TransactionsProps[] | undefined;
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
            <td className="hidden sm:table-cell">Amount</td>
            <td className="hidden sm:table-cell">Date</td>
            <td className="text-center">Action</td>
          </tr>
        </thead>
        <tbody ref={parentTBody}>
          {data?.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                <small>
                  Press{" "}
                  <kbd className="kbd px-1">
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
                <td
                  onClick={() => {
                    setSelectedID(item.id);
                    setIsShow(true);
                  }}
                >
                  <div className="flex flex-col">
                    <div className="pb-1">{item.item}</div>
                    <div
                      className="badge border-0 text-xs"
                      style={{
                        backgroundColor: `${
                          categories.find((x) => {
                            return x.category == item.category;
                          })?.color
                        }`,
                        color: `${getTextColor(
                          categories.find((x) => {
                            return x.category == item.category;
                          })?.color as string,
                          "#181A20",
                          "#C8CDDA"
                        )}`,
                      }}
                    >
                      {item.category}
                    </div>
                    <div className="block">
                      <small className="text-primary">{item.remarks}</small>
                    </div>
                    <div className="divider m-0 sm:hidden"></div>
                    <h2 className="text-xl font-semibold text-error sm:hidden">
                      - RM {separator(item.amount.toFixed(2))}
                    </h2>
                    <h2 className="text-xs text-primary sm:hidden">
                      {formatDate(item.date)}
                    </h2>
                  </div>
                </td>
                <td
                  className="hidden font-semibold text-error sm:table-cell"
                  onClick={() => {
                    setSelectedID(item.id);
                    setIsShow(true);
                  }}
                >
                  - RM {separator(item.amount.toFixed(2))}
                </td>
                <td
                  className="hidden sm:table-cell"
                  onClick={() => {
                    setSelectedID(item.id);
                    setIsShow(true);
                  }}
                >
                  {formatDate(item.date)}
                </td>
                <td className="text-center">
                  <div className="tooltip" data-tip="Delete Transaction">
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
              <th>
                <div className="flex flex-col">
                  <h1 className="text-primary">Total</h1>
                  <h1 className="text-xl text-primary sm:hidden">
                    RM {separator(sum.toFixed(2))}
                  </h1>
                </div>
              </th>
              <th className="sm:hidden"></th>
              <th className="hidden text-primary sm:table-cell">
                RM {separator(sum.toFixed(2))}
              </th>
              <th className="hidden sm:table-cell"></th>
              <th className="hidden sm:table-cell"></th>
            </tr>
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

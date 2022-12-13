import type { Dispatch, SetStateAction } from "react";
import { FaTrash } from "react-icons/fa";
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
            <td>Amount</td>
            <td>Date</td>
            <td className="text-center">Action</td>
          </tr>
        </thead>
        <tbody ref={parentTBody}>
          {data?.map((item, index) => (
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
                </div>
              </td>
              <td className="font-semibold text-error">
                -RM {separator(item.amount.toFixed(2))}
              </td>
              <td>{formatDate(item.date)}</td>
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
          ))}
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

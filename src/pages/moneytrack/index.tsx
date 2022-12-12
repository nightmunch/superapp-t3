import type { NextPage } from "next";
import { useState } from "react";
import { categories, months, separator } from "../../helpers/helpers";
import MoneyTrackLayout from "../../layouts/MoneyTrackLayout";
import type { DataProps } from "../../components/moneytrack/Doughnut";
import { Doughnut } from "../../components/moneytrack/Doughnut";
import { trpc } from "../../utils/trpc";
import { RiEmotionSadLine } from "react-icons/ri";

const MoneyTrack: NextPage = () => {
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const summaries = trpc.transactions.summarybymonth.useQuery({
    userId: "cl5qwgu6k0015zwv8jt19n94s",
    month: selectedMonth,
  });
  return (
    <MoneyTrackLayout>
      <div className="flex flex-col items-stretch gap-5">
        <div className="form-control mx-auto w-1/2">
          <select
            className="select-bordered select"
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
        </div>
        {selectedMonth ? (
          <>
            {summaries.data?.length !== 0 && summaries.data != undefined ? (
              <>
                <h1 className="text-center">
                  Transaction Summary {months[selectedMonth - 1]} 2022
                </h1>
                <Doughnut data={summaries.data as DataProps[]} />
                <SummaryTable
                  data={summaries.data}
                  selectedMonth={selectedMonth}
                />
              </>
            ) : (
              <div className="flex flex-col items-center gap-5 pt-5 text-center">
                <RiEmotionSadLine size={100} className="text-error" />
                <h1 className="text-2xl text-error">
                  There is no transaction for this month.
                </h1>
                <span>
                  You can add a transaction from the{" "}
                  <kbd className="kbd">Transactions</kbd> tab
                </span>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </MoneyTrackLayout>
  );
};

export default MoneyTrack;

const SummaryTable = ({
  data,
  selectedMonth,
}: {
  data: DataProps[];
  selectedMonth: number;
}) => {
  const { data: totalQuery } = trpc.transactions.totalspent.useQuery({
    userId: "cl5qwgu6k0015zwv8jt19n94s",
    month: selectedMonth,
  });
  const datas = data.map((data) => {
    return {
      category: data.category,
      amount: data._sum.amount,
      color: categories.find((color) => color.category == data.category)
        ?.color as string,
    };
  });

  const calculatePercent = (value: number) => {
    return totalQuery
      ? totalQuery?._sum.amount
        ? Number((100 * value) / totalQuery._sum.amount).toFixed(2)
        : 0
      : 0;
  };
  return (
    <div className="overflow-x-auto">
      <table className="table-zebra table w-full table-auto">
        <thead>
          <tr>
            <td>Category</td>
            <th>Amount</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
          {datas?.map((data, index) => (
            <tr key={index}>
              <td className="flex items-center gap-2">
                <div
                  className={`badge-info badge badge-sm`}
                  style={{
                    backgroundColor: `${data.color}`,
                  }}
                ></div>{" "}
                {data.category}
              </td>
              <td className="font-semibold text-error">
                -RM {separator((data.amount as number).toFixed(2))}
              </td>
              <td>{calculatePercent(data.amount as number)} %</td>
            </tr>
          ))}
          {totalQuery?._sum.amount ? (
            <tr>
              <td className="font-bold text-primary">Total</td>
              <th className="text-primary">
                -RM {separator(totalQuery._sum.amount.toFixed(2))}
              </th>
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

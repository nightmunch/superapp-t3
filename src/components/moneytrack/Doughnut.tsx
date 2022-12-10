/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Prisma } from "@prisma/client";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { categories, shadeColor } from "../../helpers/helpers";

export type dataProps = Prisma.PickArray<
  Prisma.TransactionsGroupByOutputType,
  "category"[]
> & {
  _sum: {
    amount: number | null;
  };
};

export const Doughnut = ({ data }: { data: dataProps[] }) => {
  const datas = data.map((data) => {
    return {
      category: data.category,
      amount: data._sum.amount,
      color: categories.find((color) => color.category == data.category)
        ?.color as string,
    };
  });
  return (
    <div className="mx-auto w-72 sm:w-96">
      <Chart
        type="doughnut"
        data={{
          labels: datas.map((data) => data.category),
          datasets: [
            {
              data: datas.map((data) => data.amount),
              backgroundColor: datas.map((data) => data.color),
              borderColor: datas.map((data) => shadeColor(data.color, -60)),
            },
          ],
        }}
        options={{
          elements: {
            arc: {
              borderWidth: 2,
              borderRadius: 10,
              hoverOffset: 10,
            },
          },
          // plugins: {
          //   legend: {
          //     labels: {
          //       color: themeDict.get(theme),
          //     },
          //   },
          // },
          layout: {
            padding: {
              bottom: 10,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  return "RM " + context.parsed.toFixed(2);
                },
              },
            },
          },
          responsive: true,
          cutout: "50%",
        }}
        plugins={[
          {
            id: "increase-legend-spacing",
            beforeInit(chart) {
              // Get reference to the original fit function
              const originalFit = (chart.legend as any).fit;
              // Override the fit function
              (chart.legend as any).fit = function fit() {
                // Call original function and bind scope in order to use `this` correctly inside it
                originalFit.bind(chart.legend)();
                this.height += 10;
              };
            },
          },
        ]}
      />
    </div>
  );
};

import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const transactionRouter = router({
  summarybymonth: publicProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        month: z.number().positive(),
      })
    )
    .query(({ ctx, input }) => {
      const { userId, month } = input;
      const date = new Date(new Date().getFullYear(), month - 1);
      const first_date = new Date(date.getFullYear(), date.getMonth(), 1);
      const last_date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      return ctx.prisma.transactions.groupBy({
        by: ["category"],
        where: {
          userId,
          date: {
            gte: first_date,
            lt: last_date,
          },
        },
        _sum: {
          amount: true,
        },
        orderBy: {
          _sum: {
            amount: "desc",
          },
        },
      });
    }),
  totalspent: publicProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        month: z.number().positive(),
      })
    )
    .query(({ ctx, input }) => {
      const { userId, month } = input;
      const date = new Date(new Date().getFullYear(), month - 1);
      const first_date = new Date(date.getFullYear(), date.getMonth(), 1);
      const last_date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      return ctx.prisma.transactions.aggregate({
        where: {
          userId,
          date: {
            gte: first_date,
            lt: last_date,
          },
        },
        _sum: {
          amount: true,
        },
      });
    }),
});

import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const transactionRouter = router({
  listbymonth: publicProcedure
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
      return ctx.prisma.transactions.findMany({
        where: {
          userId,
          date: {
            gte: first_date,
            lt: last_date,
          },
        },
        orderBy: {
          date: "asc",
        },
      });
    }),
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
  show: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return ctx.prisma.transactions.findUnique({
        where: {
          id,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        id: z.string().cuid().optional(),
        item: z.string().min(1),
        amount: z.number().positive(),
        category: z.string().min(1),
        remarks: z.string(),
        date: z.date(),
        userId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.transactions.create({ data: input });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      await ctx.prisma.transactions.delete({ where: { id } });
      return { id };
    }),
});

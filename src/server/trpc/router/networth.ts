import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const netWorthRouter = router({
  listall: publicProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
      })
    )
    .query(({ ctx, input }) => {
      const { userId } = input;
      return ctx.prisma.netWorth.findMany({
        where: {
          userId,
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
      return ctx.prisma.netWorth.findUnique({
        where: {
          id,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        id: z.string().cuid().optional(),
        item: z.string(),
        category: z.string(),
        amount: z.number().positive(),
        currency: z.string(),
        remarks: z.string().optional(),
        userId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.netWorth.create({ data: input });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string().cuid().optional(),
        item: z.string(),
        category: z.string(),
        amount: z.number().positive(),
        currency: z.string(),
        remarks: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, item, category, amount, currency, remarks } = input;
      await ctx.prisma.netWorth.update({
        where: {
          id,
        },
        data: {
          item,
          category,
          amount,
          currency,
          remarks,
        },
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      await ctx.prisma.netWorth.delete({ where: { id } });
      return { id };
    }),
});

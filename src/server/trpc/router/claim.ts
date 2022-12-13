import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const claimRouter = router({
  listall: publicProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
      })
    )
    .query(({ ctx, input }) => {
      const { userId } = input;
      return ctx.prisma.claim.findMany({
        where: {
          userId,
        },
        orderBy: {
          date: "asc",
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
      return ctx.prisma.claim.findUnique({
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
        date: z.date(),
        userId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.claim.create({ data: input });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string().cuid().optional(),
        item: z.string().min(1),
        amount: z.number().positive(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, item, amount, date } = input;
      await ctx.prisma.claim.update({
        where: {
          id,
        },
        data: {
          item,
          amount,
          date,
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
      await ctx.prisma.claim.delete({ where: { id } });
      return { id };
    }),
});

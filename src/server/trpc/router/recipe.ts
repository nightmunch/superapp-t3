import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const recipeRouter = router({
  list: publicProcedure
    .input(
      z.object({
        search: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const { search } = input;
      return ctx.prisma.recipe.findMany({
        where: {
          title: {
            ...(search != "" ? { contains: search } : {}),
            mode: "insensitive",
          },
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
      return ctx.prisma.recipe.findUnique({
        where: {
          id,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        ingredient: z.string(),
        step: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.recipe.create({ data: input });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        title: z.string(),
        description: z.string(),
        ingredient: z.string(),
        step: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, title, description, ingredient, step } = input;
      await ctx.prisma.recipe.update({
        where: { id },
        data: {
          title,
          description,
          ingredient,
          step,
        },
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      await ctx.prisma.recipe.delete({ where: { id } });
      return { id };
    }),
});

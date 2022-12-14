import { router } from "../trpc";
import { authRouter } from "./auth";
import { claimRouter } from "./claim";
import { netWorthRouter } from "./networth";
import { recipeRouter } from "./recipe";
import { transactionRouter } from "./transactions";

export const appRouter = router({
  auth: authRouter,
  transactions: transactionRouter,
  claim: claimRouter,
  networth: netWorthRouter,
  recipe: recipeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

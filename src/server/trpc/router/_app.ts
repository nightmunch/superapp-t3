import { router } from "../trpc";
import { authRouter } from "./auth";
import { claimRouter } from "./claim";
import { transactionRouter } from "./transactions";

export const appRouter = router({
  auth: authRouter,
  transactions: transactionRouter,
  claim: claimRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

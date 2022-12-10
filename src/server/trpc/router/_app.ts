import { router } from "../trpc";
import { authRouter } from "./auth";
import { transactionRouter } from "./transactions";

export const appRouter = router({
  auth: authRouter,
  transactions: transactionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

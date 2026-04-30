import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  /**
   * ============================================================================
   * NOTA: As procedures para clientes, equipamentos e empréstimos foram removidas
   * pois as tabelas correspondentes já existem no banco de dados original (db.sql).
   * 
   * Para implementar essas procedures, você precisará:
   * 1. Adicionar as tabelas ao schema Drizzle (drizzle/schema.ts)
   * 2. Implementar os helpers em server/db.ts
   * 3. Criar as procedures tRPC
   * 
   * Alternativamente, você pode usar raw SQL queries com db.execute()
   * ============================================================================
   */
});

export type AppRouter = typeof appRouter;

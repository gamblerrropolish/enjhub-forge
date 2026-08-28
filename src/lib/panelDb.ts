import { secureMutate } from "@/lib/secure.functions";
import { safeStorage } from "@/lib/store";

const TOKEN_KEY = "pkmr_token";

export function setPanelToken(token: string) {
  safeStorage.set(TOKEN_KEY, token);
}

export function getPanelToken(): string {
  return safeStorage.get(TOKEN_KEY) ?? "";
}

export function clearPanelToken() {
  safeStorage.set(TOKEN_KEY, "");
}

type Result = { error: string | null };

async function run(
  table: string,
  op: "insert" | "update" | "upsert" | "delete",
  values?: unknown,
  id?: string | null,
): Promise<Result> {
  try {
    return await secureMutate({
      data: { token: getPanelToken(), table, op, values: values ?? null, id: id ?? null },
    });
  } catch {
    return { error: "Operation failed" };
  }
}

/**
 * Mirrors the small slice of the Supabase query API the panels use, but routes
 * every write through an authorised server function instead of the browser.
 */
export const panelDb = {
  from(table: string) {
    return {
      insert: (values: unknown) => run(table, "insert", values),
      upsert: (values: unknown) => run(table, "upsert", values),
      update: (values: unknown) => ({
        eq: (_column: string, id: string) => run(table, "update", values, id),
      }),
      delete: () => ({
        eq: (_column: string, id: string) => run(table, "delete", undefined, id),
      }),
    };
  },
};

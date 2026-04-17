import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { db } from "@/db";
import TwitterAgentChat from "@/components/TwitterAgentChat";
import { twitterProfiles, twitterStyleAnalyses } from "@/db/schema";

type StyleAnalysis = {
  summary?: string;
};

function normalizeHandle(handle: string) {
  return handle.replace(/^@/, "").trim().toLowerCase();
}

function safeParseJson<T>(value: string | null | undefined): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export default async function TwitterAgentPage({ params }: { params: Promise<{ handle: string }> }) {
  const resolvedParams = await params;
  const handle = normalizeHandle(decodeURIComponent(resolvedParams.handle));

  const profile = handle
    ? await db.select().from(twitterProfiles).where(eq(twitterProfiles.handle, handle)).get()
    : null;

  const latestAnalysis = handle
    ? await db
        .select()
        .from(twitterStyleAnalyses)
        .where(eq(twitterStyleAnalyses.handle, handle))
        .orderBy(desc(twitterStyleAnalyses.createdAt))
        .get()
    : null;

  const analysis = safeParseJson<StyleAnalysis>(latestAnalysis?.analysisJson);

  return (
    <main className="min-h-screen bg-background px-4 pb-10 pt-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-label text-[10px] uppercase tracking-[0.32em] text-secondary">QR Scan Destination</div>
            <h1 className="mt-2 font-headline text-4xl font-black italic tracking-tight text-zinc-100 sm:text-6xl">
              AGENT / @{handle || "unknown"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Scan a QR on the garment to open the conversational agent for that Twitter identity.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/playground"
              className="border border-white/10 px-4 py-3 font-label text-[10px] uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:border-primary/40 hover:text-primary"
            >
              Create Another
            </Link>
            <Link
              href={`/playground?handle=${encodeURIComponent(handle)}`}
              className="bg-primary px-4 py-3 font-label text-[10px] uppercase tracking-[0.2em] text-on-primary"
            >
              Open Playground
            </Link>
          </div>
        </div>

        <TwitterAgentChat
          handle={handle}
          displayName={profile?.displayName ?? null}
          profileImageUrl={profile?.profileImageUrl ?? null}
          profileBio={profile?.profileBio ?? null}
          styleSummary={analysis?.summary ?? null}
        />
      </div>
    </main>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="flex h-full animate-pulse flex-col overflow-hidden rounded-2xl bg-card shadow-sm">
      {/* Imagem Container Skeleton */}
      <div className="relative aspect-[16/9] bg-muted" />

      {/* Conteúdo Skeleton */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <div className="h-6 w-24 rounded-full bg-muted" />
        </div>

        <div className="mb-3 h-7 w-full rounded bg-muted" />
        <div className="mb-3 h-7 w-3/4 rounded bg-muted" />

        <div className="mb-4 h-4 w-full rounded bg-muted" />
        <div className="mb-6 h-4 w-5/6 rounded bg-muted" />

        <div className="mt-auto flex items-center gap-3">
          <div className="h-3 w-24 rounded bg-muted" />
          <span className="opacity-30">•</span>
          <div className="h-3 w-16 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

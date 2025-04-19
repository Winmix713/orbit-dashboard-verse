
import { Skeleton } from "@/components/ui/skeleton";

const MatchHeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between mb-5 relative">
      <div className="flex items-center gap-3">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
};

const TeamDisplaySkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Skeleton className="h-16 w-16 rounded-full" />
      <Skeleton className="h-4 w-20 mt-2" />
      <div className="flex gap-0.5 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-3 rounded-full" />
        ))}
      </div>
    </div>
  );
};

const PredictionDotsSkeleton = () => {
  return (
    <div className="flex gap-1.5 mt-1">
      <Skeleton className="w-2 h-2 rounded-full" />
      <Skeleton className="w-2 h-2 rounded-full" />
      <Skeleton className="w-2 h-2 rounded-full" />
    </div>
  );
};

const PredictionButtonsSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-2 mt-3">
      <Skeleton className="h-10 rounded-lg" />
      <Skeleton className="h-10 rounded-lg" />
      <Skeleton className="h-10 rounded-lg" />
    </div>
  );
};

const SubmitPredictionButtonSkeleton = () => {
  return (
    <div className="pt-6 mt-auto">
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  );
};

const StatsSkeleton = () => {
  return (
    <div className="mt-3 p-2 bg-white/5 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-2 w-full mb-3" />
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-8 rounded" />
        <Skeleton className="h-8 rounded" />
      </div>
    </div>
  );
};

const MatchCardSkeleton = () => {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border">
      <div className="p-4 border-b border-border bg-gradient-to-r from-gray-800/60 to-gray-900/60">
        <MatchHeaderSkeleton />
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-5 gap-2 items-center">
          <div className="col-span-2">
            <Skeleton className="h-5 w-24 mb-3" />
            <div className="aspect-[1/1] rounded-lg p-3 border border-white/5 flex flex-col items-center justify-center bg-gradient-to-b from-gray-800/30 to-gray-900/30">
              <TeamDisplaySkeleton />
            </div>
          </div>

          <div className="col-span-1 flex flex-col items-center justify-center py-4">
            <Skeleton className="w-12 h-12 rounded-full mb-2" />
            <PredictionDotsSkeleton />
          </div>

          <div className="col-span-2">
            <Skeleton className="h-5 w-24 mb-3" />
            <div className="aspect-[1/1] rounded-lg p-3 border border-white/5 flex flex-col items-center justify-center bg-gradient-to-b from-gray-800/30 to-gray-900/30">
              <TeamDisplaySkeleton />
            </div>
          </div>
        </div>

        <StatsSkeleton />
        <PredictionButtonsSkeleton />
        <SubmitPredictionButtonSkeleton />
      </div>
    </div>
  );
};

export default MatchCardSkeleton;

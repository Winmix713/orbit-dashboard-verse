
import { Info, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type MatchHeaderProps = {
  id?: string;
  time?: string;
  timeGMT?: string;
  startsIn?: string;
  league?: string;
}

const MatchHeader = ({ id, time, timeGMT, startsIn, league }: MatchHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-gray-800/60 to-gray-900/60">
      <div className="flex items-center gap-3">
        <div className="text-xs font-medium px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{time || "TBD"}</span>
        </div>
        
        {timeGMT && (
          <div className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-gray-400">
            {timeGMT}
          </div>
        )}
        
        {league && (
          <div className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 text-green-400">
            {league}
          </div>
        )}
      </div>
      
      {startsIn && (
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="h-3 w-3" />
          <span>Starts in {startsIn}</span>
        </div>
      )}
    </div>
  );
};

export default MatchHeader;

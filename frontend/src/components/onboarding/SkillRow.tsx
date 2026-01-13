import { cn } from "@/lib/utils";

interface SkillRowProps {
  skill: string;
  level: "beginner" | "intermediate" | "advanced" | null;
  onLevelChange: (level: "beginner" | "intermediate" | "advanced") => void;
  onRemove?: () => void;
}

const levels = [
  { key: "beginner", label: "Beginner" },
  { key: "intermediate", label: "Intermediate" },
  { key: "advanced", label: "Advanced" },
] as const;

const SkillRow = ({ skill, level, onLevelChange, onRemove }: SkillRowProps) => {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-[#E5E7EB]">
      <div className="flex items-center justify-between">
        <span className="font-medium text-[#0F172A]">{skill}</span>
        {onRemove && (
          <button
            onClick={onRemove}
            className="text-[#0F172A] hover:text-[#2563EB] transition-colors p-1 font-medium"
            aria-label="Remove skill"
          >
            X
          </button>
        )}
      </div>
      <div className="flex gap-2">
        {levels.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onLevelChange(key)}
            className={cn(
              "flex-1 py-2 px-3 text-xs font-medium rounded-md border transition-colors",
              level === key
                ? "bg-[#2563EB] text-white border-[#2563EB]"
                : "bg-white text-[#0F172A] border-[#E5E7EB] hover:border-[#2563EB]"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkillRow;

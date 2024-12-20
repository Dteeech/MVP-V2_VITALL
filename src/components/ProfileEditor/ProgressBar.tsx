interface ProgressBarProps {
  progress: number;
  steps: Array<{
    label: string;
    completed: boolean;
  }>;
}

export function ProgressBar({ progress, steps }: ProgressBarProps) {
  return (
    <div className="space-y-4">
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#347879] bg-[#347879]/10">
              Progression
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-[#347879]">
              {progress}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#347879]/10">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#347879] transition-all duration-500"
          />
        </div>
      </div>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                step.completed ? 'bg-[#347879] text-white' : 'bg-gray-200'
              }`}
            >
              {step.completed && (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <span
              className={`text-sm ${
                step.completed ? 'text-[#347879] font-medium' : 'text-gray-500'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
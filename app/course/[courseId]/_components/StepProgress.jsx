import { Button } from "@/components/ui/button";
import React from "react";

function StepProgress({ stepCount, setStepCount, data }) {
  return (
    <div className="flex items-center gap-2 w-full">
      {stepCount !== 0 && (
        <Button variant="outline" size="sm" onClick={() => setStepCount(stepCount - 1)}>
          Back
        </Button>
      )}

      <div className="flex flex-1 items-center gap-1">
        {data?.map((item, index) => (
          <div
            key={index}
            className={` w-full h-2 gap-1 rounded-full transition-all duration-300 ${
              index < stepCount ? "bg-primary" : "bg-gray-200"
            }`}
          ></div>
          // fade effect  transition-all duration-300 
        ))}
      </div>

      {stepCount < data.length && (
        <Button variant="outline" size="sm" onClick={() => setStepCount(stepCount + 1)}>
          Next
        </Button>
      )}
    </div>
  );
}

export default StepProgress;

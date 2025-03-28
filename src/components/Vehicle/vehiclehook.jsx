import { useState } from 'react';

export function useMultiStepForm(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [validation, setValidation] = useState({});

  function next() {
    // Remove validation check to allow moving to next step
    setCurrentStepIndex(i => i >= steps.length - 1 ? i : i + 1);
  }

  function back() {
    setCurrentStepIndex(i => i <= 0 ? i : i - 1);
  }

  function setStepValidation(stepIndex, isValid) {
    setValidation(prev => ({ ...prev, [stepIndex]: isValid }));
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    next,
    back,
    steps,
    setStepValidation,
    validation,
  };
}
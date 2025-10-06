"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

// import qBank from "./qbank";
import Score from "./score";
import Questions from "./questions";

export default function Quiz({qBank}) {
  const [questions, setQuestions] = useState(qBank);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [isSubmitted, setSubmit] = useState(false);

  const handleAnswerClick = (qid, option) => {
    setSelectedOptions((prev) => ({ ...prev, [qid]: option }));
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q) => {
      const userAnswer = selectedOptions[q.id];
      if (userAnswer && userAnswer === q.answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setSubmit(true);
  };

  if (!isSubmitted) {
    return (
      <div className="flex flex-col items-center">
        <Questions
          questions={questions}
          selectedOptions={selectedOptions}
          handleAnswerClick={handleAnswerClick}
          state="incomplete"
        />
        <Button onClick={handleSubmit} className="mt-3">Check answers</Button>
      </div>
    );
  } else if (isSubmitted) {
    return (
      <div className="flex flex-col gap-4">
        <Questions
          questions={questions}
          selectedOptions={selectedOptions}
          state="complete"
        />
        <Score score={score} total={questions.length} />
      </div>
    );
  }
}

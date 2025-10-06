const Questions = ({
  questions,
  handleAnswerClick,
  selectedOptions,
  state,
}) => {
  const optionIds = ["A.", "B.", "C.", "D."];

  return (
    <div className="w-full">
      {questions.map((q) => {
        const userAnswer = selectedOptions[q.id];

        return (
          <div key={q.id} className="flex flex-col gap-2 mb-4">
            <h4 style={{ whiteSpace: "pre-line" }}>
              {q.id}) {q.question}
            </h4>

            <div className="flex flex-col items-start px-5">
              {q.options.map((option, index) => {
                let symbol = "";
                let textColor = "black";
                let borderColor = "gray";
                let fontWeight = "normal";
                let bgColor = "white";

                if (state === "incomplete") {
                  // Highlight the option user is selecting
                  if (userAnswer === option) {
                    bgColor = "lightblue";
                  }
                } else if (state === "complete") {
                  // Show symbols & styling after submission
                  if (option === q.answer) {
                    symbol = " ✅"; // always show correct answer
                  }
                  if (userAnswer === option) {
                    fontWeight = "bold";
                    if (option === q.answer) {
                      textColor = "green";
                      borderColor = "green";
                    } else {
                      symbol = " ❌"; // override for wrong selection
                      textColor = "red";
                      borderColor = "red";
                    }
                  }
                }

                return (
                  <button
                    key={index}
                    className="px-2 py-1 mt-2 w-full text-left rounded-lg"
                    disabled={state === "complete"}
                    onClick={() =>
                      state === "incomplete" && handleAnswerClick(q.id, option)
                    }
                    style={{
                      color: textColor,
                      border: `1px solid ${borderColor}`,
                      fontWeight: fontWeight,
                      backgroundColor: bgColor,
                    }}
                  >
                    {optionIds[index]} {option}
                    {symbol}
                  </button>
                );
              })}
            </div>

            {state === "complete" && q.explanation && (
              <div className="mt-1">
                {!userAnswer && (
                  <p className="text-red-600">❌ Not answered.</p>
                )}
                <div className="border p-2 mt-1">
                  <p className="italic text-gray-600">{q.explanation}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Questions;

// Score.js
export default function Score({ score, total }) {
  return (
    <div className="border rounded px-6 py-3">
      <p className="text-center">
        Correct answers: {score}/{total}. <br />
        Check your answers above.
      </p>
    </div>
  );
}

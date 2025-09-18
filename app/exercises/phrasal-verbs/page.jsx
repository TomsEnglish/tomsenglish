import Quiz from "./quiz";
import qBank from "./qbank";
import qBank2 from "./qbank2";

export default function PhrasalVerbs() {
  return (
    <div className="container-fluid gap-4 flex flex-col pb-18">
      <h2>Phrasal Verbs</h2>
      <div className="flex flex-col w-full sm:max-w-full md:max-w-2xl lg:max-w-3xl self-center">
        <p>
          Do these exercises to practice memorizing phrasal verb particles and
          to practice using phrasal verbs used in the video.
        </p>

       
        <h3 className="mb-1!">Exercise 1</h3>
        <span>Select the correct adverbial particle for each meaning.</span>
        <Quiz qBank={qBank} />

        <h3 className="mb-1!">Exercise 2</h3>
        <span>Choose the correct phrasal verbs to complete these sentences.</span>
        <Quiz qBank={qBank2} />
      </div>
    </div>
  );
}

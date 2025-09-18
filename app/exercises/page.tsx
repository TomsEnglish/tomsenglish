import Link from "next/link";

export default function Exercises() {
  return (
    <div className="container-fluid gap-4 flex flex-col">
      <h2>Exercises</h2>
      <div className="flex flex-col gap-4! w-full sm:max-w-full md:max-w-2xl lg:max-w-3xl self-center">
        <Link href="/exercises/phrasal-verbs" className="">
          Phrasal verbs
        </Link>
      </div>
    </div>
  );
}

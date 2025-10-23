export const ClassDetailCard = ({ ...props }: any) => {
  return (
    <div className="border p-4 flex flex-col items-center justify-center gap-2 bg-blue-50 pt-[25%] pb-[25%]">
      {props.icon}
      <b className="text-center text-wrap text-sm">{props.text}</b>
    </div>
  )
}
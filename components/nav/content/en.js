const style = "cursor-pointer py-2 px-4 font-medium text-sm rounded-md hover:bg-accent focus:bg-accent disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px]"

export const items = [
  <a href="/" className={style}>Home</a>,
  <a href="/exercises" className={style}>Exercises</a>,
  <a href="/classes/individual" className={style}>Classes</a>,
  // <a href="/blog" className={style}>Blog</a>,
];

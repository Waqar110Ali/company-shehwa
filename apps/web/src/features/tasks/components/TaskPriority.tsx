interface Props{

priority:
| "Low"
| "Medium"
| "High"
| "Critical";

}

const colors={

Low:"bg-green-500/20 text-green-400",

Medium:"bg-yellow-500/20 text-yellow-400",

High:"bg-orange-500/20 text-orange-400",

Critical:"bg-red-500/20 text-red-400"

};

export default function TaskPriority({

priority

}:Props){

return(

<span
className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[priority]}`}
>

{priority}

</span>

);

}
import { XCircleIcon } from "@heroicons/react/24/outline"
export default function RightSidebar({show ,changeshow}){


return(
<div hidden={!show} className="h-screen w-[70vw] sm:w-[40vw] md:w-[20vw] bg-black border-amber-50 text-white fixed top-0 z-100 right-0  ">
 <button onClick={changeshow}>
<XCircleIcon className=" h-10 w-10 absolute right-5"/>
 </button>












</div>







)

} 


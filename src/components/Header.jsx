import { Link } from 'react-router-dom';
import {
  EyeIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
export default function Header() {
    return(
        <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white bg-[#121212] px-4 color-white text-amber-50">
          <nav className="mx-auto flex max-w-7xl items-center py-2">
            <div className="mr-4 w-12 shrink-0 sm:w-16">logo</div>
            <div className="relative mx-auto hidden w-full max-w-md overflow-hidden sm:block">
              <input
                className="w-full border bg-transparent py-1 pl-8 pr-3 placeholder-white outline-none sm:py-2"
                placeholder="Search"
              />
              <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2">
                <MagnifyingGlassIcon className=" h-4 w-4" />
              </span>
            </div>
            <button className="ml-auto sm:hidden">
              <MagnifyingGlassIcon className=" h-6 w-6" />
            </button>
            <button className="group peer ml-4 flex w-6 shrink-0 flex-wrap gap-y-1.5 sm:hidden">
              <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
              <span className="block h-[2px] w-2/3 bg-white group-hover:bg-[#ae7aff]"></span>
              <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
            </button>
            <div className="fixed inset-y-0 right-0 flex w-full max-w-xs shrink-0 translate-x-full flex-col border-l border-white bg-[#121212] duration-200 hover:translate-x-0 peer-focus:translate-x-0 sm:static sm:ml-4 sm:w-auto sm:translate-x-0 sm:border-none">
              <div className="relative flex w-full items-center justify-between border-b border-white px-4 py-2 sm:hidden">
                <span className="inline-block w-12">logo</span>
                <button className="inline-block w-8">
                  <XCircleIcon />
                </button>
              </div>
              <ul className="my-4 flex w-full flex-wrap gap-2 px-4 sm:hidden">
              
              </ul>
  
              <div className="mb-8 mt-auto px-4 sm:mb-0 sm:mt-0 sm:px-0">
                <button className="flex w-full gap-4 text-left sm:items-center">
                  <img
                    src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="React-Patterns"
                    className="h-16 w-16 shrink-0 rounded-full sm:h-12 sm:w-12"
                  />
  
                  <div className="w-full pt-2 sm:hidden">
                    <h6 className="font-semibold">React Patterns</h6>
                    <p className="text-sm text-gray-300">@reactpatterns</p>
                  </div>
                </button>
              </div>
            </div>
          </nav>
        </header>
    )
}
    
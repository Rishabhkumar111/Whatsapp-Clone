import { useStateProvider } from "@/context/StateContext";
import reducer from "@/context/StateReducers";
import { reducerCases } from "@/context/constants";
import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";
function SearchBar() {
  const [{contactSearch},dispatch] = useStateProvider();
  return (
    <div className=" bg-search-input-container-background flex py-3 pl-5 items-center gap-3 h-14">
      <div className="flex bg-panel-header-background items-center px-3 py-1 gap-5 rounded-lg flex-grow">
        <div>
          <BiSearchAlt2 className=" text-panel-header-icon cursor-pointer text-l"/>
        </div>
        <div>
          <input 
          type="text" 
          placeholder="Search or Start new chat" 
          className=" bg-transparent text-sm focus:outline-none text-white w-[20vw]"
          value={contactSearch}
          onChange={e=>dispatch({type:reducerCases.SET_CONTACT_SEARCH, contactSearch:e.target.value})}
          />
        </div>
      </div>
      <div className="pr-5 pl-3">
        <BsFilter className=" text-panel-header-icon cursor-pointer text-l" />
      </div>
    </div>
  );
}

export default SearchBar;

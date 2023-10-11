import React from "react";

const SearchInput = () => {
  return (
    <>
      <form className="flex w-full">
        <input
          type="text"
          placeholder="search Messages"
          className="bg-base-200 mx-auto placeholder:text-xs bg-opacity-40 w-[80%] outline-none rounded-lg px-5 py-2"
        />
      </form>
    </>
  );
};

export default SearchInput;

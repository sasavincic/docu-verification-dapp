import {useRouter, useSearchParams} from "next/navigation";
import React, {useState} from "react";

const SearchInput = () => {
    const search = useSearchParams();
    const [searchQuery, setSearchQuery] = useState<string | null>(
        search ? search.get("q") : ""
    );
    const router = useRouter();

    const onSearch = (event: React.FormEvent) => {
        event.preventDefault();

        if (typeof searchQuery !== "string") {
            return;
        }

        const encodedSearchQuery = encodeURI(searchQuery);
        router.push(`/search?q=${encodedSearchQuery}`);
    };

    return (
        <form onSubmit={onSearch} className="flex justify-center w-2/3">
            <input
                value={searchQuery || ""}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="px-5 py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-black bg-neutral-100 focus:bg-grey-100 rounded-full focus:outline-none focus:ring-[1px] focus:ring-sky-50 placeholder:text-neutal-400"
                placeholder="What are you looking for?"
            />

        </form>
    );
};

export default SearchInput;
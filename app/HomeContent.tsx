"use client"
import BestSellers from "@/app/components/BestSellers";
import CartButton from "@/app/components/CartButton";
import Categories from "@/app/components/Categories";
import Header from "@/app/components/Header";

import { Item } from "./types";
import { useState } from "react";
import SearchResults from "./components/SearchResults";
export default function HomeContent({ items }: { items: Item[] }) {
    const [searchText, setSearchText] = useState<string>("")

    // console.log(`SearchText state in HomeContent = ${searchText}`)
    const bestsellers = items?.filter(item => item.isBestseller)
    return (
        <div className="flex flex-col gap-4 md:hidden">
            <Header setSearchText={setSearchText} searchText={searchText} />
            {searchText && <SearchResults onLoad={() => { }} query={searchText} items={items} />}
            {!searchText && <BestSellers items={bestsellers} />}
            {!searchText && <Categories items={items} />}


            <CartButton />
        </div>
    )
}

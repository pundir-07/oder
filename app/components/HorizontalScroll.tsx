import { Item } from "@/app/types";
import ItemCard from "./ItemCard";
import { cn } from "@/lib/utils";



export default function HorizontalScroll({ items, visible, onLoad }: { items: Item[], onLoad: () => void, visible: boolean }) {
    // console.log(`Items recieved in horscrol ${items}`)
    return (
        <div className={cn(" overflow-x-auto scrollbar-hide whitespace-nowrap px-4", visible ? "w-full" : "w-0 h-0")}>

            <div className="inline-flex space-x-4">
                {items?.map(item => <ItemCard key={item.id} item={item} onImageLoad={onLoad} />)}

            </div>
        </div>
    );
}

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Item } from "../types"
import AccordianItemCard from "./AccordianItemCard"


export function AccordianComponent({ items, category }: { items: Item[], category: string }) {
    return (
        <Accordion type="single" collapsible className="bg-white no-underline" defaultValue="item-1">
            <AccordionItem value="item-1" className="m-3 no-underline" >
                <AccordionTrigger className="text-lg p-2 " >{category}</AccordionTrigger>
                <AccordionContent >
                    {items.map(item => <AccordianItemCard key={item.id} item={item} onImageLoad={() => { }} />)}

                </AccordionContent>
            </AccordionItem>

        </Accordion>
    )
}

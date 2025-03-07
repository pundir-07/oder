import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select"

export default function CategorySelector({ handleSelected }: { handleSelected: (value: string) => void }) {
    return (
        <Select onValueChange={(value) => handleSelected(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Drinks" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="SNACKS">Snacks</SelectItem>
                <SelectItem value="MAIN_COURSE">Main Course</SelectItem>
                <SelectItem value="DESSERTS">Desserts</SelectItem>
                <SelectItem value="DRINKS">Drinks</SelectItem>
            </SelectContent>
        </Select>

    )
}

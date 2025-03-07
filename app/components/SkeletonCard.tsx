import { Skeleton } from "@/app/components/ui/skeleton"

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[250px] w-[208px] rounded-xl" />

        </div>
    )
}

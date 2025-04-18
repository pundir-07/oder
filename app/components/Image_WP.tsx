"use client";

import Image from "next/image";

export default function Image_WP({ url, alt, onLoadingComplete }: { url: string; alt: string, onLoadingComplete: () => void }) {

    return (
        <div className="relative w-full h-full">
            <Image
                src={url}
                alt={alt}
                fill
                className={`rounded-3xl`}
                unoptimized
                onLoad={onLoadingComplete}
            />
        </div>
    );
}

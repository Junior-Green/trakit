'use client'

import { Skeleton } from "@mui/material";

export default function Loading() {    
    return (
        <div className="flex w-full h-full items-center justify-center p-10">
            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 lg:grid-rows-5  w-full h-full items-start justify-center gap-5 place-items-center overflow-scroll">
                <Skeleton variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton className="col-span-2 row-span-2" variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton className="row-span-2" variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton className="col-span-2 row-span-2" variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton className="col-span-2 row-span-2" variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton className="col-span-3 row-span-2" variant="rounded" width={"100%"} height={"100%"} />
            </div>
        </div>
    );
}
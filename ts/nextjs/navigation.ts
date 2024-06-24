"use client"
import { usePathname, useRouter as useRouterInternal, useSearchParams } from "next/navigation";

export const useRouter = () => {
    const pathname = usePathname();
    const routerInternal = useRouterInternal();
    const searchParams = useSearchParams();

    const build = (options: {
        remove: string[], 
        set: string | URLSearchParams | Record<string, string> | string[][] | undefined
    }) => {
        const mutableSearchParams = new URLSearchParams(searchParams);
        const setParams = new URLSearchParams(options.set);
        setParams.forEach((k, v) => mutableSearchParams.set(k, v));
        options.remove.forEach(k => mutableSearchParams.delete(k));
        replace(mutableSearchParams);
    }

    const set = (key: string, value: string) => {
        const mutableSearchParams = new URLSearchParams(searchParams);
        mutableSearchParams.set(key, value);
        replace(mutableSearchParams);
    }

    const setAll = (init?: string | URLSearchParams | Record<string, string> | string[][] | undefined) => {
        const mutableSearchParams = new URLSearchParams(init);
        replace(mutableSearchParams);
    }

    const remove = (key: string) => {
        const mutableSearchParams = new URLSearchParams(searchParams);
        mutableSearchParams.delete(key);
        replace(mutableSearchParams);
    }

    const removeAll = (keys: string[]) => {
        const mutableSearchParams = new URLSearchParams(searchParams);
        keys.forEach(k => mutableSearchParams.delete(k));
        replace(mutableSearchParams);
    }

    const replace = (searchParams?: URLSearchParams) => {
        routerInternal.replace(searchParams && searchParams?.size > 0 
            ? pathname + '?' + searchParams.toString() 
            : pathname);
    }

    const router = {
        ...routerInternal,
        pathname,
        searchParams,
        build,
        set,
        setAll,
        remove,
        removeAll
    }

    return router;
}
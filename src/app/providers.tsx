"use client";

import {SessionProvider} from "next-auth/react";

type Props = {
    children?: React.ReactNode;
};

export const Providers = ({children}: Props) => {
    return <SessionProvider refetchInterval={30}>{children}</SessionProvider>;
};
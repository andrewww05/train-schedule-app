'use client'

import { FC, ReactNode, useEffect } from 'react'
import { useAuthStore } from '@/app/_providers';

type PropsType = {
    children: ReactNode
}

const AuthProvider: FC<PropsType> = ({ children }) => {
    const { status, accessToken,  fetchRefresh } = useAuthStore(state => state);

    useEffect(() => {
        if (status == "authorized") return;

        fetchRefresh();
    }, [accessToken]);

    return children;
}

export default AuthProvider;
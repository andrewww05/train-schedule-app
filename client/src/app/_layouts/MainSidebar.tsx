'use client'

import { FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const MainSidebar: FC = () => {
    const pathname = usePathname()
    const t = useTranslations("common");
    const menuItems = [
        {
            svg: (<path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />),
            name: t('profile'),
            path: "/profile"
        },
        {
            svg: (<path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />),
            name: t('home'),
            path: "/"
        },
        {
            svg: (<path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />),
            name: t('messages'),
            path: "/messages"
        },
        {
            svg: (
                <>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </>
            ),
            name: t('settings'),
            path: "/settings"
        },
    ];


    return (
        <aside className="w-xs px-4 py-8 flex flex-col justify-between">
            <div>
                <div className="flex justify-center">
                    <Image
                        width={120}
                        height={80}
                        alt='logo'
                        src={'/image/logo.png'}
                        priority
                    />
                </div>
                <ul className="mt-8 space-y-4">
                    {menuItems.map(item => {
                        const isActive = pathname == item.path;
                        const className = clsx('flex', 'justify-start', 'items-center', 'font-bold', 'space-x-2', isActive && 'text-primary')
                        const iconClassName = clsx('size-6', { 'text-primary-hover': isActive }, { 'text-medium-gray': !isActive })

                        return (
                            <li key={item.path}>
                                <div className='flex justify-between items-center w-full hover:cursor-pointer'>
                                    <div className={className}>
                                        <svg className={iconClassName} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.25} stroke="currentColor">
                                            {item.svg}
                                        </svg>

                                        <a href={item.path} className="break-words max-w-48">{item.name}</a>
                                    </div>

                                    <div>
                                        <span className="flex items-center rounded-full bg-primary-bg size-7 inset-ring inset-ring-primary-border-hover">
                                            <span className="w-full text-sm font-medium text-primary-text text-center">5</span>
                                        </span>
                                    </div>
                                </div> 
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex flex-row items-center gap-3">
                    <div>
                        <Image
                            className="size-10 rounded-full"
                            width={40}
                            height={40}
                            alt='pfp'
                            src={'https://d2zia2w5autnlg.cloudfront.net/200164/6421b0bf9a534-large'}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-base">User</span>
                        <span className="text-sm text-dark-gray">Basic Member</span>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <svg className="size-6 p-3 text-dark-gray hover:text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                </div>
            </div>
        </aside>
    )
}

export default MainSidebar;
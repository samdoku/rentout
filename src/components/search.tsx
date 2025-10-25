"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Icons } from './icons'

export const SearchBar = () => {
    const [focus, setFocus] = useState<boolean>(false)
    const [val, setVal] = useState<string>("")

    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVal(e.target.value)
    }

    return (
        <form data-state={focus ? "isFocus" : "notFocus"} className='relative flex-1 h-[40px] rounded-[24px] bg-[#eee] flex items-center data-[state=isFocus]:bg-white data-[state=isFocus]:outline duration-200 data-[state=notFocus]:bg-[#eee]'>
            <Button variant="ghost" className='hover:bg-transparent shadow-none has-[>svg]:px-4' title='Search'>
                <svg width="20" height="20" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                    <desc lang="en-US">A magnifying glass</desc>
                    <path d="M16.5 15c.9-1.2 1.5-2.8 1.5-4.5C18 6.4 14.6 3 10.5 3S3 6.4 3 10.5 6.4 18 10.5 18c1.7 0 3.2-.5 4.5-1.5l4.6 4.5 1.4-1.5-4.5-4.5zm-6 1c-3 0-5.5-2.5-5.5-5.5S7.5 5 10.5 5 16 7.5 16 10.5 13.5 16 10.5 16z"></path>
                </svg>
            </Button>
            <div className='flex-1 flex'>
                <input type="search" autoCapitalize='none' autoComplete="off" title='Search for products' spellCheck="false" autoCorrect='false' value={val} onFocus={() => setFocus(true)} onChange={onChangeText} onBlur={() => setFocus(false)} placeholder="Search products name, brand and categories" name="searchKeyboard" className='w-full border-none outline-none bg-transparent truncate' />
                <div data-state={focus ? "isFocus" : "notFocus"} className='border z-50 bg-white h-[200px] absolute left-0 right-0 top-[calc(100%_+_8px)] rounded-xl data-[state=isFocus]:visible data-[state=isFocus]:opacity-100 duration-200 data-[state=notFocus]:invisible data-[state=notFocus]:opacity-0'>hello</div>
            </div>
            {val.length > 0 && (
                <>
                    <Button variant="ghost" onClick={() => setVal("")} className='hover:bg-transparent shadow-none' title='Clear'>
                        <svg width="16" height="16" viewBox="0 0 24 24" version="1.1" aria-hidden="false"><desc lang="en-US">An X shape</desc><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"></path></svg>
                    </Button>
                    <Separator orientation='vertical' className='min-w-[1px] max-h-[20px] bg-black/20' />
                </>
            )}
            <div>
                <Button variant="ghost" className='hover:bg-transparent shadow-none has-[>svg]:px-4' title='Visual search'>
                    <svg width="20" height="20" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                        <desc lang="en-US">Visual search</desc>
                        <path d="M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4ZM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5Zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2Zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4ZM12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"></path>
                    </svg>
                </Button>
            </div>
        </form>
    )
}






export const SearchDrawer = () => {
  return (
    <div className="px-[14px] sm:hidden md:px-[34px] lg:px-[54px] mx-auto w-full py-[8px]">

    <Drawer>
        <DrawerTrigger asChild>
            <Button variant="outline" className="rounded-full w-full flex justify-between h-11">
                <span className="ml-3 text-sm text-gray-500 text-ellipsis whitespace-nowrap overflow-hidden">Search products name, brand and categories</span>
                <div>{Icons.search()}</div>
            </Button>
        </DrawerTrigger>
        <DrawerContent className="min-h-[80vh]">
            <DrawerHeader className="text-left">
                <DrawerTitle>Share link</DrawerTitle>
                <DrawerDescription>
                    Anyone who has this link will be able to view this.
                </DrawerDescription>
            </DrawerHeader>

            <div>Search goes here</div>

            <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>

</div>
  )
}

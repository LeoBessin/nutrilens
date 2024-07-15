'use client'
import React, {useCallback, useEffect, useState} from 'react'
import {createClient} from '@/src/utils/supabase/client'
import Image from 'next/image'

export default function Avatar({
                                        email,
                                         size,
                                     }: {
    size: number
    email: string
}) {
    const supabase = createClient()
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

    const getAvatar = useCallback(async () => {
        async function downloadImage(path: string) {
            try {
                const { data, error } = await supabase.storage.from('avatars').download(path)
                if (error) {
                    throw error
                }

                const url = URL.createObjectURL(data)
                setAvatarUrl(url)
            } catch (error) {
                console.log('Error downloading image: ', error)
            }
        }
        try {
            const { data, error, status } = await supabase
                .from('Users')
                .select(`id,image_url`)
                .eq('email', email)
                .single()

            if (error && status !== 406) {
                console.log(error)
                throw error
            }

            if (data) {
                downloadImage(data.image_url)
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        }
    }, [supabase])

    useEffect(() => {
        getAvatar()
    }, [email, getAvatar])


    return (
        <div>
            <Image
                width={size}
                height={size}
                src={avatarUrl || "/defaultPicture.png"}
                alt="Avatar"
                className="rounded-full"
                style={{height: size, width: size}}
            />
        </div>
    )
}
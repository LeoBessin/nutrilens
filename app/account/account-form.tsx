'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/src/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import Avatar from './avatar'

export default function AccountForm({ user }: { user: User | null }) {
    const supabase = createClient()
    const [id, setId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState<string | null>(null)
    const [image_url, setImageUrl] = useState<string | null>(null)

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)

            const { data, error, status } = await supabase
                .from('Users')
                .select(`id, username, image_url`)
                .eq('email', user?.email)
                .single()

            if (error && status !== 406) {
                console.log(error)
                throw error
            }

            if (data) {
                setUsername(data.username)
                setImageUrl(data.image_url)
                setId(data.id);
            }
        } catch (error) {
            alert('Error loading user data!')
        } finally {
            setLoading(false)
        }
    }, [user, supabase])

    useEffect(() => {
        getProfile()
    }, [user, getProfile])

    async function updateProfile({
                                     username,
                                     image_url,
                                 }: {
        username: string | null
        image_url: string | null
    }) {
        try {
            setLoading(true)
            const { error } = await supabase.from('Users').upsert({
                id: id,
                username:username,
                image_url:image_url
            })
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            alert('Error updating the data!')
            console.log(error)
            console.log(`id: ${id}, username: ${username}, image_url: ${image_url}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="form-widget">
            <div>
                <Avatar
                    uid={id ?? null}
                    url={image_url}
                    size={150}
                    onUpload={(url) => {
                        setImageUrl(url)
                        updateProfile({ username, image_url: url })
                    }}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" value={user?.email} disabled />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <button
                    className="button primary block"
                    onClick={() => updateProfile({ username, image_url })}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>

            <div>
                <form action="/auth/signout" method="post">
                    <button className="button block" type="submit">
                        Sign out
                    </button>
                </form>
            </div>
        </div>
    )
}
import {NextRequest, NextResponse} from "next/server"
import { createClient } from '@/src/utils/supabase/server'

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(req: NextRequest, context: { params: { mail: string } }) {
    const supabase = createClient()
    if (!context.params.mail) return NextResponse.json({message: "Mail not provided", status: 400})
    const {data,error} = await supabase.from('Users').select('*').eq('email',context.params.mail).select()
    if (error){
        return NextResponse.json({message: "Error during user fetching", status: 400})
    }
    if (data) {
        return NextResponse.json({message: "ok", status: 200, data: data})
    }
    return NextResponse.json({message: "User dont exists", status: 400})
}
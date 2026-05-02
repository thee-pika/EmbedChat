import { scalekit } from "@/src/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
    const uri = scalekit.getAuthorizationUrl(redirectUri);

    console.log(uri);
    return NextResponse.redirect(uri);
}


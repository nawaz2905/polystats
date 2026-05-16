import { NextRequest, NextResponse } from "next/server";

const ETH_ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/;
const UPSTREAM = "https://data-api.polymarket.com/trades";

export async function GET(req: NextRequest) {
    const address = req.nextUrl.searchParams.get("address");

    if (!address || !ETH_ADDRESS_RE.test(address)) {
        return NextResponse.json(
            { error: "Invalid or missing Ethereum address." },
            { status: 400 }
        );
    }

    try {
        const url = new URL(UPSTREAM);
        url.searchParams.set("user", address);
        url.searchParams.set("limit", "500");

        const upstream = await fetch(url.toString(), {
            next: { revalidate: 30 },
        });

        if (!upstream.ok) {
            return NextResponse.json(
                { error: "Upstream API error." },
                { status: 502 }
            );
        }

        const data = await upstream.json();
        return NextResponse.json(data, {
            headers: {
                "Cache-Control": "s-maxage=30, stale-while-revalidate=60",
            },
        });
    } catch {
        return NextResponse.json(
            { error: "Failed to reach Polymarket API." },
            { status: 502 }
        );
    }
}

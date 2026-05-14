import { NextRequest, NextResponse } from 'next/server'

const N8N_WEBHOOK = 'https://lxserver.zapto.org/webhook/4a8753ff-2d57-43b2-8137-a05cf8f2d8f9'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'error' }, { status: 500 })
  }
}

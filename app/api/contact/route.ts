import { NextRequest, NextResponse } from 'next/server'

const N8N_WEBHOOK = 'https://lxserver.zapto.org/webhook/c45e4bfe-d0ca-456e-a80c-1801438635d5'

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

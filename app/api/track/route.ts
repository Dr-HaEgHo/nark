import { NextRequest, NextResponse } from 'next/server'

const AFTERSHIP_API_KEY = process.env.AFTERSHIP_API_KEY || ''

export async function POST(req: NextRequest) {
  const { tracking_number, carrier } = await req.json()

  try {
    const response = await fetch(
      `https://api.aftership.com/v4/trackings/${carrier}/${tracking_number}`,
      {
        method: 'GET',
        headers: {
          'aftership-api-key': AFTERSHIP_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.meta?.message || 'Failed to fetch tracking info' }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

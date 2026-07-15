import { NextRequest, NextResponse } from 'next/server';

const configurations = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = body.id || crypto.randomUUID();

    const configuration = {
      ...body,
      id,
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    configurations.set(id, configuration);

    return NextResponse.json({ success: true, configuration });
  } catch (error) {
    console.error('Configuration save error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing configuration ID' }, { status: 400 });
  }

  const configuration = configurations.get(id);
  if (!configuration) {
    return NextResponse.json({ error: 'Configuration not found' }, { status: 404 });
  }

  return NextResponse.json({ configuration });
}

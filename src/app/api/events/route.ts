import {NextResponse, NextRequest} from 'next/server';
import {prisma} from '@/lib/prisma';

async function POST(request: any) {
  try {
    const {eventName, kilterListLink, dateRange, angle, problems} = await request.json();
    if (!eventName || !kilterListLink || !dateRange || !angle || !problems)
      return NextResponse.json({error: 'Missing required fields'}, {status: 400});
    const result = await prisma.events_list.create({
      data: {
        eventName,
        kilterListLink,
        dateRange,
        angle,
        problems: problems.map((problem: any) => ({
          name: problem.name,
          grade: problem.grade,
        })),
        maleParticipants: [],
        femaleParticipants: [],
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500});
  }
}

async function GET(request: NextRequest) {
  try {
    const eventId = request.nextUrl.searchParams.get('eventId');
    if (!eventId)
      return NextResponse.json({error: 'Missing required fields'}, {status: 400});

    let result;
    if (eventId) {
      // If an event ID is provided, find the matching event
      result = await prisma.events_list.findUnique({
        where: {
          id: eventId,
        },
      });
    } else {
      // If no event ID is provided, return all events
      result = await prisma.events_list.findMany();
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500});
  }
}

async function PUT(request: any) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({error: 'Missing required fields'}, {status: 400});

  try {
    const {eventName, kilterListLink, dateRange, angle, problems} = await request.json();
    if (!eventName || !kilterListLink || !dateRange || !angle || !problems)
      return NextResponse.json({error: 'Missing required fields'}, {status: 400});

    const result = await prisma.events_list.update({
      where: {
        id: id,
      },
      data: {
        eventName: eventName,
        kilterListLink: kilterListLink,
        dateRange: dateRange,
        angle: angle,
        problems: problems,
      },
    });
    return NextResponse.json(result, {status: 200});
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500});
  }
}

async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({error: 'Missing required fields'}, {status: 400});

  try {
    const result = await prisma.events_list.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(result, {status: 200});
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500});
  }
}

export {POST, GET, PUT, DELETE};

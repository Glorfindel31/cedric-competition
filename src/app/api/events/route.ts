import {ObjectId} from 'mongodb';
import {NextResponse, NextRequest} from 'next/server';
import {prisma} from '@/lib/prisma';

async function POST(request: any) {
  try {
    const body = await request.json();
    const {eventName, dateRange, angle, problems} = body;
    const result = await prisma.events_list.create({
      data: {
        eventName,
        dateRange,
        angle,
        problems: problems.map((problem: any) => ({
          name: problem.name,
          grade: problem.grade,
        })),
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
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  try {
    const body = await request.json();
    const {eventName, dateRange, angle, problems} = body;
    const result = await prisma.events_list.update({
      where: {
        id: id,
      },
      data: {
        eventName: eventName,
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
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  try {
    const result = await prisma.events_list.delete({
      where: {
        id: new ObjectId(id).toString(),
      },
    });
    return NextResponse.json(result, {status: 200});
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500});
  }
}

export {POST, GET, PUT, DELETE};

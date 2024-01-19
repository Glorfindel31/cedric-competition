import {NextResponse, NextRequest} from 'next/server';
import {prisma} from '@/lib/prisma';

// const body = JSON.stringify({
//   problemName: problemName,
//   userId: userId,
//   eventId: eventData.id,
//   grade: grade,
// });

async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {problemName, userId, eventId, grade} = body;

    const result = await prisma.events_list.update({
      where: {
        id: eventId,
      },
      AND: {
        user_id: userId,
      },
      data: {},
    });
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500});
  }
}

export {PUT};

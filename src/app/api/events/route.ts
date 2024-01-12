import {ObjectId} from 'mongodb';
import {NextResponse, NextRequest} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
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

// async function GET(request: NextRequest) {
//   try {
//     if (!process.env.MONGODB_URI) {
//       return new Response(JSON.stringify({message: 'MONGODB_URI not defined'}), {
//         status: 500,
//       });
//     } else {
//       const client = await MongoClient.connect(process.env.MONGODB_URI);
//       const db = client.db('competition');
//       const collection = db.collection('events_list');

//       // Extract the event ID from the request, if it exists
//       const eventId = request.nextUrl.searchParams.get('eventId');

//       let result;
//       if (eventId) {
//         // If an event ID is provided, find the matching event
//         result = await collection.findOne({_id: new ObjectId(eventId)});
//       } else {
//         // If no event ID is provided, return all events
//         result = await collection.find({}).toArray();
//       }

//       client.close();

//       return NextResponse.json(result);
//     }
//   } catch (error) {
//     return NextResponse.json({error: error}, {status: 500});
//   }
// }

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
  try {
    const body = await request.json();
    const {_id, eventName, dateRange, angle, problems} = body;

    const result = await prisma.events_list.update({
      where: {
        id: new ObjectId(_id).toString(),
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

import {MongoClient, ObjectId} from 'mongodb';
import {NextResponse, NextRequest} from 'next/server';

async function POST(request: any) {
  try {
    if (!process.env.MONGODB_URI) {
      return new Response(JSON.stringify({message: 'MONGODB_URI not defined'}), {
        status: 500,
      });
    } else {
      const body = await request.json();
      const {eventName, dateRange, angle, problems} = body;
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db('competition');
      const collection = db.collection('events_list');
      const result = await collection.insertOne({eventName, dateRange, angle, problems});
      client.close();

      return NextResponse.json(result);
    }
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500});
  }
}

async function GET(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return new Response(JSON.stringify({message: 'MONGODB_URI not defined'}), {
        status: 500,
      });
    } else {
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db('competition');
      const collection = db.collection('events_list');

      // Extract the event ID from the request, if it exists
      const eventId = request.nextUrl.searchParams.get('eventId');

      let result;
      if (eventId) {
        // If an event ID is provided, find the matching event
        result = await collection.findOne({_id: new ObjectId(eventId)});
      } else {
        // If no event ID is provided, return all events
        result = await collection.find({}).toArray();
      }

      client.close();

      return NextResponse.json(result);
    }
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500});
  }
}

async function PUT(request: any) {
  try {
    if (!process.env.MONGODB_URI) {
      return new Response(JSON.stringify({message: 'MONGODB_URI not defined'}), {
        status: 500,
      });
    } else {
      const body = await request.json();
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db('competition');
      const collection = db.collection('events_list');
      const result = await collection.updateOne(
        {
          _id: new ObjectId(body._id),
        },
        {
          $set: {
            eventName: body.eventName,
            dateRange: body.dateRange,
            angle: body.angle,
            problems: body.problems,
          },
        },
      );
      return NextResponse.json(result, {status: 200});
    }
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500});
  }
}

async function DELETE(request: any) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  try {
    if (!process.env.MONGODB_URI) {
      return new Response(JSON.stringify({message: 'MONGODB_URI not defined'}), {
        status: 500,
      });
    } else {
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db('competition');
      const collection = db.collection('events_list');
      const result = await collection.deleteOne({
        _id: new ObjectId(id),
      });
      client.close();

      return NextResponse.json(result, {status: 200});
    }
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500});
  }
}

export {POST, GET, PUT, DELETE};

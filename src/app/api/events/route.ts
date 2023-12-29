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

async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return new Response(JSON.stringify({message: 'MONGODB_URI not defined'}), {
        status: 500,
      });
    } else {
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db('competition');
      const collection = db.collection('events_list');
      const result = await collection.find({}).toArray();
      client.close();

      return NextResponse.json(result);
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

export {POST, GET, DELETE};

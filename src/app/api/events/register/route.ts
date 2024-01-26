import {NextResponse, NextRequest} from 'next/server';
import {prisma} from '@/lib/prisma';

async function PUT(request: NextRequest) {
  try {
    const {problemName, userId, eventId, grade, gender} = await request.json();

    // Fetch the event
    let event = await prisma.events_list.findUnique({
      where: {
        id: eventId,
      },
    });
    // Find if the problems exist in the participants list
    let isProblemLogged = false;
    if (event && gender === 'male') {
      const maleParticipant = event.maleParticipants.find(
        participant => participant.user_id === userId,
      );
      if (maleParticipant) {
        isProblemLogged = maleParticipant.top_list.some(
          item => item.problem === problemName,
        );
      }
    } else if (event && gender === 'female') {
      const femaleParticipant = event.femaleParticipants.find(
        participant => participant.user_id === userId,
      );
      if (femaleParticipant) {
        isProblemLogged = femaleParticipant.top_list.some(
          item => item.problem === problemName,
        );
      }
    }

    if (isProblemLogged) {
      console.error('The Problem is already registered');
      return NextResponse.json(
        {error: 'The Problem is already registered'},
        {status: 500},
      );
    }

    // Find the participant
    let participantIndex;
    let participants;
    if (event) {
      if (gender === 'male') {
        participants = event.maleParticipants;
        participantIndex = participants.findIndex(
          participant => participant.user_id === userId,
        );
      } else {
        participants = event.femaleParticipants;
        participantIndex = participants.findIndex(
          participant => participant.user_id === userId,
        );
      }
    }

    // Check if participant exists
    if (participantIndex === -1) {
      throw new Error('Participant not found');
    }

    // Push the problem to the top_list
    if (participants && participantIndex !== undefined && participantIndex !== -1) {
      const updatedParticipant = {
        ...participants[participantIndex],
        top_list: [
          ...participants[participantIndex].top_list,
          {
            problem: problemName,
            grade: grade,
          },
        ],
      };

      participants[participantIndex] = updatedParticipant;
    }

    // Save the updated event
    const result = await prisma.events_list.update({
      where: {
        id: eventId,
      },
      data: {
        ...(gender === 'male'
          ? {maleParticipants: participants}
          : {femaleParticipants: participants}),
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error(`Error occurred: ${error}`);
    return NextResponse.json({error: error}, {status: 500});
  }
}

export {PUT};

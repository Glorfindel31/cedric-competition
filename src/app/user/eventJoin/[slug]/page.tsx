import {options} from '@/api/auth/[...nextauth]/options';
import {getServerSession} from 'next-auth/next';
import {redirect} from 'next/navigation';
import {prisma} from '@/lib/prisma';
import UserEventJoinTable from '@/components/UserEventJoinTable';
import Link from 'next/link';

const Page = async ({params}: {params: {slug: string}}) => {
  const eventId = params.slug;
  const session = await getServerSession(options);
  if (!session) {
    redirect('/signIn?callbackUrl=/user');
  }
  const userData = await prisma.users_list.findUnique({
    where: {
      email: session.user.email,
    },
  });
  const eventData = await prisma.events_list.findUnique({
    where: {
      id: eventId,
    },
  });
  if (userData && eventData) {
    userData.password = '';
    const {id, gender, username} = userData as {
      id: string;
      gender: 'other' | 'male' | 'female';
      username: string;
    };
    const participants =
      gender === 'female' ? eventData.femaleParticipants : eventData.maleParticipants;
    const isUserJoined = participants.some(
      (participant: any) => participant.user_id === id,
    );

    if (!isUserJoined) {
      const participantsField =
        gender === 'female' ? 'femaleParticipants' : 'maleParticipants';

      const eventJoin = await prisma.events_list.update({
        where: {
          id: eventId,
        },
        data: {
          [participantsField]: {
            push: {
              user_id: id,
              username: username,
              top_list: [],
            },
          },
        },
      });
    }
    return (
      <main className="w-full sm:w-[600px] flex flex-col gap-4 py-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {eventData.eventName}
        </h2>
        <Link
          className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold hover:bg-primary w-fit"
          href={eventData.kilterListLink}
          target="_blank">
          Kilterboard in App list
        </Link>
        <UserEventJoinTable eventData={eventData} userId={id} gender={gender} />
      </main>
    );
  } else {
    return (
      <main className="w-full sm:w-[600px] p-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 uppercase">
          Not Found 404
        </h2>
      </main>
    );
  }
};

export default Page;

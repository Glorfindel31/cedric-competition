import prisma from '@/lib/prisma';
import {Ranking, columns} from './columns';
import {DataTable} from './data-table';

async function getRankingData(participants, category) {
  return participants
    .flat()
    .reduce((acc, participant) => {
      const existingUser = acc.find(user => user.id === participant.user_id);
      if (existingUser) {
        existingUser.points += participant.top_list.reduce(
          (total, item) => total + item.grade,
          0,
        );
        existingUser.problems_count += participant.top_list.length;
      } else {
        const points = participant.top_list.reduce(
          (total, item) => total + item.grade,
          0,
        );
        const problemsCount = participant.top_list.length;
        const userId = participant.user_id;

        const eventCount = participants.reduce((acc, event) => {
          const eventCount = event.reduce(
            (innerAcc, participant) =>
              participant.user_id === userId ? innerAcc + 1 : innerAcc,
            0,
          );
          return acc + eventCount;
        }, 0);

        acc.push({
          id: participant.user_id,
          name: participant.username,
          points,
          problems_count: problemsCount,
          event_participation: eventCount,
          category,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => b.points - a.points);
}

export default async function page() {
  const data = await prisma.events_list.findMany();
  if (data) {
    const maleParticipants = data.map(event => event.maleParticipants);
    const femaleParticipants = data.map(event => event.femaleParticipants);

    const maleRankingData = await getRankingData(maleParticipants, 'Male');
    const femaleRankingData = await getRankingData(femaleParticipants, 'Female');

    const rankingData = [...maleRankingData, ...femaleRankingData];
    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={rankingData} />
      </div>
    );
  } else {
    return <div>No data</div>;
  }
}

import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {Ranking} from '@/dashboard/columns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNewDate() {
  let date = new Date();
  let day = ('0' + date.getDate()).slice(-2);
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear();
  let hours = ('0' + date.getHours()).slice(-2);
  let minutes = ('0' + date.getMinutes()).slice(-2);
  let seconds = ('0' + date.getSeconds()).slice(-2);

  let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

export interface Participant {
  user_id: string;
  username: string;
  maleParticipants?: Participant[];
  femaleParticipants?: Participant[];
  top_list: Array<{grade: number}>;
}

// all category all event logic
export function getRankingData(participants: Participant[], category: 'Male' | 'Female') {
  // Flatten the array of participants
  let flattenedParticipants = participants.flat();

  let rankingData: Ranking[] = [];

  // Iterate over each participant
  for (let participant of flattenedParticipants) {
    // Check if the participant already exists in the ranking data
    let existingUser = rankingData.find(user => user.id === participant.user_id);

    // If the participant exists, update their points and problem count
    if (existingUser) {
      existingUser.points += participant.top_list.reduce(
        (total: number, item: {grade: number}) => total + item.grade + 1,
        0,
      );
      existingUser.problems_count += participant.top_list.length;
    } else {
      // If the participant doesn't exist, calculate their initial points and problem count
      let points = participant.top_list.reduce(
        (total: number, item: {grade: number}) => total + item.grade + 1,
        0,
      );
      let problemsCount = participant.top_list.length;

      // Calculate the number of events the participant has participated in
      let eventCount = flattenedParticipants.reduce((acc: number, eventParticipant) => {
        return eventParticipant.user_id === participant.user_id ? acc + 1 : acc;
      }, 0);

      // Add the participant to the ranking data
      rankingData.push({
        id: participant.user_id,
        name: participant.username,
        points,
        problems_count: problemsCount,
        event_participation: eventCount,
        category,
      });
    }
  }

  // Sort the ranking data by points in descending order
  rankingData.sort((a, b) => b.points - a.points);

  // add the rank after the sorting
  rankingData.forEach((item, index) => {
    item.rank = (index + 1) as number;
  });

  return rankingData;
}

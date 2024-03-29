'use client';
import {columns} from '@/dashboard/columns';
import {DataTable} from '@/dashboard/data-table';
import {getRankingData, Participant} from '@/lib/utils';
import React from 'react';
import {Badge} from '@/components/ui/badge';

interface DashboardTableProps {
  data: EventData[];
  categories: boolean;
}

interface EventData {
  dateRange: {
    from: string;
    to: string;
  };
  problems: {name: string; grade: number}[];
  maleParticipants: Participant[];
  femaleParticipants: Participant[];
  id: string;
  angle: number;
  eventName: string;
  kilterListLink: string;
}

const DashboardTableFullEvent: React.FC<DashboardTableProps> = ({data, categories}) => {
  if (data && categories === false) {
    const maleParticipants: Participant[] = data
      .flatMap(event => event?.maleParticipants)
      .filter((participant): participant is Participant => participant !== undefined);

    const femaleParticipants: Participant[] = data
      .flatMap(event => event?.femaleParticipants)
      .filter(participant => participant !== undefined) as Participant[];

    const maleRankingData = getRankingData(maleParticipants, 'Male');
    const femaleRankingData = getRankingData(femaleParticipants, 'Female');

    const rankingData = [...maleRankingData, ...femaleRankingData];
    return (
      <div className="mx-auto p-8">
        <DataTable columns={columns} data={rankingData} />
      </div>
    );
  } else if (data && categories === true) {
    const maleParticipants: Participant[] = data
      .flatMap(event => event?.maleParticipants)
      .filter(participant => participant !== undefined) as Participant[];

    const femaleParticipants: Participant[] = data
      .flatMap(event => event?.femaleParticipants)
      .filter(participant => participant !== undefined) as Participant[];

    const maleRankingData = getRankingData(maleParticipants, 'Male');
    const femaleRankingData = getRankingData(femaleParticipants, 'Female');

    return (
      <div className="mx-auto p-8">
        <Badge className="text-sm">#Male</Badge>
        <DataTable columns={columns} data={maleRankingData} key={'male'} />
        <Badge className="text-sm">#Female</Badge>
        <DataTable columns={columns} data={femaleRankingData} key={'female'} />
      </div>
    );
  } else {
    return <div>No data</div>;
  }
};

const DashboardTablePerEvent: React.FC<DashboardTableProps> = ({data, categories}) => {
  if (data && categories === false) {
    const tables = data.map(event => {
      const maleParticipants: Participant[] = event.maleParticipants;
      const femaleParticipants: Participant[] = event.femaleParticipants;
      const maleRankingData = getRankingData(maleParticipants, 'Male');
      const femaleRankingData = getRankingData(femaleParticipants, 'Female');

      const rankingData = [...maleRankingData, ...femaleRankingData];

      return (
        <div key={event.id}>
          <h2 className="my-8 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0 capitalize">
            {event.eventName}
          </h2>
          <DataTable columns={columns} data={rankingData} key={event.id} />
        </div>
      );
    });
    return <div className="container mx-auto py-10">{tables}</div>;
  } else if (data && categories === true) {
    const tables = data.map(event => {
      const maleParticipants: Participant[] = event.maleParticipants;
      const femaleParticipants: Participant[] = event.femaleParticipants;
      const maleRankingData = getRankingData(maleParticipants, 'Male');
      const femaleRankingData = getRankingData(femaleParticipants, 'Female');

      return (
        <div key={event.id}>
          <h2 className="my-8 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0 capitalize">
            {event.eventName}
          </h2>
          <Badge className="text-sm">#Male</Badge>
          <DataTable columns={columns} data={maleRankingData} key={event.id + 'Male'} />
          <Badge className="text-sm">#Female</Badge>
          <DataTable
            columns={columns}
            data={femaleRankingData}
            key={event.id + 'Female'}
          />
        </div>
      );
    });

    return <div className="container mx-auto py-10">{tables}</div>;
  } else {
    return <div>No data</div>;
  }
};

export {DashboardTableFullEvent, DashboardTablePerEvent};

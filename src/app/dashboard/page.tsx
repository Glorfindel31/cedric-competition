import prisma from '@/lib/prisma';
import {
  DashboardTableFullEvent,
  DashboardTablePerEvent,
} from '@/components/DashboardTable';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

export default async function page() {
  const data = await prisma.events_list.findMany();
  if (data) {
    return (
      <Tabs defaultValue="01" className="my-8">
        <TabsList>
          <TabsTrigger value="01">All Scores</TabsTrigger>
          <TabsTrigger value="02">All Scores / Categories</TabsTrigger>
          <TabsTrigger value="03">Per Events</TabsTrigger>
          <TabsTrigger value="04">Per Events / Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="01">
          <Card>
            <CardHeader>
              <CardTitle>All Scores</CardTitle>
              <CardDescription>- General Ranking -</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <DashboardTableFullEvent data={data} categories={false} />
            </CardContent>
            <CardFooter>You can filter by name, category, etc.</CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="02">
          <Card>
            <CardHeader>
              <CardTitle>All Scores / Categories</CardTitle>
              <CardDescription>- General Ranking By Category -</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <DashboardTableFullEvent data={data} categories={true} />
            </CardContent>
            <CardFooter>You can filter by name, category, etc.</CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="03">
          <Card>
            <CardHeader>
              <CardTitle>All Events</CardTitle>
              <CardDescription>- General Ranking -</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <DashboardTablePerEvent data={data} categories={false} />
            </CardContent>
            <CardFooter>You can filter by name, category, etc.</CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="04">
          <Card>
            <CardHeader>
              <CardTitle>All Events</CardTitle>
              <CardDescription>- General Ranking -</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <DashboardTablePerEvent data={data} categories={true} />
            </CardContent>
            <CardFooter>You can filter by name, category, etc.</CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    );
  } else {
    return <div>No data</div>;
  }
}

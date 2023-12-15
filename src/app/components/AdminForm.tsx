import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import DatePicker from '@components/DatePicker';
import {Button} from '@/components/ui/button';
import AngleSelector from '@/components/AngleSelector';
import ProblemsInputs from './ProblemsInputs';

export default function AdminForm() {
  return (
    <>
      <Label htmlFor="eventName">Enter your event&apos;s name</Label>
      <Input id="eventName" type="text" placeholder="Your event name" className="mb-4" />
      <DatePicker className="mb-4" />
      <Label htmlFor="angle">Select angle</Label>
      <AngleSelector />
      <ProblemsInputs />
      <Button variant="secondary">Submit</Button>
    </>
  );
}

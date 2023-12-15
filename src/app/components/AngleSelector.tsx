import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AngleSelector() {
  return (
    <div id="angle" className="mb-4">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Angle" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="20">20°</SelectItem>
          <SelectItem value="25">25°</SelectItem>
          <SelectItem value="30">30°</SelectItem>
          <SelectItem value="35">35°</SelectItem>
          <SelectItem value="40">40°</SelectItem>
          <SelectItem value="45">45°</SelectItem>
          <SelectItem value="50">50°</SelectItem>
          <SelectItem value="55">55°</SelectItem>
          <SelectItem value="60">60°</SelectItem>
          <SelectItem value="65">65°</SelectItem>
          <SelectItem value="70">70°</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

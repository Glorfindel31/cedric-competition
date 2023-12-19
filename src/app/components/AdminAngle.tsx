'use client';
import {FormControl, FormField, FormItem, FormLabel} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {FormFieldProps} from './AdminForm';

export default function AdminAngle({control, name}: FormFieldProps) {
  const ANGLE_VALUES = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];
  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem>
          <FormLabel>Select angle</FormLabel>
          <FormControl>
            <div id="angle" className="mb-4">
              <Select onValueChange={value => field.onChange(Number(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Angle" />
                </SelectTrigger>
                <SelectContent>
                  {ANGLE_VALUES.map(angle => (
                    <SelectItem key={angle} value={angle.toString()}>
                      {angle}°
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

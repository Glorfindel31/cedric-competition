'use client';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {FormFieldProps} from './AdminForm';
import {useFormContext} from 'react-hook-form';

export default function AdminAngle({control, name}: FormFieldProps) {
  const ANGLE_VALUES = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];
  const {watch} = useFormContext();
  const watchedFieldValue = watch(name);

  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem>
          <FormLabel>Select angle</FormLabel>
          <div id="angle" className="mb-4">
            <Select
              onValueChange={value => {
                field.onChange(Number(value));
              }}
            >
              <FormControl>
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder={
                      watchedFieldValue ? `${watchedFieldValue}°` : 'Select Angle'
                    }
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {ANGLE_VALUES.map(angle => (
                  <SelectItem key={angle} value={angle.toString()}>
                    {angle}°
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

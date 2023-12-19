'use client';
import {FormField} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {FormFieldProps} from './AdminForm';

export default function AdminProblemsGrade({control, name}: FormFieldProps) {
  const GRADE_VALUES = Array.from({length: 13}, (_, i) => i);

  return (
    <FormField
      name={name}
      control={control}
      defaultValue={0}
      render={({field}) => (
        <Select
          {...field}
          value={field.value.toString()}
          onValueChange={value => {
            field.onChange(Number(value));
          }}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="Grade V Scale" />
          </SelectTrigger>
          <SelectContent>
            {GRADE_VALUES.map(grade => (
              <SelectItem key={grade} value={grade.toString()}>
                V{grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}

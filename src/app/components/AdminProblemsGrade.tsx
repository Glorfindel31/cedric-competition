'use client';
import {FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {FormFieldProps} from './AdminForm';
import {useFormContext} from 'react-hook-form';
import {useEffect, useState} from 'react';

export default function AdminProblemsGrade({control, name}: FormFieldProps) {
  const GRADE_VALUES = Array.from({length: 13}, (_, i) => i);
  const {watch} = useFormContext();
  const watchedFieldValue = watch(name);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  useEffect(() => {
    setSelectedValue(watchedFieldValue);
  }, [watchedFieldValue]);

  return (
    <FormField
      name={name}
      control={control}
      render={({field}) => (
        <FormItem>
          <Select
            onValueChange={value => {
              field.onChange(Number(value));
              setSelectedValue(Number(value));
            }}
          >
            <FormControl>
              <SelectTrigger className="w-[80px]">
                <SelectValue
                  placeholder={
                    selectedValue !== null && selectedValue !== undefined
                      ? `V${selectedValue}`
                      : 'Select Grade'
                  }
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {GRADE_VALUES.map(grade => (
                <SelectItem key={grade} value={grade.toString()}>
                  V{grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

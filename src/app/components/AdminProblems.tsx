'use client';
import {AdminProblemsProps} from './AdminForm';
import AdminProblemsGrade from './AdminProblemsGrade';
import {Button} from '@/components/ui/button';
import {Plus, Minus} from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Badge} from '@/components/ui/badge';

export default function AdminProblems({
  control,
  name,
  fields,
  append,
  remove,
  register,
}: AdminProblemsProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem>
          <FormLabel>Problems</FormLabel>

          <div className="flex flex-col">
            {fields.map((fieldItem, index) => (
              <FormField
                key={fieldItem.id}
                control={control}
                name={`problems.${index}.name`}
                render={({field}) => (
                  <FormItem>
                    <div
                      key={fieldItem.id}
                      className="flex flex-row items-center gap-2 mb-2"
                    >
                      <Badge variant="outline" className="w-10">
                        #{index + 1}
                      </Badge>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(event: {preventDefault: () => void}) => {
                          event.preventDefault();
                          append({name: '', grade: undefined});
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={index === 0} // Disable the button for the first field
                        onClick={event => {
                          event.preventDefault();
                          if (index > 0) {
                            // Only remove the field if it's not the first one
                            remove(index);
                          }
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <FormControl>
                        <Input
                          {...field}
                          {...register(`problems.${index}.name`)}
                          placeholder="In app problem name"
                        />
                      </FormControl>
                      <FormMessage />
                      <AdminProblemsGrade
                        control={control}
                        name={`problems.${index}.grade`}
                      />
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </FormItem>
      )}
    />
  );
}

'use client';
import {useState} from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Plus, Minus} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

export default function ProblemsInputs() {
  const [inputs, setInputs] = useState([{id: 1, value: ''}]);
  const [isFilled, setIsFilled] = useState(false);
  const [canRemoveInput, setCanRemoveInput] = useState(false);

  const addInput = () => {
    if (isFilled) {
      setInputs([...inputs, {id: inputs.length + 1, value: ''}]);
      setCanRemoveInput(true);
      let element = document.getElementById('input-1');
      if (element) {
        element.style.borderColor = '';
      }
    } else {
      // Change the border color of the input to red.
      let element = document.getElementById('input-1');
      if (element) {
        element.style.borderColor = 'red';
      }
    }
  };

  const removeInput = (indexToRemove: number) => {
    if (indexToRemove !== 0) {
      // Prevent removing the first input
      setInputs(inputs.filter((_, index) => index !== indexToRemove));
    }
  };

  return (
    <div className="flex flex-col">
      {inputs.map((input, index) => (
        <div key={index} className="flex flex-row items-center gap-2 mb-2">
          <Button variant="outline" size="icon" onClick={addInput}>
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => removeInput(index)}>
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            id={`input-${input.id}`}
            type="text"
            placeholder="In app problem name"
            value={input.value}
            onChange={e => {
              const newInputs = [...inputs];
              newInputs[index].value = e.target.value;
              setInputs(newInputs);
              // Set the `isFilled` variable to true if the input is not empty.
              if (e.target.value !== '') {
                setIsFilled(true);
              }
            }}
          />
          <Select>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Grade V Scale" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">V0</SelectItem>
              <SelectItem value="1">V1</SelectItem>
              <SelectItem value="2">V2</SelectItem>
              <SelectItem value="3">V3</SelectItem>
              <SelectItem value="4">V4</SelectItem>
              <SelectItem value="5">V5</SelectItem>
              <SelectItem value="6">V6</SelectItem>
              <SelectItem value="7">V7</SelectItem>
              <SelectItem value="8">V8</SelectItem>
              <SelectItem value="9">V9</SelectItem>
              <SelectItem value="10">V10</SelectItem>
              <SelectItem value="11">V11</SelectItem>
              <SelectItem value="12">V12</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}

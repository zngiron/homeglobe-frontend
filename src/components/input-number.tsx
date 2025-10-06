import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InputNumberProps {
  value?: number;
  onValueChange?: (value: number) => void;
}

export function InputNumber({ value = 0, onValueChange }: InputNumberProps) {
  return (
    <Select onValueChange={(value) => onValueChange?.(Number(value))}>
      <SelectTrigger
        defaultValue={value}
        className="w-full cursor-pointer"
      >
        <SelectValue placeholder={value} />
      </SelectTrigger>
      <SelectContent>
        {Array.from({
          length: 11,
        }).map((_, i) => (
          <SelectItem
            key={i.toString()}
            value={i.toString()}
          >
            {i.toString()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

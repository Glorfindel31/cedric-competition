'use client';
import {Text, Flex, Switch} from '@radix-ui/themes';
import {useTheme} from 'next-themes';

export default function ToggleBtn() {
  const {theme, setTheme} = useTheme();

  const handleToggle = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <Text as="label" size="2">
      <Flex gap="2">
        <Switch defaultChecked={theme === 'light'} onCheckedChange={handleToggle} /> Dark
        Mode
      </Flex>
    </Text>
  );
}

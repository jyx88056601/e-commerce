import { Switch, Text, useColorMode, VStack } from '@chakra-ui/react';

const ThemeModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode(); // toggleColorMode : toggle, colorMode: currentColor
  return (
    <VStack>
      <Switch
        colorScheme="teal"
        isChecked={colorMode === 'dark'}
        onChange={toggleColorMode}
      ></Switch>
      <Text whiteSpace="nowrap" color="white">
        Dark Mode
      </Text>
    </VStack>
  );
};

export default ThemeModeSwitch;

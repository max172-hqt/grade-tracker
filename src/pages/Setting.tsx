import { Box, Text, HStack, useColorMode } from 'native-base';
import { Switch } from 'react-native';

export default function SettingsScreen() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      _dark={{
        bg: 'coolGray.900',
      }}
      flex={1}
      alignItems="center"
      p={4}
    >
      <HStack alignItems="center">
        <Text fontSize="md" fontWeight="bold" flex="1">
          Toggle Dark Mode
        </Text>
        <HStack alignItems="center" space="2">
          <Text fontWeight="bold" color="gray.500">
            {colorMode && colorMode.charAt(0).toUpperCase() + colorMode.slice(1)}
          </Text>
          <Switch value={colorMode === 'dark'} onValueChange={() => toggleColorMode()} />
        </HStack>
      </HStack>
    </Box>
  );
}

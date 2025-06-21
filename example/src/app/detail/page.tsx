'use client';
import { Title, Text, Paper, Stack, Code, Button, List } from '@mantine/core';
import { NavigationLink } from 'next-navigation-progress';

export default function DetailPage() {
  return (
    <Stack gap="xl">
      <div>
        <Title order={1}>Detail Page</Title>
        <Text c="dimmed" mt="sm">
          Implementation details and code examples
        </Text>
      </div>

      <Paper shadow="sm" p="md" withBorder>
        <Title order={3} mb="md">How It Works</Title>
        <List spacing="sm">
          <List.Item>Uses React 19's `useOptimistic` for immediate UI updates</List.Item>
          <List.Item>Implements smooth easing animations with custom timing</List.Item>
          <List.Item>Automatically manages progress state during navigation</List.Item>
          <List.Item>Zero dependencies for minimal bundle impact</List.Item>
        </List>
      </Paper>

      <Paper shadow="sm" p="md" withBorder>
        <Title order={3} mb="md">Quick Implementation</Title>
        <Text size="sm" mb="sm">Add to your root layout:</Text>
        <Code block>{`'use client';

import { 
  NextNavigationProgressProvider,
  NextNavigationProgressBar,
  NavigationLink 
} from 'next-navigation-progress';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NextNavigationProgressProvider>
          <NextNavigationProgressBar />
          {children}
        </NextNavigationProgressProvider>
      </body>
    </html>
  );
}`}</Code>
      </Paper>

      <Paper shadow="sm" p="md" withBorder>
        <Title order={4} mb="md">Continue Exploring</Title>
        <Stack>
          <NavigationLink href="/">
            <Button fullWidth variant="light">Back to Home</Button>
          </NavigationLink>
          <NavigationLink href="/profile">
            <Button fullWidth variant="outline">Go to Profile</Button>
          </NavigationLink>
        </Stack>
      </Paper>
    </Stack>
  );
}

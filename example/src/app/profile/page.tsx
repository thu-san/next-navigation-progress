'use client';
import { Title, Text, Paper, Stack, Avatar, Button } from '@mantine/core';
import { NavigationLink } from 'next-navigation-progress';

export default function ProfilePage() {
  return (
    <Stack gap="xl">
      <div>
        <Title order={1}>Profile Page</Title>
        <Text c="dimmed" mt="sm">
          Navigate between pages to see the progress bar in action
        </Text>
      </div>

      <Paper shadow="sm" p="lg" withBorder>
        <Stack align="center" gap="md">
          <Avatar size={120} radius="xl" color="blue">
            JD
          </Avatar>
          <div style={{ textAlign: 'center' }}>
            <Title order={3}>John Doe</Title>
            <Text c="dimmed">john.doe@example.com</Text>
          </div>
          <Text size="sm" c="dimmed" style={{ textAlign: 'center', maxWidth: 400 }}>
            This is a demo profile page. Click the buttons below to navigate to other pages
            and watch the progress bar animate during route transitions.
          </Text>
        </Stack>
      </Paper>

      <Paper shadow="sm" p="md" withBorder>
        <Title order={4} mb="md">Navigate to Other Pages</Title>
        <Stack>
          <NavigationLink href="/">
            <Button fullWidth variant="light">Back to Home</Button>
          </NavigationLink>
          <NavigationLink href="/detail">
            <Button fullWidth variant="outline">Go to Detail Page</Button>
          </NavigationLink>
        </Stack>
      </Paper>
    </Stack>
  );
}

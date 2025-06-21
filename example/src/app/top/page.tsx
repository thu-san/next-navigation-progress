'use client';
import { Button, NumberInput, Title, Text, Paper, Stack, Group, Badge } from '@mantine/core';
import { NavigationLink, useNavigationProgress } from 'next-navigation-progress';
import { startTransition, useState } from 'react';

export default function Home() {
  return (
    <Stack gap="xl">
      <div>
        <Title order={1}>Next Navigation Progress Demo</Title>
        <Text c="dimmed" mt="sm">
          A lightweight navigation progress bar for Next.js with React 19
        </Text>
      </div>

      <Paper shadow="sm" p="md" withBorder>
        <Title order={3} mb="md">Navigation Examples</Title>
        <Group>
          <NavigationLink href="/profile">
            <Button variant="filled">Go to Profile</Button>
          </NavigationLink>
          <NavigationLink href="/detail">
            <Button variant="light">Go to Detail</Button>
          </NavigationLink>
        </Group>
      </Paper>

      <Paper shadow="sm" p="md" withBorder>
        <Title order={3} mb="md">Custom Progress Control</Title>
        <NextNavigationProgressSample />
      </Paper>

      <Paper shadow="sm" p="md" withBorder>
        <Title order={3} mb="md">Features</Title>
        <Stack gap="xs">
          <Group gap="xs">
            <Badge color="blue">React 19</Badge>
            <Text size="sm">Uses latest React features</Text>
          </Group>
          <Group gap="xs">
            <Badge color="green">Zero Dependencies</Badge>
            <Text size="sm">Lightweight ~2KB gzipped</Text>
          </Group>
          <Group gap="xs">
            <Badge color="purple">TypeScript</Badge>
            <Text size="sm">Full type safety</Text>
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}

const NextNavigationProgressSample = () => {
  const { progress, startNewProgress, optimisticObj, stateObj } =
    useNavigationProgress();

  const [customTimeout, setCustomTimeout] = useState(2000);

  return (
    <Stack>
      <Group grow>
        <div>
          <Text size="sm" fw={500}>Loading State</Text>
          <Badge color={optimisticObj.loading ? 'green' : 'gray'}>
            {optimisticObj.loading ? 'Active' : 'Idle'}
          </Badge>
        </div>
        <div>
          <Text size="sm" fw={500}>Progress Bar</Text>
          <Badge color={stateObj.showing ? 'blue' : 'gray'}>
            {stateObj.showing ? 'Visible' : 'Hidden'}
          </Badge>
        </div>
        <div>
          <Text size="sm" fw={500}>Progress</Text>
          <Badge color="purple">{progress}%</Badge>
        </div>
      </Group>

      <NumberInput
        label="Simulation Duration"
        value={customTimeout}
        onChange={(e) => setCustomTimeout(parseInt(String(e)) || 2000)}
        suffix=" ms"
        min={500}
        max={10000}
        step={500}
      />

      <Button
        onClick={() => {
          startTransition(async () => {
            startNewProgress();
            await new Promise((resolve) => setTimeout(resolve, customTimeout));
          });
        }}
        fullWidth
      >
        Start Custom Progress Simulation
      </Button>

      <Text size="xs" c="dimmed">
        This simulates a loading state for the specified duration. Watch the progress bar animate!
      </Text>
    </Stack>
  );
};
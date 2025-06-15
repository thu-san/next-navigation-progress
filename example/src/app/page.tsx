'use client';
import { Button, NumberInput } from '@mantine/core';
import { useNavigationProgress } from '../lib/next-navigation-progress';
import { startTransition, useState } from 'react';

export default function Home() {
  return (
    <>
      <div>Home</div>
      <br />
      <hr />
      <br />
      <h3>Custom Loading</h3>
      <br />
      <NextNavigationProgressSample />
    </>
  );
}

const NextNavigationProgressSample = () => {
  const { progress, startNewProgress, optimisticObj, stateObj } =
    useNavigationProgress();

  const [customTimeout, setCustomTimeout] = useState(2000);

  return (
    <>
      <p>Loading - {optimisticObj.loading ? 'true' : 'false'}</p>
      <p>Showing - {stateObj.showing ? 'true' : 'false'}</p>
      <p>Progress - {progress}</p>
      <br />
      <NumberInput
        value={customTimeout}
        onChange={(e) => setCustomTimeout(parseInt(String(e)))}
        suffix=" ms"
      />
      <br />
      <Button
        onClick={() => {
          startTransition(async () => {
            startNewProgress();
            await new Promise((resolve) => setTimeout(resolve, customTimeout));
          });
        }}
      >
        Start Loading
      </Button>
    </>
  );
};

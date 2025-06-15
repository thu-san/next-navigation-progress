'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo, startTransition } from 'react';

import { useNavigationProgress } from './next-navigation-progress';

export default memo(function NavigationLink({
  children,
  className,
  href,
  target,
  onClick,
  prefetch,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  prefetch?: boolean;
  style?: React.CSSProperties;
}) {
  const router = useRouter();
  const { startNewProgress } = useNavigationProgress();

  return (
    <Link
      prefetch={prefetch}
      className={className}
      href={href}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
          return;
        }

        startTransition(async () => {
          startNewProgress();
          router.push(href);
        });
      }}
      target={target}
      style={style}
    >
      {children}
    </Link>
  );
});

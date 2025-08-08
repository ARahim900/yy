
import React from 'react';
import { Page } from './constants';

export interface NavItem {
  name: Page;
  icon: (props: { className?: string }) => React.ReactNode;
}
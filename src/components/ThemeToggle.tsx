'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { trackThemeToggle } from '@/lib/analytics';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    toggleTheme();
    trackThemeToggle(newTheme);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg bg-surface border border-border hover:border-accent transition-all group relative"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-text-secondary group-hover:text-accent transition-colors" />
      ) : (
        <Sun size={20} className="text-text-secondary group-hover:text-accent transition-colors" />
      )}

      {/* Tooltip */}
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-surface border border-border text-text text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {theme === 'light' ? 'Dark mode' : 'Light mode'}
      </span>
    </button>
  );
}

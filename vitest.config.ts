import { configDefaults, defineConfig } from 'vitest/config';

// Exclude only. No plugins, so still no JSX transform: tests cannot import .tsx.
export default defineConfig({
  test: {
    // A leftover Claude Code worktree holds a full copy of src/, which would double the run.
    exclude: [...configDefaults.exclude, '.claude/worktrees/**'],
  },
});

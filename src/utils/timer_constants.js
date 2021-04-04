import { generateDurations } from "./timer";

export const ONE_SECOND = 1000;

/**
 * Odd indices are the pauses and even indices the duration
 */
export const FINISH_PATTERN = [
  // Start immediately
  0 * ONE_SECOND,

  0.5 * ONE_SECOND,
  0 * ONE_SECOND,
  0.5 * ONE_SECOND,

  0.5 * ONE_SECOND,

  0.5 * ONE_SECOND,
  0 * ONE_SECOND,
  0.5 * ONE_SECOND,
];

export const RESET_PATTERN = [0 * ONE_SECOND, 0.125 * ONE_SECOND];

export const ROUNDS = [
  { id: 1, round: 1 },
  { id: 2, round: 2 },
  { id: 3, round: 3 },
  { id: 4, round: 4 },
];
export const WORK_TIMERS = generateDurations(20, 60, 10, "work");
export const BREAK_TIMERS = generateDurations(5, 30, 5, "break");

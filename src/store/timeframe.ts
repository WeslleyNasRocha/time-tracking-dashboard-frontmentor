import { writable } from "svelte/store";

export type AvailableTimeframe = "weekly" | "daily" | "monthly";

export const selectedTimeframe = writable<AvailableTimeframe>("weekly");

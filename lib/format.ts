/** Indian-style rupee formatting, e.g. 7500000 -> ₹75,00,000 */
export function formatINR(value: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

export function formatNumber(value: number, grouping = true) {
  return new Intl.NumberFormat('en-IN', { useGrouping: grouping }).format(value);
}

export function percent(raised: number, goal: number) {
  if (!goal) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
}

export const TYPES: { name: string; key: string }[] = [
  { name: 'Crédito', key: 'C' },
  { name: 'Dédito', key: 'D' },
];

export const FINANCE_NOTES_FILTER_FIELDS = [
  'users.full_name',
  'date',
  'type',
  'finance_categories.name',
  'value',
];

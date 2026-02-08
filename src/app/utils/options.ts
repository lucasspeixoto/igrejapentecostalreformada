export const TYPES: { name: string; key: string }[] = [
  { name: 'Crédito', key: 'C' },
  { name: 'Débito', key: 'D' },
];

export const FINANCE_NOTES_FILTER_FIELDS = [
  'users.full_name',
  'date',
  'type',
  'finance_categories.name',
  'value',
];

export const SEMINAR_IDS = [
  '0ef2bfa4-6930-4fe3-92f1-7255c5f2818f',
  '3e7d0fc7-f253-43bc-9af3-529726936e58',
  '58f22367-5dcd-44df-8889-da79f4b56401',
  '5ff7e8dc-fa61-4431-b045-39d2a4cb88ce',
  '7d89aa42-fe6c-49e1-895e-75a3e4775336',
];

export const ORGANIC_CREDIT_IDS = [
  '8201e81e-85b8-4f7b-b981-b080d169d098',
  'e44e7b9c-138b-4218-afa9-90f2dbd68fb1',
];

export const NOTES_IDS_TO_CONCAT = [
  '8201e81e-85b8-4f7b-b981-b080d169d098', // Dízimo
  '7d89aa42-fe6c-49e1-895e-75a3e4775336', // Seminário I
  '5ff7e8dc-fa61-4431-b045-39d2a4cb88ce', // Seminário II
  '3e7d0fc7-f253-43bc-9af3-529726936e58', // Seminário III
  '58f22367-5dcd-44df-8889-da79f4b56401', // Seminário IIII
];

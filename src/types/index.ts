export type FeedingType = 'formula' | 'breastfeeding-direct' | 'breastfeeding-bottle';

export interface FeedingData {
  type: FeedingType;
  amount?: number; // 毫升
}

export interface PoopData {
  shape: string;
  color: string;
}

export interface Record {
  id: string;
  type: 'feeding' | 'poop';
  timestamp: number;
  data: FeedingData | PoopData;
}

export const POOP_SHAPES = ['软便', '硬便', '糊状便', '水样便', '成形便'];
export const POOP_COLORS = ['黄色', '绿色', '棕色', '黑色', '灰白色'];
export const FEEDING_TYPES: { value: FeedingType; label: string }[] = [
  { value: 'formula', label: '奶粉' },
  { value: 'breastfeeding-direct', label: '母乳-亲喂' },
  { value: 'breastfeeding-bottle', label: '母乳-瓶喂' },
];

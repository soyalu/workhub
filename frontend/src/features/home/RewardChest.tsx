import { Gift } from 'lucide-react';
import { OptionalArt } from './OptionalArt';

export type RewardStatus = 'locked' | 'charging' | 'available' | 'claimed';

const fileName:Record<RewardStatus,string> = {
  locked:'chest-closed.webp',
  charging:'chest-charged.webp',
  available:'chest-opened.webp',
  claimed:'chest-closed.webp',
};

/** No state transitions occur until confirmed work events are supplied. */
export function RewardChest({ status='locked' }: {status?:RewardStatus}) {
  return <span className={'reward-chest-art reward-chest-'+status}
    data-reward-status={status}
    aria-label={status==='locked'?'奖励尚未解锁':'奖励状态：'+status}>
    <OptionalArt src={'/art/rewards/'+fileName[status]}
      fallback={<Gift size={27} strokeWidth={1.8} aria-hidden="true"/>}/>
  </span>;
}

import { Gift } from 'lucide-react';
import { OptionalArt } from './OptionalArt';
import { motion } from 'motion/react';

export type RewardStatus = 'locked' | 'charging' | 'available' | 'claimed';

const fileName:Record<RewardStatus,string> = {
  locked:'chest-closed.webp',
  charging:'chest-charged.webp',
  available:'chest-opened.webp',
  claimed:'chest-closed.webp',
};

/** No state transitions occur until confirmed work events are supplied. */
export function RewardChest({ status='locked' }: {status?:RewardStatus}) {
  return <motion.span className={'reward-chest-art reward-chest-'+status}
    data-reward-status={status}
    aria-label={status==='locked'?'奖励尚未解锁':'奖励状态：'+status}
    animate={status==='available' ? {scale:[1,1.13,1]} : {scale:1}}
    transition={{duration:.8,ease:'easeOut'}}>
    <OptionalArt src={'/art/rewards/'+fileName[status]}
      fallback={<Gift size={27} strokeWidth={1.8} aria-hidden="true"/>}/>
  </motion.span>;
}

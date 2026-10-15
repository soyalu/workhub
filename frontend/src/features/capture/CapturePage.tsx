import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Feather, Info } from 'lucide-react';
import { PageBanner } from '../../components/fantasy/PageBanner';
import { FantasyCard } from '../../components/fantasy/FantasyCard';
import { StatusBadge } from '../../components/fantasy/StatusBadge';

export function CapturePage() {
  const [query]=useSearchParams();
  const date=query.get('date') || '';
  const kind=query.get('kind') || '';
  const kindLabels: Record<string, string> = {
    task: '工作任务',
    idea: '灵感想法',
    question: '待解决问题',
    meeting: '会议交流',
    todo: '待办事项',
    material: '材料编写',
  };
  const [text,setText]=useState('');
  const [preview,setPreview]=useState('');
  return (
    <>
      <PageBanner eyebrow="QUICK CAPTURE" title="快速录入" description="只需随手记一句。未来由系统识别上下文、判断是否有效，并精准追问必要信息。"/>
      <div className="capture-layout">
        <FantasyCard title="写下正在发生的事" icon={Feather}>
          <label className="capture-field" htmlFor="capture-text">工作记录原文</label>
          {date && <div className="capture-context">来自 {date} 的补录入口。日期是补录上下文，实际发生时间仍需核实。</div>}
          {kindLabels[kind] && <div className="capture-context">快捷入口：{kindLabels[kind]}。当前仅用于标识录入意图，尚未自动分类或保存。</div>}
          <textarea id="capture-text" rows={5} value={text} onChange={e=>setText(e.target.value)} placeholder="例如：今天下午与销售沟通某项目，讨论了下周技术交流安排……"/>
          <div className="capture-actions"><button type="button" className="primary-link" disabled={!text.trim()} onClick={()=>setPreview(text.trim())}>预览输入（不保存）</button></div>
          {preview && <div className="capture-result"><StatusBadge tone="amber">未保存 / 未校验</StatusBadge><p>{preview}</p><span>此版本只验证界面输入，尚无后端数据持久化或智能追问，不会生成有效工作记录。</span></div>}
        </FantasyCard>
        <FantasyCard title="最低干扰原则" icon={Info}>
          <ul className="principle-list">
            <li>输入不完整时先暂存原文，不能直接变成已完成工作。</li>
            <li>能利用已有上下文补全时，避免重复追问。</li>
            <li>会议缺少主题或实际时间时，需要询问关键事实。</li>
            <li>未补齐信息应保留待补充状态并可恢复清理。</li>
          </ul>
        </FantasyCard>
      </div>
    </>
  );
}

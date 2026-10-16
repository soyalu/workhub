import { Link, useSearchParams } from 'react-router-dom';
import { BookOpenText, CalendarDays, Feather } from 'lucide-react';
import { PageBanner } from '../../components/fantasy/PageBanner';
import { FantasyCard } from '../../components/fantasy/FantasyCard';
import { EmptyState } from '../../components/fantasy/EmptyState';
import { StatusBadge } from '../../components/fantasy/StatusBadge';
import { mockDataNotice, previewJournal } from '../../mocks/preview';

const exampleDates=Object.keys(previewJournal).sort().reverse();

export function JournalPage() {
  const [query,setQuery]=useSearchParams();
  const selected=query.get('date') || new Date().toLocaleDateString('en-CA');
  const events=previewJournal[selected] || [];
  function selectDate(date:string) {setQuery({date});}
  return (
    <>
      <PageBanner eyebrow="TRAVELER'S JOURNAL" title="每日工作日志" description="历史时间轴、指定日期快速定位；有效工作事件将形成可编辑、可确认的日志草稿。"
        action={<Link to={'/capture?date='+encodeURIComponent(selected)} className="primary-link"><Feather size={16}/> 补录当天工作</Link>}/>
      <div className="journal-layout">
        <FantasyCard title="历史日志时间轴" icon={BookOpenText} className="journal-history">
          <label className="date-field">快速跳转日期
            <input type="date" value={/^\d{4}-\d{2}-\d{2}$/.test(selected)?selected:''} onChange={(e)=>{if(e.target.value) selectDate(e.target.value);}} />
          </label>
          <div className="timeline-list">{exampleDates.map(date=>(
            <button key={date} type="button" className={'timeline-date '+(selected===date?'is-selected':'')} onClick={()=>selectDate(date)}>
              <span className="timeline-pin"/><strong>{date}</strong><small>{previewJournal[date].length} 项演示工作</small>
            </button>
          ))}</div>
        </FantasyCard>
        <FantasyCard title={selected+' 工作日志'} icon={BookOpenText} action={<Link className="text-link" to={'/calendar'}><CalendarDays size={14}/> 返回日历 →</Link>}>
          {events.length?<>
            <div className="journal-draft-banner"><StatusBadge tone="amber">模拟草稿</StatusBadge><span>以下内容未确认，不属于正式工作日志。</span></div>
            <ol className="journal-entry-list">{events.map((event,index)=>(
              <li key={index}><span className="journal-entry-kind">{event.category}</span><p>{event.text}</p></li>
            ))}</ol>
            <div className="journal-note">正式版本将支持来源追溯、人工编辑、确认、历史修订及月度汇总。</div>
          </>:<EmptyState title="这一天暂无有效日志" description="可以从选中日期补录工作；正式系统中未补齐的输入将留在待补充收件箱。"/>}
          <p className="mock-notice">{mockDataNotice}</p>
        </FantasyCard>
      </div>
    </>
  );
}

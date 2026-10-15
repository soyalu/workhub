import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageBanner } from '../../components/fantasy/PageBanner';
import { FantasyCard } from '../../components/fantasy/FantasyCard';
import { StatusBadge } from '../../components/fantasy/StatusBadge';
import { mockDataNotice, previewJournal } from '../../mocks/preview';

const weekdays=['一','二','三','四','五','六','日'];
function dateKey(date: Date): string {
  const year=date.getFullYear(), month=String(date.getMonth()+1).padStart(2,'0'), day=String(date.getDate()).padStart(2,'0');
  return year+'-'+month+'-'+day;
}
function displayDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'long',day:'numeric',weekday:'long'}).format(date);
}

export function CalendarPage() {
  const [selected,setSelected]=useState(new Date());
  const [month,setMonth]=useState(new Date(selected.getFullYear(),selected.getMonth(),1));
  const cells=useMemo(()=>{
    const offset=(month.getDay()+6)%7;
    return Array.from({length:42},(_,i)=>new Date(month.getFullYear(),month.getMonth(),i-offset+1));
  },[month]);
  function moveMonth(step:number) {setMonth(new Date(month.getFullYear(),month.getMonth()+step,1));}
  return (
    <>
      <PageBanner eyebrow="JOURNEY PLANNER" title="工作日历" description="安排未来，回顾实际工作；从任何日期进入对应日志或补录入口。"/>
      <div className="calendar-layout">
        <FantasyCard title="旅程日历" icon={CalendarDays} action={
          <div className="calendar-controls">
            <button className="icon-button" type="button" onClick={()=>moveMonth(-1)} aria-label="上个月"><ChevronLeft size={17}/></button>
            <strong>{month.getFullYear()}年{month.getMonth()+1}月</strong>
            <button className="icon-button" type="button" onClick={()=>moveMonth(1)} aria-label="下个月"><ChevronRight size={17}/></button>
            <button className="filter-button" type="button" onClick={()=>{setSelected(new Date());setMonth(new Date(new Date().getFullYear(),new Date().getMonth(),1));}}>今天</button>
          </div>
        }>
          <div className="calendar-grid" role="grid" aria-label="工作日历月视图">
            {weekdays.map(w=><div className="calendar-weekday" role="columnheader" key={w}>周{w}</div>)}
            {cells.map((day)=>{
              const key=dateKey(day);
              const hasExample=Object.prototype.hasOwnProperty.call(previewJournal,key);
              const currentMonth=day.getMonth()===month.getMonth();
              const isSelected=key===dateKey(selected);
              return <button type="button" key={key} role="gridcell" aria-selected={isSelected}
                className={'calendar-day'+(currentMonth?'':' other-month')+(isSelected?' is-selected':'')}
                onClick={()=>setSelected(day)} aria-label={displayDate(day)+(hasExample?'，有演示记录':'')}>
                <span>{day.getDate()}</span>{hasExample && <i className="calendar-indicator" aria-hidden="true"/>}
              </button>;
            })}
          </div>
        </FantasyCard>
        <FantasyCard title="所选日期" icon={CalendarDays}>
          <h3 className="selected-date">{displayDate(selected)}</h3>
          <StatusBadge tone={previewJournal[dateKey(selected)]?'green':'muted'}>{previewJournal[dateKey(selected)]?'有演示记录':'暂无记录'}</StatusBadge>
          {previewJournal[dateKey(selected)]?.map((item,index)=>(
            <div key={index} className="calendar-event"><strong>{item.category}</strong><p>{item.text}</p></div>
          ))}
          <div className="calendar-actions">
            <Link to={'/journal?date='+dateKey(selected)} className="primary-link">查看这一天的日志</Link>
            <Link to={'/capture?date='+dateKey(selected)} className="outline-link">从这一天补录</Link>
          </div>
          <p className="mock-notice">{mockDataNotice}</p>
        </FantasyCard>
      </div>
    </>
  );
}

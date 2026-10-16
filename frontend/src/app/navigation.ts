import {
  BookOpenText, CalendarDays, ChartNoAxesCombined, House, Swords, Feather,
  FolderKanban, Inbox, ScrollText, Clock3, type LucideIcon,
} from 'lucide-react';
export interface NavigationItem {
  label: string;
  to: string;
  icon: LucideIcon;
  description: string;
}
export const navigation: NavigationItem[] = [
  { label: '主页 · 冒险地图', to: '/', icon: House, description: '工作总览与模块入口' },
  { label: '今日主线任务', to: '/tasks', icon: Swords, description: '任务与执行安排' },
  { label: '支线任务', to: '/side-quests', icon: ScrollText, description: '专项、战鼓会与读书打卡' },
  { label: '快速录入', to: '/capture', icon: Feather, description: '低摩擦捕获工作信息' },
  { label: '工作日历', to: '/calendar', icon: CalendarDays, description: '计划与实际' },
  { label: '每日工作日志', to: '/journal', icon: BookOpenText, description: '历史日志与确认' },
  { label: '打卡与工时', to: '/time-tracking', icon: Clock3, description: '上下班记录和投入分析' },
  { label: '信息收件箱', to: '/inbox', icon: Inbox, description: '待确认与待补充信息' },
  { label: '项目中心', to: '/projects', icon: FolderKanban, description: '新机会与存量项目' },
  { label: '成长分析', to: '/growth', icon: ChartNoAxesCombined, description: '工作成果与投入' },
];

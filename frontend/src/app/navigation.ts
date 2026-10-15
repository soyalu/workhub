import {
  BookOpenText, CalendarDays, ChartNoAxesCombined, Compass, Feather,
  FolderKanban, Inbox, ListChecks, type LucideIcon,
} from 'lucide-react';

export interface NavigationItem {
  label: string;
  to: string;
  icon: LucideIcon;
  description: string;
}

export const navigation: NavigationItem[] = [
  { label: '首页 · 冒险地图', to: '/', icon: Compass, description: '工作总览与模块入口' },
  { label: '今日主线任务', to: '/tasks', icon: ListChecks, description: '任务与执行安排' },
  { label: '项目中心', to: '/projects', icon: FolderKanban, description: '新机会与存量项目' },
  { label: '工作日历', to: '/calendar', icon: CalendarDays, description: '计划与实际' },
  { label: '每日工作日志', to: '/journal', icon: BookOpenText, description: '历史时间轴与确认' },
  { label: '信息收件箱', to: '/inbox', icon: Inbox, description: '待确认与待补充信息' },
  { label: '快速录入', to: '/capture', icon: Feather, description: '低摩擦捕获工作信息' },
  { label: '成长与分析', to: '/growth', icon: ChartNoAxesCombined, description: '工作成果与投入' },
];

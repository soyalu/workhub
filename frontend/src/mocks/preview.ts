// Explicitly synthetic data, for M1 visual/layout validation only.
// No actual user, customer or business information is stored here.
export const previewTasks = [
  { id: 't1', title: '准备某项目技术交流材料', note: '咨询支持 · 今日', tone: 'amber' as const },
  { id: 't2', title: '确认销售线索下一步计划', note: '项目跟进 · 今日', tone: 'blue' as const },
  { id: 't3', title: '检查投标技术规范重点章节', note: '招投标 · 明日', tone: 'red' as const },
];

export const previewProjects = [
  { id: 'p1', title: '某运营商智能客服咨询', kind: '新项目机会', stage: '方案交流', progress: 55 },
  { id: 'p2', title: '某资源平台升级规划', kind: '存量项目', stage: '规划编写', progress: 72 },
  { id: 'p3', title: '某技术服务招投标', kind: '新项目机会', stage: '准备投标', progress: 35 },
];

export const previewJournal: Record<string, { category: string; text: string }[]> = {
  '2026-10-15': [
    { category: '咨询交流', text: '参与某项目技术方案交流，整理后续沟通事项' },
    { category: '材料编写', text: '修订某存量项目建设规划材料' },
  ],
  '2026-10-14': [
    { category: '招投标', text: '分析招标技术规范，整理方案编制重点' },
    { category: '日常专项', text: '完成读书打卡并整理个人感悟' },
  ],
};

export const mockDataNotice = '当前显示为 M1 设计验证用模拟数据，不代表真实工作完成情况。';


// Homepage-only showcase data. Every row visibly says "示例".
export const previewInbox = [
  { id: 'i1', title: '项目交流纪要', summary: '演示：下周交流计划与材料安排', tone: 'blue' },
  { id: 'i2', title: '材料更新提示', summary: '演示：技术方案仍有待确认问题', tone: 'orange' },
  { id: 'i3', title: '工作总结提醒', summary: '演示：整理今日工作记录草稿', tone: 'purple' },
] as const;

export const previewAgenda = [
  { id: 'a1', time: '09:00', title: '项目交流', tone: 'blue' },
  { id: 'a2', time: '14:00', title: '材料编写', tone: 'green' },
  { id: 'a3', time: '16:30', title: '工作回顾', tone: 'orange' },
] as const;

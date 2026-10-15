import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { HomePage } from '../features/home/HomePage';
import { TasksPage } from '../features/tasks/TasksPage';
import { ProjectsPage } from '../features/projects/ProjectsPage';
import { CalendarPage } from '../features/calendar/CalendarPage';
import { JournalPage } from '../features/journal/JournalPage';
import { CapturePage } from '../features/capture/CapturePage';
import { InboxPage } from '../features/inbox/InboxPage';
import { GrowthPage } from '../features/growth/GrowthPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="capture" element={<CapturePage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="growth" element={<GrowthPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

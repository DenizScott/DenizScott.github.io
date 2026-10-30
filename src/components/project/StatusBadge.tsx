import { useI18n } from '../../i18n/context.ts';
import type { Project, ProjectStatus } from '../../data/projects.ts';

const dot: Record<ProjectStatus, string> = {
  'in-development': 'bg-teal',
  'paused-beta': 'bg-amber-300',
  independent: 'bg-blue-soft',
};

export function StatusBadge({ status }: { status: Project['status'] }) {
  const { t } = useI18n();
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/4 px-3 py-1 text-[0.8125rem] font-medium text-fg">
      <span aria-hidden className={`size-1.5 rounded-full ${dot[status]}`} />
      <span className="sr-only">{t.projects.status.label}: </span>
      {t.projects.status[status]}
    </span>
  );
}

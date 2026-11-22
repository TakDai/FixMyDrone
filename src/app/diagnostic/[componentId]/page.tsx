import { DiagnosticWorkflow } from '@/components/DiagnosticWorkflow';

export function generateStaticParams() {
  return [
    { componentId: 'motors' },
    { componentId: 'motor' },
    { componentId: 'fc' },
    { componentId: 'esc' },
    { componentId: 'frame' },
    { componentId: 'cam' },
    { componentId: 'vtx' },
    { componentId: 'gps' },
    { componentId: 'rx' },
    { componentId: 'antenna-rx' },
    { componentId: 'antenna-vtx' },
    { componentId: 'vifly' },
    { componentId: 'lipo' },
    { componentId: 'goggle' },
    { componentId: 'radio' },
    { componentId: 'tango' },
    { componentId: 'configurator' },
    { componentId: 'betaflight' },
  ];
}

export default async function DiagnosticPage({
  params,
}: {
  params: Promise<{ componentId: string }>;
}) {
  const { componentId } = await params;
  return <DiagnosticWorkflow componentId={componentId} />;
}

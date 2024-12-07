import Editor from '@/components/Editor';
import Terminal from '@/components/Terminal';
import VideoCall from '@/components/VideoCall';
import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable';

export default function Home() {
  return (
    <main className="h-screen bg-background">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={70} minSize={30}>
          <Editor />
        </ResizablePanel>
        <ResizablePanel defaultSize={30} minSize={20}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60}>
              <VideoCall />
            </ResizablePanel>
            <ResizablePanel defaultSize={40}>
              <Terminal />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
export type ComponentId = 'motherboard' | 'cpu' | 'cpuFan' | 'ram1' | 'ram2' | 'gpu' | 'psu' | 'hdd' | 'ssd' | 'cmosBattery' | 'caseFan' | 'gpuPowerCable' | 'cpuPowerCable' | 'cpuMboCable' | 'sataCable1' | 'sataCable2' | 'mainPowerCable' | 'caseFanPowerCable' | 'hddPowerCable' | 'ssdPowerCable';

export type ComponentStatus = 'working' | 'dusty' | 'loose' | 'failing' | 'broken' | 'overheating' | 'removed';

export type ToolId = 'magnifier' | 'screwdriver' | 'thermalCamera' | 'powerTester' | 'postCard' | 'compressedAir' | 'thermalPaste' | 'diagnosticDisk' | 'replacement' | 'hand';

export interface Tool {
  id: ToolId;
  name: string;
  icon: string;
  description: string;
}

export interface ComponentState {
  id: ComponentId;
  name: string;
  status: ComponentStatus;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  icon: string;
}

export interface LogEntry {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'action';
}

export interface Fix {
  componentId: ComponentId;
  toolId: ToolId;
  description: string;
  targetStatus: ComponentStatus;
}

export interface DiagnosticMessage {
  componentId: ComponentId;
  toolId: ToolId;
  message: string;
  type: 'info' | 'warning' | 'error';
}

export interface LevelData {
  id: number;
  name: string;
  description: string;
  symptoms: string[];
  difficulty: string;
  difficultyStars: number;
  components: ComponentState[];
  fixes: Fix[];
  diagnostics: DiagnosticMessage[];
  completionMessage: string;
  educationalNote: string;
  hint: string;
}

export const TOOLS: Tool[] = [
  { id: 'magnifier', name: 'Povećalo', icon: '🔍', description: 'Vizualni pregled komponente' },
  { id: 'screwdriver', name: 'Odvijač', icon: '🔧', description: 'Uklanjanje komponente' },
  { id: 'hand', name: 'Ruka', icon: '✋', description: 'Vraćanje uklonjene komponente' },
  { id: 'replacement', name: 'Zamjena', icon: '🔩', description: 'Zamjena/instalacija komponente' },
  { id: 'thermalCamera', name: 'Termalna kamera', icon: '🌡️', description: 'Provjera temperature' },
  { id: 'powerTester', name: 'Tester napajanja', icon: '🔌', description: 'Testiranje napajanja (PSU)' },
  { id: 'postCard', name: 'POST kartica', icon: '🖥️', description: 'Čitanje POST kodova grešaka' },
  { id: 'compressedAir', name: 'Kompresirani zrak', icon: '💨', description: 'Čišćenje prašine' },
  { id: 'thermalPaste', name: 'Termalna pasta', icon: '🧴', description: 'Nanošenje termalne paste' },
  { id: 'diagnosticDisk', name: 'Dijagnostički disk', icon: '💿', description: 'Testiranje pohrane' },
];

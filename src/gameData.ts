import { LevelData, ComponentState } from './types';

// Base component positions (consistent across all levels)
const baseComponents: Omit<ComponentState, 'status'>[] = [
  { id: 'motherboard', name: 'Matična ploča', x: 2, y: 2, width: 62, height: 80, color: '#0d5c2e', icon: '🔲' },
  { id: 'cpu', name: 'Procesor (CPU)', x: 26, y: 18, width: 12, height: 12, color: '#8B8B8B', icon: '⚡' },
  { id: 'cpuFan', name: 'CPU hladnjak + ventilator', x: 8, y: 12, width: 16, height: 18, color: '#4a4a4a', icon: '🌀' },
  { id: 'ram1', name: 'RAM modul 1', x: 56, y: 13, width: 5, height: 24, color: '#1a6b3c', icon: '📊' },
  { id: 'ram2', name: 'RAM modul 2', x: 68, y: 13, width: 5, height: 24, color: '#1a6b3c', icon: '📊' },
  { id: 'gpu', name: 'Grafička kartica (GPU)', x: 8, y: 48, width: 40, height: 11, color: '#2d1b4e', icon: '🎮' },
  { id: 'gpuPowerCable', name: 'Kabel napajanja GPU', x: 40, y: 50, width: 14, height: 3, color: '#1a1a1a', icon: '🔌' },
  { id: 'cpuMboCable', name: 'CPU MBO kabel napajanja', x: 21, y: 7, width: 10, height: 4, color: '#1a1a1a', icon: '🔌' },
  { id: 'cpuPowerCable', name: 'CPU 8-pin kabel napajanja', x: 24, y: 13, width: 8, height: 4, color: '#1a1a1a', icon: '🔌' },
  { id: 'sataCable1', name: 'SATA kabel za HDD', x: 68, y: 16, width: 12, height: 2, color: '#1a1a1a', icon: '🔌' },
  { id: 'sataCable2', name: 'SATA kabel za SSD', x: 68, y: 28, width: 12, height: 2, color: '#1a1a1a', icon: '🔌' },
  { id: 'mainPowerCable', name: 'Glavni 24-pin ATX kabel', x: 2, y: 82, width: 20, height: 4, color: '#1a1a1a', icon: '🔌' },
  { id: 'psu', name: 'Napajanje (PSU)', x: 2, y: 85, width: 96, height: 13, color: '#1a1a2e', icon: '⚡' },
  { id: 'hdd', name: 'Hard disk (HDD)', x: 68, y: 6, width: 28, height: 8, color: '#5a5a6e', icon: '💾' },
  { id: 'ssd', name: 'SSD disk', x: 68, y: 18, width: 28, height: 5, color: '#3a3a4e', icon: '💿' },
  { id: 'cmosBattery', name: 'CMOS sklop', x: 50, y: 68, width: 5, height: 5, color: '#c0c0c0', icon: '⚙️' },
  { id: 'caseFan', name: 'Kućišni ventilator', x: 78, y: 30, width: 16, height: 16, color: '#3a3a4e', icon: '🌀' },
];

function makeComponents(statusOverrides: Partial<Record<string, ComponentState['status']>>): ComponentState[] {
  return baseComponents.map(c => ({
    ...c,
    status: statusOverrides[c.id] || 'working',
  }));
}

export const LEVELS: LevelData[] = [
  // LEVEL 1
  {
    id: 1,
    name: 'Crni ekran - Računalo se ne pali',
    description: 'Klijent je donio računalo koje se uopće ne pali. Kad pritisnete gumb za paljenje, ništa se ne događa.',
    symptoms: [
      '⚫ Kada pritiskate gumb za paljenje, ništa se ne događa.',
      '🔇 Ne čuje se nikakav zvuk niti beeper kod pokretanja.',
      '💡 Nijedna LED dioda na kućištu ne svijetli.',
      '🌀 Ventilatori se ne pokreću uopće.',
    ],
    difficulty: 'Lagano',
    difficultyStars: 1,
    components: makeComponents({
      mainPowerCable: 'loose',
      cpuMboCable: 'loose',
      cpuPowerCable: 'loose',
      gpuPowerCable: 'loose',
      sataCable1: 'loose',
      sataCable2: 'loose',
      psu: 'broken',
    }),
    fixes: [
      {
        componentId: 'mainPowerCable',
        toolId: 'screwdriver',
        description: '✅ Glavni ATX kabel je odspojen od matične ploče!',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpuMboCable',
        toolId: 'screwdriver',
        description: '✅ CPU MBO kabel je odspojen!',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpuPowerCable',
        toolId: 'screwdriver',
        description: '✅ CPU 8-pin kabel je odspojen!',
        targetStatus: 'removed',
      },
      {
        componentId: 'gpuPowerCable',
        toolId: 'screwdriver',
        description: '✅ GPU kabel napajanja je odspojen!',
        targetStatus: 'removed',
      },
      {
        componentId: 'sataCable1',
        toolId: 'screwdriver',
        description: '✅ SATA kabel za HDD je odspojen!',
        targetStatus: 'removed',
      },
      {
        componentId: 'sataCable2',
        toolId: 'screwdriver',
        description: '✅ SATA kabel za SSD je odspojen!',
        targetStatus: 'removed',
      },
      {
        componentId: 'psu',
        toolId: 'screwdriver',
        description: '✅ Napajanje je odvijačem odspojena iz kućišta!',
        targetStatus: 'removed',
      },
      {
        componentId: 'psu',
        toolId: 'replacement',
        description: '✅ Novo napajanje je instalirano! Novi PSU je spojen i radi ispravno.',
        targetStatus: 'working',
      },
      {
        componentId: 'mainPowerCable',
        toolId: 'hand',
        description: '✅ Glavni ATX kabel vraćen na matičnu ploču!',
        targetStatus: 'working',
      },
      {
        componentId: 'cpuMboCable',
        toolId: 'hand',
        description: '✅ CPU MBO kabel vraćen na mjesto!',
        targetStatus: 'working',
      },
      {
        componentId: 'cpuPowerCable',
        toolId: 'hand',
        description: '✅ CPU 8-pin kabel vraćen na mjesto!',
        targetStatus: 'working',
      },
      {
        componentId: 'gpuPowerCable',
        toolId: 'hand',
        description: '✅ GPU kabel napajanja vraćen na mjesto!',
        targetStatus: 'working',
      },
      {
        componentId: 'sataCable1',
        toolId: 'hand',
        description: '✅ SATA kabel za HDD vraćen na mjesto!',
        targetStatus: 'working',
      },
      {
        componentId: 'sataCable2',
        toolId: 'hand',
        description: '✅ SATA kabel za SSD vraćen na mjesto!',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'mainPowerCable', toolId: 'magnifier', message: '🔍 Glavni ATX kabel napajanja je LABAVO SPOJEN na matičnu ploču! Kontakti nisu čvrsti.', type: 'error' },
      { componentId: 'cpuMboCable', toolId: 'magnifier', message: '🔍 CPU MBO kabel je labav! Spoj prema matičnoj ploči nije čvrst.', type: 'error' },
      { componentId: 'cpuPowerCable', toolId: 'magnifier', message: '🔍 CPU 8-pin kabel je labav! Procesor ne dobiva stabilno napajanje.', type: 'error' },
      { componentId: 'gpuPowerCable', toolId: 'magnifier', message: '🔍 GPU kabel napajanja je labav! Grafička kartica ne dobiva stabilan napon.', type: 'error' },
      { componentId: 'sataCable1', toolId: 'magnifier', message: '🔍 SATA kabel za HDD je labav! Disk gubi vezu s matičnom pločom.', type: 'warning' },
      { componentId: 'sataCable2', toolId: 'magnifier', message: '🔍 SATA kabel za SSD je labav! SSD gubi vezu s matičnom pločom.', type: 'warning' },
      { componentId: 'psu', toolId: 'magnifier', message: '🔍 Vizualni pregled napajanja: Kondenzator na napajanju je NATEKAO i procurio! To je jasan znak kvara. Ostale komponente izgledaju fizički u redu.', type: 'error' },
      { componentId: 'psu', toolId: 'powerTester', message: '🔌 Test napajanja: NEMA IZLAZNOG NAPONA! 12V linija = 0V, 5V linija = 0V, 3.3V linija = 0V. Napajanje je potpuno MRTVO.', type: 'error' },
      { componentId: 'motherboard', toolId: 'magnifier', message: '🔍 Matična ploča izgleda fizički u redu. Nema vidljivih oštećenja na kondenzatorima ili tragovima.', type: 'info' },
      { componentId: 'motherboard', toolId: 'postCard', message: '🖥️ POST kartica: Nema koda - sustav uopće nema napajanja. Provjerite napajanje!', type: 'warning' },
      { componentId: 'cpu', toolId: 'magnifier', message: '🔍 Procesor izgleda fizički u redu. Nema znakova oštećenja.', type: 'info' },
      { componentId: 'ram1', toolId: 'magnifier', message: '🔍 RAM modul 1 izgleda u redu.', type: 'info' },
      { componentId: 'gpu', toolId: 'magnifier', message: '🔍 Grafička kartica izgleda fizički u redu.', type: 'info' },
      { componentId: 'psu', toolId: 'postCard', message: '🖥️ Nemoguće pročitati POST kod - nema napajanja na matičnoj ploči.', type: 'error' },
    ],
    completionMessage: '🏆 Odlično! Odspojili ste kabel, izvadili pokvareno napajanje i instalirali novo! Računalo se ponovno pali!',
    educationalNote: '📖 Napajanje (PSU) je srce računala. Ako je pokvareno, ništa neće raditi. Natekli kondenzatori su čest znak kvara. Uvijek prvo provjerite napajanje kad se računalo ne pali. Redoslijed: odvajanje svih naponskih kabela → uklanjanje napajanja → zamjena → vraćanje kabela.',
    hint: '💡 Redoslijed je bitan! Prvo odvojite ATX, CPU, GPU i SATA kabele, zatim izvadite napajanje s odvijačem, zamijenite ga, i na kraju vratite kabele na novu jedinicu.',
  },

  // LEVEL 2
  {
    id: 2,
    name: 'Računalo se pokreće, ali nešto ne valja.',
    description: 'Računalo se pali, ali prije nego što uđe u Windows pojavi se plavi ekran s greškom. Čuju se 3 duga piska kod pokretanja.',
    symptoms: [
      '🔵 Pri pokretanju se pojavljuje plavi ekran.',
      '🔊 Čuje se 3 duga piska tijekom POST-a.',
      '⏳ Računalo se restartira u krug bez normalnog podizanja sustava.',
      '❌ Ekran prikazuje grešku MEMORY_MANAGEMENT.',
    ],
    difficulty: 'Lagano',
    difficultyStars: 1,
    components: makeComponents({ ram2: 'failing' }),
    fixes: [
      {
        componentId: 'ram2',
        toolId: 'screwdriver',
        description: '✅ Oštećeni RAM modul 2 je odspojen odvijačem iz DIMM utora! Vidljivo je oštećenje na čipu.',
        targetStatus: 'removed',
      },
      {
        componentId: 'ram2',
        toolId: 'replacement',
        description: '✅ Oštećeni RAM modul 2 je zamijenjen novim RAM modulom! Novi modul je pravilno postavljen u DIMM utor. Memorijski test sada prolazi bez grešaka.',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'motherboard', toolId: 'postCard', message: '🖥️ POST kod: 3 duga piska = GREŠKA RAM MEMORIJE! Memorijski test nije prošao. Problem je u RAM modulima.', type: 'error' },
      { componentId: 'ram2', toolId: 'magnifier', message: '🔍 Vizualni pregled RAM modula 2: Na jednom od čipova vidljivo je tamno mjesto - znak pregrijavanja i mogućeg kvara. Modul treba zamijeniti!', type: 'error' },
      { componentId: 'ram1', toolId: 'magnifier', message: '🔍 RAM modul 1 izgleda potpuno u redu. Zlatni kontakti su čisti, nema vidljivih oštećenja.', type: 'info' },
      { componentId: 'ram2', toolId: 'diagnosticDisk', message: '💿 MemTest86 rezultat: RAM modul 2 ima 847 grešaka na adresama 0x7F200000-0x7F400000. Modul je NEISPAVAN i treba ga zamijeniti!', type: 'error' },
      { componentId: 'cpu', toolId: 'magnifier', message: '🔍 Procesor izgleda u redu.', type: 'info' },
      { componentId: 'gpu', toolId: 'magnifier', message: '🔍 Grafička kartica je u redu.', type: 'info' },
      { componentId: 'hdd', toolId: 'diagnosticDisk', message: '💾 Hard disk je ispravan, Windows pokušava učitati ali BSOD se događa zbog RAM greške.', type: 'info' },
    ],
    completionMessage: '🏆 Sjajno! Otkrili ste i zamijenili pokvareni RAM modul. Računalo sada radi stabilno!',
    educationalNote: '📖 RAM memorija je kritična za rad računala. Ako je RAM oštećen, podaci se mogu pokvariti što dovodi do plavog ekrana (BSOD). 3 duga piska pri POST-u su standardni kod za RAM grešku.',
    hint: '💡 Pokušajte koristiti POST karticu na matičnoj ploči da pročitate kod greške.',
  },

  // LEVEL 3
  {
    id: 3,
    name: 'Pregrijavanje procesora',
    description: 'Računalo se pali normalno, ali se gasi nakon 15-30 minuta korištenja. Ventilator procesora jako i neobično zuji.',
    symptoms: [
      '🌡️ Nakon 15-30 minuta korištenja, računalo se gasi samo od sebe.',
      '🔊 Ventilator procesora jako zuji i radi konstantno na visokoj brzini.',
      '🐌 Performanse su smanjene zbog termalnog throttlinga.',
      '💨 Vrući zrak izlazi iz kućišta tijekom rada.',
    ],
    difficulty: 'Srednje',
    difficultyStars: 2,
    components: makeComponents({ cpuFan: 'dusty', cpu: 'overheating', cpuMboCable: 'loose', cpuPowerCable: 'loose' }),
    fixes: [
      // Step 1-2: Disconnect all power cables first
      {
        componentId: 'cpuMboCable',
        toolId: 'screwdriver',
        description: '✅ CPU MBO (4-pin) kabel je odspojen od matične ploče!',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpuPowerCable',
        toolId: 'screwdriver',
        description: '✅ CPU 8-pin kabel napajanja je odspojen!',
        targetStatus: 'removed',
      },
      // Step 3: Remove cooler (requires both cables disconnected)
      {
        componentId: 'cpuFan',
        toolId: 'screwdriver',
        description: '✅ CPU hladnjak je odvijačem odspojen od procesora! Sada možete pristupiti CPU-u.',
        targetStatus: 'removed',
      },
      // Step 4: Clean the cooler (stays removed so we can access CPU)
      {
        componentId: 'cpuFan',
        toolId: 'compressedAir',
        description: '✅ CPU hladnjak je očišćen kompresirani zrakom! Sve rešetke su čiste i prašina je uklonjena.',
        targetStatus: 'removed',
      },
      // Step 5: Apply thermal paste to CPU
      {
        componentId: 'cpu',
        toolId: 'thermalPaste',
        description: '✅ Nova termalna pasta je nanešena na CPU! Stara suha pasta je uklonjena i zamijenjena kvalitetnom novom pastom. Sada će biti dobar toplinski kontakt.',
        targetStatus: 'working',
      },
      // Step 6: Reattach cooler to CPU
      {
        componentId: 'cpuFan',
        toolId: 'hand',
        description: '✅ CPU hladnjak je ponovno pričvršćen na procesor! Sada čvrsto priliježe i hladi CPU.',
        targetStatus: 'working',
      },
      // Step 7-8: Reconnect power cables
      {
        componentId: 'cpuPowerCable',
        toolId: 'hand',
        description: '✅ CPU 8-pin kabel napajanja je ponovno spojen na matičnu ploču! Procesor sada dobija stabilan napon.',
        targetStatus: 'working',
      },
      {
        componentId: 'cpuMboCable',
        toolId: 'hand',
        description: '✅ CPU MBO (4-pin) kabel je ponovno spojen na matičnu ploču! Sve je opateno i spreman za rad.',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'cpu', toolId: 'thermalCamera', message: '🌡️ CPU temperatura: 97°C! 🔥 Normalna radna temperatura je 40-70°C. Procesor se ozbiljno pregrijava i sustav će se uskoro ugasiti od termalnog zaštite!', type: 'error' },
      { componentId: 'cpuFan', toolId: 'thermalCamera', message: '🌡️ Hladnjak se zagrijava brže nego što treba. Ventilator radi na 100% ali temperatura i dalje raste - blokada prašine sprječava hlađenje!', type: 'error' },
      { componentId: 'cpuFan', toolId: 'magnifier', message: '🔍 Hladnjak CPU-a je POTPUNO ZATRPAN prašinom! Rešetke su začepljene - zrak uopće ne može protjecati. Potrebno čišćenje kompresiranim zrakom!', type: 'error' },
      { componentId: 'cpu', toolId: 'magnifier', message: '🔍 Vizualni pregled CPU-a: Termalna pasta je POTPUNO SUHA i ispuhana! Nema dobrog kontakta između CPU-a i hladnjaka. Potrebna nova pasta!', type: 'error' },
      { componentId: 'cpuMboCable', toolId: 'magnifier', message: '🔍 CPU MBO kabel je labav! Spoj prema matičnoj ploči nije siguran. Trebate ga ponovno spojiti!', type: 'warning' },
      { componentId: 'cpuPowerCable', toolId: 'magnifier', message: '🔍 CPU 8-pin kabel je labav! Procesor nije stabilan s napajanjem. Trebate ga ponovno spojiti!', type: 'warning' },
      { componentId: 'caseFan', toolId: 'magnifier', message: '🔍 Kućišni ventilator radi normalno, ali je i malo prašnjav.', type: 'info' },
      { componentId: 'motherboard', toolId: 'postCard', message: '🖥️ POST kod: Sve je OK pri pokretanju. Problem se pojavljuje nakon zagrijavanja - to je signo pregrijavanja CPU-a!', type: 'info' },
      { componentId: 'gpu', toolId: 'thermalCamera', message: '🌡️ GPU temperatura: 62°C - normalno.', type: 'info' },
      { componentId: 'motherboard', toolId: 'magnifier', message: '🔍 Matična ploča izgleda fizički u redu. Svi kondenzatori su intaktni.', type: 'info' },
    ],
    completionMessage: '🏆 Fantastično! Očistili ste CPU hladnjak od prašine, nanijeli novu termalnu pastu i ponovno spojili sve kablove! CPU temperatura je sada 45°C i sustav je stabilan!',
    educationalNote: '📖 Pregrijavanje je jedan od najčešćih problema u starijim računalima. Uzroci: 1) Suha termalna pasta (mijenja se svakih 2-3 godine), 2) Prašina u hladnjaku koja blokira protok zraka, 3) Labavi kablovi napajanja koji smanjuju napon. CPU ima termalno šutilo na ~100°C i automatski gasi se da se ne bi ošteti. Redoslijed rješavanja: odvajanje kabela → uklanjanje hladnjaka → čišćenje → nova pasta → ponovno montiranje.',
    hint: '💡 Redoslijed je BITAN! Prvo odspojite oba CPU napojća kablova, zatim odvijačem uklonite hladnjak, očistite ga zrakom, nanijsite pastu na CPU, vratite hladnjak i konačno ponovno spojite kablove!',
  },

  // LEVEL 4
  {
    id: 4,
    name: 'Nema slike na monitoru',
    description: 'Računalo se pali, čuju se normalni zvukovi pokretanja, ali na monitoru nema slike. Monitor prikazuje "No Signal".',
    symptoms: [
      '📺 Monitor prikazuje poruku "No Signal".',
      '🔊 Računalo se čini da se normalno pali bez čudnih zvukova.',
      '💡 LED diode na kućištu svijetle normalno tijekom pokretanja.',
      '🌀 Ventilatori se vrte normalno, ali nema slike.',
    ],
    difficulty: 'Srednje',
    difficultyStars: 2,
    components: makeComponents({ gpu: 'loose', gpuPowerCable: 'loose' }),
    fixes: [
      {
        componentId: 'gpuPowerCable',
        toolId: 'screwdriver',
        description: '✅ GPU kabel napajanja je odspojen od grafičke kartice!',
        targetStatus: 'removed',
      },
      {
        componentId: 'gpu',
        toolId: 'screwdriver',
        description: '✅ GPU je izvađena iz PCIe utora! Vidljivo je da je bila labavo postavljena.',
        targetStatus: 'removed',
      },
      {
        componentId: 'gpu',
        toolId: 'replacement',
        description: '✅ GPU je ponovno pravilno postavljena u PCIe utor! Čule se dva "klika" koji pokazuju da je sada čvrsto sjedila.',
        targetStatus: 'working',
      },
      {
        componentId: 'gpuPowerCable',
        toolId: 'hand',
        description: '✅ GPU kabel napajanja je ponovno spojen i čvrsto stegnut! Grafička kartica sada dobija sve potrebne volte.',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'motherboard', toolId: 'postCard', message: '🖥️ POST kod: 1 dugi, 2 kratka piska = GREŠKA GRAFIČKE KARTICE! GPU nije pravilno prepoznat od BIOSA. Provjerite PCIe konekciju.', type: 'error' },
      { componentId: 'gpu', toolId: 'magnifier', message: '🔍 Vizualni pregled GPU-a: Kartica je LABAVO POSTAVLJENA u PCIe utoru! Desna strana je vidljivo podignuta - nije pravilno sjela u 16-pin utor.', type: 'error' },
      { componentId: 'gpuPowerCable', toolId: 'magnifier', message: '🔍 Kabel napajanja GPU-a je DJELOMIČNO ODVOJEN! Priključak PCIe nije čvrsto spojen. Ako bi se računalo duže koristilo, kartica bi mogla biti oštećena.', type: 'error' },
      { componentId: 'gpu', toolId: 'thermalCamera', message: '🌡️ GPU temperatura: N/A - kartica nije pravilno spojena pa sustav je ne detektuje.', type: 'warning' },
      { componentId: 'cpu', toolId: 'magnifier', message: '🔍 Procesor je pravilno postavljen i izgleda u redu.', type: 'info' },
      { componentId: 'ram1', toolId: 'magnifier', message: '🔍 RAM moduli su pravilno postavljeni u DIMM utore.', type: 'info' },
      { componentId: 'psu', toolId: 'powerTester', message: '🔌 Napajanje radi normalno, svi naponi (12V, 5V, 3.3V) su unutar granica.', type: 'info' },
      { componentId: 'motherboard', toolId: 'magnifier', message: '🔍 Matična ploča izgleda u redu, PCIe utori nisu fizički oštećeni.', type: 'info' },
    ],
    completionMessage: '🏆 Odlično! Grafička kartica je sada pravilno postavljena u PCIe utor i kabel napajanja je sigurno spojen. Slika se vraća na monitor!',
    educationalNote: '📖 Grafička kartica mora biti čvrsto postavljena u PCIe x16 utor i imati properno spojen kabel napajanja (PCIe 6-pin ili 8-pin). Ako je labava, sustav će je detektovati ali neće raditi. Čujete dva "klika" kad je kartica pravilno postavljena. GPU se koristi za 3D grafiku i gaming.',
    hint: '💡 Slijedi red: Prvo odvijačem odspojite GPU kabel napajanja, zatim odvijačem izvadite GPU iz PCIe utora, ponovo je postavite (trebali biste čuti "klik"), i na kraju vratite kabel napajanja rukom.',
  },

  // LEVEL 5
  {
    id: 5,
    name: 'Čudni zvukovi i sporo pokretanje',
    description: 'Računalo radi sve sporije. Čuje se klikatanje iz kućišta. Pokretanje Windowsa traje jako dugo, a programi se sporo učitavaju.',
    symptoms: [
      '🔊 U kućištu se čuju čudni klikovi i kliktanje - "CLICK OF DEATH".',
      '🐌 Windows se pokreće jako sporo i sve traje duže nego prije.',
      '⏳ Programi trebaju 30+ sekundi da se pokrenu.',
      '❌ Ekran se povremeno zamrzava bez upozorenja i gljava se.',
    ],
    difficulty: 'Srednje',
    difficultyStars: 2,
    components: makeComponents({ hdd: 'failing', sataCable1: 'loose', ssd: 'removed' }),
    fixes: [
      {
        componentId: 'sataCable1',
        toolId: 'screwdriver',
        description: '✅ SATA kabel za HDD je odspojen od matične ploče!',
        targetStatus: 'removed',
      },
      {
        componentId: 'hdd',
        toolId: 'screwdriver',
        description: '✅ Pokvareni HDD je izvađen iz kućišta s odvijačem! Jasno se vidi da je disk oštećen.',
        targetStatus: 'removed',
      },
      {
        componentId: 'ssd',
        toolId: 'replacement',
        description: '✅ Novi SSD disk je instaliran u kućište! Brži je i bez pokretnih dijelova.',
        targetStatus: 'working',
      },
      {
        componentId: 'sataCable1',
        toolId: 'hand',
        description: '✅ SATA kabel je ponovno spojen - od matične ploče do novog SSD-a! Disk je sada prepoznat.',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'hdd', toolId: 'magnifier', message: '🔍 Hard disk proizvodi glasne zvukove klikanja i krekanja - to je "CLICK OF DEATH"! Mehanički dio diska je ozbiljno oštećen. Disk će uskoro potpuno zatajiti i neće se moći čitati!', type: 'error' },
      { componentId: 'hdd', toolId: 'diagnosticDisk', message: '💿 SMART dijagnostika HDD-a:\n❌ Reallocirani sektori: 1,247 (KRITIČNO!)\n❌ Seek Error Rate: EKSTREMNO VISOK\n❌ Spin Retry Count: 47\n⚠️ Temperatura: 56°C (visoka)\n⚠️ Radno vrijeme: 45,231 sati (Star disk!)\n🔴 DISK JE MRTAV - ZAMJENA JE HITAN PRIORITET!', type: 'error' },
      { componentId: 'sataCable1', toolId: 'magnifier', message: '🔍 SATA kabel je labav! Veza između HDD-a i matične ploče nije sigurna i diskontinuirana je.', type: 'warning' },
      { componentId: 'ssd', toolId: 'magnifier', message: '🔍 Novi SSD disk je čist, ne vidljivo oštećenja. Spreman za instalaciju.', type: 'info' },
      { componentId: 'ssd', toolId: 'diagnosticDisk', message: '💿 SSD SMART status: ✅ Nova konekcija detektovana. Disk je zdrav. Broj životnog vijeka: 100% (potpuno nov). Brzina čitanja: 550MB/s, pisanja: 520MB/s.', type: 'info' },
      { componentId: 'cpu', toolId: 'magnifier', message: '🔍 Procesor izgleda u redu. Temperatura: 52°C.', type: 'info' },
      { componentId: 'ram1', toolId: 'magnifier', message: '🔍 RAM memorija je ispravna.', type: 'info' },
      { componentId: 'gpu', toolId: 'magnifier', message: '🔍 Grafička kartica je u redu.', type: 'info' },
      { componentId: 'motherboard', toolId: 'magnifier', message: '🔍 Matična ploča izgleda ispravno. SATA priključci su OK.', type: 'info' },
    ],
    completionMessage: '🏆 Genijalno! Zamijenili ste stari pokvareni HDD novim bržim SSD-om. Računalo se sada pali za 12 sekundi umjesto 2+ minute!',
    educationalNote: '📖 HDD (Hard Disk Drive) ima mehaničke dijelove (rotirajući disk, glava za čitanje) koji se s vremenom troše i mogu se oštetiti. "Click of death" su karakteristični zvukovi koji znače da je glava zapela i disk gubi podatke. SSD (Solid State Drive) nema pokretnih dijelova, puno je brži (4-10x) i izdržljiviji. Moderni SSD-ovi koriste NVMe (M.2) umjesto SATA-e.',
    hint: '💡 Slijedi red: Prvo dijagnostičkim diskom potvrdite kvar HDD-a, zatim odvijačem odspojite SATA kabel, pa zamijenite stari disk novim SSD-om i na kraju ponovno spojite SATA kabel. Redoslijed je bitan!',
  },

  // LEVEL 6
  {
    id: 6,
    name: 'BIOS greška pri pokretanju',
    description: 'Računalo pri paljenju prijavljuje BIOS grešku i neće nastaviti s pokretanjem bez učitavanja zadanih postavki.',
    symptoms: [
      '❌ Pojavljuje se poruka "CMOS Checksum Error - Defaults Loaded".',
      '⚠️ BIOS javlja da su spremljene postavke izgubljene.',
      '🕐 Datum i vrijeme u sustavu su resetirani na zadane vrijednosti.',
      '⚙️ BIOS se vraća na tvorničke postavke i ne nastavlja normalno podizanje.',
    ],
    difficulty: 'Teško',
    difficultyStars: 3,
    components: makeComponents({ cmosBattery: 'broken' }),
    fixes: [
      {
        componentId: 'cmosBattery',
        toolId: 'replacement',
        description: '✅ Stari CMOS sklop je uklonjen i nova CR2032 zamjena je instalirana! BIOS je resetiran na tvorničke postavke.',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'motherboard', toolId: 'postCard', message: '🖥️ POST kod: CMOS Checksum Error - Bad! BIOS ne može učitati spremljene postavke i vraća zadane vrijednosti.', type: 'error' },
      { componentId: 'cmosBattery', toolId: 'magnifier', message: '🔍 Vizualni pregled CMOS sklopa: Na okruglom modulu i kontaktima vidi se starenje i tragovi korozije.', type: 'error' },
      { componentId: 'cmosBattery', toolId: 'powerTester', message: '🔌 Test sklopa pokazuje vrlo nizak napon i nestabilno zadržavanje postavki.', type: 'error' },
      { componentId: 'cpu', toolId: 'magnifier', message: '🔍 Procesor izgleda u redu.', type: 'info' },
      { componentId: 'ram1', toolId: 'magnifier', message: '🔍 RAM memorija je u redu.', type: 'info' },
      { componentId: 'gpu', toolId: 'magnifier', message: '🔍 Grafička kartica je u redu.', type: 'info' },
      { componentId: 'psu', toolId: 'powerTester', message: '🔌 Napajanje radi normalno, svi naponi su OK.', type: 'info' },
    ],
    completionMessage: '🏆 Izvrsno! Zamijenili ste CMOS sklop i računalo sada normalno pokreće BIOS i nastavlja s boot!',
    educationalNote: '📖 CMOS sklop (CR2032) napaja mali memorijski čip na matičnoj ploči koji čuva BIOS postavke i sat. Kad se taj izvor napajanja isprazni, BIOS zaboravi postavke i javlja grešku. Zamjena je jednostavna i jeftina.',
    hint: '💡 Koristite POST karticu da pročitate BIOS poruku, a zatim pogledajte mali okrugli CMOS sklop na matičnoj ploči.',
  },

  // LEVEL 7
  {
    id: 7,
    name: 'Kombinirani problemi - Izazov!',
    description: 'Računalo ima VIŠE problema istovremeno! Pregrijava se, povremeno plavi ekran, i monitor gubi signal. Ovo je pravi izazov za dijagnostičara!',
    symptoms: [
      '🔥 Računalo se pregrijava i povremeno se gasi.',
      '🔵 Povremeno se pojavljuje plavi ekran (BSOD).',
      '📺 Monitor povremeno gubi signal tijekom rada.',
      '🔊 Ventilator jako zuji i radi brzo.',
      '⚡ Neki programi se ruše bez upozorenja.',
    ],
    difficulty: 'Teško',
    difficultyStars: 3,
    components: makeComponents({ cpuFan: 'dusty', cpu: 'overheating', cpuMboCable: 'loose', cpuPowerCable: 'loose', ram2: 'failing', gpu: 'loose' }),
    fixes: [
      // Fix 1-2: CPU problem - disconnect cables first
      {
        componentId: 'cpuMboCable',
        toolId: 'screwdriver',
        description: '✅ CPU MBO (4-pin) kabel je odspojen od matične ploče!',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpuPowerCable',
        toolId: 'screwdriver',
        description: '✅ CPU 8-pin kabel napajanja je odspojen!',
        targetStatus: 'removed',
      },
      // Fix 3: Remove CPU cooler
      {
        componentId: 'cpuFan',
        toolId: 'screwdriver',
        description: '✅ CPU hladnjak je odspojen od procesora!',
        targetStatus: 'removed',
      },
      // Fix 4: Clean cooler (stays removed so we can access CPU)
      {
        componentId: 'cpuFan',
        toolId: 'compressedAir',
        description: '✅ CPU hladnjak je očišćen od prašine kompresiranim zrakom!',
        targetStatus: 'removed',
      },
      // Fix 5: Apply thermal paste
      {
        componentId: 'cpu',
        toolId: 'thermalPaste',
        description: '✅ Nova termalna pasta je nanešena na procesor!',
        targetStatus: 'working',
      },
      // Fix 6: Reattach cooler
      {
        componentId: 'cpuFan',
        toolId: 'hand',
        description: '✅ CPU hladnjak je ponovno pričvršćen na procesor!',
        targetStatus: 'working',
      },
      // Fix 7-8: Reconnect CPU cables
      {
        componentId: 'cpuPowerCable',
        toolId: 'hand',
        description: '✅ CPU 8-pin kabel napajanja je ponovno spojen!',
        targetStatus: 'working',
      },
      {
        componentId: 'cpuMboCable',
        toolId: 'hand',
        description: '✅ CPU MBO (4-pin) kabel je ponovno spojen!',
        targetStatus: 'working',
      },
      // Fix 9: RAM2 problem
      {
        componentId: 'ram2',
        toolId: 'screwdriver',
        description: '✅ Pokvareni RAM modul 2 je odspojen odvijačem iz DIMM utora!',
        targetStatus: 'removed',
      },
      {
        componentId: 'ram2',
        toolId: 'replacement',
        description: '✅ Pokvareni RAM modul 2 je zamijenjen novim RAM modulom!',
        targetStatus: 'working',
      },
      // Fix 10-11: GPU problem
      {
        componentId: 'gpu',
        toolId: 'screwdriver',
        description: '✅ GPU je izvađena iz PCIe x16 utora!',
        targetStatus: 'removed',
      },
      {
        componentId: 'gpu',
        toolId: 'replacement',
        description: '✅ GPU je ponovno pravilno postavljena u PCIe utor!',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'cpu', toolId: 'thermalCamera', message: '🌡️ CPU temperatura: 93°C! Pregrijavanje! To uzrokuje throttling i gašenje sustava.', type: 'error' },
      { componentId: 'cpuFan', toolId: 'magnifier', message: '🔍 CPU hladnjak je prepun prašine! Rešetke su začepljene.', type: 'error' },
      { componentId: 'cpu', toolId: 'magnifier', message: '🔍 Termalna pasta na CPU je suha i ne provodi dobro toplinu.', type: 'warning' },
      { componentId: 'motherboard', toolId: 'postCard', message: '🖥️ POST kod: Greška memorije (1 dugi, 3 kratka piska) + upozorenje GPU-a. Višestruki problemi!', type: 'error' },
      { componentId: 'ram2', toolId: 'magnifier', message: '🔍 RAM modul 2 pokazuje znakove oštećenja. Čip je pregrijan.', type: 'error' },
      { componentId: 'ram1', toolId: 'magnifier', message: '🔍 RAM modul 1 je u redu.', type: 'info' },
      { componentId: 'gpu', toolId: 'magnifier', message: '🔍 GPU je labav u PCIe utoru! Desna strana je podignuta.', type: 'error' },
      { componentId: 'gpu', toolId: 'thermalCamera', message: '🌡️ GPU temperatura: 58°C (normalno) ali GPU nije pravilno spojen.', type: 'warning' },
      { componentId: 'psu', toolId: 'powerTester', message: '🔌 Napajanje radi ispravno, svi naponi OK.', type: 'info' },
      { componentId: 'hdd', toolId: 'diagnosticDisk', message: '💿 Hard disk je ispravan.', type: 'info' },
    ],
    completionMessage: '🏆 Genijalno! Riješili ste SVE probleme! Računalo sada radi savršeno - temperatura je normalna, memorija stabilna, i slika čista! Pravi ste majstor za dijagnostiku!',
    educationalNote: '📖 U stvarnom svijetu, računala često imaju više problema istovremeno. Ključno je sustavno dijagnosticirati svaki problem: provjeriti napajanje, temperature, memoriju, grafičku karticu i diskove. Uvijek počnite od najjednostavnijih dijagnostika!',
    hint: '💡 Ovo je težak level s 4 popravka! Koristite termalnu kameru, POST karticu i povećalo da pronađete sve probleme.',
  },

  // LEVEL 8 - Loose cables
  {
    id: 8,
    name: 'Labavi kablovi - Nema slike i zvuka',
    description: 'Računalo se pali, ali nema slike na monitoru i nema zvuka iz zvučnika. Ventilatori rade normalno.',
    symptoms: [
      '📺 Monitor prikazuje poruku "No Signal".',
      '🔇 Ne čuje se zvuk iz zvučnika.',
      '💡 LED diode na kućištu svijetle normalno.',
      '🌀 Ventilatori rade normalno, ali nema zvuka ili slike.',
    ],
    difficulty: 'Srednje',
    difficultyStars: 2,
    components: makeComponents({ gpu: 'loose', gpuPowerCable: 'loose', mainPowerCable: 'loose', sataCable1: 'loose' }),
    fixes: [
      {
        componentId: 'gpuPowerCable',
        toolId: 'screwdriver',
        description: '✅ GPU kabel napajanja je odspojen od kartice!',
        targetStatus: 'removed',
      },
      {
        componentId: 'gpu',
        toolId: 'screwdriver',
        description: '✅ GPU je izvađena iz PCIe utora!',
        targetStatus: 'removed',
      },
      {
        componentId: 'gpu',
        toolId: 'replacement',
        description: '✅ GPU je ponovno pravilno postavljena u PCIe utor! Čuje se "klik" što znači čvrstoću.',
        targetStatus: 'working',
      },
      {
        componentId: 'gpuPowerCable',
        toolId: 'hand',
        description: '✅ GPU kabel napajanja je ponovno spojen i čvrsto stegnut!',
        targetStatus: 'working',
      },
      {
        componentId: 'mainPowerCable',
        toolId: 'screwdriver',
        description: '✅ Glavni ATX kabel je odspojen od matične ploče!',
        targetStatus: 'removed',
      },
      {
        componentId: 'mainPowerCable',
        toolId: 'hand',
        description: '✅ Glavni ATX kabel je ponovno spojen i čvrsto stegnut na matičnu ploču!',
        targetStatus: 'working',
      },
      {
        componentId: 'sataCable1',
        toolId: 'screwdriver',
        description: '✅ SATA kabel za HDD je odspojen od matične ploče!',
        targetStatus: 'removed',
      },
      {
        componentId: 'sataCable1',
        toolId: 'hand',
        description: '✅ SATA kabel za HDD je ponovno spojen i čvrsto stegnut!',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'motherboard', toolId: 'postCard', message: '🖥️ POST kod: 1 dugi, 2 kratka piska = Greška GPU-a! GPU nije pravilno prepoznat. Provjerite PCIe utor i kablove napajanja.', type: 'error' },
      { componentId: 'gpu', toolId: 'magnifier', message: '🔍 GPU je LABAVO postavljen u PCIe utoru! Desna strana je vidljivo podignuta - nije pravilno sjela u 16-pin utor.', type: 'error' },
      { componentId: 'gpuPowerCable', toolId: 'magnifier', message: '🔍 GPU kabel napajanja je DJELOMIČNO ODVOJEN od kartice! Priključak nije čvrsto spojen. GPU ne dobija stabilan napon.', type: 'error' },
      { componentId: 'mainPowerCable', toolId: 'magnifier', message: '🔍 Glavni ATX kabel je DJELOMIČNO ODVOJEN od matične ploče! Spoj nije siguran i napon može biti nestabilan.', type: 'error' },
      { componentId: 'sataCable1', toolId: 'magnifier', message: '🔍 SATA kabel za HDD je LABAV! Veza između HDD-a i matične ploče nije sigurna i diskontinuirana je.', type: 'error' },
      { componentId: 'psu', toolId: 'powerTester', message: '🔌 Napajanje radi normalno, svi naponi (12V, 5V, 3.3V) su OK.', type: 'info' },
      { componentId: 'cpu', toolId: 'magnifier', message: '🔍 Procesor je pravilno postavljen.', type: 'info' },
      { componentId: 'ram1', toolId: 'magnifier', message: '🔍 RAM memorija je pravilno postavljena.', type: 'info' },
    ],
    completionMessage: '🏆 Odlično! Popravili ste sve labave veze i slika je vraćena na monitor!',
    educationalNote: '📖 Labavi kablovi su jedan od najčešćih uzroka problema s grafikom i sustavom. GPU mora biti čvrsto postavljen u PCIe x16 utor i imati redovito spojen kabel napajanja. Čujete dva "klika" kad je kartica pravilno postavljena. Labavi glavni ATX kabel uzrokuje nestabilnost cijelog sustava.',
    hint: '💡 Red je bitan! 1) GPU kabel napajanja odvijačem, 2) GPU odstrani odvijačem, 3) GPU vrati i prosljeđi, 4) GPU kabel vrati, 5) ATX kabel odvijačem, 6) ATX kabel vrati, 7) SATA kabel odvijačem, 8) SATA kabel vrati.',
  },

  // LEVEL 9 - Overheating GPU
  {
    id: 9,
    name: 'Povišena temperatura pod opterećenjem',
    description: 'Računalo radi, ali pod opterećenjem jedna komponenta počne odskakati temperaturom i cijeli sustav uspori.',
    symptoms: [
      '🌡️ Jedna komponenta pokazuje znatno višu temperaturu od ostalih.',
      '🐌 Performanse u igrama i aplikacijama postanu slabije pod opterećenjem.',
      '💨 Iz kućišta izlazi topliji zrak nego inače.',
      '⚠️ Sustav pod opterećenjem usporava i povremeno smanjuje performanse.',
    ],
    difficulty: 'Srednje',
    difficultyStars: 2,
    components: makeComponents({ gpu: 'overheating', gpuPowerCable: 'loose', caseFan: 'dusty' }),
    fixes: [
      {
        componentId: 'gpuPowerCable',
        toolId: 'screwdriver',
        description: '✅ GPU kabel napajanja je odspojen od kartice!',
        targetStatus: 'removed',
      },
      {
        componentId: 'gpu',
        toolId: 'screwdriver',
        description: '✅ GPU je izvađena iz PCIe utora!',
        targetStatus: 'removed',
      },
      {
        componentId: 'gpu',
        toolId: 'compressedAir',
        description: '✅ Prašina je očišćena s grafičke kartice kompresiranim zrakom! Hladnjaci su sada čisti.',
        targetStatus: 'removed',
      },
      {
        componentId: 'gpu',
        toolId: 'replacement',
        description: '✅ GPU je ponovno pravilno postavljena u PCIe utor i čvrsto sjedi!',
        targetStatus: 'working',
      },
      {
        componentId: 'gpuPowerCable',
        toolId: 'hand',
        description: '✅ GPU kabel napajanja je ponovno spojen!',
        targetStatus: 'working',
      },
      {
        componentId: 'caseFan',
        toolId: 'screwdriver',
        description: '✅ Kućišni ventilator je odspojen!',
        targetStatus: 'removed',
      },
      {
        componentId: 'caseFan',
        toolId: 'compressedAir',
        description: '✅ Kućišni ventilator je očišćen kompresiranim zrakom! Zrak sad pravilno cirkulira kroz kućište.',
        targetStatus: 'removed',
      },
      {
        componentId: 'caseFan',
        toolId: 'hand',
        description: '✅ Kućišni ventilator je ponovno instaliran u kućište!',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'gpu', toolId: 'thermalCamera', message: '🌡️ Jedna komponenta pokazuje oko 95°C, znatno više od ostalih. To objašnjava pad performansi pod opterećenjem.', type: 'error' },
      { componentId: 'gpu', toolId: 'magnifier', message: '🔍 Na toj komponenti se vide tragovi prašine i slab protok zraka oko hladnjaka.', type: 'error' },
      { componentId: 'gpuPowerCable', toolId: 'magnifier', message: '🔍 Kabel napajanja uz tu komponentu nije sasvim čvrsto spojen. Kontakt izgleda nestabilno.', type: 'warning' },
      { componentId: 'caseFan', toolId: 'magnifier', message: '🔍 Kućišni ventilator je zaprljan i zrak kroz kućište ne cirkulira idealno.', type: 'error' },
      { componentId: 'gpu', toolId: 'thermalCamera', message: '🌡️ Hotspot na toj komponenti prelazi 100°C na osjetljivijem dijelu. Potrebna je intervencija.', type: 'error' },
      { componentId: 'cpu', toolId: 'thermalCamera', message: '🌡️ CPU temperatura: 65°C - normalno, nema problema s CPU hladnjakom.', type: 'info' },
      { componentId: 'psu', toolId: 'powerTester', message: '🔌 Napajanje radi normalno, ali jedan dio sustava ne dobiva stabilne uvjete zbog labavog priključka.', type: 'info' },
      { componentId: 'motherboard', toolId: 'postCard', message: '🖥️ POST kod: Sustav se pokrene normalno, ali pod opterećenjem dolazi do problema s jednom komponentom.', type: 'warning' },
    ],
    completionMessage: '🏆 Sjajno! GPU temperatura je sada 62°C. Performanse su vraćene na normalu! Kućište sada pravilno hladi!',
    educationalNote: '📖 Ako jedna komponenta pokazuje izrazito višu temperaturu od ostalih, problem često nije samo u njoj nego i u okolnom hlađenju, prašini ili stabilnosti napajanja. Dijagnostika topline pomaže pronaći pravi uzrok.',
    hint: '💡 Prvo termalnom kamerom pronađi komponentu koja odskače, a zatim pregledajte njezino hlađenje, napajanje i sjedanje u utoru.',
  },
  // LEVEL 10 - Multiple cable issues
  {
    id: 10,
    name: 'Neobičan nestabilan rad',
    description: 'Računalo ima više simptoma odjednom: kratki prekidi slike, resetiranja i čudno ponašanje pri radu.',
    symptoms: [
      '📺 Slika povremeno zastane ili nakratko nestane.',
      '💾 Uređaji za pohranu povremeno usporavaju ili se na kratko izgube.',
      '⚡ Sustav se zna resetirati bez jasnog upozorenja.',
      '🔧 Zvuk i ventilatori ne ponašaju se uvijek isto.',
    ],
    difficulty: 'Teško',
    difficultyStars: 3,
    components: makeComponents({ cpuPowerCable: 'loose', cpuMboCable: 'loose', sataCable1: 'broken', sataCable2: 'broken', mainPowerCable: 'broken', gpuPowerCable: 'loose', cpuFan: 'loose' }),
    fixes: [
      {
        componentId: 'cpuMboCable',
        toolId: 'screwdriver',
        description: '✅ CPU MBO kabel je odspojen odvijačem!',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpuMboCable',
        toolId: 'hand',
        description: '✅ CPU MBO kabel je ponovno spojen! Spoj prema matičnoj ploči je sada stabilan.',
        targetStatus: 'working',
      },
      {
        componentId: 'cpuPowerCable',
        toolId: 'screwdriver',
        description: '✅ CPU 8-pin kabel je odspojen odvijačem!',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpuPowerCable',
        toolId: 'hand',
        description: '✅ CPU 8-pin kabel je ponovno spojen! Procesor dobiva stabilan napon.',
        targetStatus: 'working',
      },
      {
        componentId: 'mainPowerCable',
        toolId: 'screwdriver',
        description: '✅ Glavni ATX kabel je odspojen odvijačem! Priključak je bio oštećen.',
        targetStatus: 'removed',
      },
      {
        componentId: 'mainPowerCable',
        toolId: 'replacement',
        description: '✅ Glavni ATX kabel je zamijenjen novim kabelom! Spoj je sada stabilan.',
        targetStatus: 'working',
      },
      {
        componentId: 'sataCable1',
        toolId: 'screwdriver',
        description: '✅ SATA kabel za HDD je odspojen odvijačem! Kabel je bio oštećen.',
        targetStatus: 'removed',
      },
      {
        componentId: 'sataCable1',
        toolId: 'replacement',
        description: '✅ SATA kabel za HDD je zamijenjen novim kabelom!',
        targetStatus: 'working',
      },
      {
        componentId: 'sataCable2',
        toolId: 'screwdriver',
        description: '✅ SATA kabel za SSD je odspojen odvijačem!',
        targetStatus: 'removed',
      },
      {
        componentId: 'sataCable2',
        toolId: 'replacement',
        description: '✅ Oštećeni SATA kabel za SSD je zamijenjen novim kablom! Disk je sada prepoznat i radi.',
        targetStatus: 'working',
      },
      {
        componentId: 'gpuPowerCable',
        toolId: 'screwdriver',
        description: '✅ GPU kabel napajanja je odspojen odvijačem!',
        targetStatus: 'removed',
      },
      {
        componentId: 'gpuPowerCable',
        toolId: 'hand',
        description: '✅ GPU napojni kabel je ponovno spojen i čvrsto stegnut! Grafička kartica radi stabilno.',
        targetStatus: 'working',
      },
      {
        componentId: 'cpuFan',
        toolId: 'screwdriver',
        description: '✅ CPU hladnjak je odspojen odvijačem!',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpuFan',
        toolId: 'hand',
        description: '✅ CPU hladnjak je ponovno pričvršćen! Temperatura se normalizira.',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'cpu', toolId: 'thermalCamera', message: '🌡️ CPU temperatura: 92°C! Procesor se pregrijava zbog kombinacije problema: labavog hladnjaka + labavog napajanja!', type: 'error' },
      { componentId: 'cpuFan', toolId: 'magnifier', message: '🔍 CPU hladnjak je LABAVO PRIČVRŠĆEN na procesor! Nema bliskog kontakta za prijenos topline.', type: 'error' },
      { componentId: 'cpuMboCable', toolId: 'magnifier', message: '🔍 CPU MBO kabel je DJELOMIČNO ODVOJEN! Spoj prema matičnoj ploči nije siguran. Fizički vidljivo da nije potpuno utaknut.', type: 'error' },
      { componentId: 'cpuPowerCable', toolId: 'magnifier', message: '🔍 CPU 8-pin kabel je DJELOMIČNO ODVOJEN! Procesor nema dovoljno napona zbog labavog priključka. To može uzrokovati nestabilnost.', type: 'error' },
      { componentId: 'mainPowerCable', toolId: 'magnifier', message: '🔍 Glavni ATX kabel je oštećen i kontakt nije siguran. Kvar može utjecati na cijeli sustav.', type: 'error' },
      { componentId: 'sataCable1', toolId: 'magnifier', message: '🔍 SATA kabel za HDD je OŠTEĆEN! Žice su vidljivo poderane i izložene - treba zamjena.', type: 'error' },
      { componentId: 'sataCable2', toolId: 'magnifier', message: '🔍 SATA kabel za SSD je OŠTEĆEN! Žice su vidljivo poderane i izložene - treba zamjena!', type: 'error' },
      { componentId: 'gpuPowerCable', toolId: 'magnifier', message: '🔍 GPU napojni kabel je labav! Priključak nije čvrsto spojen na karticu. Grafička kartica gubi napajanje povremeno.', type: 'error' },
      { componentId: 'motherboard', toolId: 'postCard', message: '🖥️ POST kod: Višestruki errori - detektovani problemi s napajanjem CPU-a, RAM memorije i GPU-a. Sustav je nestabilan.', type: 'error' },
      { componentId: 'ram1', toolId: 'magnifier', message: '🔍 RAM modul 1 je pravilno postavljen. Nema problema s memorijom.', type: 'info' },
      { componentId: 'psu', toolId: 'powerTester', message: '🔌 Napajanje daje pravilan napon na svim linijama (12V, 5V, 3.3V), ali kablovi nisu pravilno spojeni pa sustav vidi nestabilnost.', type: 'info' },
    ],
    completionMessage: '🏆🏆🏆 Nevjerojatno! Popravili ste sve kablovske i hladnjačke probleme. Sustav je sada potpuno funkcionalan, stabilan i hladnjak je efikasan!',
    educationalNote: '📖 Ovo je najčešće stanje u starijim igraćim računalima - kombinacija problema. Labavi kablovi + prašina u hladnjaku = pregrijavanje i nestabilnost. Redoslijed dijagnostike: 1) Provjera napajanja, 2) Provjera temperatura, 3) Provjera svih kablovskih veza, 4) Čišćenje. PC Gaming Simulator 2 teče na ovom nivou!',
    hint: '💡 Ovo je najteži level s 5 popravaka! Slijedi red: CPU kablovi (2), SATA kabel (1), GPU kabel (1), CPU hladnjak (1). Koristite povećalo na svim dijelovima i termalnu kameru!',
  },
  // LEVEL 11 - Unstable power delivery
  {
    id: 11,
    name: 'Nestabilno napajanje pod opterećenjem',
    description: 'Računalo se pali, ali pri većem opterećenju zna se resetirati ili zamrznuti. Ventilatori i LED-ice povremeno trepere bez pravila.',
    symptoms: [
      '💡 LED diode na kućištu ponekad kratko zatrepere i ugase se.',
      '⏳ Sustav se povremeno zamrzne kad se otvori više programa odjednom.',
      '🔄 Računalo se zna samo restartirati tijekom rada bez poruke o grešci.',
      '🔊 Zvuk iz kućišta povremeno preskoči ili nakratko nestane.',
    ],
    difficulty: 'Srednje',
    difficultyStars: 2,
    components: makeComponents({ mainPowerCable: 'loose', cpuPowerCable: 'loose' }),
    fixes: [
      {
        componentId: 'mainPowerCable',
        toolId: 'screwdriver',
        description: '✅ Glavni 24-pin ATX kabel je odspojen od matične ploče! Kontakti su bili labavi.',
        targetStatus: 'removed',
      },
      {
        componentId: 'mainPowerCable',
        toolId: 'hand',
        description: '✅ Glavni 24-pin ATX kabel je ponovno spojen i čvrsto sjedi u utoru!',
        targetStatus: 'working',
      },
      {
        componentId: 'cpuPowerCable',
        toolId: 'screwdriver',
        description: '✅ CPU 8-pin kabel napajanja je odspojen! CPU je gubio stabilan napon.',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpuPowerCable',
        toolId: 'hand',
        description: '✅ CPU 8-pin kabel napajanja je ponovno spojen! Procesor sada dobiva stabilnu struju.',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'motherboard', toolId: 'postCard', message: '🖥️ POST kod: Sustav prolazi inicijalni test, ali pod opterećenjem dolazi do nestabilnosti napajanja. Provjerite sve glavne priključke.', type: 'warning' },
      { componentId: 'mainPowerCable', toolId: 'magnifier', message: '🔍 Glavni ATX kabel izgleda kao da nije sasvim čvrsto sjeo u utor. Kontakti nisu idealni.', type: 'error' },
      { componentId: 'cpuPowerCable', toolId: 'magnifier', message: '🔍 CPU 8-pin kabel napajanja ima znakove labavog spoja. Procesor ne dobiva uvijek isti napon.', type: 'error' },
      { componentId: 'psu', toolId: 'powerTester', message: '🔌 Test napajanja: PSU je ispravan, ali izlaz je nestabilan ako su konektori labavi ili djelomično izvučeni.', type: 'warning' },
      { componentId: 'cpu', toolId: 'thermalCamera', message: '🌡️ CPU temperatura je normalna. Problem nije u hlađenju nego u nestabilnom radu pod opterećenjem.', type: 'info' },
    ],
    completionMessage: '🏆 Odlično! Stabilizirali ste napajanje i računalo više ne gubi struju pod opterećenjem.',
    educationalNote: '📖 Labavi napojni kabeli često uzrokuju čudne i nasumične probleme: restart, trzaje, gašenje i zamrzavanje. Uvijek prvo provjerite ATX i CPU napajanje kada se računalo ponaša nestabilno pod opterećenjem.',
    hint: '💡 Krenite s power testerom i povećalom. Ako napajanje radi, provjerite glavni ATX kabel i CPU 8-pin kabel, pa ih odspojite i ponovno čvrsto spojite.',
  },

  // LEVEL 12 - Storage cable failure
  {
    id: 12,
    name: 'Neobični POST zastoji',
    description: 'Računalo se podiže, ali ponekad se tijekom inicijalizacije zastane i ne nastavi dalje bez jasnog razloga.',
    symptoms: [
      '⏳ Sustav ponekad zastane tijekom boot procesa.',
      '🔄 Na ekranu se pojave kratke pauze bez jasnog objašnjenja.',
      '🔊 Pokretanje katkad prođe, a katkad zapne na istom mjestu.',
      '🧩 Nešto u inicijalizaciji radi nestabilno i ne drži se istog obrasca.',
    ],
    difficulty: 'Srednje',
    difficultyStars: 2,
    components: makeComponents({ sataCable2: 'broken' }),
    fixes: [
      {
        componentId: 'sataCable2',
        toolId: 'screwdriver',
        description: '✅ SATA kabel za SSD je odspojen odvijačem! Vidi se da je oštećen.',
        targetStatus: 'removed',
      },
      {
        componentId: 'sataCable2',
        toolId: 'replacement',
        description: '✅ Oštećeni SATA kabel za SSD je zamijenjen novim kabelom! Veza je sada stabilna.',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'motherboard', toolId: 'postCard', message: '🖥️ POST kod: Sustav prolazi osnovni test, ali inicijalizacija povremeno zastane. Provjerite kabelske spojeve i komunikaciju prema uređaju.', type: 'warning' },
      { componentId: 'sataCable2', toolId: 'magnifier', message: '🔍 Kabel uz jedan uređaj pokazuje vidljiva oštećenja na plaštu. Konektor ne izgleda potpuno pouzdano.', type: 'error' },
      { componentId: 'psu', toolId: 'powerTester', message: '🔌 Napajanje je stabilno. Problem je vjerojatno u prijenosu signala, ne u struji.', type: 'info' },
      { componentId: 'motherboard', toolId: 'magnifier', message: '🔍 Matična ploča izgleda fizički u redu. Nema vidljivih oštećenja na konektorima.', type: 'info' },
    ],
    completionMessage: '🏆 Sjajno! Zamijenili ste oštećeni SATA kabel i sustav više ne zastaje pri pokretanju.',
    educationalNote: '📖 SATA kabeli prenose podatke između matične ploče i uređaja za pohranu. Ako su oštećeni ili labavi, sustav može zastajati ili povremeno gubiti vezu bez vrlo jasne poruke o grešci.',
    hint: '💡 Krenite od POST kartice, a zatim pregledajte kabel koji izgleda istrošeno. Ovdje dijagnostika samog uređaja nije prva stvar koju trebate raditi.',
  },
  // LEVEL 13 - Multi-point instability
  {
    id: 13,
    name: 'Slika nestaje pod opterećenjem',
    description: 'Računalo izgleda da radi normalno, ali se slika zna zamrznuti ili nestati kad se otvori zahtjevnija aplikacija. Ventilatori ponekad ubrzaju bez jasnog razloga.',
    symptoms: [
      '📺 Slika se povremeno zamrzne na nekoliko sekundi.',
      '🔊 Zvuk iz igara ili videa zna kratko pucketati.',
      '💨 Ventilatori iznutra naglo ubrzaju pa se opet smire.',
      '🔁 Sustav se ne ruši odmah, ali postaje nestabilan pod opterećenjem.',
    ],
    difficulty: 'Teško',
    difficultyStars: 3,
    components: makeComponents({ gpu: 'loose', gpuPowerCable: 'loose', caseFan: 'dusty', mainPowerCable: 'loose' }),
    fixes: [
      {
        componentId: 'gpuPowerCable',
        toolId: 'screwdriver',
        description: '✅ GPU kabel napajanja je odspojen od kartice! Priključak nije bio čvrst.',
        targetStatus: 'removed',
      },
      {
        componentId: 'gpu',
        toolId: 'screwdriver',
        description: '✅ GPU je izvađena iz PCIe utora! Kartica nije pravilno sjedila.',
        targetStatus: 'removed',
      },
      {
        componentId: 'gpu',
        toolId: 'compressedAir',
        description: '✅ Prašina je očišćena s grafičke kartice! Hladnjaci su sada čisti.',
        targetStatus: 'removed',
      },
      {
        componentId: 'gpu',
        toolId: 'replacement',
        description: '✅ GPU je ponovno pravilno postavljena u PCIe utor! Sada čvrsto sjedi.',
        targetStatus: 'working',
      },
      {
        componentId: 'gpuPowerCable',
        toolId: 'hand',
        description: '✅ GPU kabel napajanja je ponovno spojen i čvrsto stegnut!',
        targetStatus: 'working',
      },
      {
        componentId: 'mainPowerCable',
        toolId: 'screwdriver',
        description: '✅ Glavni 24-pin ATX kabel je odspojen od matične ploče! Spoj je bio labav.',
        targetStatus: 'removed',
      },
      {
        componentId: 'mainPowerCable',
        toolId: 'hand',
        description: '✅ Glavni ATX kabel je ponovno spojen i čvrsto sjedi u utoru!',
        targetStatus: 'working',
      },
      {
        componentId: 'caseFan',
        toolId: 'screwdriver',
        description: '✅ Kućišni ventilator je odspojen! Zrak nije pravilno strujao kroz kućište.',
        targetStatus: 'removed',
      },
      {
        componentId: 'caseFan',
        toolId: 'compressedAir',
        description: '✅ Kućišni ventilator je očišćen kompresiranim zrakom! Lopatice su sada čiste.',
        targetStatus: 'removed',
      },
      {
        componentId: 'caseFan',
        toolId: 'hand',
        description: '✅ Kućišni ventilator je ponovno instaliran u kućište!',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'motherboard', toolId: 'postCard', message: '🖥️ POST kod: Sustav se pokreće, ali pod opterećenjem dolazi do nestabilnosti slike i napajanja. Provjerite više konekcija.', type: 'warning' },
      { componentId: 'gpu', toolId: 'magnifier', message: '🔍 Grafička kartica izgleda kao da nije potpuno sjela u utor. Rub je blago podignut.', type: 'error' },
      { componentId: 'gpuPowerCable', toolId: 'magnifier', message: '🔍 GPU kabel napajanja je djelomično odvojen. Priključak nije siguran.', type: 'error' },
      { componentId: 'caseFan', toolId: 'magnifier', message: '🔍 Kućišni ventilator je pun prašine i protok zraka je slab. Hlađenje nije optimalno.', type: 'warning' },
      { componentId: 'mainPowerCable', toolId: 'magnifier', message: '🔍 Glavni ATX kabel je labav i povremeno gubi kontakt. To može uzrokovati nestabilnost cijelog sustava.', type: 'error' },
      { componentId: 'psu', toolId: 'powerTester', message: '🔌 Napajanje je ispravno, ali sustav dobiva nestabilne uvjete zbog labavih konektora i lošeg protoka zraka.', type: 'warning' },
      { componentId: 'cpu', toolId: 'thermalCamera', message: '🌡️ CPU temperatura je normalna. Problem se ne čini kao čisto termički.', type: 'info' },
    ],
    completionMessage: '🏆 Izvrsno! Stabilizirali ste sliku, napajanje i hlađenje. Sustav je opet pouzdan i pod opterećenjem.',
    educationalNote: '📖 Problemi koji se javljaju samo pod opterećenjem često su kombinacija više slabih točaka: labav GPU, nestabilno napajanje i loš protok zraka. Dijagnostika mora biti sustavna jer jedan simptom može imati više uzroka.',
    hint: '💡 Krenite od POST kartice, zatim provjerite grafičku karticu, GPU kabel, glavni ATX kabel i kućišni ventilator. Redoslijed će otkriti pravi uzrok.',
  },

  // LEVEL 14 - Mixed critical failures
  {
    id: 14,
    name: 'Višestruki kvarovi pod istim simptomima',
    description: 'Računalo se ponekad zamrzne, ponekad resetira, a ponekad samo uspori bez jasnog razloga. Simptomi se mijenjaju iz minute u minutu.',
    symptoms: [
      '🧊 Sustav se zna zamrznuti bez upozorenja.',
      '🔄 Ponekad dođe do spontanog restarta.',
      '💾 Kopiranje datoteka i dalje završava, ali uz neočekivane zastoje.',
      '🔊 Ventilator procesora je neuobičajeno glasan nakon nekoliko minuta rada.',
    ],
    difficulty: 'Teško',
    difficultyStars: 3,
    components: makeComponents({ cpuFan: 'dusty', cpu: 'overheating', cpuMboCable: 'loose', cpuPowerCable: 'loose', ram2: 'failing', sataCable2: 'broken' }),
    fixes: [
      {
        componentId: 'cpuMboCable',
        toolId: 'screwdriver',
        description: '✅ CPU MBO kabel je odspojen odvijačem! Spoj je bio nestabilan.',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpuPowerCable',
        toolId: 'screwdriver',
        description: '✅ CPU 8-pin kabel napajanja je odspojen! Procesor nije dobivao stabilan napon.',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpuFan',
        toolId: 'screwdriver',
        description: '✅ CPU hladnjak je odspojen od procesora!',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpuFan',
        toolId: 'compressedAir',
        description: '✅ CPU hladnjak je očišćen kompresiranim zrakom! Prašina je uklonjena.',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpu',
        toolId: 'thermalPaste',
        description: '✅ Nova termalna pasta je nanesena na CPU! Toplinski kontakt je obnovljen.',
        targetStatus: 'working',
      },
      {
        componentId: 'cpuFan',
        toolId: 'hand',
        description: '✅ CPU hladnjak je ponovno pričvršćen na procesor!',
        targetStatus: 'working',
      },
      {
        componentId: 'cpuPowerCable',
        toolId: 'hand',
        description: '✅ CPU 8-pin kabel napajanja je ponovno spojen!',
        targetStatus: 'working',
      },
      {
        componentId: 'cpuMboCable',
        toolId: 'hand',
        description: '✅ CPU MBO kabel je ponovno spojen!',
        targetStatus: 'working',
      },
      {
        componentId: 'ram2',
        toolId: 'screwdriver',
        description: '✅ Pokvareni RAM modul 2 je odspojen odvijačem iz DIMM utora!',
        targetStatus: 'removed',
      },
      {
        componentId: 'ram2',
        toolId: 'replacement',
        description: '✅ Pokvareni RAM modul 2 je zamijenjen novim RAM modulom!',
        targetStatus: 'working',
      },
      {
        componentId: 'sataCable2',
        toolId: 'screwdriver',
        description: '✅ SATA kabel za SSD je odspojen odvijačem! Kabel je bio oštećen.',
        targetStatus: 'removed',
      },
      {
        componentId: 'sataCable2',
        toolId: 'replacement',
        description: '✅ Oštećeni SATA kabel za SSD je zamijenjen novim kablom!',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'cpu', toolId: 'thermalCamera', message: '🌡️ CPU temperatura: 94°C! Procesor se pregrijava i aktivira termalnu zaštitu.', type: 'error' },
      { componentId: 'cpuFan', toolId: 'magnifier', message: '🔍 CPU hladnjak je prekriven prašinom i protok zraka je slab. Hlađenje nije učinkovito.', type: 'error' },
      { componentId: 'cpuMboCable', toolId: 'magnifier', message: '🔍 CPU MBO kabel je djelomično odvojen. Spoj prema matičnoj ploči nije siguran.', type: 'error' },
      { componentId: 'cpuPowerCable', toolId: 'magnifier', message: '🔍 CPU 8-pin kabel je labav i procesor povremeno gubi stabilan napon.', type: 'error' },
      { componentId: 'ram2', toolId: 'magnifier', message: '🔍 RAM modul 2 pokazuje znakove oštećenja na čipovima. Modul treba zamjenu.', type: 'error' },
      { componentId: 'ram2', toolId: 'diagnosticDisk', message: '💿 MemTest rezultat: RAM modul 2 vraća brojne greške na memorijskim adresama. Potrebna je zamjena.', type: 'error' },
      { componentId: 'sataCable2', toolId: 'magnifier', message: '🔍 SATA kabel za SSD je oštećen i ima vidljive tragove trošenja na plaštu.', type: 'error' },
      { componentId: 'sataCable2', toolId: 'diagnosticDisk', message: '💿 Disk dijagnostika: SSD je zdrav, ali komunikacija prema njemu puca. Problem je vjerojatno u kabelu.', type: 'warning' },
      { componentId: 'motherboard', toolId: 'postCard', message: '🖥️ POST kod: Višestruki problemi - memorija, napajanje CPU-a i protok podataka. Sustav je nestabilan.', type: 'error' },
      { componentId: 'psu', toolId: 'powerTester', message: '🔌 Napajanje radi normalno, ali sustav je opterećen zbog kombinacije više manjih kvarova.', type: 'info' },
    ],
    completionMessage: '🏆 Fantastično! Riješili ste višestruke kvarove i računalo je sada ponovno stabilno, hladno i pouzdano.',
    educationalNote: '📖 U stvarnim računalima često postoji više kvarova odjednom. Najbolji pristup je prvo izolirati simptome dijagnostikom, pa rješavati jedan po jedan uz strogi redoslijed: kabeli, hlađenje, memorija i pohrana.',
    hint: '💡 Ovo je višekorak: prvo CPU napajanje i hlađenje, zatim RAM, pa SATA kabel. Koristite termalnu kameru, povećalo, POST karticu i dijagnostički disk.',
  },
  // LEVEL 15 - POST and power instability
  {
    id: 15,
    name: 'Čudni POST kodovi i kratki restarti',
    description: 'Računalo prođe dio početka, ali onda POST prijavi problem i sustav se zna ponovno pokrenuti prije desktopa.',
    symptoms: [
      '🖥️ POST kodovi se mijenjaju i nisu uvijek isti.',
      '🔄 Računalo zna restartati prije nego što se sustav učita.',
      '⚠️ Ponekad izgleda kao da memorija ili napajanje nisu stabilni.',
      '🕒 Simptomi nisu potpuno isti pri svakom paljenju.',
    ],
    difficulty: 'Teško',
    difficultyStars: 3,
    components: makeComponents({ mainPowerCable: 'loose', cpuPowerCable: 'loose', ram1: 'failing' }),
    fixes: [
      {
        componentId: 'mainPowerCable',
        toolId: 'screwdriver',
        description: '✅ Glavni 24-pin ATX kabel je odspojen odvijačem!',
        targetStatus: 'removed',
      },
      {
        componentId: 'mainPowerCable',
        toolId: 'hand',
        description: '✅ Glavni 24-pin ATX kabel je ponovno spojen i čvrsto sjedi u utoru!',
        targetStatus: 'working',
      },
      {
        componentId: 'cpuPowerCable',
        toolId: 'screwdriver',
        description: '✅ CPU 8-pin kabel napajanja je odspojen!',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpuPowerCable',
        toolId: 'hand',
        description: '✅ CPU 8-pin kabel napajanja je ponovno spojen! Procesor sada dobiva stabilnu struju.',
        targetStatus: 'working',
      },
      {
        componentId: 'ram1',
        toolId: 'screwdriver',
        description: '✅ Pokvareni RAM modul 1 je odspojen odvijačem iz DIMM utora!',
        targetStatus: 'removed',
      },
      {
        componentId: 'ram1',
        toolId: 'replacement',
        description: '✅ Pokvareni RAM modul 1 je zamijenjen novim RAM modulom! Postavka sada prolazi stabilno.',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'motherboard', toolId: 'postCard', message: '🖥️ POST kod: Inicijalni test prolazi, ali sustav je nestabilan pri dodjeli memorije i napajanja. Provjerite naponske vodove i RAM modul 1.', type: 'error' },
      { componentId: 'ram1', toolId: 'magnifier', message: '🔍 RAM modul 1 pokazuje znakove greške na jednom čipu. Modul ne drži stabilne podatke.', type: 'error' },
      { componentId: 'mainPowerCable', toolId: 'magnifier', message: '🔍 Glavni ATX kabel nije sasvim čvrsto sjeo u utor. Kontakti nisu idealni.', type: 'warning' },
      { componentId: 'cpuPowerCable', toolId: 'magnifier', message: '🔍 CPU 8-pin kabel napajanja ima znakove labavog spoja. Procesor ne dobiva uvijek isti napon.', type: 'warning' },
      { componentId: 'psu', toolId: 'powerTester', message: '🔌 Napajanje daje stabilan izlaz, ali sustav ipak vidi nestabilnost zbog priključaka i memorije.', type: 'info' },
    ],
    completionMessage: '🏆 Odlično! Stabilizirali ste POST i memoriju, a računalo se sada podiže bez restartanja.',
    educationalNote: '📖 Kada POST i napajanje daju miješane simptome, često je problem u kombinaciji naponskih vodova i RAM-a. Najbolje je krenuti od POST koda pa zatim provjeriti napajanje i memorijske module.',
    hint: '💡 Krenite s POST karticom, zatim provjerite naponske kabele i RAM modul 1. Redoslijed vam otkriva koji dio treba samo vratiti, a koji zamijeniti.',
  },
  // LEVEL 16 - Cooling and airflow
  {
    id: 16,
    name: 'Slab protok zraka i bučno hlađenje',
    description: 'Računalo radi, ali ventilacija postaje sve glasnija i temperatura unutar kućišta raste nakon nekoliko minuta rada.',
    symptoms: [
      '💨 Iz kućišta izlazi topao zrak i osjeća se loš protok.',
      '🔊 Ventilatori postaju glasniji nego inače.',
      '🌡️ Temperatura procesora se penje čim sustav dobije opterećenje.',
      '⚠️ Računalo ne pada odmah, ali se ponaša kao da se teško hladi.',
    ],
    difficulty: 'Teško',
    difficultyStars: 3,
    components: makeComponents({ cpuMboCable: 'loose', cpuPowerCable: 'loose', cpuFan: 'dusty', caseFan: 'dusty', cpu: 'overheating' }),
    fixes: [
      {
        componentId: 'cpuMboCable',
        toolId: 'screwdriver',
        description: '✅ CPU MBO kabel je odspojen odvijačem!',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpuMboCable',
        toolId: 'hand',
        description: '✅ CPU MBO kabel je ponovno spojen!',
        targetStatus: 'working',
      },
      {
        componentId: 'cpuPowerCable',
        toolId: 'screwdriver',
        description: '✅ CPU 8-pin kabel napajanja je odspojen!',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpuPowerCable',
        toolId: 'hand',
        description: '✅ CPU 8-pin kabel napajanja je ponovno spojen!',
        targetStatus: 'working',
      },
      {
        componentId: 'cpuFan',
        toolId: 'screwdriver',
        description: '✅ CPU hladnjak je odspojen od procesora!',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpuFan',
        toolId: 'compressedAir',
        description: '✅ CPU hladnjak je očišćen od prašine kompresiranim zrakom!',
        targetStatus: 'removed',
      },
      {
        componentId: 'cpu',
        toolId: 'thermalPaste',
        description: '✅ Nova termalna pasta je nanesena na procesor!',
        targetStatus: 'working',
      },
      {
        componentId: 'cpuFan',
        toolId: 'hand',
        description: '✅ CPU hladnjak je ponovno pričvršćen na procesor!',
        targetStatus: 'working',
      },
      {
        componentId: 'caseFan',
        toolId: 'screwdriver',
        description: '✅ Kućišni ventilator je odspojen!',
        targetStatus: 'removed',
      },
      {
        componentId: 'caseFan',
        toolId: 'compressedAir',
        description: '✅ Kućišni ventilator je očišćen kompresiranim zrakom!',
        targetStatus: 'removed',
      },
      {
        componentId: 'caseFan',
        toolId: 'hand',
        description: '✅ Kućišni ventilator je ponovno instaliran u kućište!',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'cpu', toolId: 'thermalCamera', message: '🌡️ CPU temperatura je previsoka. Hlađenje ne odvodi toplinu dovoljno brzo.', type: 'error' },
      { componentId: 'cpuFan', toolId: 'magnifier', message: '🔍 CPU hladnjak je prekriven prašinom i nema dobar kontakt s procesorom.', type: 'error' },
      { componentId: 'caseFan', toolId: 'magnifier', message: '🔍 Kućišni ventilator je pun prašine i zrak ne cirkulira idealno kroz kućište.', type: 'warning' },
      { componentId: 'motherboard', toolId: 'postCard', message: '🖥️ POST kod: Sustav se podiže, ali hlađenje i protok zraka ne drže temperaturu stabilnom.', type: 'warning' },
      { componentId: 'psu', toolId: 'powerTester', message: '🔌 Napajanje je stabilno. Problem izgleda vezan uz hlađenje i protok zraka.', type: 'info' },
    ],
    completionMessage: '🏆 Sjajno! Ventilacija i CPU hlađenje su stabilizirani, a temperature su se vratile u normalu.',
    educationalNote: '📖 Slab protok zraka i prašina često stvaraju probleme koji izgledaju kao kvar napajanja ili procesora. Najprije se provjerava ventilacija, zatim kontakt hladnjaka i na kraju termalna pasta.',
    hint: '💡 Prvo provjerite temperaturu i protok zraka, zatim riješite CPU hladnjak, a tek onda vratite sve ventilatore i kabele.',
  },
  // LEVEL 17 - Memory and GPU thermal issue
  {
    id: 17,
    name: 'Kombinacija memorije i toplinskog problema',
    description: 'Računalo radi, ali se pod opterećenjem pojavljuju zamrzavanja, vizualne smetnje i pad performansi.',
    symptoms: [
      '🧊 Sustav se ponekad zamrzne bez upozorenja.',
      '🎮 U igrama se pojavljuju čudni artefakti i trzaji.',
      '🧠 Ponašanje memorije nije stabilno pri većem opterećenju.',
      '🌡️ Jedan dio sustava djeluje znatno toplije od ostalih.',
    ],
    difficulty: 'Teško',
    difficultyStars: 3,
    components: makeComponents({ ram1: 'failing', ram2: 'failing', gpu: 'overheating' }),
    fixes: [
      {
        componentId: 'ram1',
        toolId: 'screwdriver',
        description: '✅ RAM modul 1 je odspojen odvijačem iz DIMM utora!',
        targetStatus: 'removed',
      },
      {
        componentId: 'ram1',
        toolId: 'replacement',
        description: '✅ RAM modul 1 je zamijenjen novim modulom!',
        targetStatus: 'working',
      },
      {
        componentId: 'ram2',
        toolId: 'screwdriver',
        description: '✅ RAM modul 2 je odspojen odvijačem iz DIMM utora!',
        targetStatus: 'removed',
      },
      {
        componentId: 'ram2',
        toolId: 'replacement',
        description: '✅ RAM modul 2 je zamijenjen novim modulom!',
        targetStatus: 'working',
      },
      {
        componentId: 'gpu',
        toolId: 'thermalPaste',
        description: '✅ Nova termalna pasta je nanesena na GPU! Toplinski kontakt je obnovljen.',
        targetStatus: 'working',
      },
    ],
    diagnostics: [
      { componentId: 'motherboard', toolId: 'postCard', message: '🖥️ POST kod: Sustav prijavljuje nestabilnost memorije i jednu komponentu s visokim toplinskim opterećenjem.', type: 'error' },
      { componentId: 'ram1', toolId: 'magnifier', message: '🔍 RAM modul 1 pokazuje znakove greške na jednom čipu. Modul ne drži stabilne podatke.', type: 'error' },
      { componentId: 'ram2', toolId: 'magnifier', message: '🔍 RAM modul 2 pokazuje slične znakove nestabilnosti. Memorija nije potpuno pouzdana.', type: 'error' },
      { componentId: 'gpu', toolId: 'thermalCamera', message: '🌡️ Jedna komponenta je znatno toplija od ostalih. Prije bilo kakve intervencije treba potvrditi toplinski problem.', type: 'error' },
      { componentId: 'psu', toolId: 'powerTester', message: '🔌 Napajanje radi normalno, ali sustav je pod stresom zbog kombinacije memorijskih i toplinskih problema.', type: 'info' },
    ],
    completionMessage: '🏆 Fantastično! Zamijenili ste oba RAM modula i riješili toplinski problem na GPU-u.',
    educationalNote: '📖 Kada imate i memorijske i toplinske simptome, dijagnostika mora prvo potvrditi što je stvarno vruće, a što je samo nestabilno. Kombinacija više kvarova često stvara varljive simptome.',
    hint: '💡 Prvo termalnom kamerom pronađite komponentu koja je najtoplija, a zatim riješite memoriju. Tek nakon dijagnoze ima smisla nanositi termalnu pastu.',
  },
];

export function getLevel(id: number): LevelData {
  return LEVELS[id - 1];
}
export function getStatusEmoji(status: ComponentState['status']): string {
  switch (status) {
    case 'working': return '✅';
    case 'dusty': return '💨';
    case 'loose': return '⚠️';
    case 'failing': return '❌';
    case 'broken': return '💀';
    case 'overheating': return '🔥';
    case 'removed': return '📤';
  }
}

export function getStatusColor(status: ComponentState['status']): string {
  switch (status) {
    case 'working': return 'border-green-500';
    case 'dusty': return 'border-yellow-600';
    case 'loose': return 'border-orange-500';
    case 'failing': return 'border-red-500';
    case 'broken': return 'border-red-800';
    case 'overheating': return 'border-orange-600';
    case 'removed': return 'border-gray-600';
  }
}

export function getStatusBgClass(status: ComponentState['status']): string {
  switch (status) {
    case 'working': return '';
    case 'dusty': return 'opacity-80';
    case 'loose': return '';
    case 'failing': return 'animate-pulse-red';
    case 'broken': return 'animate-pulse-red';
    case 'overheating': return 'animate-pulse-orange';
    case 'removed': return 'opacity-30';
  }
}







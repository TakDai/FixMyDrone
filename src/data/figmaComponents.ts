export interface ComponentBrandOption {
  id: string;
  name: string;
  brand: string;
  model: string;
  badge: string;
  description: string;
  specifications: Record<string, string>;
  commonIssues: {
    title: string;
    symptoms: string;
    cause: string;
    fix: string;
    successRate: number;
  }[];
}

export interface FigmaComponentData {
  id: string;
  name: string;
  category: string;
  model: string;
  hotspot: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  description: string;
  role: string;
  commonIssues: {
    title: string;
    symptoms: string;
    cause: string;
    fix: string;
    successRate: number;
  }[];
  specifications: Record<string, string>;
  brands?: ComponentBrandOption[];
  selectedBrandId?: string;
}

export const GOGGLE_BRANDS: ComponentBrandOption[] = [
  {
    id: 'fatshark',
    name: 'Fat Shark Dominator / HDO 2',
    brand: 'Fat Shark',
    model: 'HDO 2 OLED (Analog / Walksnail)',
    badge: 'FAT SHARK',
    description: 'La référence historique du FPV analogique et numérique modulaire avec doubles écrans OLED Sony.',
    specifications: {
      'Technologie': 'Double dalles Micro-OLED',
      'Résolution': '1280 × 960 (4:3) / 1080p',
      'FOV': '46° diagonal',
      'Récepteur': 'Baie modulaire standard 5.8GHz',
    },
    commonIssues: [
      {
        title: 'Buée sur les lentilles par temps froid ou humide',
        symptoms: 'Vision floue après 30 secondes sur le visage.',
        cause: 'Condensation thermique entre le visage et les lentilles froides.',
        fix: 'Allumer le mini-ventilateur antibuée intégré 1 minute avant de voler.',
        successRate: 100,
      },
      {
        title: 'Lignes de balayage ou parasites horizontaux',
        symptoms: 'Parasites blancs qui défilent sur l écran en analogique.',
        cause: 'Filtre LC insuffisant sur l alimentation du récepteur.',
        fix: 'Vérifier la tension de la batterie de lunettes ou installer un module RapidFIRE.',
        successRate: 96,
      },
    ],
  },
  {
    id: 'dji',
    name: 'DJI Goggles 2 / Integra / V2',
    brand: 'DJI FPV',
    model: 'Goggles 2 / Integra (O3 HD System)',
    badge: 'DJI FPV',
    description: 'Système vidéo numérique HD DJI O3 à latence ultra-faible avec écrans Micro-OLED 1080p 100fps.',
    specifications: {
      'Technologie': 'DJI O3 Transmission HD',
      'Résolution': '1920 × 1080 Micro-OLED',
      'Latence': '< 30 ms',
      'Portée max': 'Jusqu à 10 km (FCC)',
    },
    commonIssues: [
      {
        title: 'Alerte "Low Power Mode" qui persiste au décollage',
        symptoms: 'Le bitrate reste bridé à 25Mbps et l image se pixelise.',
        cause: 'L O3 Air Unit attend le signal d armement via le protocole MSP.',
        fix: 'Vérifier que les ports UART TX/RX entre la FC et le Air Unit sont bien inversés.',
        successRate: 98,
      },
      {
        title: 'Écran noir après mise à jour firmware',
        symptoms: 'Les lunettes bipent en continu et refusent d afficher le retour.',
        cause: 'Décalage de version de firmware entre les lunettes et le Air Unit.',
        fix: 'Relancer DJI Assistant 2 (Consumer Drones Series) et reflasher la même version.',
        successRate: 99,
      },
    ],
  },
  {
    id: 'walksnail',
    name: 'Walksnail Avatar HD Goggles X',
    brand: 'Walksnail',
    model: 'Avatar HD Goggles X (OLED 1080p)',
    badge: 'WALKSNAIL HD',
    description: 'Écosystème numérique haute définition Walksnail Avatar avec module VRX amovible et entrée HDMI.',
    specifications: {
      'Technologie': 'Avatar HD H.265',
      'Résolution': '1080p 100fps OLED',
      'FOV': '50° champ large',
      'VRX': 'Module remplaçable nouvelle génération',
    },
    commonIssues: [
      {
        title: 'Déconnexion du flux vidéo lors d un coup de gaz violent',
        symptoms: 'Écran figé une seconde avec message "Link Lost".',
        cause: 'Chute de tension sur le VTX Walksnail alimenté directement en VTX sans condo.',
        fix: 'Ajouter un condensateur Low ESR 1000µF 35V directement aux bornes de la LiPo.',
        successRate: 97,
      },
    ],
  },
  {
    id: 'hdzero',
    name: 'HDZero Goggles',
    brand: 'HDZero',
    model: 'HDZero Goggle (Zero-Latency Digital)',
    badge: 'HDZERO',
    description: 'Conçues pour la course FPV avec une latence fixe incompressible de 14ms et support 90fps.',
    specifications: {
      'Technologie': 'HDZero Uncompressed Digital',
      'Résolution': '1080p 90fps OLED',
      'Latence': '14 ms fixe temps réel',
      'Analogique': 'Module analogique inclus avec de-interlacer',
    },
    commonIssues: [
      {
        title: 'Bruit de neige arc-en-ciel en limite de portée',
        symptoms: 'La vidéo se dégrade en paillettes sans latence supplémentaire.',
        cause: 'Comportement normal de HDZero qui ne met pas en mémoire tampon.',
        fix: 'Orienter les antennes directionnelles patch vers la zone de vol.',
        successRate: 95,
      },
    ],
  },
  {
    id: 'skyzone',
    name: 'Skyzone SKY04X PRO',
    brand: 'Skyzone',
    model: 'SKY04X PRO (OLED 1920x1080)',
    badge: 'SKYZONE',
    description: 'Lunettes analogiques et numériques haut de gamme avec récepteur Steadyview V3.3 à fusion de signaux.',
    specifications: {
      'Technologie': 'Steadyview 5.8GHz Fusion',
      'Résolution': '1920 × 1080 OLED 100Hz',
      'FOV': '52° ultra-large',
      'DVR': '60fps H.264 intégré',
    },
    commonIssues: [
      {
        title: 'Désynchronisation de l image en mode Diversity standard',
        symptoms: 'L image saute lors des transitions entre deux antennes.',
        cause: 'Mode Diversity basique sélectionné au lieu de Steadyview.',
        fix: 'Activer le mode Steadyview Mix dans le menu système des lunettes.',
        successRate: 98,
      },
    ],
  },
];

export const RADIO_BRANDS: ComponentBrandOption[] = [
  {
    id: 'radiomaster',
    name: 'RadioMaster Boxer / Pocket / TX16S',
    brand: 'RadioMaster',
    model: 'Boxer MAX / Pocket ELRS (EdgeTX)',
    badge: 'RADIOMASTER',
    description: 'La référence mondiale des radiocommandes FPV open-source sous EdgeTX avec ExpressLRS natif jusqu à 1000mW.',
    specifications: {
      'Système': 'EdgeTX 2.10 multi-langues',
      'Protocole RF': 'ExpressLRS 2.4GHz natif 1000mW',
      'Gimbals': 'Capteurs à effet Hall CNC AG01',
      'Taux de rafraîchissement': 'Jusqu à 1000 Hz',
    },
    commonIssues: [
      {
        title: 'Erreur "Emergency Mode" sur l écran au démarrage',
        symptoms: 'La radio démarre en boucle avec fond d écran d urgence.',
        cause: 'Fichier de modèle ou script LUA corrompu sur la carte MicroSD.',
        fix: 'Sauvegarder et formater la carte SD en FAT32, puis réinstaller les sons et thèmes EdgeTX.',
        successRate: 99,
      },
      {
        title: 'Gimbal qui ne revient pas exactement à 1500us dans Betaflight',
        symptoms: 'Léger drift persistant sur le roulis ou l lacet.',
        cause: 'Étalonnage des sticks non effectué après changement de ressort.',
        fix: 'Lancer l étalonnage des axes dans le menu Hardware d EdgeTX.',
        successRate: 100,
      },
    ],
  },
  {
    id: 'tbs',
    name: 'TBS Tango II / Mambo',
    brand: 'Team BlackSheep',
    model: 'TBS Tango II Pro V3 (Crossfire)',
    badge: 'TBS TANGO II',
    description: 'Format manette ergonomique plébiscité pour le freestyle avec module Crossfire Long-Range intégré et gimbals pliables.',
    specifications: {
      'Système': 'FreedomTX / EdgeTX',
      'Protocole RF': 'TBS Crossfire 868MHz / 915MHz',
      'Puissance max': 'Jusqu à 500mW / 1W',
      'Antenne': 'T-Antenne pliable omnidirectionnelle',
    },
    commonIssues: [
      {
        title: 'Gimbal des gaz qui frotte ou ne revient pas parfaitement au neutre',
        symptoms: 'Dérive lente sur le Roll ou Pitch en vol sans toucher les sticks.',
        cause: 'Vis de tension de ressort mal calibrée.',
        fix: 'Ouvrir le capot arrière et ajuster la vis de serrage de friction du stick.',
        successRate: 98,
      },
      {
        title: 'Message "CRSF V3 Required" lors du bind',
        symptoms: 'Liaison impossible avec le récepteur Crossfire Nano.',
        cause: 'Mise à jour requise du module interne de la radio.',
        fix: 'Connecter la Tango II à TBS Agent X en USB et mettre à jour le firmware.',
        successRate: 100,
      },
    ],
  },
  {
    id: 'jumper',
    name: 'Jumper T-Pro V2 / T20',
    brand: 'Jumper RC',
    model: 'Jumper T20 Gemini ELRS',
    badge: 'JUMPER RC',
    description: 'Radiocommandes compactes et modulaires à double émetteur Gemini pour une redondance de signal absolue.',
    specifications: {
      'Système': 'EdgeTX',
      'Protocole RF': 'ELRS 2.4GHz Dual Gemini',
      'Refroidissement': 'Ventilateur interne haute puissance',
    },
    commonIssues: [
      {
        title: 'Surchauffe du module RF à 1000mW',
        symptoms: 'Avertissement de température radio après 15 minutes d utilisation.',
        cause: 'Ventilateur réglé en mode silencieux ou obstrué.',
        fix: 'Activer le déclenchement automatique du ventilateur à partir de 250mW dans le script LUA.',
        successRate: 97,
      },
    ],
  },
  {
    id: 'frsky',
    name: 'FrSky Taranis QX7 / X9D Plus',
    brand: 'FrSky',
    model: 'Taranis QX7 ACCESS / ACCST',
    badge: 'FRSKY TARANIS',
    description: 'Le châssis radio légendaire des pionniers du FPV, avec baie JR arrière pour modules externes ELRS/Crossfire.',
    specifications: {
      'Système': 'OpenTX / EdgeTX',
      'Baie externe': 'Format JR standard (compatible Crossfire/ELRS)',
      'Écran': 'LCD rétro-éclairé 128×64',
    },
    commonIssues: [
      {
        title: 'Télémétrie perdue avec module externe ELRS (Baudrate error)',
        symptoms: 'Alerte sonore "Télémétrie perdue" toutes les 10 secondes.',
        cause: 'Inverseur matériel de la radio limité à 115200 bauds sur anciennes QX7.',
        fix: 'Régler le baudrate à 115200 dans EdgeTX ou souder le petit câble OneBit mod.',
        successRate: 96,
      },
    ],
  },
];

export const CONFIGURATOR_BRANDS: ComponentBrandOption[] = [
  {
    id: 'betaflight',
    name: 'Betaflight 4.5 Configurator',
    brand: 'Betaflight',
    model: 'Betaflight 4.5.x Cloud Build',
    badge: 'BETAFLIGHT',
    description: 'Le firmware de contrôle de vol open-source le plus utilisé au monde pour le freestyle et la compétition.',
    specifications: {
      'Version': 'Betaflight 4.5.0 Release',
      'Boucle PID': '8 kHz / 8 kHz synchronisé',
      'Filtrage': 'RPM Filter dynamique + PT1/Biquad D-Term',
      'Fonctions phares': 'GPS Rescue v2, DSHOT bidirectionnel, OSD Canvas HD',
    },
    commonIssues: [
      {
        title: 'Moteurs qui chauffent suite à mauvaise configuration de filtres',
        symptoms: 'Cloches des moteurs chaudes après 1 minute de vol calme.',
        cause: 'Curseurs de filtrage D poussés trop à droite sans RPM filter fonctionnel.',
        fix: 'Réactiver le DSHOT bidirectionnel et remettre les curseurs de filtres à 1.0 (défaut).',
        successRate: 98,
      },
      {
        title: 'Le drone refuse d armer (Arming Flags bloquants)',
        symptoms: 'Rien ne tourne quand on active l interrupteur ARM sur la radio.',
        cause: 'Sécurité logicielle (gaz non nuls, accéléromètre désaligné, bad RX).',
        fix: 'Taper "status" dans le CLI de Betaflight pour identifier l arming flag bloquant.',
        successRate: 99,
      },
    ],
  },
  {
    id: 'inav',
    name: 'INAV 7.1 Navigation Configurator',
    brand: 'INAV Flight',
    model: 'INAV 7.1 Long-Range & Autonomous',
    badge: 'INAV FLIGHT',
    description: 'Spécialisé dans les missions longue distance, les vols autonomes, le vol stationnaire assisté et les ailes volantes.',
    specifications: {
      'Version': 'INAV 7.1.0',
      'Navigation': 'Waypoints autonomes, Return To Home (RTH) sécurisé',
      'Capteurs': 'Support boussole compas I2C, Baromètre haute précision',
    },
    commonIssues: [
      {
        title: 'Le drone fait des cercles ("Toilet Bowling") en stationnaire GPS',
        symptoms: 'Le quad spirale de plus en plus vite en mode PosHold.',
        cause: 'Calibration de la boussole erronée ou magnétisme des câbles de puissance.',
        fix: 'Éloigner le compas magnétique des fils de batterie et recalibrer sur 6 axes à l extérieur.',
        successRate: 96,
      },
    ],
  },
  {
    id: 'kiss',
    name: 'KISS Ultra / FETtec Configurator',
    brand: 'KISS / FETtec',
    model: 'KISS Ultra v2 / FETtec OSD',
    badge: 'KISS ULTRA',
    description: 'Réputé pour son ressenti de vol organique, ses boucles ultra-rapides et sa simplicité de réglage.',
    specifications: {
      'Architecture': 'Algorithme adaptatif KISS',
      'Protocole ESC': 'OneShot / DShot / FETtec OneWire',
      'Ressenti': 'Sensibilité organique pour le cinématique et le flow freestyle',
    },
    commonIssues: [
      {
        title: 'Perte de télémétrie ESC OneWire',
        symptoms: 'Consommation mAh et régime RPM non affichés dans l OSD.',
        cause: 'Câble OneWire RX/TX croisé ou soudure froide.',
        fix: 'Vérifier la ligne OneWire et flasher le firmware FETtec ESC correspondant.',
        successRate: 98,
      },
    ],
  },
  {
    id: 'emuflight',
    name: 'EmuFlight Configurator',
    brand: 'EmuFlight',
    model: 'EmuFlight 0.4.x (IMU-F)',
    badge: 'EMUFLIGHT',
    description: 'Fork spécialisé dans le filtrage dynamique IMU-F pour une réactivité instantanée sur les quads légers.',
    specifications: {
      'Filtrage': 'Filtres IMU-F dynamiques',
      'Spécialité': 'Reprise d accroche immédiate en sortie de powerloop',
    },
    commonIssues: [
      {
        title: 'Oscillations rapides sur les arrêts nets de figures (Bounceback)',
        symptoms: 'Vibrations sonores sur les roll stops.',
        cause: 'Gain D trop élevé ou dynamique d hélice non amortie.',
        fix: 'Activer le curseur "Dynamic D" dans l onglet PID d EmuFlight.',
        successRate: 95,
      },
    ],
  },
  {
    id: 'ardupilot',
    name: 'ArduPilot / Mission Planner',
    brand: 'ArduPilot',
    model: 'ArduCopter 4.5 Pro Missions',
    badge: 'ARDUPILOT',
    description: 'Le standard professionnel de l industrie pour les drones de cartographie, surveillance et missions programmées.',
    specifications: {
      'Capacités': 'Télémétrie MAVLink, évitement d obstacles, LiDAR',
      'Missions': 'Grilles de photogrammétrie automatiques',
    },
    commonIssues: [
      {
        title: 'Alerte "PreArm: EKF attitude divergence"',
        symptoms: 'Refus de décoller en mode automatique.',
        cause: 'Conflit de données entre l accéléromètre et le GPS.',
        fix: 'Attendre le HDOP < 1.2 et vérifier la fixation anti-vibration de la FC.',
        successRate: 99,
      },
    ],
  },
];

export const FIGMA_COMPONENTS: FigmaComponentData[] = [
  {
    id: 'frame',
    name: 'Châssis Carbone True-X',
    category: 'Structure',
    model: 'iFlight / Apex Freestyle 5"',
    hotspot: {
      top: '18%',
      left: '18%',
      width: '38%',
      height: '62%',
    },
    description: 'Châssis en fibre de carbone T700 haute rigidité pour quad 5 pouces.',
    role: 'Structure principale protégeant l électronique et maintenant les 4 bras moteurs.',
    specifications: {
      'Épaisseur bras': '5.5 mm',
      'Top plate': '2.0 mm',
      'Format': 'True-X 225mm',
      'Poids': '125g',
    },
    commonIssues: [
      {
        title: 'Bras fissuré ou délaminé après un crash direct',
        symptoms: 'Le drone oscille fortement en ligne droite et chauffe sur un moteur.',
        cause: 'Rupture des fibres de carbone sous choc violent.',
        fix: 'Remplacer le bras ou injecter de la colle cyanoacrylate fine sous pression.',
        successRate: 94,
      },
      {
        title: 'Vis de fixation de bras qui se desserrent',
        symptoms: 'Bruit mécanique parasite en vol, tune instable.',
        cause: 'Vibrations moteur sans frein-filet.',
        fix: 'Appliquer une goutte de Loctite 243 Bleu sur chaque vis acier.',
        successRate: 99,
      },
    ],
  },
  {
    id: 'vtx',
    name: 'Émetteur Vidéo (VTX)',
    category: 'Vidéo FPV',
    model: 'Mach 3.1 VTX 5.8GHz',
    hotspot: {
      top: '4%',
      left: '12%',
      width: '6%',
      height: '12%',
    },
    description: 'Émetteur vidéo analogique haute puissance avec afficheur digital 7 segments et support SmartAudio.',
    role: 'Transmission sans fil du flux vidéo caméra vers les lunettes FPV.',
    specifications: {
      'Puissance max': '1000 mW (1W)',
      'Canaux': '48 CH (Raceband inclus)',
      'Tension d entrée': '7V - 26V (2S-6S)',
      'Afficheur': 'LED 7 segments direct',
    },
    commonIssues: [
      {
        title: 'Surchauffe rapide au sol avant décollage',
        symptoms: 'La vidéo devient bruitée ou coupe après 1 minute posé au sol.',
        cause: 'Émission à 800mW sans flux d air des hélices.',
        fix: 'Activer le PitMode via Betaflight ou régler Low Power Disarm à 25mW.',
        successRate: 98,
      },
    ],
  },
  {
    id: 'gps',
    name: 'Module GPS & Rescue',
    category: 'Sécurité & Navigation',
    model: 'iFlight BLITZ M10 GPS',
    hotspot: {
      top: '3%',
      left: '24%',
      width: '6%',
      height: '10%',
    },
    description: 'Puce de géolocalisation haute précision u-blox M10 de dernière génération.',
    role: 'Acquisition des coordonnées, vitesse sol, distance maison et fonction retour automatique GPS Rescue.',
    specifications: {
      'Puce': 'u-blox M10050',
      'Protocole': 'UBLOX / NMEA',
      'Sensibilité': '-167 dBm',
    },
    commonIssues: [
      {
        title: 'Moins de 4 satellites trouvés après 5 minutes',
        symptoms: 'Impossible d armer avec GPS Rescue obligatoire actif.',
        cause: 'Interférences magnétiques créées par le VTX HD ou la nappe caméra trop proche de la céramique.',
        fix: 'Surélever le GPS sur un support TPU à 35mm minimum de l électronique centrale.',
        successRate: 96,
      },
    ],
  },
  {
    id: 'rx',
    name: 'Récepteur Radio RX',
    category: 'Liaison Radio',
    model: 'FOXEER ELRS 2.4G RX',
    hotspot: {
      top: '5%',
      left: '32%',
      width: '5%',
      height: '11%',
    },
    description: 'Micro-récepteur ExpressLRS 2.4GHz à latence ultra-faible (500Hz/1000Hz).',
    role: 'Réception des commandes de vol de la radiocommande et envoi de la télémétrie.',
    specifications: {
      'Firmware': 'ExpressLRS v3.x',
      'Fréquence': '2.4 GHz ISM',
      'Connecteur': 'IPEX U.FL',
    },
    commonIssues: [
      {
        title: 'LED clignote en double rapide sans synchronisation',
        symptoms: 'Pas de liaison avec la radiocommande allumée.',
        cause: 'Différence de Binding Phrase ou décalage de version majeure (v2 vs v3).',
        fix: 'Se connecter au point Wi-Fi du RX et enregistrer la même Binding Phrase que sur la radio.',
        successRate: 100,
      },
    ],
  },
  {
    id: 'condo',
    name: 'Condensateur Low ESR',
    category: 'Alimentation',
    model: 'Panasonic FR 1000µF 35V',
    hotspot: {
      top: '42%',
      left: '1%',
      width: '4%',
      height: '8%',
    },
    description: 'Condensateur électrolytique à faible résistance série pour absorber les pics de tension.',
    role: 'Lissage de la tension batterie et protection des MOSFETs de l ESC contre les surtensions.',
    specifications: {
      'Capacité': '1000 µF',
      'Tension max': '35V (compatible 6S)',
    },
    commonIssues: [
      {
        title: 'Pattes du condensateur qui cassent au ras du boîtier',
        symptoms: 'Extinction de la caméra ou bruit vidéo brutal en vol.',
        cause: 'Vibrations et flexibilité des pattes métalliques sans fixation colle.',
        fix: 'Raccourcir les pattes au maximum et sécuriser avec de la gaine thermo.',
        successRate: 98,
      },
    ],
  },
  {
    id: 'fc',
    name: 'Contrôleur de Vol (FC)',
    category: 'Électronique de Vol',
    model: 'Betaflight F405 / F722 30x30 FC',
    hotspot: {
      top: '38%',
      left: '6%',
      width: '10%',
      height: '15%',
    },
    description: 'Carte maîtresse embarquant le gyroscope ICM42688P et le processeur STM32.',
    role: 'Calcul des corrections de vol en temps réel (8kHz), gestion de l OSD et des sécurités.',
    specifications: {
      'MCU': 'STM32F405 / F722',
      'Gyro': 'ICM42688P faible bruit',
    },
    commonIssues: [
      {
        title: 'Le drone refuse d armer (Arming Flags)',
        symptoms: 'Rien ne tourne quand on active l interrupteur ARM.',
        cause: 'Sécurité logicielle (gaz non nuls, accéléromètre désaligné).',
        fix: 'Taper "status" dans le CLI de Betaflight pour identifier l arming flag bloquant.',
        successRate: 99,
      },
    ],
  },
  {
    id: 'esc',
    name: 'ESC 4-en-1',
    category: 'Puissance',
    model: '55A 6S BLHeli_S / Bluejay ESC',
    hotspot: {
      top: '38%',
      left: '36%',
      width: '10%',
      height: '15%',
    },
    description: 'Variateur de vitesse électronique 4 canaux délivrant le courant triphasé aux 4 moteurs.',
    role: 'Contrôle précis de la vitesse de chaque moteur d après les signaux DSHOT300/600.',
    specifications: {
      'Courant continu': '55A par moteur',
      'Firmware': 'Bluejay 48kHz / BLHeli_S',
    },
    commonIssues: [
      {
        title: 'Desync moteur sous grosse accélération (Death Roll)',
        symptoms: 'Le drone part en vrille incontrôlable lors d un snap throttle.',
        cause: 'Perte de synchronisation rotorique sur moteur fort couple 6S.',
        fix: 'Flasher le firmware Bluejay en 24kHz ou 48kHz avec PWM timing à 22°.',
        successRate: 95,
      },
    ],
  },
  {
    id: 'motor',
    name: 'Moteur Brushless 2207',
    category: 'Propulsion',
    model: '2207.5 1950KV (6S)',
    hotspot: {
      top: '78%',
      left: '18%',
      width: '8%',
      height: '14%',
    },
    description: 'Moteur synchrone sans balai avec cloche usinée alu et arbre creux en titane.',
    role: 'Génération de la puissance mécanique rotative pour les hélices.',
    specifications: {
      'Dimensions stator': '2207.5',
      'KV': '1950 KV (optimisé 6S)',
      'Arbre': '4mm Titane creux',
    },
    commonIssues: [
      {
        title: 'Le moteur tremble et broute à très bas régime',
        symptoms: 'Bruit de craquement saccadé au ralenti.',
        cause: 'Une des trois phases coupée ou soudure froide sur pad ESC.',
        fix: 'Refaire les 3 soudures au fer régulé à 380°C.',
        successRate: 97,
      },
    ],
  },
  {
    id: 'cam',
    name: 'Caméra FPV Micro',
    category: 'Vidéo FPV',
    model: 'Micro FPV Cam 1200TVL 1.8mm',
    hotspot: {
      top: '82%',
      left: '27%',
      width: '6%',
      height: '10%',
    },
    description: 'Caméra analogique faible latence avec capteur CMOS HDR et lentille grand angle.',
    role: 'Capture de l environnement en temps réel pour le pilotage immersif.',
    specifications: {
      'Capteur': '1/3" CMOS 1200TVL',
      'Latence': '< 6 ms',
    },
    commonIssues: [
      {
        title: 'Image totalement noire mais OSD visible à l écran',
        symptoms: 'Tension batterie et horizon affichés, mais fond d image noir.',
        cause: 'Alimentation 5V caméra coupée ou câble jaune vidéo déconnecté.',
        fix: 'Vérifier la continuité du fil jaune signal reliant CAM à la FC.',
        successRate: 98,
      },
    ],
  },
  {
    id: 'vifly',
    name: 'Buzzer Autonome',
    category: 'Sécurité & Retrouvailles',
    model: 'ViFly Finder 2 Buzzer',
    hotspot: {
      top: '68%',
      left: '33%',
      width: '4%',
      height: '8%',
    },
    description: 'Buzzer d urgence avec batterie LiPo 1S intégrée et LED stroboscopique.',
    role: 'Continue à sonner à 105 dB même si la batterie principale du drone est éjectée au crash.',
    specifications: {
      'Volume sonore': '105 dB',
      'Autonomie secours': 'Jusqu à 30 heures',
    },
    commonIssues: [
      {
        title: 'Le buzzer se déclenche dès qu on débranche la LiPo au sol',
        symptoms: 'Alarme perçante dès qu on change de batterie.',
        cause: 'Procédure d arrêt manuel non respectée.',
        fix: 'Maintenir le bouton latéral 2 secondes ou rebrancher brièvement la LiPo 1 sec pour acquitter.',
        successRate: 100,
      },
    ],
  },
  {
    id: 'antenna-rx',
    name: 'Antenne Radio Immortal-T',
    category: 'Liaison Radio',
    model: 'Immortal-T 2.4GHz / 868MHz',
    hotspot: {
      top: '3%',
      left: '40%',
      width: '40%',
      height: '6%',
    },
    description: 'Antenne dipôle omnidirectionnelle souple renforcée en caoutchouc.',
    role: 'Rayonnement optimal du signal radio de commande sans zone d ombre.',
    specifications: {
      'Format': 'Dipôle T-Antenna',
      'Connecteur': 'IPEX U.FL',
    },
    commonIssues: [
      {
        title: 'Brin actif coupé par les hélices en vol',
        symptoms: 'Failsafe soudain à 80 mètres seulement.',
        cause: 'Antenne pendante non fixée dans un support TPU.',
        fix: 'Remplacer l antenne ou redénuder exactement 31.2 mm de blindage coaxial.',
        successRate: 96,
      },
    ],
  },
  {
    id: 'antenna-vtx',
    name: 'Antenne VTX Lollipop',
    category: 'Vidéo FPV',
    model: 'Lollipop 4 5.8GHz RHCP',
    hotspot: {
      top: '8%',
      left: '65%',
      width: '4%',
      height: '35%',
    },
    description: 'Antenne omnidirectionnelle circulaire polarisée (RHCP) à haut gain.',
    role: 'Émission du signal vidéo 5.8GHz avec réjection des réflexions parasites multi-trajets.',
    specifications: {
      'Gain': '2.6 dBi',
      'Polarisation': 'RHCP',
    },
    commonIssues: [
      {
        title: 'Capsule plastique déboîtée après collision',
        symptoms: 'Portée vidéo divisée par 3, VTX qui chauffe anormalement.',
        cause: 'Choc mécanique brisant la symétrie des pétales internes.',
        fix: 'Remplacer l antenne pour éviter de griller l étage de puissance RF du VTX.',
        successRate: 95,
      },
    ],
  },
  {
    id: 'betaflight',
    name: 'Configurateur & Firmware',
    category: 'Logiciel & Firmware',
    model: 'Betaflight 4.5.x Firmware',
    hotspot: {
      top: '4%',
      left: '85%',
      width: '9%',
      height: '10%',
    },
    description: 'Le firmware de contrôle de vol open-source le plus utilisé au monde pour le FPV.',
    role: 'Gestion des boucles PID, filtrage dynamique gyro, OSD, GPS Rescue et télémétrie.',
    specifications: {
      'Version': 'Betaflight 4.5.0 Cloud Build',
    },
    brands: CONFIGURATOR_BRANDS,
    selectedBrandId: 'betaflight',
    commonIssues: [
      {
        title: 'Moteurs qui chauffent suite à mauvaise configuration de filtres',
        symptoms: 'Cloches chaudes après 1 minute de vol calme.',
        cause: 'Curseurs de filtrage D poussés trop à droite sans RPM filter fonctionnel.',
        fix: 'Réactiver le DSHOT bidirectionnel et remettre les curseurs de filtres à 1.0 (défaut).',
        successRate: 98,
      },
    ],
  },
  {
    id: 'tango',
    name: 'Radiocommande Universelle',
    category: 'Pilotage & Émetteur',
    model: 'Format Gamepad & Pupitre FPV',
    hotspot: {
      top: '25%',
      left: '69%',
      width: '26%',
      height: '32%',
    },
    description: 'Émetteur radio ergonomique pour le pilotage FPV avec gimbals de haute précision.',
    role: 'Envoi des ordres de commande aux doigts du pilote avec latence minime.',
    specifications: {
      'Système': 'EdgeTX / FreedomTX',
      'Gimbals': 'Hall Sensor pleine taille',
    },
    brands: RADIO_BRANDS,
    selectedBrandId: 'tbs',
    commonIssues: [
      {
        title: 'Gimbal des gaz qui frotte ou ne revient pas parfaitement au neutre',
        symptoms: 'Dérive lente sur le Roll ou Pitch en vol sans toucher les sticks.',
        cause: 'Vis de tension de ressort mal calibrée.',
        fix: 'Ouvrir le capot arrière et ajuster la vis de serrage de friction du stick.',
        successRate: 98,
      },
    ],
  },
  {
    id: 'lipo',
    name: 'Batterie LiPo 6S',
    category: 'Énergie & Puissance',
    model: '6S 1300mAh 100C XT60',
    hotspot: {
      top: '48%',
      left: '52%',
      width: '8%',
      height: '35%',
    },
    description: 'Batterie Lithium-Polymère 6 cellules délivrant plus de 130 ampères instantanés.',
    role: 'Alimentation générale de l ensemble du quadricoptère.',
    specifications: {
      'Configuration': '6S1P (22.2V nominal / 25.2V max)',
      'Capacité': '1300 mAh',
    },
    commonIssues: [
      {
        title: 'Cellule qui s effondre sous 3.2V lors des gros coups de gaz',
        symptoms: 'Alerte OSD "LAND NOW" après seulement 1 minute de vol.',
        cause: 'Résistance interne trop élevée sur une cellule endommagée.',
        fix: 'Tester la résistance interne sur chargeur. Si > 20mΩ, déclasser la batterie pour le banc d essai.',
        successRate: 90,
      },
    ],
  },
  {
    id: 'fatshark',
    name: 'Système Vidéo Lunettes / Masque',
    category: 'Immersion & Réception',
    model: 'Lunettes FPV Haute Définition',
    hotspot: {
      top: '68%',
      left: '65%',
      width: '30%',
      height: '25%',
    },
    description: 'Masque et lunettes d immersion avec écrans OLED haute résolution et réception temps réel.',
    role: 'Affichage plein champ du flux vidéo FPV pour une immersion totale à la première personne.',
    specifications: {
      'Écrans': 'Double dalles OLED 1080p',
      'FOV': '46° à 52° diagonal',
    },
    brands: GOGGLE_BRANDS,
    selectedBrandId: 'fatshark',
    commonIssues: [
      {
        title: 'Buée sur les lentilles par temps froid ou humide',
        symptoms: 'Vision floue après 30 secondes sur le visage.',
        cause: 'Condensation thermique entre le visage chaud et les lentilles froides.',
        fix: 'Allumer le mini-ventilateur antibuée intégré 1 minute avant de chausser les lunettes.',
        successRate: 100,
      },
    ],
  },
];

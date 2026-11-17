export interface FigmaComponentData {
  id: string;
  name: string;
  category: string;
  model: string;
  hotspot: {
    top: string; // pourcentage
    left: string; // pourcentage
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
  multiMotorsRef?: string;
}

export const FIGMA_COMPONENTS: FigmaComponentData[] = [
  {
    id: 'frame',
    name: 'Châssis Carbone True-X',
    category: 'Structure',
    model: 'iFlight / Apex Freestyle 5"',
    hotspot: {
      top: '25%',
      left: '20%',
      width: '32%',
      height: '60%',
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
      top: '1%',
      left: '17%',
      width: '10%',
      height: '16%',
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
      {
        title: 'Lignes horizontales blanches parasites à chaque accélération',
        symptoms: 'L image se brouille dès qu on met du gaz.',
        cause: 'Bruit électrique haute fréquence généré par les moteurs et l ESC.',
        fix: 'Installer un condensateur 1000µF Low ESR aux bornes de la LiPo et brancher le VTX sur un BEC 9V filtré.',
        successRate: 95,
      },
    ],
  },
  {
    id: 'gps',
    name: 'Module GPS & Rescue',
    category: 'Sécurité & Navigation',
    model: 'iFlight BLITZ M10 GPS',
    hotspot: {
      top: '1%',
      left: '28%',
      width: '9%',
      height: '12%',
    },
    description: 'Puce de géolocalisation haute précision u-blox M10 de dernière génération.',
    role: 'Acquisition des coordonnées, vitesse sol, distance maison et fonction retour automatique GPS Rescue.',
    specifications: {
      'Puce': 'u-blox M10050',
      'Protocole': 'UBLOX / NMEA',
      'Fréquence': 'Jusqu à 10 Hz',
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
      top: '4%',
      left: '38%',
      width: '8%',
      height: '14%',
    },
    description: 'Micro-récepteur ExpressLRS 2.4GHz à latence ultra-faible (500Hz/1000Hz).',
    role: 'Réception des commandes de vol de la radiocommande et envoi de la télémétrie.',
    specifications: {
      'Firmware': 'ExpressLRS v3.x',
      'Fréquence': '2.4 GHz ISM',
      'Connecteur': 'IPEX U.FL',
      'Poids': '0.8g sans antenne',
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
      width: '5%',
      height: '10%',
    },
    description: 'Condensateur électrolytique à faible résistance série pour absorber les pics de tension.',
    role: 'Lissage de la tension batterie et protection des MOSFETs de l ESC contre les surtensions.',
    specifications: {
      'Capacité': '1000 µF',
      'Tension max': '35V (compatible 6S)',
      'Série': 'Low ESR Panasonic FR',
    },
    commonIssues: [
      {
        title: 'Pattes du condensateur qui cassent au ras du boîtier',
        symptoms: 'Extinction de la caméra ou bruit vidéo brutal en vol.',
        cause: 'Vibrations et flexibilité des pattes métalliques sans fixation colle.',
        fix: 'Raccourcir les pattes au maximum, souder directement sur les pads XT60 et sécuriser avec de la colle chaude ou gaine thermo.',
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
      top: '37%',
      left: '9%',
      width: '16%',
      height: '24%',
    },
    description: 'Carte maîtresse embarquant le gyroscope ICM42688P et le processeur STM32.',
    role: 'Calcul des corrections de vol en temps réel (8kHz), gestion de l OSD et des sécurités.',
    specifications: {
      'MCU': 'STM32F405 / F722',
      'Gyro': 'ICM42688P faible bruit',
      'Baromètre': 'DPS310 inclus',
      'UARTs': '5 ports série libres',
    },
    commonIssues: [
      {
        title: 'Le drone refuse d armer (Arming Flags)',
        symptoms: 'Rien ne tourne quand on active l interrupteur ARM.',
        cause: 'Sécurité logicielle (gaz non nuls, accéléromètre désaligné, câble USB branché).',
        fix: 'Taper "status" dans le CLI de Betaflight pour identifier l arming flag bloquant.',
        successRate: 99,
      },
      {
        title: 'Pad de soudure arraché suite à traction d un fil',
        symptoms: 'Impossible de souder le récepteur radio ou la caméra.',
        cause: 'Traction excessive lors d un choc sans décharge de câble.',
        fix: 'Réassigner la fonction sur un autre pad libre via la commande CLI "resource".',
        successRate: 92,
      },
    ],
  },
  {
    id: 'esc',
    name: 'ESC 4-en-1',
    category: 'Puissance',
    model: '55A 6S BLHeli_S / Bluejay ESC',
    hotspot: {
      top: '37%',
      left: '42%',
      width: '16%',
      height: '24%',
    },
    description: 'Variateur de vitesse électronique 4 canaux délivrant le courant triphasé aux 4 moteurs.',
    role: 'Contrôle précis de la vitesse de chaque moteur d après les signaux DSHOT300/600.',
    specifications: {
      'Courant continu': '55A par moteur',
      'Courant burst': '65A (10 secondes)',
      'Firmware': 'Bluejay 48kHz / BLHeli_S',
      'Support DSHOT': 'DSHOT300 / DSHOT600 avec RPM Filter',
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
    name: 'Moteur Brushless',
    category: 'Propulsion',
    model: '2207.5 1950KV (6S)',
    hotspot: {
      top: '78%',
      left: '16%',
      width: '12%',
      height: '20%',
    },
    description: 'Moteur synchrone sans balai avec cloche usinée alu et arbre creux en titane.',
    role: 'Génération de la puissance mécanique rotative pour les hélices.',
    specifications: {
      'Dimensions stator': '2207.5',
      'KV': '1950 KV (optimisé 6S)',
      'Arbre': '4mm Titane creux',
      'Poids': '33g',
    },
    commonIssues: [
      {
        title: 'Le moteur tremble et broute à très bas régime',
        symptoms: 'Bruit de craquement saccadé au ralenti.',
        cause: 'Une des trois phases coupée ou soudure froide sur pad ESC.',
        fix: 'Refaire les 3 soudures au fer régulé à 380°C et vérifier les fils sous gaine.',
        successRate: 97,
      },
      {
        title: 'Cloche tordue ou roulement qui gratte après crash',
        symptoms: 'Vibrations visibles dans le flux vidéo (jello) et moteur brûlant.',
        cause: 'Déformation de la cloche sous impact sur pierre ou béton.',
        fix: 'Remplacer la cloche et les roulements 684ZZ.',
        successRate: 90,
      },
    ],
  },
  {
    id: 'cam',
    name: 'Caméra FPV Micro',
    category: 'Vidéo FPV',
    model: 'Micro FPV Cam 1200TVL 1.8mm',
    hotspot: {
      top: '80%',
      left: '36%',
      width: '9%',
      height: '18%',
    },
    description: 'Caméra analogique faible latence avec capteur CMOS HDR et lentille grand angle.',
    role: 'Capture de l environnement en temps réel pour le pilotage immersif.',
    specifications: {
      'Capteur': '1/3" CMOS 1200TVL',
      'Latence': '< 6 ms',
      'Format': '16:9 / 4:3 commutable',
      'FOV': '165 degrés',
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
      left: '37%',
      width: '6%',
      height: '11%',
    },
    description: 'Buzzer d urgence avec batterie LiPo 1S intégrée et LED stroboscopique.',
    role: 'Continue à sonner à 105 dB même si la batterie principale du drone est éjectée au crash.',
    specifications: {
      'Volume sonore': '105 dB',
      'Autonomie secours': 'Jusqu à 30 heures',
      'Batterie': 'LiPo 1S intégrée avec recharge auto',
      'Capteur': 'Optique jour/nuit',
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
      top: '1%',
      left: '49%',
      width: '45%',
      height: '8%',
    },
    description: 'Antenne dipôle omnidirectionnelle souple renforcée en caoutchouc.',
    role: 'Rayonnement optimal du signal radio de commande sans zone d ombre.',
    specifications: {
      'Format': 'Dipôle T-Antenna',
      'Connecteur': 'IPEX U.FL',
      'Polarisation': 'Linéaire horizontale',
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
      top: '11%',
      left: '68%',
      width: '5%',
      height: '40%',
    },
    description: 'Antenne omnidirectionnelle circulaire polarisée (RHCP) à haut gain.',
    role: 'Émission du signal vidéo 5.8GHz avec réjection des réflexions parasites multi-trajets.',
    specifications: {
      'Gain': '2.6 dBi',
      'Polarisation': 'RHCP (Circulaire droite)',
      'Connecteur': 'SMA / U.FL',
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
    name: 'Écosystème Betaflight',
    category: 'Logiciel & Firmware',
    model: 'Betaflight 4.5.x Firmware',
    hotspot: {
      top: '2%',
      left: '88%',
      width: '10%',
      height: '14%',
    },
    description: 'Le firmware de contrôle de vol open-source le plus utilisé au monde pour le FPV.',
    role: 'Gestion des boucles PID, filtrage dynamique gyro, OSD, GPS Rescue et télémétrie.',
    specifications: {
      'Version': 'Betaflight 4.5.0 Cloud Build',
      'Protocoles': 'DSHOT, CRSF, MSP, ELRS',
      'Fonctions': 'RPM Filter, GPS Rescue v2, Feedforward 2.0',
    },
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
    name: 'Radiocommande TBS Tango II',
    category: 'Pilotage & Émetteur',
    model: 'TBS Tango II Pro V3',
    hotspot: {
      top: '25%',
      left: '73%',
      width: '26%',
      height: '35%',
    },
    description: 'Radiocommande ergonomique compacte format manette avec gimbals à effet Hall pliables.',
    role: 'Envoi des ordres de commande aux doigts du pilote avec latence minime.',
    specifications: {
      'Système': 'FreedomTX / EdgeTX',
      'Gimbals': 'Hall Sensor pleine taille',
      'Émetteur': 'Crossfire Micro TX intégré (jusqu à 250mW)',
      'Batterie': 'LiPo 5000mAh USB-C',
    },
    commonIssues: [
      {
        title: 'Gimbal des gaz qui frotte ou ne revient pas parfaitement au neutre',
        symptoms: 'Dérive lente sur le Roll ou Pitch en vol sans toucher les sticks.',
        cause: 'Vis de tension de ressort mal calibrée ou poussière dans le mécanisme hall.',
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
      left: '50%',
      width: '18%',
      height: '45%',
    },
    description: 'Batterie Lithium-Polymère 6 cellules délivrant plus de 130 ampères instantanés.',
    role: 'Alimentation générale de l ensemble du quadricoptère.',
    specifications: {
      'Configuration': '6S1P (22.2V nominal / 25.2V max)',
      'Capacité': '1300 mAh',
      'Décharge': '100C continu / 150C burst',
      'Connecteur': 'Amass XT60 Jaune',
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
    name: 'Lunettes FPV Fat Shark',
    category: 'Immersion & Réception',
    model: 'Fat Shark HDO / Dominator HD',
    hotspot: {
      top: '64%',
      left: '72%',
      width: '27%',
      height: '32%',
    },
    description: 'Masque et lunettes d immersion avec écrans OLED haute résolution et baie de module récepteur.',
    role: 'Affichage plein champ du flux vidéo FPV pour une immersion totale à la première personne.',
    specifications: {
      'Écrans': 'Double dalles OLED 1080p',
      'FOV': '46 degrés diagonal',
      'Réglage IPD': '59 à 69 mm',
      'Alimentation': '7-13V (2S LiPo)',
    },
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

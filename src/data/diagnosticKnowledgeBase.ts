import { MULTI_MOTORS_FPV_BRANDS } from './multiMotorsFpvBrands';

export interface DiagnosticQuestionOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface DiagnosticSymptomOption {
  id: string;
  title: string;
  description: string;
  category: 'mecanique' | 'electrique' | 'vol' | 'signal' | 'logiciel' | 'alimentation';
  severity: 'critique' | 'moyen' | 'mineur';
  likelyCause: string;
  aiDiagnostic: {
    rootCause: string;
    probability: number;
    explanation: string;
    safetyWarning?: string;
    testSteps: string[];
    recommendedFix: string[];
    toolsNeeded: string[];
    partsToReplace?: string[];
  };
  matchingForumQuery: string[];
}

export interface ComponentDiagnosticDefinition {
  id: string;
  componentName: string;
  componentSlug: string;
  frenchTitle: string;
  category: string;
  sisterSiteId: string;
  defaultImage: string;
  description: string;
  brands: {
    id: string;
    name: string;
    popularModels: string[];
    isExternalCatalog?: boolean;
    catalogCount?: number;
  }[];
  circumstances: DiagnosticQuestionOption[];
  symptoms: DiagnosticSymptomOption[];
  quickObservations: {
    id: string;
    label: string;
  }[];
}

// 1. Définitions spécifiques par composant
export const DIAGNOSTIC_DEFINITIONS: Record<string, ComponentDiagnosticDefinition> = {
  motors: {
    id: 'motors',
    componentName: 'Moteurs Brushless',
    componentSlug: 'motors',
    frenchTitle: 'Moteurs Brushless (Stator, Cloche, Roulements & Bobinage)',
    category: 'propulsion',
    sisterSiteId: 'multi-motors',
    defaultImage: '/images/components/motor.svg?v=6',
    description: 'Propulsion principale du quad. Données alimentées par les 13 824 références du catalogue Multi-Motors.fr pour un diagnostic précis par marque, modèle et numéro de série.',
    brands: Object.values(MULTI_MOTORS_FPV_BRANDS).map(b => ({
      id: b.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: b.name,
      popularModels: b.models.slice(0, 8).map(m => m.name),
      isExternalCatalog: true,
      catalogCount: b.totalMotorsInCatalog
    })),
    circumstances: [
      { id: 'after-crash', label: '💥 Immédiatement après un crash / impact', description: 'Le drone a percuté un arbre, le sol ou du béton' },
      { id: 'new-build', label: '🛠️ Lors du premier allumage d un nouveau drone / soudure', description: 'Montage neuf ou remplacement récent du moteur' },
      { id: 'in-flight', label: '💨 Apparu soudainement en vol', description: 'Le moteur fonctionnait bien auparavant puis a montré des faiblesses' },
      { id: 'power-on', label: '🔌 Au branchement de la batterie LiPo', description: 'Comportement anormal dès l alimentation' },
      { id: 'gradual', label: '⏳ Dégradation progressive dans le temps', description: 'Bruit ou vibrations augmentant vol après vol' },
    ],
    quickObservations: [
      { id: 'obs-free-spin', label: 'Le moteur tourne librement à la main sans point dur ni frottement' },
      { id: 'obs-3-beeps', label: 'Les 3 bips initiaux de reconnaissance moteur sont audibles au branchement' },
      { id: 'obs-screws-short', label: 'Les vis sous le bras ne touchent pas le bobinage cuivre interne' },
      { id: 'obs-bidir-dshot', label: 'DSHOT bidirectionnel activé avec RPM filter dans Betaflight' },
      { id: 'obs-cables-intact', label: 'Les 3 câbles de phase ne présentent pas de coupure visible sous la gaine' },
    ],
    symptoms: [
      {
        id: 'mot-stuttering',
        title: 'Moteur qui broute / saccade au ralenti (Stuttering)',
        description: 'Le moteur tremble, hésite et refuse de se lancer proprement à bas régime ou au décollage.',
        category: 'electrique',
        severity: 'critique',
        likelyCause: 'Soudure froide de phase ou fil de cuivre coupé sous gaine thermo',
        aiDiagnostic: {
          rootCause: 'Rupture de continuité sur l une des 3 phases du moteur brushless ou timing ESC inadapté.',
          probability: 95,
          explanation: 'Un moteur triphasé brushless nécessite que ses 3 phases alternent sans faille. Si une seule phase est coupée ou si une soudure sur le pad ESC a une résistance parasite (soudure froide), le champ magnétique ne peut pas tourner et le rotor oscille d avant en arrière.',
          safetyWarning: 'NE JAMAIS tenter de forcer les gaz sur un moteur qui broute : vous risquez de brûler les MOSFETs de l ESC 4-en-1 en quelques secondes.',
          testSteps: [
            'Démonter impérativement les hélices avant toute manipulation.',
            'Vérifier au multimètre (mode continuité) entre chaque paire de pads moteur (Phase 1-2, 2-3, 1-3). La résistance doit être identique (~0.05 à 0.15 Ω).',
            'Inspecter la base des fils où ils entrent dans le stator : un fil de cuivre émaillé peut être sectionné à l intérieur de la gaine thermo.',
            'Dans l onglet Moteurs de Betaflight, faire tourner le moteur doucement avec le curseur individuel.'
          ],
          recommendedFix: [
            'Dessouder les 3 fils du moteur sur l ESC et refaire des soudures propres et brillantes avec un fer à souder régulé à 380°C et du flux de soudure.',
            'Si le problème persiste, inverser deux moteurs : si le broutement suit le moteur, le bobinage est mort. S il reste sur le même bras, c est le MOSFET de l ESC qui est défaillant.',
            'Dans l outil de configuration ESC (Bluejay ou BLHeli_S), vérifier que le Startup Power est réglé à au moins 0.125 et le Motor Timing à 22°-24°.'
          ],
          toolsNeeded: ['Fer à souder régulé (380°C)', 'Étain de qualité avec plomb/argent', 'Multimètre', 'Flux décapant'],
          partsToReplace: ['Moteur de rechange si bobinage stator coupé', 'ESC 4-en-1 si MOSFET claqué']
        },
        matchingForumQuery: ['stuttering', 'broute', 'moteur tremble', 'soudure phase', 'twitch']
      },
      {
        id: 'mot-desync',
        title: 'Désynchronisation en vol (Desync / Tonneau incontrôlé)',
        description: 'Le moteur coupe brutalement lors d un coup de gaz rapide ou en sortie de figure acrobatique.',
        category: 'vol',
        severity: 'critique',
        likelyCause: 'Demag compensation ESC insuffisant ou timing inadapté au KV du moteur',
        aiDiagnostic: {
          rootCause: 'Perte de synchronisation de la force contre-électromotrice (Back-EMF) sous forte accélération.',
          probability: 92,
          explanation: 'Lors des changements de régime brutaux (ex: full punch out ou reprise en sortie de split-S), la tension induite par les aimants sature la détection de position de l ESC. Le firmware ESC perd le fil de la position de la cloche et coupe l alimentation par sécurité.',
          safetyWarning: 'Une desync en vol entraîne souvent une chute libre immédiate ou un "death roll". Ne volez pas au-dessus de personnes ou d eau tant que ce n est pas réglé.',
          testSteps: [
            'Connecter la Blackbox de Betaflight et analyser le log du crash : observer si le signal de commande du moteur était à 100% alors que le gyro est parti en vrille.',
            'Connecter l ESC au configurateur Bluejay / BLHeli et relever la fréquence PWM (24kHz ou 48kHz).',
            'Inspecter l aimant de la cloche pour vérifier qu aucun éclat ou aimant décollé ne frotte sous forte charge.'
          ],
          recommendedFix: [
            'Dans Bluejay / BLHeli, passer le Demag Compensation sur "High".',
            'Régler le Motor Timing entre 20° et 23° (les moteurs gros stator 2207/2306 à fort couple préfèrent un timing plus conservateur).',
            'Vérifier que la fréquence PWM est réglée sur 24kHz pour les 5 pouces freestyle (ou 48kHz avec filtres adaptés).'
          ],
          toolsNeeded: ['Câble USB données', 'Betaflight Configurator (Blackbox Viewer)', 'Bluejay / ESC-Configurator'],
          partsToReplace: ['Condensateur Low-ESR (recommandé 1000µF 35V / 50V si absent de la LiPo)']
        },
        matchingForumQuery: ['desync', 'death roll', 'tonneau', 'bluejay demag', 'coupure gaz']
      },
      {
        id: 'mot-overheating',
        title: 'Moteur brûlant après seulement 1 minute de vol',
        description: 'La cloche du moteur est intouchable (plus de 70°C) même lors d un vol tranquille ou stationnaire.',
        category: 'electrique',
        severity: 'moyen',
        likelyCause: 'D-Term trop élevé dans le tune PID ou filtrage gyro insuffisant / vis de fixation trop longues',
        aiDiagnostic: {
          rootCause: 'Oscillations à haute fréquence inaudibles réinjectées par le PID D-Term ou frottement mécanique interne.',
          probability: 94,
          explanation: 'Le terme D (dérivée) réagit aux variations rapides. Si le châssis vibre ou si les filtres gyro sont trop lâches, le terme D amplifie le bruit et commande aux moteurs des corrections à 8000 Hz, transformant l énergie électrique directement en chaleur dans le cuivre.',
          safetyWarning: 'Au-delà de 80°C, les aimants néodyme N52SH perdent définitivement leur magnétisme (démagnétisation thermique) et le vernis d isolation du cuivre fond.',
          testSteps: [
            'Dévisser les vis de fixation sous le bras : vérifier si les pointes des vis ont laissé des traces sur les bobines de cuivre à l intérieur du stator.',
            'Vérifier si un seul moteur chauffe ou si les 4 moteurs chauffent de manière identique (si les 4 chauffent, c est le tune PID/filtres ; si un seul chauffe, c est mécanique ou vis).',
            'Vérifier dans Betaflight si les curseurs de filtres D ont été déplacés vers la droite.'
          ],
          recommendedFix: [
            'Raccourcir immédiatement les vis de fixation moteur (garder 2 mm maximum de prise dans le filetage aluminium du moteur).',
            'Dans l onglet PID de Betaflight, baisser les curseurs de Master Multiplier et D Gain de 15% à 20%.',
            'Remettre le curseur de filtrage Gyro / D-Term sur la position par défaut (1.0) ou vers la gauche (plus de filtrage).'
          ],
          toolsNeeded: ['Pied à coulisse ou règle', 'Clé Allen 2mm / 2.5mm', 'Betaflight Configurator'],
          partsToReplace: ['Vis M3 de longueur adaptée (souvent 6mm ou 7mm selon épaisseur du carbone)']
        },
        matchingForumQuery: ['moteur chaud', 'brûlant', 'd-term', 'filtres betaflight', 'vis trop longue']
      },
      {
        id: 'mot-bearing-noise',
        title: 'Bruit de crécelle / Roulement qui gratte à la main',
        description: 'Bruit de frottement métallique sec en vol ou sensation de billes écrasées quand on tourne la cloche à la main.',
        category: 'mecanique',
        severity: 'moyen',
        likelyCause: 'Billes de roulement écrasées ou poussière abrasive suite à un atterrissage dans le sable/gravier',
        aiDiagnostic: {
          rootCause: 'Détérioration mécanique des roulements à billes supérieurs ou inférieurs (format 684zz ou équivalent).',
          probability: 96,
          explanation: 'Les roulements de moteurs FPV tournent à plus de 30 000 tr/min. Lors d un crash frontal ou de l aspiration de poussière minérale, les chemins de roulement se marquent ou les cages se déforment, créant du "jello" visible dans la vidéo FPV et une surconsommation électrique.',
          safetyWarning: 'Un roulement complètement grippé en vol bloque la cloche net et fait brûler l ESC instantanément.',
          testSteps: [
            'Faire tourner la cloche lentement entre deux doigts : sentir s il y a des crans ou une résistance rugueuse.',
            'Pousser la cloche latéralement et de haut en bas : constater s il y a du jeu axial ou radial anormal.',
            'Retirer le clip inférieur (circlip ou vis d axe) pour inspecter les billes du roulement inférieur.'
          ],
          recommendedFix: [
            'Remplacer les roulements par une paire de roulements haute précision (généralement 4x9x4 mm pour les 2207/2306).',
            'Nettoyer le stator et l intérieur de la cloche avec du scotch ou du Blu-Tack pour capturer toutes les limailles métalliques collées aux aimants.',
            'Mettre une goutte d huile fine synthétique pour roulements de haute vitesse.'
          ],
          toolsNeeded: ['Pince à circlips fine ou tournevis de précision', 'Pousse-roulement ou axe de 4mm', 'Scotch de masquage'],
          partsToReplace: ['Paire de roulements haute vitesse (ex: EZO / NMB 684ZZ)', 'Kit cloche de rechange']
        },
        matchingForumQuery: ['roulement', 'bruit crécelle', 'jello', 'jeu cloche', '684zz']
      },
      {
        id: 'mot-bent-bell',
        title: 'Cloche voilée / Aimants qui frottent sur le stator',
        description: 'La cloche a reçu un impact direct, présente un faux-rond visible ou frotte physiquement contre le stator.',
        category: 'mecanique',
        severity: 'critique',
        likelyCause: 'Déformation de la cloche en aluminium 7075 ou axe titane tordu sous impact',
        aiDiagnostic: {
          rootCause: 'Perte de concentricité entre le stator fixe et la cloche tournante suite à un choc violent.',
          probability: 98,
          explanation: 'L entrefer (espace libre entre les aimants et les dents du stator) n est que de 0.15 mm sur les moteurs modernes pour maximiser le flux magnétique. La moindre déformation fait frotter les aimants contre les tôles du stator.',
          safetyWarning: 'Le frottement mécanique use le vernis des aimants et génère une résistance gigantesque qui fait exploser l ampérage.',
          testSteps: [
            'Faire tourner la cloche à la main face à une source de lumière : observer si le bord supérieur monte et descend (faux-rond).',
            'Écouter s il y a un bruit régulier de frottement "chuintement" sur une partie du tour.',
            'Démonter la cloche et vérifier si des aimants sont fissurés ou décollés.'
          ],
          recommendedFix: [
            'Remplacer la cloche moteur par une cloche de rechange d origine (spares disponibles chez le fabricant).',
            'Si l axe est tordu et vissé, remplacer uniquement l axe titane si disponible.',
            'Si la cloche a frotté intensément et a arraché des morceaux de tôle stator, remplacer le moteur complet.'
          ],
          toolsNeeded: ['Clé pour écrou d hélice M5', 'Clé Allen pour vis d axe moteur'],
          partsToReplace: ['Cloche de rechange complète avec aimants', 'Axe moteur titane', 'Moteur neuf']
        },
        matchingForumQuery: ['cloche voilée', 'axe tordu', 'aimant frotte', 'impact cloche']
      }
    ]
  },

  // 2. Variateur ESC 4-en-1 (MakeMyQuad)
  esc: {
    id: 'esc',
    componentName: 'Variateur ESC 4-en-1',
    componentSlug: 'esc',
    frenchTitle: 'Variateur Électronique de Vitesse (ESC 4-in-1)',
    category: 'electronique',
    sisterSiteId: 'makemyquad',
    defaultImage: '/images/components/esc.svg?v=6',
    description: 'Régule l alimentation triphasée des 4 moteurs jusqu à 60A par canal. Catalogue et compatibilité gérés par MakeMyQuad.fr.',
    brands: [
      { id: 'speedybee', name: 'SpeedyBee', popularModels: ['F405 V3/V4 50A/55A BLS', 'F7 V3 50A BL32', 'Master 60A'] },
      { id: 't-motor', name: 'T-Motor', popularModels: ['F55A Pro II 6S', 'V50A 4in1', 'Velox V50A SE'] },
      { id: 'foxeer', name: 'Foxeer', popularModels: ['Reaper F4 65A Slim', 'Reaper 128K 60A', 'Reaper Mini 45A'] },
      { id: 'holybro', name: 'Holybro', popularModels: ['Tekko32 F4 50A', 'Tekko32 F4 Metal 65A'] },
      { id: 'mamba', name: 'Mamba / Diatone', popularModels: ['F50_BLS 50A', 'F65_128K 65A', 'F40 40A'] },
      { id: 'flywoo', name: 'Flywoo', popularModels: ['Goku G60 60A', 'Goku BS45A'] }
    ],
    circumstances: [
      { id: 'lipo-plug', label: '🔌 Au branchement de la LiPo (étincelle, fumée ou silence)', description: 'Pas de bips ou court-circuit immédiat' },
      { id: 'post-crash', label: '💥 Immédiatement après un crash', description: 'Le drone est tombé dans l herbe humide ou a bloqué une hélice' },
      { id: 'firmware-flash', label: '💻 Après une mise à jour de firmware (Bluejay / AM32)', description: 'Flashage récent des ESC' }
    ],
    quickObservations: [
      { id: 'obs-smoke-stopper', label: 'Un Smoke Stopper a été utilisé lors du premier test' },
      { id: 'obs-5-beeps', label: 'Les 5 bips complets se font entendre (3 bips ESC + 2 bips FC)' },
      { id: 'obs-capacitor', label: 'Un condensateur Low-ESR de capacité suffisante est soudé sur les pads XT60' }
    ],
    symptoms: [
      {
        id: 'esc-no-3-beeps',
        title: 'Seulement les 2 bips finaux de la FC, pas les 3 premiers bips ESC',
        description: 'L ESC ne s initialise pas au branchement de la LiPo, les moteurs restent silencieux.',
        category: 'electrique',
        severity: 'critique',
        likelyCause: 'Alimentation logique de l ESC coupée ou microcontrôleur BB21/STM32 grillé',
        aiDiagnostic: {
          rootCause: 'Absence d alimentation haute tension sur l étage logique ou destruction du régulateur abaisseur 3.3V interne de l ESC.',
          probability: 93,
          explanation: 'Les 3 premiers bips sont émis par les moteurs eux-mêmes commandés par les processeurs de l ESC pour confirmer qu ils sont sous tension. S ils sont absents, le microcontrôleur de l ESC ne démarre pas.',
          testSteps: [
            'Vérifier au multimètre la tension LiPo sur les gros pads d alimentation de l ESC.',
            'Vérifier la nappe de connexion entre l ESC et la FC : aucune broche tordue ou fil déconnecté.',
            'Sentir si un composant carré à 8 pattes (MOSFET) dégage une odeur de brûlé.'
          ],
          recommendedFix: [
            'Remplacer la nappe 8 broches reliant la FC à l ESC.',
            'Si la tension batterie arrive bien sur les pads mais qu aucun moteur ne bipe, l ESC a subi une surtension et doit être remplacé.'
          ],
          toolsNeeded: ['Multimètre digital', 'Loupe d inspection'],
          partsToReplace: ['ESC 4-en-1', 'Câble nappe FC-ESC 8 broches']
        },
        matchingForumQuery: ['pas de bips esc', '3 bips manquants', 'esc mort', 'mosfet cramé']
      }
    ]
  },

  // 3. Contrôleur de Vol FC (MakeMyQuad)
  fc: {
    id: 'fc',
    componentName: 'Contrôleur de Vol (FC)',
    componentSlug: 'fc',
    frenchTitle: 'Contrôleur de Vol (Flight Controller STM32)',
    category: 'electronique',
    sisterSiteId: 'makemyquad',
    defaultImage: '/images/components/fc.svg?v=6',
    description: 'Cerveau du drone hébergeant le gyroscope et le microcontrôleur STM32. Spécifications et firmwares référencés par MakeMyQuad.fr.',
    brands: [
      { id: 'speedybee', name: 'SpeedyBee', popularModels: ['F405 V3 / V4', 'F7 V3', 'F7 Mini'] },
      { id: 'mateksys', name: 'Matek Systems', popularModels: ['H743-Slim', 'F405-TE', 'F722-HD'] },
      { id: 'foxeer', name: 'Foxeer', popularModels: ['Reaper F722 V4', 'Foxeer F405'] },
      { id: 't-motor', name: 'T-Motor', popularModels: ['PACER F7', 'F7 HD Pro'] },
      { id: 'holybro', name: 'Holybro', popularModels: ['Kakute H7 V2', 'Kakute F7 mini'] }
    ],
    circumstances: [
      { id: 'usb-plug', label: '💻 Au branchement USB sur ordinateur', description: 'Reconnaissance PC ou connexion Betaflight' },
      { id: 'arm-switch', label: '🕹️ En actionnant l interrupteur ARM sur la radio', description: 'Refus d armer ou bip continu' }
    ],
    quickObservations: [
      { id: 'obs-led-power', label: 'La LED bleue/rouge de statut s allume sur la carte' },
      { id: 'obs-stm32-com', label: 'Le port COM apparaît dans le gestionnaire de périphériques' }
    ],
    symptoms: [
      {
        id: 'fc-arming-flags',
        title: 'Le drone refuse d armer (Arming Flags bloquants)',
        description: 'L interrupteur d armement ne déclenche rien, le drone reste inactif au sol.',
        category: 'logiciel',
        severity: 'moyen',
        likelyCause: 'Sécurité logicielle Betaflight active (Throttle, Calib, Bad RX, Angle)',
        aiDiagnostic: {
          rootCause: 'Le système de sécurité de Betaflight empêche l armement pour protéger le pilote.',
          probability: 99,
          explanation: 'Betaflight surveille en temps réel des dizaines de paramètres critiques : position des gaz, signal récepteur, inclinaison du drone, capteur gyro prêt. Si un seul paramètre est anormal, l armement est verrouillé.',
          testSteps: [
            'Brancher le drone en USB et ouvrir Betaflight Configurator.',
            'Ouvrir l onglet CLI (Ligne de commande) et taper la commande : status',
            'Repérer la ligne "Arming disable flags:" et noter les mots-clés affichés.'
          ],
          recommendedFix: [
            'Si THROTTLE : calibrer la voie des gaz pour que le minimum descende sous 1050 (ou 1000).',
            'Si RX_LOSS ou BAD_RX : vérifier que la radio est allumée et appairée.',
            'Si ANGLE : le drone n est pas posé sur une surface plane (calibrer l accéléromètre).'
          ],
          toolsNeeded: ['Câble USB données certifié', 'Betaflight Configurator'],
        },
        matchingForumQuery: ['arming flags', 'refuse armer', 'status cli', 'throttle flag']
      }
    ]
  },

  // 4. Transmission Vidéo VTX (CamYQuad)
  vtx: {
    id: 'vtx',
    componentName: 'Émetteur Vidéo (VTX)',
    componentSlug: 'vtx',
    frenchTitle: 'Émetteur Vidéo FPV (VTX 5.8GHz / HD Numérique)',
    category: 'video',
    sisterSiteId: 'camyquad',
    defaultImage: '/images/components/vtx.svg?v=6',
    description: 'Transmet le flux vidéo vers vos lunettes. Catalogue des systèmes DJI O3/O4, Walksnail, HDZero et analogiques sur CamYQuad.fr.',
    brands: [
      { id: 'dji', name: 'DJI Digital FPV', popularModels: ['O3 Air Unit', 'O4 Air Unit', 'Vista / Runcam Link', 'Air Unit OG'] },
      { id: 'walksnail', name: 'Walksnail Avatar HD', popularModels: ['Avatar V2 Pro', 'Avatar GT 2W', 'Avatar Mini 1S Lite'] },
      { id: 'hdzero', name: 'HDZero', popularModels: ['Freestyle V2 1W', 'Whoop Lite', 'Race V3'] },
      { id: 'tbs', name: 'TBS Team BlackSheep', popularModels: ['Unify Pro32 HV 5.8G', 'Unify Pro32 Nano'] },
      { id: 'rushfpv', name: 'RushFPV', popularModels: ['Tank Ultimate Plus', 'Tank Solo 1W', 'Cherry'] }
    ],
    circumstances: [
      { id: 'power-on-bench', label: '🔌 Allumé sur l établi sans voler', description: 'Chauffe au sol sans flux d air' },
      { id: 'after-crash', label: '💥 Après un crash ou impact', description: 'Antenne arrachée ou choc direct' }
    ],
    quickObservations: [
      { id: 'obs-antenna-connected', label: 'L antenne VTX était fermement connectée avant le branchement' },
      { id: 'obs-vtx-led', label: 'Les LEDs de statut du VTX clignotent' }
    ],
    symptoms: [
      {
        id: 'vtx-black-screen',
        title: 'Écran noir dans les lunettes avec OSD visible',
        description: 'Vous voyez les informations de télémétrie (batterie, timer) mais l image caméra reste noire.',
        category: 'signal',
        severity: 'moyen',
        likelyCause: 'Nappe caméra déconnectée ou capteur caméra non alimenté',
        aiDiagnostic: {
          rootCause: 'Le signal vidéo de la caméra n atteint pas le processeur du VTX.',
          probability: 95,
          explanation: 'Si l OSD s affiche dans les lunettes, cela prouve à 100% que la liaison VTX ↔ Lunettes fonctionne parfaitement. Le problème se situe donc en amont : la caméra n envoie aucun flux vidéo.',
          testSteps: [
            'Inspecter la nappe MIPI / ruban coaxial entre la caméra et le VTX : vérifier que le loquet de retenue n a pas sauté.',
            'Vérifier au multimètre l alimentation 5V ou 9V qui alimente la caméra.',
            'Vérifier si le cache d objectif n a pas été oublié (erreur classique).'
          ],
          recommendedFix: [
            'Débrancher et réinsérer fermement le câble coaxial caméra en s assurant du bon verrouillage mécanique.',
            'Si la nappe est pincée ou plissée suite à un crash, la remplacer.'
          ],
          toolsNeeded: ['Pince de précision en plastique', 'Câble coaxial MIPI de rechange']
        },
        matchingForumQuery: ['écran noir osd', 'caméra noire', 'nappe mipi dji', 'pas d image']
      }
    ]
  },

  // 5. Récepteur Radio RX (BindMyQuad)
  rx: {
    id: 'rx',
    componentName: 'Récepteur Radio (RX)',
    componentSlug: 'rx',
    frenchTitle: 'Récepteur de Radiocommande (RX ELRS / Crossfire)',
    category: 'radio',
    sisterSiteId: 'bindmyquad',
    defaultImage: '/images/components/rx.svg?v=6',
    description: 'Reçoit les commandes de pilotage de votre radiocommande. Compatibilités protocoles et firmwares référencés sur BindMyQuad.fr.',
    brands: [
      { id: 'radiomaster', name: 'RadioMaster', popularModels: ['RP1 2.4GHz ELRS', 'RP2 (Antenne céramique)', 'RP3 Diversity', 'Bandit Micro'] },
      { id: 'betafpv', name: 'BETAFPV', popularModels: ['ELRS Nano 2.4G', 'ELRS Lite', 'ELRS Micro'] },
      { id: 'tbs', name: 'TBS Crossfire', popularModels: ['Crossfire Nano RX Pro', 'Crossfire Diversity Nano'] },
      { id: 'happymodel', name: 'Happymodel', popularModels: ['EP1 Dual TCXO', 'EP2 TCXO 2.4GHz'] }
    ],
    circumstances: [
      { id: 'first-bind', label: '🔗 Première tentative d appairage (Binding)', description: 'Nouveau récepteur ou radio' },
      { id: 'after-fw-update', label: '💻 Après mise à jour ExpressLRS (v3.x vers v3.4)', description: 'Changement de firmware' }
    ],
    quickObservations: [
      { id: 'obs-rx-led-solid', label: 'La LED du RX reste allumée fixe (indique qu il est lié)' },
      { id: 'obs-uart-crossed', label: 'Les fils RX et TX sont bien croisés (TX FC sur RX récepteur, RX FC sur TX récepteur)' }
    ],
    symptoms: [
      {
        id: 'rx-bind-failed',
        title: 'Impossible d appairer le récepteur (LED clignote en continu)',
        description: 'La radio et le récepteur ne se synchronisent pas malgré le mode appairage activé.',
        category: 'signal',
        severity: 'moyen',
        likelyCause: 'Divergence de version majeure ExpressLRS (v2 vs v3) ou Passphrase erronée',
        aiDiagnostic: {
          rootCause: 'Incompatibilité de version de protocole RF ou passphrase d appairage différente.',
          probability: 97,
          explanation: 'ExpressLRS impose que la radiocommande et le récepteur soient sur la même version majeure (ex: 3.x.x avec 3.x.x). Si la radio est en 3.4 et le récepteur en 2.5, ils ne pourront jamais communiquer.',
          testSteps: [
            'Allumer la radio et vérifier la version affichée dans le script LUA ExpressLRS (ex: ExpressLRS v3.x).',
            'Alimenter le récepteur et attendre 60 secondes : il bascule en mode WiFi (LED clignote rapidement).',
            'Se connecter au réseau WiFi "ExpressLRS RX" depuis votre téléphone (mot de passe: expresslrs) et ouvrir 10.0.0.1.'
          ],
          recommendedFix: [
            'Dans la page web 10.0.0.1 du récepteur, renseigner exactement la même Binding Phrase que sur votre radiocommande.',
            'Mettre à jour le firmware du récepteur via l interface WiFi vers la même version que votre module radio.'
          ],
          toolsNeeded: ['Smartphone ou PC portable avec WiFi', 'ExpressLRS Configurator']
        },
        matchingForumQuery: ['appairage elrs', 'binding failed', 'wifi 10.0.0.1', 'passphrase mismatch']
      }
    ]
  }
};

// Fonction de fallback pour les composants génériques non listés spécifiquement
export function getDiagnosticDefinition(compId: string): ComponentDiagnosticDefinition {
  const norm = compId.toLowerCase();
  if (DIAGNOSTIC_DEFINITIONS[norm]) {
    return DIAGNOSTIC_DEFINITIONS[norm];
  }
  if (norm === 'motor') return DIAGNOSTIC_DEFINITIONS['motors'];
  if (norm === 'tango') return DIAGNOSTIC_DEFINITIONS['rx'];
  if (norm === 'betaflight' || norm === 'configurator') return DIAGNOSTIC_DEFINITIONS['fc'];

  // Définition générique élégante
  return {
    id: compId,
    componentName: compId.toUpperCase(),
    componentSlug: compId,
    frenchTitle: `Composant ${compId.toUpperCase()}`,
    category: 'generique',
    sisterSiteId: 'makemyquad',
    defaultImage: `/images/components/${compId}.svg?v=6`,
    description: `Diagnostic technique et suivi des anomalies pour le composant ${compId}.`,
    brands: [
      { id: 'generic-brand-1', name: 'Fabricant Standard', popularModels: ['Série Pro', 'Série V2'] },
      { id: 'generic-brand-2', name: 'Fabricant OEM', popularModels: ['Version Compétition'] },
    ],
    circumstances: [
      { id: 'after-crash', label: '💥 Immédiatement après un crash', description: 'Impact violent' },
      { id: 'power-on', label: '🔌 Au branchement de la batterie LiPo', description: 'Problème électrique' },
      { id: 'in-flight', label: '💨 Apparu soudainement en vol', description: 'Comportement anormal' },
    ],
    quickObservations: [
      { id: 'obs-visual', label: 'Aucun dommage physique externe visible' },
      { id: 'obs-heat', label: 'La température du composant reste normale' }
    ],
    symptoms: [
      {
        id: `${compId}-fail`,
        title: `Dysfonctionnement anormal du module ${compId}`,
        description: 'Le composant ne répond plus correctement aux sollicitations du système.',
        category: 'electrique',
        severity: 'moyen',
        likelyCause: 'Défaut de connectique ou court-circuit',
        aiDiagnostic: {
          rootCause: 'Interruption de signal ou problème de liaison électrique.',
          probability: 90,
          explanation: 'Une inspection méticuleuse de la ligne de signal et de l alimentation permet d isoler la défaillance.',
          testSteps: [
            'Vérifier au multimètre la tension d alimentation aux bornes du composant.',
            'Inspecter les soudures et les connecteurs pour détecter toute broche tordue.'
          ],
          recommendedFix: [
            'Nettoyer les contacts et refaire les soudures douteuses.',
            'Tester le composant isolément avec une source d alimentation stabilisée.'
          ],
          toolsNeeded: ['Multimètre', 'Fer à souder']
        },
        matchingForumQuery: [compId, 'panne', 'dépannage']
      }
    ]
  };
}

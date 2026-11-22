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
  rarityIndex: number; // 1 à 10 : 1 = panne très très rare / exotique, 10 = panne très courante / classique
  rarityLabel: string;
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
        rarityIndex: 10,
        rarityLabel: 'Panne ultra-fréquente (10/10)',
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
        rarityIndex: 8,
        rarityLabel: 'Panne fréquente (8/10)',
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
        rarityIndex: 9,
        rarityLabel: 'Panne très fréquente (9/10)',
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
        rarityIndex: 6,
        rarityLabel: 'Panne modérée (6/10)',
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
        rarityIndex: 4,
        rarityLabel: 'Panne peu fréquente (4/10)',
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
      },
      {
        id: 'mot-magnet-shift',
        title: 'Aimant néodyme fendu ou glissé dans la cloche',
        description: 'Frottement métallique intermittent à haut régime ou cliquetis sans déformation apparente de la cloche.',
        category: 'mecanique',
        severity: 'critique',
        likelyCause: 'Onde de choc thermique ou fissuration sous contrainte de l aimant N52SH',
        rarityIndex: 1,
        rarityLabel: 'Panne ultra-rare (1/10)',
        aiDiagnostic: {
          rootCause: 'Rupture de la colle époxy cyanoacrylate de maintien d un aimant individuel ou éclat interne.',
          probability: 91,
          explanation: 'Cas d anomalie extrêmement rare où un aimant néodyme N52SH se décolle ou se micro-fissure suite à un pic de choc thermique et vibratoire combiné.',
          safetyWarning: 'Un aimant qui se détache à 35 000 tr/min pulvérise le bobinage stator et bloque le moteur en une fraction de seconde.',
          testSteps: [
            'Retirer la cloche et passer une lame de rasoir fine sur chaque aimant pour tester la force d adhésion.',
            'Examiner au microscope / loupe x10 la surface des aimants pour déceler toute fissure capillaire.'
          ],
          recommendedFix: [
            'Recoller l aimant à l époxy structurelle haute température (type Loctite 380 ou Araldite 2 composants) après dégraissage à l acétone.',
            'Ou remplacer la cloche moteur.'
          ],
          toolsNeeded: ['Loupe d horloger x10', 'Époxy structurelle bi-composant', 'Acétone pure'],
          partsToReplace: ['Cloche de rechange avec aimants neufs']
        },
        matchingForumQuery: ['aimant décollé', 'aimant fendu', 'araldite cloche', 'rare aimant']
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
        rarityIndex: 7,
        rarityLabel: 'Panne courante (7/10)',
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
        rarityIndex: 10,
        rarityLabel: 'Panne ultra-fréquente (10/10)',
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
        rarityIndex: 8,
        rarityLabel: 'Panne fréquente (8/10)',
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
        rarityIndex: 9,
        rarityLabel: 'Panne très fréquente (9/10)',
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
  },

  // 6. Lunettes FPV & Masque (Goggles)
  goggle: {
    id: 'goggle',
    componentName: 'Lunettes FPV & Masque',
    componentSlug: 'goggle',
    frenchTitle: 'Lunettes & Masque FPV (OLED, HD Digital & Analogique)',
    category: 'reception',
    sisterSiteId: 'camyquad',
    defaultImage: '/images/components/goggle.svg?v=6',
    description: 'Interface visuelle d immersion du pilote (DJI O3, Walksnail Avatar, HDZero, Analogique). Dépannage des écrans noirs, capteurs de proximité, buée et mises à jour firmware.',
    brands: [
      { id: 'dji', name: 'DJI FPV', popularModels: ['Goggles 2', 'Goggles Integra', 'Goggles V2', 'Goggles 3'] },
      { id: 'walksnail', name: 'Walksnail / Caddx', popularModels: ['Avatar HD Goggles X', 'Avatar HD Goggles', 'Avatar VRX'] },
      { id: 'fatshark', name: 'Fat Shark', popularModels: ['Dominator HD', 'HDO 2 / 2.1', 'Attitude V6', 'Scout'] },
      { id: 'hdzero', name: 'HDZero', popularModels: ['HDZero Goggle (1080p 90fps)', 'HDZero VRX4'] },
      { id: 'skyzone', name: 'Skyzone', popularModels: ['SKY04X PRO', 'SKY04O PRO', 'Cobra X V2'] },
    ],
    circumstances: [
      { id: 'power-on', label: '🔌 Dès l allumage des lunettes', description: 'Écran noir, bips d erreur ou blocage au boot' },
      { id: 'on-face', label: '👓 En positionnant les lunettes sur le visage', description: 'Coupure soudaine des écrans ou mise en veille intempestive' },
      { id: 'after-update', label: '💾 Immédiatement après mise à jour firmware', description: 'Incompatibilité de version avec le VTX ou échec de bind' },
    ],
    quickObservations: [
      { id: 'obs-fan', label: 'Le ventilateur interne tourne et expulse de l air' },
      { id: 'obs-voltage', label: 'La batterie des lunettes fournit une tension supérieure à 7.4V (2S) ou 11.1V (3S)' },
      { id: 'obs-osd-visible', label: 'Les menus internes OSD des lunettes s affichent (même si le retour caméra est noir)' },
    ],
    symptoms: [
      {
        id: 'goggle-black-proximity',
        title: 'Écran noir brutal causé par le capteur de proximité (Walksnail Goggles X)',
        description: 'Les dalles OLED s éteignent soudainement au sol ou en vol, ou restent noires au démarrage bien que le ventilateur tourne.',
        category: 'signal',
        severity: 'critique',
        likelyCause: 'Capteur de proximité infrarouge trompé par la mousse faciale ou calibré trop près',
        rarityIndex: 7,
        rarityLabel: 'Panne connue (7/10)',
        aiDiagnostic: {
          rootCause: 'Le capteur optique situé entre les lentilles coupe l alimentation des dalles OLED s il ne détecte pas le front du pilote.',
          probability: 92,
          explanation: 'La mousse faciale aftermarket plus épaisse ou une mauvaise calibration d usine fait croire aux lunettes qu elles sont retirées. Un combo joystick 5D permet de désactiver le capteur à l aveugle.',
          testSteps: [
            'Allumer les lunettes sans allumer le drone.',
            'Vérifier si les écrans s allument brièvement avant de s éteindre.',
            'Masquer le capteur infrarouge central avec le doigt à 1cm pour tester la détection.'
          ],
          recommendedFix: [
            'Désactiver le capteur à l aveugle via le joystick 5D : Bas (clic) -> Droite -> Droite -> Bas (clic) -> Bas (clic) -> Gauche -> Bas (clic) -> Avant -> Bas (clic).',
            'Effectuer un Cold-Boot : maintenir le bouton Back/Link avec un trombone tout en branchant l alimentation DC jusqu aux bips rapides.',
            'Pour les modèles qui chauffent excessivement, demander à Caddx le kit dissipateur thermique noir.'
          ],
          toolsNeeded: ['Trombone fin', 'Câble DC stabilisé']
        },
        matchingForumQuery: ['walksnail goggles x', 'black screen', 'proximity sensor', 'ecran noir']
      },
      {
        id: 'goggle-dji-lowpower',
        title: 'Alerte "Low Power Mode" permanente et OSD 0.0V (DJI Goggles 2 / Integra / V2)',
        description: 'Le retour vidéo DJI O3 reste bloqué en basse puissance (25mW) avec débit bridé et l OSD indique 0.0V pour la batterie.',
        category: 'logiciel',
        severity: 'moyen',
        likelyCause: 'Absence de communication télémétrie MSP entre le DJI O3 et le contrôleur de vol',
        rarityIndex: 9,
        rarityLabel: 'Panne classique (9/10)',
        aiDiagnostic: {
          rootCause: 'L O3 Air Unit ne reçoit pas le signal d armement de la FC car les fils UART TX/RX sont inversés ou le port MSP Displayport est désactivé.',
          probability: 96,
          explanation: 'Tant que la liaison série n est pas active, le système de sécurité DJI maintient le VTX au ralenti pour éviter la surchauffe au sol.',
          testSteps: [
            'Vérifier au multimètre que TX FC est soudé sur RX O3 et RX FC sur TX O3.',
            'Ouvrir Betaflight Configurator -> Onglet Ports.',
            'Vérifier que la ligne UART correspondante a "VTX (MSP + Displayport)" activé à 115200 bauds.'
          ],
          recommendedFix: [
            'Croiser impérativement FC TX <-> O3 RX et FC RX <-> O3 TX.',
            'Dans l onglet Ports, sélectionner VTX (MSP + Displayport) puis Enregistrer et Redémarrer.',
            'Vérifier dans le casque que la tension réelle LiPo s affiche au lieu de 0.0V.'
          ],
          toolsNeeded: ['Fer à souder', 'Multimètre', 'Betaflight Configurator']
        },
        matchingForumQuery: ['dji o3 low power mode', 'osd 0.0v', 'msp displayport', 'goggles 2']
      }
    ]
  },

  // 7. Radiocommande & Émetteur TX (Radio)
  radio: {
    id: 'radio',
    componentName: 'Radiocommande & Émetteur TX',
    componentSlug: 'radio',
    frenchTitle: 'Radiocommande & Émetteur TX (EdgeTX, ExpressLRS & Crossfire)',
    category: 'commande',
    sisterSiteId: 'bindmyquad',
    defaultImage: '/images/components/radio.svg?v=6',
    description: 'Poste de pilotage au sol : manettes gimbals, système d exploitation EdgeTX et module RF d émission. Dépannage des alertes Emergency Mode, calibrations gimbals et Dynamic Power.',
    brands: [
      { id: 'radiomaster', name: 'RadioMaster', popularModels: ['Boxer (ELRS / 4-in-1)', 'Pocket ELRS', 'TX16S MKII', 'Zorro', 'TX12 MKII'] },
      { id: 'tbs', name: 'Team BlackSheep', popularModels: ['Tango 2 / Pro', 'Mambo', 'Crossfire TX Lite', 'Crossfire Micro TX V2'] },
      { id: 'jumper', name: 'Jumper RC', popularModels: ['T-Pro V2', 'T20 / T20S', 'T14 ELRS', 'T12 Pro'] },
      { id: 'frsky', name: 'FrSky', popularModels: ['Taranis X9D Plus', 'Q X7', 'Tandem X20', 'Twin X-Lite'] },
    ],
    circumstances: [
      { id: 'power-on', label: '🔌 Au démarrage de la radio', description: 'Message "Emergency Mode", bip continu ou refus d allumer' },
      { id: 'in-flight', label: '🔊 En vol avec retour vocal', description: 'Alerte sonore répétée "Telemetry Lost / Telemetry Recovered"' },
      { id: 'calibration', label: '🎯 Lors de l étalonnage des manches', description: 'Valeurs qui sautent ou centre qui dérive' },
    ],
    quickObservations: [
      { id: 'obs-screen', label: 'L écran LCD/OLED s allume avec rétroéclairage' },
      { id: 'obs-sdcard', label: 'La carte MicroSD est bien insérée et clipsée dans son port' },
      { id: 'obs-battery-tx', label: 'La tension des accus 18650 / LiPo est supérieure à 7.0V' },
    ],
    symptoms: [
      {
        id: 'radio-edgetx-emergency',
        title: 'Crash en boucle "Emergency Mode" au démarrage de la radiocommande (RadioMaster EdgeTX)',
        description: 'La radio affiche un écran blanc ou noir avec "Emergency Mode" et vibre ou bipe sans charger les modèles.',
        category: 'logiciel',
        severity: 'critique',
        likelyCause: 'Carte MicroSD d origine corrompue ou pack "SD Card Contents" EdgeTX manquant/incompatible',
        rarityIndex: 9,
        rarityLabel: 'Panne très fréquente (9/10)',
        aiDiagnostic: {
          rootCause: 'Le système d exploitation EdgeTX plante en tentant de lire un fichier corrompu (modèle, thème ou son) sur la carte SD.',
          probability: 95,
          explanation: 'Les cartes MicroSD génériques fournies d usine sont fragiles et se corrompent souvent lors d une extinction précipitée ou d un transfert de fichier.',
          testSteps: [
            'Retirer la carte MicroSD de la radio et l insérer dans un lecteur PC.',
            'Vérifier si Windows signale une erreur de lecture ou demande de formater la carte.',
            'Tenter d allumer la radio sans carte SD : si elle affiche "No SD Card" au lieu d "Emergency Mode", le bug vient de la carte.'
          ],
          recommendedFix: [
            'Remplacer la carte par une MicroSD de marque fiable (SanDisk Ultra 16Go ou 32Go formatée en FAT32).',
            'Télécharger le pack "SD Card Contents" correspondant à votre version exacte d EdgeTX depuis github.com/EdgeTX/edgetx/releases.',
            'Copier l arborescence propre (`MODELS`, `RADIO`, `SOUNDS`, `THEMES`) sur la nouvelle carte.',
            'Si le problème persiste, ouvrir la coque arrière et ré-enfoncer les nappes plates internes.'
          ],
          toolsNeeded: ['Lecteur de carte MicroSD', 'Carte SanDisk 16/32Go', 'EdgeTX Companion']
        },
        matchingForumQuery: ['edgetx emergency mode', 'radiomaster crash', 'sd card corruption', 'boxer bootloop']
      },
      {
        id: 'radio-elrs-dynamic-telemetry',
        title: 'Fausses alertes répétées "Telemetry Lost" en vol avec ExpressLRS et Dynamic Power',
        description: 'La radio hurle "Telemetry Lost" toutes les 15 secondes alors que le drone vole parfaitement et reste sous contrôle.',
        category: 'signal',
        severity: 'mineur',
        likelyCause: 'Asymétrie de puissance entre le module émetteur radio et le récepteur nano',
        rarityIndex: 8,
        rarityLabel: 'Panne fréquente (8/10)',
        aiDiagnostic: {
          rootCause: 'Le récepteur nano n émet qu à 10-25mW de retour télémétrique tandis que la radio émet à 250mW-1000mW.',
          probability: 94,
          explanation: 'La liaison montante de contrôle fonctionne à 100%, mais la liaison descendante de télémétrie décroche en premier dès qu un obstacle s interpose.',
          testSteps: [
            'Allumer la radio et le drone.',
            'Exécuter le script LUA ExpressLRS sur la radiocommande.',
            'Vérifier le paramètre "Telem Ratio" et la configuration de la puissance dynamique.'
          ],
          recommendedFix: [
            'Dans le script LUA ELRS, régler le "Telemetry Ratio" sur "Std" ou "1:64" (éviter "Off" ou "Race" en Dynamic Power).',
            'Vérifier que la voie d armement AUX1 est bien affectée pour permettre au Dynamic Power de passer en pleine puissance uniquement en vol.',
            'Si l alerte vocale est simplement gênante, passer les alertes de télémétrie en silencieux dans les paramètres EdgeTX.'
          ],
          toolsNeeded: ['Radiocommande EdgeTX avec script ExpressLRS LUA']
        },
        matchingForumQuery: ['expresslrs telemetry lost', 'dynamic power elrs', 'radiomaster boxer alerte', 'telem ratio']
      }
    ]
  },

  // 8. Configurateurs & Logiciels de Vol (Betaflight / EdgeTX / INAV)
  configurator: {
    id: 'configurator',
    componentName: 'Configurateurs & Logiciels de Vol',
    componentSlug: 'configurator',
    frenchTitle: 'Configurateurs (Betaflight Configurator, EdgeTX & ExpressLRS)',
    category: 'logiciel',
    sisterSiteId: 'fixmydrone',
    defaultImage: '/images/components/betaflight.svg?v=6',
    description: 'Outils de paramétrage, de flashage et d analyse Blackbox. Dépannage des pilotes USB DFU, blocages d armement et conflits DMA.',
    brands: [
      { id: 'betaflight', name: 'Betaflight', popularModels: ['Betaflight Configurator 10.10+', 'Betaflight 4.5 Cloud Build', 'Blackbox Explorer'] },
      { id: 'edgetx-comp', name: 'EdgeTX Companion', popularModels: ['Companion 2.10', 'Companion 2.9', 'EdgeTX Flasher'] },
      { id: 'elrs-conf', name: 'ExpressLRS Configurator', popularModels: ['Configurator 1.7+', 'Web Flasher'] },
      { id: 'inav', name: 'INAV Configurator', popularModels: ['INAV 7.x / 8.x', 'INAV Missions Planner'] },
    ],
    circumstances: [
      { id: 'firmware-flash', label: '⚡ Lors de la mise à jour firmware (DFU)', description: 'Échec de connexion ou port COM non détecté en mode bootloader' },
      { id: 'dshot-config', label: '⚙️ Configuration du DSHOT bidirectionnel & RPM Filter', description: 'Erreurs de paquets moteur ou surchauffe CPU' },
    ],
    quickObservations: [
      { id: 'obs-driver', label: 'Le pilote STM32 Virtual COM Port est installé sans triangle jaune' },
      { id: 'obs-cable', label: 'Le câble USB transmet les données (pas un simple câble de charge)' },
    ],
    symptoms: [
      {
        id: 'conf-dfu-driver-brick',
        title: 'Impossible de flasher : la carte n entre pas en mode DFU ou port COM introuvable',
        description: 'Lors du clic sur "Flasher le firmware", Betaflight indique "Impossible d ouvrir le port série" ou "DFU non détecté".',
        category: 'logiciel',
        severity: 'critique',
        likelyCause: 'Pilote USB DFU STM32 écrasé par les pilotes génériques Windows',
        rarityIndex: 9,
        rarityLabel: 'Panne universelle (9/10)',
        aiDiagnostic: {
          rootCause: 'Windows assigne un pilote COM standard au lieu du pilote WinUSB requis pour le protocole DFU du bootloader STM32.',
          probability: 98,
          explanation: 'L outil ImpulseRC Driver Fixer remplace automatiquement le pilote corrompu par le pilote WinUSB certifié.',
          testSteps: [
            'Débrancher le contrôleur de vol.',
            'Maintenir enfoncé le bouton physique "BOOT" sur la FC tout en branchant le câble USB sur le PC.',
            'Regarder dans Betaflight en haut à droite : si le menu déroulant affiche "DFU", le mode matériel fonctionne.'
          ],
          recommendedFix: [
            'Télécharger et exécuter le logiciel gratuit "ImpulseRC Driver Fixer" (ou utiliser Zadig en mode WinUSB).',
            'Brancher la FC en USB : ImpulseRC détecte automatiquement la carte et réinstalle le pilote DFU en 15 secondes.',
            'Rouvrir Betaflight Configurator et relancer le flashage avec "Effacement complet de la puce" (Full chip erase).'
          ],
          toolsNeeded: ['ImpulseRC Driver Fixer', 'Câble USB données certifié']
        },
        matchingForumQuery: ['betaflight dfu', 'driver fixer', 'port com introuvable', 'stm32 bootloader']
      }
    ]
  },

  // 9. Module GPS & Compas Magnétique (GPS)
  gps: {
    id: 'gps',
    componentName: 'Module GPS & Compas',
    componentSlug: 'gps',
    frenchTitle: 'Module GPS & Compas Magnétique (M10, M8N & GPS Rescue)',
    category: 'navigation',
    sisterSiteId: 'makemyquad',
    defaultImage: '/images/components/gps.svg?v=6',
    description: 'Système de positionnement satellite et retour automatique au point de décollage (GPS Rescue). Dépannage de l acquisition satellites et des interférences magnétiques.',
    brands: [
      { id: 'matek', name: 'Matek Systems', popularModels: ['SAM-M10Q', 'M10-5883', 'M8Q-5883'] },
      { id: 'holybro', name: 'Holybro', popularModels: ['M10 GPS', 'Micro M8N', 'Nano GOH'] },
      { id: 'beitian', name: 'Beitian', popularModels: ['BN-220', 'BN-880 (avec compas)', 'BK-180'] },
      { id: 'flywoo', name: 'Flywoo', popularModels: ['GOKU GM10 Nano V3', 'GM10 Mini V3'] },
    ],
    circumstances: [
      { id: 'bench-test', label: '🪑 En test sur l établi en intérieur', description: '0 satellites captés ou logo GPS rouge/éteint' },
      { id: 'field-test', label: '🌳 Sur le terrain en extérieur', description: 'Acquisition lente dépassant 3 minutes' },
    ],
    quickObservations: [
      { id: 'obs-gps-led', label: 'La LED bleue du GPS clignote (signe de réception satellite)' },
      { id: 'obs-clear-sky', label: 'Le test est réalisé en extérieur avec vue dégagée à 360° vers le ciel' },
    ],
    symptoms: [
      {
        id: 'gps-m10-zero-sats',
        title: '0 satellites captés et icône GPS éteinte (Matek M10Q sous Betaflight 4.4 / 4.5)',
        description: 'Le module est alimenté en 5V, mais Betaflight n affiche aucun satellite et le GPS Rescue reste désactivé.',
        category: 'signal',
        severity: 'critique',
        likelyCause: 'Configuration baud rate UART inadaptée ou protocole UBLOX Auto-Config désactivé',
        rarityIndex: 8,
        rarityLabel: 'Panne fréquente (8/10)',
        aiDiagnostic: {
          rootCause: 'Les puces u-blox M10 de nouvelle génération utilisent un protocole binaire différent des anciens M8N.',
          probability: 93,
          explanation: 'Betaflight 4.5 gère l Auto-Config nativement. Sur les cartes FC F405, un baud rate de 115200 peut saturer les interruptions UART.',
          testSteps: [
            'Aller dans Betaflight CLI et taper : get gps.',
            'Vérifier que gps_provider = UBLOX et non NMEA.',
            'Tester le drone en extérieur dégagé pendant au moins 2 minutes.'
          ],
          recommendedFix: [
            'Dans le CLI, activer l auto-configuration : `set gps_auto_config = ON`, `set gps_ublox_use_galileo = ON`, puis `save`.',
            'Dans l onglet Ports, régler la vitesse du port UART GPS sur 57600 bauds si vous utilisez une FC F405.',
            'Éloigner le module GPS de l antenne VTX numérique d au moins 4 à 5 cm pour éviter la saturation du préampli LNA.'
          ],
          toolsNeeded: ['Betaflight Configurator', 'Support d antenne TPU surélevé']
        },
        matchingForumQuery: ['matek m10q 0 satellites', 'gps fix betaflight', 'auto config gps', 'baud 57600']
      }
    ]
  },

  // 10. Caméra FPV (Cam)
  cam: {
    id: 'cam',
    componentName: 'Caméra FPV',
    componentSlug: 'cam',
    frenchTitle: 'Caméra FPV (Analogique & Capteurs Numériques HD)',
    category: 'optique',
    sisterSiteId: 'camyquad',
    defaultImage: '/images/components/camera.svg?v=6',
    description: 'Capteur d image FPV capturant le flux en direct. Dépannage des nappes MIPI déboîtées, écrans roses, boucles de masse et rayures optiques.',
    brands: [
      { id: 'caddx', name: 'Caddx FPGA', popularModels: ['Ratel 2 Starlight', 'Ant Nano', 'Baby Ratel 2', 'Polar Starlight'] },
      { id: 'walksnail-cam', name: 'Walksnail / Avatar', popularModels: ['Avatar HD Pro (1/1.8" Sony)', 'Avatar HD Nano V2 / V3', 'Avatar Moonlight 4K'] },
      { id: 'dji-cam', name: 'DJI O3 Cam', popularModels: ['Caméra O3 Air Unit 1/1.7" 4K 60fps'] },
      { id: 'runcam', name: 'RunCam', popularModels: ['Phoenix 2 SE', 'Nano 4', 'Thumb Pro', 'Link Wasp'] },
      { id: 'foxeer-cam', name: 'Foxeer', popularModels: ['T-Rex Micro 1500TVL', 'Toothless 2 Starlight', 'Cat 3 Night'] },
    ],
    circumstances: [
      { id: 'after-crash', label: '💥 Immédiatement après un choc frontal', description: 'L image disparaît ou devient rose/brouillée' },
      { id: 'punch-out', label: '⚡ Lors d une accélération franche (Coup de gaz)', description: 'Des barres parasites horizontales défilent sur l écran' },
    ],
    quickObservations: [
      { id: 'obs-lens-clean', label: 'La lentille frontale est propre et non fissurée' },
      { id: 'obs-mipi-cable', label: 'La nappe coaxiale/MIPI est bien insérée et clipsée' },
    ],
    symptoms: [
      {
        id: 'cam-analog-pink-ground-loop',
        title: 'Écran rose / violacé et barres horizontales parasites lors des coups de gaz',
        description: 'L image analogique subit une teinte rose anormale et des lignes diagonales ou horizontales défilent à l écran dès que les moteurs tournent.',
        category: 'electrique',
        severity: 'moyen',
        likelyCause: 'Boucle de masse (Ground Loop) entre la caméra et le VTX ou absence de condensateur Low-ESR',
        rarityIndex: 7,
        rarityLabel: 'Panne électrique fréquente (7/10)',
        aiDiagnostic: {
          rootCause: 'Différence de potentiel de masse électrique entre le pad GND de la caméra et celui du VTX couplée aux pointes de tension des MOSFETs de l ESC.',
          probability: 91,
          explanation: 'La circulation d un courant parasite dans le blindage vidéo génère des barres de balayage. Les pointes de surtension peuvent également perturber la matrice couleur du capteur.',
          testSteps: [
            'Vérifier où sont soudés les fils noir (GND) de la caméra et du VTX.',
            'Inspecter au multimètre la continuité entre la masse de la caméra et les vis de fixation en carbone.',
            'Vérifier la présence d un condensateur Low-ESR aux bornes d alimentation batterie de l ESC.'
          ],
          recommendedFix: [
            'Souder la masse de la caméra et la masse du VTX sur le même pad GND commun du contrôleur de vol.',
            'Isoler le boîtier métallique de la caméra du châssis en carbone à l aide de rondelles en plastique ou de vis en nylon.',
            'Ajouter ou remplacer le condensateur Low-ESR 35V 1000µF soudé sur les pads LiPo de l ESC pour filtrer les parasites.',
            'Torsader ensemble les 3 câbles (Alim, Masse, Vidéo).'
          ],
          toolsNeeded: ['Fer à souder', 'Multimètre', 'Condensateur Low-ESR 1000µF']
        },
        matchingForumQuery: ['camera analogique ecran rose', 'ground loop fpv', 'barres horizontales gaz', 'caddx ratel 2']
      }
    ]
  },

  // 11. Batterie LiPo & Alimentation (LiPo)
  lipo: {
    id: 'lipo',
    componentName: 'Batterie LiPo & Alimentation',
    componentSlug: 'lipo',
    frenchTitle: 'Batterie LiPo & Circuit d Alimentation (6S / 4S & Connecteurs XT60)',
    category: 'alimentation',
    sisterSiteId: 'makemyquad',
    defaultImage: '/images/components/lipo.svg?v=6',
    description: 'Source d énergie haute décharge (75C à 150C) alimentant le quad. Dépannage du voltage sag, déséquilibre des cellules et connecteurs XT60 usés.',
    brands: [
      { id: 'cnhl', name: 'CNHL (China Hobby Line)', popularModels: ['Black Series 6S 1100mAh 100C', 'Pizza 6S 1200mAh', 'Speedy Pizza 150C'] },
      { id: 'tattu', name: 'Tattu Gens Ace', popularModels: ['R-Line V5.0 6S 1200mAh 150C', 'R-Line V4.0', 'FunFly 6S 1300mAh'] },
      { id: 'gnb', name: 'GNB (Gaoneng)', popularModels: ['GNB LiHV 6S 1100mAh 120C', 'GNB 4S 850mAh'] },
    ],
    circumstances: [
      { id: 'punch-out', label: '🚀 Lors d une accélération maximale (Punch-out)', description: 'Chute brutale de tension et coupure vidéo' },
      { id: 'storage', label: '📦 Après une période de stockage', description: 'Une cellule affiche une tension inférieure à 3.0V' },
    ],
    quickObservations: [
      { id: 'obs-puffed', label: 'Le pack n est pas gonflé et ne dégage aucune odeur chimique' },
      { id: 'obs-xt60-tight', label: 'La fiche XT60 femelle serre fermement sans jeu dans la fiche mâle' },
    ],
    symptoms: [
      {
        id: 'lipo-xt60-loose-blackout',
        title: 'Micro-coupures d alimentation et reboot de la FC lors des vibrations ou punch-outs',
        description: 'Le drone subit des micro-coupures électriques en vol qui réinitialisent le contrôleur de vol ou éteignent le VTX un quart de seconde.',
        category: 'alimentation',
        severity: 'critique',
        likelyCause: 'Broches femelles du connecteur XT60 écartées ou dessoudées sous gaine thermo',
        rarityIndex: 8,
        rarityLabel: 'Panne fréquente (8/10)',
        aiDiagnostic: {
          rootCause: 'Les 4 lamelles fendues de la fiche XT60 mâle s écrasent avec le temps, créant une résistance de contact et des arcs électriques.',
          probability: 94,
          explanation: 'Sous forte demande de courant (80A à 120A), la résistance de contact fait chuter la tension instantanément, provoquant un brownout des régulateurs 5V/9V.',
          testSteps: [
            'Brancher la LiPo et remuer fermement le connecteur XT60 à la main pour voir si les LEDs de la FC clignotent.',
            'Inspecter les broches dorées de la fiche XT60 : vérifier si elles sont resserrées ou calaminées (traces noires d arcs).'
          ],
          recommendedFix: [
            'Utiliser une lame de cutter fine pour écarter très délicatement les 4 quartiers des broches mâles XT60.',
            'Remplacer le connecteur XT60 s il présente des traces d échauffement ou de plastique fondu.',
            'Vérifier que la tresse de câble d alimentation n est pas cisaillée à la racine de la soudure sur l ESC.'
          ],
          toolsNeeded: ['Cutter de précision', 'Fer à souder 60W+', 'Connecteur Amass XT60H d origine']
        },
        matchingForumQuery: ['xt60 faux contact', 'reboot fc vol', 'brownout coupure lipo', 'punchout blackout']
      }
    ]
  },

  // 12. Châssis Carbone & Hélices (Frame)
  frame: {
    id: 'frame',
    componentName: 'Châssis Carbone & Hélices',
    componentSlug: 'frame',
    frenchTitle: 'Châssis Carbone True-X & Hélices (Bras 5-6mm & Rigidité)',
    category: 'mecanique',
    sisterSiteId: 'makemyquad',
    defaultImage: '/images/components/frame.svg?v=6',
    description: 'Structure porteuse en fibre de carbone Toray T700 absorbant les contraintes mécaniques. Dépannage de la délamination, des vibrations structurelles et du serrage.',
    brands: [
      { id: 'apex', name: 'ImpulseRC Apex / Apex EVO', popularModels: ['Apex EVO 5"', 'Apex HD 5"', 'Apex DC'] },
      { id: 'geprc-frame', name: 'GEPRC', popularModels: ['Mark 5', 'Mark 4', 'CineLog 35 V2'] },
      { id: 'speedybee-frame', name: 'SpeedyBee', popularModels: ['Master 5 V2', 'Mario 5'] },
      { id: 'flywoo-frame', name: 'Flywoo', popularModels: ['Explorer LR 4', 'CineRace20'] },
    ],
    circumstances: [
      { id: 'after-crash', label: '💥 Après un choc violent sur du béton ou un arbre', description: 'Bras carbone qui fléchit ou délaminé sur la tranche' },
      { id: 'high-throttle', label: '🚀 En vol à haut régime', description: 'Résonance aiguë et moteurs anormalement brûlants' },
    ],
    quickObservations: [
      { id: 'obs-screws-tight', label: 'Toutes les vis de bras et de top-plate sont serrées avec frein-filet moyen (Loctite bleu)' },
      { id: 'obs-no-delam', label: 'Les tranches de carbone ne présentent pas d effilochage blanc (délamination)' },
    ],
    symptoms: [
      {
        id: 'frame-arm-flex-gyro-noise',
        title: 'Vibrations parasites et moteurs brûlants causés par un bras carbone fissuré ou desserré',
        description: 'Le drone oscille en vol, les filtres gyro saturent et les moteurs reviennent tièdes/brûlants après 2 minutes de vol pépère.',
        category: 'mecanique',
        severity: 'critique',
        likelyCause: 'Vis de bras desserrée ou début de délamination interne invisible du carbone',
        rarityIndex: 7,
        rarityLabel: 'Panne mécanique classique (7/10)',
        aiDiagnostic: {
          rootCause: 'La perte de rigidité d un bras abaisse sa fréquence de résonance mécanique sous les 200Hz, en plein dans la bande de travail des filtres PID.',
          probability: 90,
          explanation: 'La boucle PID amplifie la résonance du bras mou, envoyant des corrections à haute fréquence aux moteurs qui surchauffent.',
          testSteps: [
            'Saisir l extrémité de chaque bras et tenter de le tordre fermement à la main pour détecter tout jeu mécanique.',
            'Vérifier au tournevis Torx/Hex le serrage des vis centrales maintenant les bras pressés entre les plaques carbone.'
          ],
          recommendedFix: [
            'Resserrer toutes les vis de bras au couple en appliquant une goutte de frein-filet bleu (Loctite 243).',
            'Si un bras fléchit plus que les autres ou si la tranche est blanche, le remplacer impérativement par un bras neuf.',
            'Vérifier que les hélices ne sont pas ébréchées ou tordues.'
          ],
          toolsNeeded: ['Tournevis hexagonal 2.0mm / 2.5mm', 'Frein-filet bleu Loctite', 'Bras carbone de rechange']
        },
        matchingForumQuery: ['vibrations bras carbone', 'moteur brulant pid', 'delamination frame', 'vis bras desserree']
      }
    ]
  }
};

// Fonction de résolution intelligente pour tous les composants
export function getDiagnosticDefinition(compId: string): ComponentDiagnosticDefinition {
  const norm = compId.toLowerCase();
  if (DIAGNOSTIC_DEFINITIONS[norm]) {
    return DIAGNOSTIC_DEFINITIONS[norm];
  }
  if (norm === 'motor') return DIAGNOSTIC_DEFINITIONS['motors'];
  if (norm === 'tango' || norm === 'tx' || norm === 'radiomaster') return DIAGNOSTIC_DEFINITIONS['radio'];
  if (norm === 'betaflight' || norm === 'config') return DIAGNOSTIC_DEFINITIONS['configurator'];
  if (norm === 'goggles' || norm === 'lunettes' || norm === 'masque') return DIAGNOSTIC_DEFINITIONS['goggle'];
  if (norm === 'compass') return DIAGNOSTIC_DEFINITIONS['gps'];
  if (norm === 'camera') return DIAGNOSTIC_DEFINITIONS['cam'];
  if (norm === 'battery' || norm === 'power') return DIAGNOSTIC_DEFINITIONS['lipo'];
  if (norm === 'chassis' || norm === 'props') return DIAGNOSTIC_DEFINITIONS['frame'];
  if (norm === 'antenna-rx') return DIAGNOSTIC_DEFINITIONS['rx'];
  if (norm === 'antenna-vtx') return DIAGNOSTIC_DEFINITIONS['vtx'];
  if (norm === 'vifly') return DIAGNOSTIC_DEFINITIONS['fc'];

  // Définition générique élégante pour tout composant exotique restant
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
        rarityIndex: 5,
        rarityLabel: 'Panne modérée (5/10)',
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

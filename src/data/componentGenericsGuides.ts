export interface ModelGuideExample {
  id: string;
  modelName: string;
  brand: string;
  protocolBadge: string;
  difficultyIndex: number; // 1 à 10 : 1 = ultra-facile, 10 = complexe
  difficultyLabel: string;
  methodName: string;
  estimatedTime: string;
  ledBehavior: {
    binding: string;
    bound: string;
    wifiOrLost: string;
  };
  steps: string[];
  proTip: string;
}

export interface ComponentGeneralGuide {
  id: string;
  componentId: string; // 'rx', 'motors', 'fc', 'esc', 'vtx', 'radio', etc.
  title: string;
  tagline: string;
  description: string;
  globalIndex: number; // Indice de complexité global 1 à 10
  globalIndexLabel: string;
  prerequisites: string[];
  keyRules: string[];
  examplesByModel: ModelGuideExample[];
}

export const COMPONENT_GENERAL_GUIDES: Record<string, ComponentGeneralGuide[]> = {
  // 1. GUIDES POUR LE RÉCEPTEUR RADIO (RX) - BINDING DÉTAILLÉ PAR MODÈLE
  rx: [
    {
      id: 'guide-rx-bind',
      componentId: 'rx',
      title: 'Guide Général : Comment appairer (Binder) son récepteur radio FPV',
      tagline: 'Procédures universelles et exemples détaillés pour chaque modèle de récepteur référencé sur BindMyQuad',
      description: 'L appairage (binding) établit la liaison radio chiffrée entre votre radiocommande et le récepteur du drone. Selon que votre RX fonctionne sous ExpressLRS, TBS Crossfire ou FrSky, la méthode diffère. Retrouvez ci-dessous la procédure exacte avec indice de complexité pour chaque modèle répertorié.',
      globalIndex: 3, // 3/10 : Globalement simple sur les récepteurs modernes
      globalIndexLabel: 'Procédure accessible (3/10)',
      prerequisites: [
        'Radiocommande allumée sur le bon modèle de quad',
        'Batterie LiPo ou alimentation USB connectée au drone',
        'Hélices obligatoirement démontées par sécurité',
        'Script LUA (ExpressLRS ou Crossfire) installé sur la radio'
      ],
      keyRules: [
        'Sur ExpressLRS, la version majeure doit être identique entre radio et RX (ex: v3.x avec v3.x).',
        'Si vous utilisez une Passphrase de binding, le récepteur se lie automatiquement dès qu il démarre sans manipulation physique.',
        'Ne jamais alimenter un récepteur avec antenne non clipsée pour éviter d endommager l amplificateur RF.'
      ],
      examplesByModel: [
        {
          id: 'rx-radiomaster-rp1',
          modelName: 'RadioMaster RP1 / RP2 / RP3 (ELRS 2.4GHz)',
          brand: 'RadioMaster',
          protocolBadge: 'ExpressLRS 2.4GHz',
          difficultyIndex: 2, // 2/10 : Très simple (WiFi ou 3-Power Cycle)
          difficultyLabel: 'Très facile (2/10)',
          methodName: 'Méthode WiFi WebUI (10.0.0.1) ou 3 cycles d alimentation',
          estimatedTime: '2 minutes',
          ledBehavior: {
            binding: 'Double clignotement rapide suivi d une pause',
            bound: 'LED orange/bleue allumée fixe continue',
            wifiOrLost: 'Clignotement ultra-rapide (500ms = mode WiFi actif)'
          },
          steps: [
            'Méthode 1 (Recommandée - Passphrase WiFi) : Alimenter le drone et attendre 60 secondes sans allumer la radio. Le récepteur bascule automatiquement en mode WiFi (la LED clignote très vite).',
            'Sur votre smartphone ou PC, connectez-vous au réseau WiFi "ExpressLRS RX" (Mot de passe par défaut : expresslrs).',
            'Ouvrez le navigateur à l adresse http://10.0.0.1. Dans l onglet Options, renseignez votre "Binding Phrase" identique à celle de votre radio, puis cliquez sur "Save & Reboot".',
            'Méthode 2 (3 cycles d alimentation) : Branchez et débranchez la LiPo 3 fois de suite rapidement (1s branché, 1s débranché). Au 3ème branchement, la LED fait un double-clignotement : appuyez sur [Bind] dans le script LUA ExpressLRS de votre radio.'
          ],
          proTip: 'Avec la Passphrase définie en WiFi, vous n aurez plus jamais besoin de rebinder physiquement ce récepteur même après un crash ou mise à jour.'
        },
        {
          id: 'rx-betafpv-nano',
          modelName: 'BETAFPV ELRS Lite / Nano / Micro RX',
          brand: 'BETAFPV',
          protocolBadge: 'ExpressLRS 2.4G / 868M',
          difficultyIndex: 3,
          difficultyLabel: 'Facile (3/10)',
          methodName: 'Cycle d alimentation 3x ou WiFi AP',
          estimatedTime: '2 minutes',
          ledBehavior: {
            binding: 'Double clignotement synchrone',
            bound: 'LED verte fixe',
            wifiOrLost: 'Clignotement continu 1 Hz'
          },
          steps: [
            'Brancher et débrancher l alimentation LiPo 2 fois, puis brancher une 3ème fois.',
            'Observer la LED verte : elle effectue deux clignotements rapides répétés pour signaler le mode Bind.',
            'Sur la radiocommande, ouvrir le script LUA "ExpressLRS" et sélectionner la ligne [Bind].',
            'La LED verte passe au fixe instantanément pour confirmer la liaison.'
          ],
          proTip: 'Si le récepteur est enfoui sous la stack, branchez simplement la LiPo et attendez 60 secondes pour vous y connecter en WiFi 10.0.0.1 sans démonter le châssis.'
        },
        {
          id: 'rx-tbs-crossfire-nano',
          modelName: 'TBS Crossfire Nano RX Pro / Diversity Nano',
          brand: 'Team BlackSheep (TBS)',
          protocolBadge: 'Crossfire 868/915MHz',
          difficultyIndex: 4,
          difficultyLabel: 'Moyen (4/10)',
          methodName: 'Bouton Bind physique + Mise à jour OTA automatique',
          estimatedTime: '3 minutes',
          ledBehavior: {
            binding: 'LED verte clignotant rapidement',
            bound: 'LED verte allumée fixe continue',
            wifiOrLost: 'LED orange ou rouge clignotante'
          },
          steps: [
            'Alimenter le récepteur Crossfire. Appuyer brièvement sur le bouton physique "Bind" situé sur le circuit imprimé du Nano RX (la LED verte clignote rapidement).',
            'Sur votre radiocommande (dans le menu Tools > Crossfire LUA), sélectionner votre émetteur Crossfire Micro/Lite TX puis cliquer sur [Bind].',
            'Si l émetteur affiche "Update Micro RX?", valider OUI : la radiocommande met à jour le firmware du récepteur sans fil (OTA).',
            'Patienter pendant le transfert (la LED passe au bleu/orange puis redevient verte fixe une fois l appairage validé).'
          ],
          proTip: 'Ne coupez jamais l alimentation pendant la mise à jour OTA automatique entre la radio et le Nano RX.'
        },
        {
          id: 'rx-happymodel-ep1',
          modelName: 'Happymodel EP1 / EP2 Dual TCXO (ELRS)',
          brand: 'Happymodel',
          protocolBadge: 'ExpressLRS TCXO',
          difficultyIndex: 2,
          difficultyLabel: 'Très facile (2/10)',
          methodName: '3-Power Cycle ou WebUI 10.0.0.1',
          estimatedTime: '2 minutes',
          ledBehavior: {
            binding: 'Double flash régulier',
            bound: 'LED rouge fixe continue',
            wifiOrLost: 'Flash continu rapide 20Hz'
          },
          steps: [
            'Alimenter 3 fois de suite pour entrer en mode d appairage matériel.',
            'Lancer la commande [Bind] sur le module radio ExpressLRS.',
            'La LED rouge reste allumée fixe dès que la clé de chiffrement est échangée.'
          ],
          proTip: 'L oscillateur TCXO garantit une stabilité thermique parfaite du signal même par grand froid ou sous forte canicule.'
        },
        {
          id: 'rx-frsky-rxsr',
          modelName: 'FrSky R-XSR / XM+ (ACCST D16 / ACCESS)',
          brand: 'FrSky',
          protocolBadge: 'FrSky D16 / ACCESS',
          difficultyIndex: 7, // 7/10 : Plus délicat (maintien bouton physique tout en branchant + versions de firmware)
          difficultyLabel: 'Complexe (7/10)',
          methodName: 'Bouton F/S maintenu au branchement LiPo',
          estimatedTime: '5 minutes',
          ledBehavior: {
            binding: 'LED rouge et verte allumées simultanément',
            bound: 'LED verte allumée fixe, rouge éteinte',
            wifiOrLost: 'LED rouge clignotante'
          },
          steps: [
            'Maintenir enfoncé le minuscule bouton physique "F/S" sur le récepteur avec une pointe de cure-dent.',
            'Tout en maintenant le bouton appuyé, brancher la LiPo : les LEDs rouge et verte s allument ensemble pour confirmer le mode Bind.',
            'Relâcher le bouton F/S.',
            'Sur la radiocommande, dans le menu MODEL > Internal RF, sélectionner ACCST D16 puis cliquer sur [Bnd].',
            'Débrancher et rebrancher le drone : seule la LED verte doit rester allumée fixe.'
          ],
          proTip: 'Attention au mismatch de firmware ACCST v1 vs v2.1.x : si le récepteur ne se lie jamais, vérifiez que le firmware du récepteur correspond exactement à celui de la radio.'
        }
      ]
    }
  ],

  // 2. GUIDES POUR LES MOTEURS BRUSHLESS (MULTI-MOTORS)
  motors: [
    {
      id: 'guide-motors-rotation',
      componentId: 'motors',
      title: 'Guide Général : Sens de rotation, ordre des 4 moteurs & protocole DSHOT',
      tagline: 'Configuration dans Betaflight et Bluejay / BLHeli pour un vol parfaitement équilibré',
      description: 'Sur un drone quadricoptère, 2 moteurs tournent en sens horaire (CW) et 2 en sens anti-horaire (CCW). Une inversion d ordre ou de sens de rotation provoque un retournement immédiat dès l armement. Ce guide résume les règles universelles et les réglages de timing.',
      globalIndex: 4,
      globalIndexLabel: 'Procédure standard (4/10)',
      prerequisites: [
        'Drone connecté en USB à Betaflight Configurator',
        'Hélices OBLIGATOIREMENT retirées des 4 moteurs',
        'Batterie LiPo branchée pour alimenter l ESC lors du test des moteurs'
      ],
      keyRules: [
        'Règle d or absolue : Toujours démonter les hélices avant de tester les moteurs sur l établi.',
        'Vérifier si votre quad est configuré en "Moteurs sens normal" (Standard) ou "Sens inversé" (Props Out). Le mode Props Out évite de projeter de l herbe sur la lentille de la caméra.',
        'L ordre des moteurs sous Betaflight est toujours : 1=Arrière-Droit, 2=Avant-Droit, 3=Arrière-Gauche, 4=Avant-Gauche.'
      ],
      examplesByModel: [
        {
          id: 'motor-setup-5inch-freestyle',
          modelName: 'Moteurs 5" Freestyle (ex: T-Motor F60 PRO, EMAX ECO II, XING2 2207)',
          brand: 'Général 5 Pouces',
          protocolBadge: 'DSHOT600 / DSHOT300',
          difficultyIndex: 3,
          difficultyLabel: 'Facile (3/10)',
          methodName: 'Onglet Moteurs Betaflight + Assistant de réordonnancement',
          estimatedTime: '3 minutes',
          ledBehavior: {
            binding: 'N/A (Bips ESC 1-2-3 puis 4-5)',
            bound: 'Rotation fluide commandée',
            wifiOrLost: 'Arrêt immédiat au Failsafe'
          },
          steps: [
            'Dans Betaflight, aller dans l onglet "Moteurs". Cocher la case "Je comprends les risques (hélices retirées)".',
            'Cliquer sur "Réordonner les moteurs" : faire tourner chaque moteur un à un et cliquer sur son numéro réel.',
            'Cliquer sur "Sens de rotation des moteurs" : passer le doigt délicatement sur la cloche pour sentir le sens, et cliquer sur le moteur pour inverser son sens sans dessouder les fils.',
            'Vérifier que le curseur "Sens inversé des hélices (Props Out)" correspond exactement au montage de vos pales.'
          ],
          proTip: 'Avec DSHOT bidirectionnel et Bluejay, vous pouvez inverser le sens de rotation en 1 clic sans toucher au fer à souder.'
        },
        {
          id: 'motor-setup-micro-whoop',
          modelName: 'Moteurs Micro Whoop 1S/2S (ex: BETAFPV 0802/1102, Happymodel SE)',
          brand: 'Micro Whoop',
          protocolBadge: 'DSHOT300 / Bluejay 48kHz',
          difficultyIndex: 4,
          difficultyLabel: 'Accessible (4/10)',
          methodName: 'Flash Bluejay 48kHz pour autonomie maximale',
          estimatedTime: '4 minutes',
          ledBehavior: {
            binding: 'Mélodie personnalisée Bluejay au démarrage',
            bound: 'Régime régulier à bas gaz',
            wifiOrLost: 'Bips d alerte balise après 1 minute'
          },
          steps: [
            'Ouvrir esc-configurator.com dans un navigateur Chromium avec le drone branché en USB et LiPo connectée.',
            'Flasher le firmware Bluejay version 0.19 ou supérieure avec une fréquence PWM de 48kHz (ou 96kHz sur 1S tinywhoop).',
            'Régler le Startup Power minimum à 0.125 pour garantir un démarrage net des petits moteurs sans broutement.',
            'Vérifier que le DSHOT bidirectionnel est activé dans Betaflight pour le filtrage RPM dynamique.'
          ],
          proTip: 'Passer les Tiny Whoops en 48kHz ou 96kHz augmente l autonomie de vol de 20% à 30% en réduisant les pertes thermiques par commutation.'
        }
      ]
    }
  ],

  // 3. GUIDES POUR LE CONTRÔLEUR DE VOL (FC)
  fc: [
    {
      id: 'guide-fc-status',
      componentId: 'fc',
      title: 'Guide Général : Comprendre les Arming Disable Flags sous Betaflight',
      tagline: 'Identifier en 10 secondes pourquoi votre drone refuse de décoller',
      description: 'Lorsque votre drone ne réagit pas à l interrupteur d armement, ce n est pas une panne matérielle mais une protection logicielle active. La commande "status" dans le CLI révèle instantanément le verrou.',
      globalIndex: 2,
      globalIndexLabel: 'Très facile (2/10)',
      prerequisites: [
        'Câble USB données connecté à la FC',
        'Betaflight Configurator ouvert sur ordinateur'
      ],
      keyRules: [
        'Ne jamais tenter d armer en USB avec des hélices montées.',
        'La commande "status" est l outil de diagnostic N°1 de tout pilote FPV.'
      ],
      examplesByModel: [
        {
          id: 'fc-cli-status-diagnostic',
          modelName: 'Toutes cartes FC STM32 F405 / F722 / H7',
          brand: 'Universel Betaflight',
          protocolBadge: 'Betaflight CLI',
          difficultyIndex: 2,
          difficultyLabel: 'Très simple (2/10)',
          methodName: 'Console CLI - Commande status',
          estimatedTime: '1 minute',
          ledBehavior: {
            binding: 'LED bleue fixe',
            bound: 'LED rouge clignotante selon flag',
            wifiOrLost: 'LED verte RX éteinte si perte radio'
          },
          steps: [
            'Ouvrir l onglet "CLI" tout en bas du menu Betaflight.',
            'Taper "status" puis appuyer sur Entrée.',
            'Lire la dernière ligne intitulée "Arming disable flags:".',
            'Exemples courants : THROTTLE (gaz pas à zéro), RX_LOSS (radio éteinte ou non liée), ANGLE (drone pas à plat), BAD_RX (protocole mal configuré).'
          ],
          proTip: 'Le flag "CLI" et "MSP" est normal lorsque le drone est branché en USB à l ordinateur.'
        }
      ]
    }
  ]
};

// Récupère les guides généraux associés à un composant
export function getGeneralGuidesForComponent(componentId: string): ComponentGeneralGuide[] {
  const norm = componentId.toLowerCase();
  if (COMPONENT_GENERAL_GUIDES[norm]) {
    return COMPONENT_GENERAL_GUIDES[norm];
  }
  if (norm === 'motors' || norm === 'motor') {
    return COMPONENT_GENERAL_GUIDES['motors'] || [];
  }
  if (norm === 'tango' || norm === 'radio' || norm === 'antenna-rx') {
    return COMPONENT_GENERAL_GUIDES['rx'] || [];
  }
  if (norm === 'betaflight' || norm === 'configurator') {
    return COMPONENT_GENERAL_GUIDES['fc'] || [];
  }
  return [];
}

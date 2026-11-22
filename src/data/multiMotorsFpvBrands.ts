// Données extraites du catalogue Multi-Motors.fr (13 824 moteurs répertoriés)
// Spécialisé pour le diagnostic et le suivi par référence & serial number

export interface MotorModelItem {
  name: string;
  classes: string[];
  kvs: string[];
  versions: string[];
}

export interface MotorBrandItem {
  name: string;
  totalMotorsInCatalog: number;
  classes: string[];
  models: MotorModelItem[];
}

export const MULTI_MOTORS_FPV_BRANDS: Record<string, MotorBrandItem> = {
  "T-Motor": {
    "name": "T-Motor",
    "totalMotorsInCatalog": 635,
    "classes": [
      "1005",
      "1010",
      "1015",
      "1018",
      "1103",
      "1204",
      "1404",
      "1507",
      "1804",
      "1806"
    ],
    "models": [
      {
        "name": "F60 PRO",
        "classes": [
          "2207.5"
        ],
        "kvs": [
          "2200",
          "2350",
          "2500",
          "2020",
          "1750",
          "1950"
        ],
        "versions": []
      },
      {
        "name": "VELOX V2207 V3.0 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1500",
          "2550",
          "2050",
          "1750",
          "1950"
        ],
        "versions": []
      },
      {
        "name": "AT2814 LONG SHAFT",
        "classes": [
          "2814"
        ],
        "kvs": [
          "900",
          "1050",
          "1200",
          "2000"
        ],
        "versions": []
      },
      {
        "name": "AT7215",
        "classes": [
          "7215"
        ],
        "kvs": [
          "200",
          "220",
          "245",
          "270"
        ],
        "versions": []
      },
      {
        "name": "U8 II",
        "classes": [],
        "kvs": [
          "190",
          "85",
          "100",
          "150"
        ],
        "versions": []
      },
      {
        "name": "F30",
        "classes": [],
        "kvs": [
          "2300",
          "3800",
          "2900",
          "4600"
        ],
        "versions": []
      },
      {
        "name": "F40 PRO",
        "classes": [
          "2306.8"
        ],
        "kvs": [
          "2400",
          "2600",
          "1950",
          "2150"
        ],
        "versions": []
      },
      {
        "name": "VELOX V2306 V3.0 2306",
        "classes": [
          "2306"
        ],
        "kvs": [
          "1500",
          "1950",
          "2550",
          "1750"
        ],
        "versions": []
      },
      {
        "name": "PACER V3.2 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1750",
          "2550",
          "2080",
          "1950"
        ],
        "versions": []
      },
      {
        "name": "P2207 V3",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1950",
          "2080",
          "1750",
          "2550"
        ],
        "versions": []
      },
      {
        "name": "VELOX V3115",
        "classes": [
          "3115"
        ],
        "kvs": [
          "900",
          "640",
          "1050",
          "400"
        ],
        "versions": []
      },
      {
        "name": "VELOX V2207 V3 1750/1950/2050",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1750",
          "1950",
          "2050",
          "2550"
        ],
        "versions": []
      },
      {
        "name": "U8 LITE",
        "classes": [],
        "kvs": [
          "85",
          "100",
          "150",
          "190"
        ],
        "versions": []
      },
      {
        "name": "F1404",
        "classes": [
          "1404"
        ],
        "kvs": [
          "3800",
          "4600",
          "2900"
        ],
        "versions": []
      },
      {
        "name": "F2203,5",
        "classes": [
          "2203.5"
        ],
        "kvs": [
          "1500",
          "2850",
          "3550"
        ],
        "versions": []
      },
      {
        "name": "V2207 V2",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1750",
          "2550",
          "1950"
        ],
        "versions": []
      },
      {
        "name": "PACER V2 P2207 POWERFULL",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1950",
          "2550",
          "1750"
        ],
        "versions": []
      },
      {
        "name": "P2207,5 MIXED",
        "classes": [
          "2207.5"
        ],
        "kvs": [
          "1750",
          "1950",
          "2550"
        ],
        "versions": []
      },
      {
        "name": "P2208 BLUE+PINK",
        "classes": [
          "2208"
        ],
        "kvs": [
          "1750",
          "1950",
          "2450"
        ],
        "versions": []
      },
      {
        "name": "AS 2303",
        "classes": [
          "2303"
        ],
        "kvs": [
          "1500",
          "1800",
          "2300"
        ],
        "versions": []
      },
      {
        "name": "AS 2304",
        "classes": [
          "2304"
        ],
        "kvs": [
          "1500",
          "1800",
          "2300"
        ],
        "versions": []
      },
      {
        "name": "AS 2306",
        "classes": [
          "2306"
        ],
        "kvs": [
          "1500",
          "1900",
          "2300"
        ],
        "versions": []
      },
      {
        "name": "F40 III",
        "classes": [
          "2306"
        ],
        "kvs": [
          "2400",
          "2600",
          "2750"
        ],
        "versions": []
      },
      {
        "name": "AT2317 LONG SHAFT",
        "classes": [
          "2317"
        ],
        "kvs": [
          "880",
          "1250",
          "1400"
        ],
        "versions": []
      },
      {
        "name": "AT2820 LONG SHAFT",
        "classes": [
          "2820"
        ],
        "kvs": [
          "880",
          "1050",
          "1250"
        ],
        "versions": []
      }
    ]
  },
  "iFlight": {
    "name": "iFlight",
    "totalMotorsInCatalog": 146,
    "classes": [
      "2205",
      "2806.5",
      "2207",
      "2506",
      "0802",
      "1103",
      "1104",
      "1105",
      "1108",
      "1202"
    ],
    "models": [
      {
        "name": "XING2 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1855",
          "1750",
          "2050",
          "2755",
          "1950"
        ],
        "versions": [
          "XING2"
        ]
      },
      {
        "name": "XING X1404",
        "classes": [
          "1404"
        ],
        "kvs": [
          "3000",
          "3800",
          "4600",
          "5500"
        ],
        "versions": []
      },
      {
        "name": "XING 2203,5",
        "classes": [
          "2203.5"
        ],
        "kvs": [
          "1900",
          "2500",
          "2700",
          "3600"
        ],
        "versions": []
      },
      {
        "name": "XING-E PRO 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1800",
          "2450",
          "2750",
          "1700"
        ],
        "versions": []
      },
      {
        "name": "XING 2208",
        "classes": [
          "2208"
        ],
        "kvs": [
          "1800",
          "1700",
          "2450",
          "2150"
        ],
        "versions": []
      },
      {
        "name": "XING NANO X0802",
        "classes": [
          "0802"
        ],
        "kvs": [
          "15000",
          "17000",
          "22000"
        ],
        "versions": []
      },
      {
        "name": "XING X1408",
        "classes": [
          "1408"
        ],
        "kvs": [
          "2800",
          "3600",
          "4100"
        ],
        "versions": []
      },
      {
        "name": "XING X1507",
        "classes": [
          "1507"
        ],
        "kvs": [
          "2800",
          "3600",
          "4200"
        ],
        "versions": []
      },
      {
        "name": "XING X2208",
        "classes": [
          "2208"
        ],
        "kvs": [
          "1800",
          "2450",
          "1700"
        ],
        "versions": []
      },
      {
        "name": "XING X5215",
        "classes": [
          "5215"
        ],
        "kvs": [
          "250",
          "330",
          "500"
        ],
        "versions": []
      },
      {
        "name": "XING2 1404",
        "classes": [
          "1404"
        ],
        "kvs": [
          "3000",
          "3800",
          "4600"
        ],
        "versions": []
      },
      {
        "name": "XING-E PRO 2306",
        "classes": [
          "2306"
        ],
        "kvs": [
          "1700",
          "2450",
          "2750"
        ],
        "versions": []
      },
      {
        "name": "CYBER XING 2207.5",
        "classes": [
          "2207.5"
        ],
        "kvs": [
          "1999",
          "1777",
          "2555"
        ],
        "versions": []
      },
      {
        "name": "CYBER XING 2306",
        "classes": [
          "2306"
        ],
        "kvs": [
          "1777",
          "1999",
          "2555"
        ],
        "versions": []
      },
      {
        "name": "XING 1408",
        "classes": [
          "1408"
        ],
        "kvs": [
          "2800",
          "3600",
          "4100"
        ],
        "versions": []
      },
      {
        "name": "XING 2806.5",
        "classes": [
          "2806.5"
        ],
        "kvs": [
          "1300",
          "1800"
        ],
        "versions": [
          "XING"
        ]
      },
      {
        "name": "R5 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1590",
          "2050"
        ],
        "versions": [
          "R5"
        ]
      },
      {
        "name": "XING2 2506",
        "classes": [
          "2506"
        ],
        "kvs": [
          "1500",
          "1850"
        ],
        "versions": [
          "XING2"
        ]
      },
      {
        "name": "XING-E 1103",
        "classes": [
          "1103"
        ],
        "kvs": [
          "8000",
          "10000"
        ],
        "versions": []
      },
      {
        "name": "XING-E 1105",
        "classes": [
          "1105"
        ],
        "kvs": [
          "4500",
          "6000"
        ],
        "versions": []
      },
      {
        "name": "BEEMOTOR 1108",
        "classes": [
          "1108"
        ],
        "kvs": [
          "5000",
          "6000"
        ],
        "versions": []
      },
      {
        "name": "XING NANO 1202",
        "classes": [
          "1202"
        ],
        "kvs": [
          "8000",
          "10000"
        ],
        "versions": []
      },
      {
        "name": "XING 1204",
        "classes": [
          "1204"
        ],
        "kvs": [
          "4500",
          "6500"
        ],
        "versions": []
      },
      {
        "name": "XING 2005",
        "classes": [
          "2005"
        ],
        "kvs": [
          "1900",
          "2550"
        ],
        "versions": []
      },
      {
        "name": "XING X2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1000",
          "1900"
        ],
        "versions": []
      }
    ]
  },
  "RCinPower": {
    "name": "RCinPower",
    "totalMotorsInCatalog": 153,
    "classes": [
      "0802",
      "1002",
      "1003",
      "2105",
      "2107",
      "2104",
      "2207",
      "1804",
      "1404.6",
      "1404"
    ],
    "models": [
      {
        "name": "WASP MAJOR 22,6-6,6",
        "classes": [
          "2206"
        ],
        "kvs": [
          "1860",
          "2020",
          "2420",
          "1980",
          "1960",
          "2200"
        ],
        "versions": []
      },
      {
        "name": "SMOOX 2306,5",
        "classes": [
          "2306.5"
        ],
        "kvs": [
          "1880",
          "2580",
          "2680",
          "2280"
        ],
        "versions": []
      },
      {
        "name": "GTS V3 1303 PLUS TEAL/PINK",
        "classes": [
          "1303"
        ],
        "kvs": [
          "8000",
          "6000",
          "11500",
          "5000"
        ],
        "versions": []
      },
      {
        "name": "GTS V3 0802",
        "classes": [
          "0802"
        ],
        "kvs": [
          "25000",
          "22000",
          "27000"
        ],
        "versions": [
          "GTS V3"
        ]
      },
      {
        "name": "GTS V3 1002",
        "classes": [
          "1002"
        ],
        "kvs": [
          "22000",
          "14000",
          "19000"
        ],
        "versions": [
          "GTS V3"
        ]
      },
      {
        "name": "GTS V3 1003",
        "classes": [
          "1003"
        ],
        "kvs": [
          "10000",
          "22000",
          "18000"
        ],
        "versions": [
          "GTS V3"
        ]
      },
      {
        "name": "GTS V3 2105 Plus",
        "classes": [
          "2105"
        ],
        "kvs": [
          "2950",
          "1850",
          "3600"
        ],
        "versions": [
          "GTS V3 Plus"
        ]
      },
      {
        "name": "GTS V3 1404.6",
        "classes": [
          "1404.6"
        ],
        "kvs": [
          "2850",
          "4680",
          "3850"
        ],
        "versions": [
          "GTS V3"
        ]
      },
      {
        "name": "SMOOX PLUS 1507",
        "classes": [
          "1507"
        ],
        "kvs": [
          "2680",
          "3800",
          "4200"
        ],
        "versions": [
          "Smoox Plus"
        ]
      },
      {
        "name": "0702",
        "classes": [
          "0702"
        ],
        "kvs": [
          "27000",
          "31800",
          "33800"
        ],
        "versions": []
      },
      {
        "name": "GTS 2207 PLUS",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1860",
          "2550",
          "1980"
        ],
        "versions": [
          "V2"
        ]
      },
      {
        "name": "SMOOX 2306 PLUS",
        "classes": [
          "2306"
        ],
        "kvs": [
          "1880",
          "2580",
          "2280"
        ],
        "versions": []
      },
      {
        "name": "GTS4715",
        "classes": [
          "4715"
        ],
        "kvs": [
          "360",
          "490",
          "650"
        ],
        "versions": []
      },
      {
        "name": "GTS-V2 1202.5",
        "classes": [
          "1202.5"
        ],
        "kvs": [
          "11500",
          "6000",
          "600"
        ],
        "versions": []
      },
      {
        "name": "GTS-V2 1207",
        "classes": [
          "1207"
        ],
        "kvs": [
          "5000",
          "6000",
          "7500"
        ],
        "versions": []
      },
      {
        "name": "GTS V3 1203 PLUS",
        "classes": [
          "1203"
        ],
        "kvs": [
          "8000",
          "11500",
          "6000"
        ],
        "versions": []
      },
      {
        "name": "AOS SUPERNOVA 3220 CINELIFTER WING",
        "classes": [
          "3220"
        ],
        "kvs": [
          "700",
          "925",
          "1000"
        ],
        "versions": []
      },
      {
        "name": "AOS SUPERNOVA 4220",
        "classes": [
          "4220"
        ],
        "kvs": [
          "350",
          "415",
          "515"
        ],
        "versions": []
      },
      {
        "name": "GTS V3 2107 Plus",
        "classes": [
          "2107"
        ],
        "kvs": [
          "2080",
          "2480"
        ],
        "versions": [
          "GTS V3 Plus"
        ]
      },
      {
        "name": "AOS Supernova 2207 (Chris Rosser)",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1980",
          "1570"
        ],
        "versions": [
          "Supernova"
        ]
      },
      {
        "name": "GTS V3 1804",
        "classes": [
          "1804"
        ],
        "kvs": [
          "3450",
          "2450"
        ],
        "versions": [
          "GTS V3"
        ]
      },
      {
        "name": "GTS V4 2207 8S",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1600",
          "2040"
        ],
        "versions": [
          "GTS V4"
        ]
      },
      {
        "name": "AOS Supernova 2807",
        "classes": [
          "2807"
        ],
        "kvs": [
          "1400",
          "1333"
        ],
        "versions": [
          "Supernova"
        ]
      },
      {
        "name": "Vanover V3 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1920",
          "2060"
        ],
        "versions": [
          "V3"
        ]
      },
      {
        "name": "GTS 1204",
        "classes": [
          "1204"
        ],
        "kvs": [
          "5000",
          "8000"
        ],
        "versions": [
          "V2"
        ]
      }
    ]
  },
  "BrotherHobby": {
    "name": "BrotherHobby",
    "totalMotorsInCatalog": 216,
    "classes": [
      "0804",
      "10012",
      "1103",
      "1106",
      "1402",
      "1404",
      "1407",
      "1504.5",
      "1507",
      "1608"
    ],
    "models": [
      {
        "name": "AVENGER 2810",
        "classes": [
          "2810"
        ],
        "kvs": [
          "860",
          "960",
          "1180",
          "1500",
          "1350",
          "1090"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "HYPERLITE 2207.5 E",
        "classes": [
          "2207.5"
        ],
        "kvs": [
          "1922",
          "2222",
          "1722",
          "2522",
          "2122",
          "1322"
        ],
        "versions": []
      },
      {
        "name": "SPEED SHIELD 2207,5 V2",
        "classes": [
          "2207.5"
        ],
        "kvs": [
          "1560",
          "2108",
          "2400",
          "2700",
          "3400"
        ],
        "versions": [
          "V2"
        ]
      },
      {
        "name": "HYPERLITE 2408.5 TEAM",
        "classes": [
          "2408.5"
        ],
        "kvs": [
          "1322",
          "1622",
          "1922",
          "2222",
          "2522"
        ],
        "versions": []
      },
      {
        "name": "AVENGER 0804",
        "classes": [
          "0804"
        ],
        "kvs": [
          "1000",
          "12000",
          "15000",
          "10000"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "VY 1507",
        "classes": [
          "1507"
        ],
        "kvs": [
          "1550",
          "1900",
          "3100",
          "4150"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "AVENGER SE 2004",
        "classes": [
          "2004"
        ],
        "kvs": [
          "1700",
          "1950",
          "2100",
          "3150"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "RETURNER R2 2205",
        "classes": [
          "2205"
        ],
        "kvs": [
          "1750",
          "2300",
          "2600",
          "2800"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "RETURNER R3 2206",
        "classes": [
          "2206"
        ],
        "kvs": [
          "1720",
          "2140",
          "2300",
          "2600"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "REUNION 2318",
        "classes": [
          "2318"
        ],
        "kvs": [
          "890",
          "1250",
          "1450",
          "2500"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "AVENGER 2507 V2",
        "classes": [
          "2507"
        ],
        "kvs": [
          "1200",
          "1500",
          "1750",
          "1850"
        ],
        "versions": [
          "V2"
        ]
      },
      {
        "name": "AVENGER 2510",
        "classes": [
          "2510"
        ],
        "kvs": [
          "930",
          "1030",
          "1380",
          "1250"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "TORNADO T5 3115 PRO",
        "classes": [
          "3115"
        ],
        "kvs": [
          "900",
          "1050",
          "1520",
          "400"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "TC 2004",
        "classes": [
          "2004"
        ],
        "kvs": [
          "3150",
          "1950",
          "2100",
          "1700"
        ],
        "versions": []
      },
      {
        "name": "VS 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "2400",
          "1720",
          "2700",
          "1700"
        ],
        "versions": []
      },
      {
        "name": "HYPERLITE 2205.5 E",
        "classes": [
          "2205.5"
        ],
        "kvs": [
          "2522",
          "1722",
          "2222",
          "1922"
        ],
        "versions": []
      },
      {
        "name": "AVENGER 2816 CINELIFTER",
        "classes": [
          "2816"
        ],
        "kvs": [
          "1050",
          "620",
          "750",
          "810"
        ],
        "versions": []
      },
      {
        "name": "LA 2005",
        "classes": [
          "2005"
        ],
        "kvs": [
          "2800",
          "3450",
          "2450",
          "1450"
        ],
        "versions": []
      },
      {
        "name": "HYPERLITE 2005.5 E LIGHTEWEIGHT",
        "classes": [
          "2005.5"
        ],
        "kvs": [
          "2622",
          "2022",
          "3122",
          "1722"
        ],
        "versions": []
      },
      {
        "name": "AVENGER 3008",
        "classes": [
          "3008"
        ],
        "kvs": [
          "1900",
          "1150",
          "1500",
          "1300"
        ],
        "versions": []
      },
      {
        "name": "AVENGER 3115 V5",
        "classes": [
          "3115"
        ],
        "kvs": [
          "710",
          "730",
          "790",
          "910"
        ],
        "versions": []
      },
      {
        "name": "TORNADO T1 1407",
        "classes": [
          "1407"
        ],
        "kvs": [
          "2800",
          "3600",
          "4100"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "VY 1504,5",
        "classes": [
          "1504.5"
        ],
        "kvs": [
          "2650",
          "2950",
          "3950"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "AVENGER 1507",
        "classes": [
          "1507"
        ],
        "kvs": [
          "2800",
          "3600",
          "4100"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "RETURNER R3 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1660",
          "2400",
          "2550"
        ],
        "versions": [
          "V1"
        ]
      }
    ]
  },
  "EMAX": {
    "name": "EMAX",
    "totalMotorsInCatalog": 403,
    "classes": [
      "2004",
      "2207",
      "2306",
      "2808",
      "1404",
      "2807",
      "1104",
      "1106",
      "1108",
      "1306"
    ],
    "models": [
      {
        "name": "ECOII 5215 Brushless Motor 230KV 260KV 300KV 360KV 420KV – Emax USA",
        "classes": [
          "5215"
        ],
        "kvs": [
          "800",
          "900",
          "1050",
          "1200",
          "500",
          "700"
        ],
        "versions": []
      },
      {
        "name": "ECOII 6218 Brushless Motor 180KV 200KV 12S – Emax USA",
        "classes": [
          "6218"
        ],
        "kvs": [
          "800",
          "900",
          "1050",
          "1200",
          "500",
          "700"
        ],
        "versions": []
      },
      {
        "name": "ECOII 6215 Brushless Motor 180KV 200KV 12S – Emax USA",
        "classes": [
          "6215"
        ],
        "kvs": [
          "800",
          "900",
          "1050",
          "1200",
          "500",
          "700"
        ],
        "versions": []
      },
      {
        "name": "GT2812",
        "classes": [
          "2812"
        ],
        "kvs": [
          "970",
          "1060",
          "1180",
          "1550",
          "1840"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "ECO II 3115",
        "classes": [
          "3115"
        ],
        "kvs": [
          "400",
          "500",
          "640",
          "900",
          "800"
        ],
        "versions": []
      },
      {
        "name": "ECOII 5215",
        "classes": [
          "5215"
        ],
        "kvs": [
          "230",
          "260",
          "300",
          "360",
          "420"
        ],
        "versions": []
      },
      {
        "name": "ECO II 2004",
        "classes": [
          "2004"
        ],
        "kvs": [
          "2400",
          "3000",
          "2000",
          "1600"
        ],
        "versions": [
          "ECO II"
        ]
      },
      {
        "name": "E3 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1700",
          "1900",
          "2400",
          "2100"
        ],
        "versions": [
          "E3"
        ]
      },
      {
        "name": "E3 2306",
        "classes": [
          "2306"
        ],
        "kvs": [
          "1700",
          "1900",
          "2400",
          "2100"
        ],
        "versions": []
      },
      {
        "name": "ECO II 3214",
        "classes": [
          "3214"
        ],
        "kvs": [
          "450",
          "800",
          "900",
          "1050"
        ],
        "versions": []
      },
      {
        "name": "ECO II 3210",
        "classes": [
          "3210"
        ],
        "kvs": [
          "800",
          "900",
          "1050",
          "1200"
        ],
        "versions": []
      },
      {
        "name": "ECOII 4215",
        "classes": [
          "4215"
        ],
        "kvs": [
          "350",
          "420",
          "520",
          "660"
        ],
        "versions": []
      },
      {
        "name": "ECOII 4320",
        "classes": [
          "4320"
        ],
        "kvs": [
          "350",
          "380",
          "420",
          "500"
        ],
        "versions": []
      },
      {
        "name": "ECOII 4315",
        "classes": [
          "4315"
        ],
        "kvs": [
          "360",
          "380",
          "450",
          "520"
        ],
        "versions": []
      },
      {
        "name": "ECOII 3530",
        "classes": [
          "3530"
        ],
        "kvs": [
          "280",
          "445",
          "520",
          "650"
        ],
        "versions": []
      },
      {
        "name": "ECOII 3520",
        "classes": [
          "3520"
        ],
        "kvs": [
          "330",
          "495",
          "560",
          "770"
        ],
        "versions": []
      },
      {
        "name": "E3 3115",
        "classes": [
          "3115"
        ],
        "kvs": [
          "400",
          "640",
          "900",
          "1050"
        ],
        "versions": []
      },
      {
        "name": "RSIII 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1800",
          "2500",
          "2100"
        ],
        "versions": [
          "RSIII"
        ]
      },
      {
        "name": "RSIII 2306",
        "classes": [
          "2306"
        ],
        "kvs": [
          "1800",
          "2500",
          "2100"
        ],
        "versions": [
          "RSIII"
        ]
      },
      {
        "name": "ECO Micro 1404",
        "classes": [
          "1404"
        ],
        "kvs": [
          "3700",
          "6000",
          "4800"
        ],
        "versions": [
          "ECO Micro"
        ]
      },
      {
        "name": "ECO II 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1900",
          "2400",
          "1700"
        ],
        "versions": [
          "ECO II"
        ]
      },
      {
        "name": "ECO II 2807",
        "classes": [
          "2807"
        ],
        "kvs": [
          "1700",
          "1500",
          "1300"
        ],
        "versions": [
          "ECO II"
        ]
      },
      {
        "name": "RS1106 II",
        "classes": [
          "1106"
        ],
        "kvs": [
          "7500",
          "4500",
          "6000"
        ],
        "versions": []
      },
      {
        "name": "RS1108",
        "classes": [
          "1108"
        ],
        "kvs": [
          "4500",
          "5200",
          "6000"
        ],
        "versions": []
      },
      {
        "name": "ECO MICRO 1407",
        "classes": [
          "1407"
        ],
        "kvs": [
          "2800",
          "3300",
          "4100"
        ],
        "versions": []
      }
    ]
  },
  "BETAFPV": {
    "name": "BETAFPV",
    "totalMotorsInCatalog": 72,
    "classes": [
      "1102",
      "0702",
      "1805",
      "1103",
      "1104",
      "1506",
      "0802",
      "0603",
      "08028",
      "1105"
    ],
    "models": [
      {
        "name": "1102",
        "classes": [
          "1102"
        ],
        "kvs": [
          "13500",
          "22000",
          "21000",
          "18000",
          "14000"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "1102 Brushless Motor",
        "classes": [
          "1102"
        ],
        "kvs": [
          "22000",
          "18000",
          "14000",
          "21000"
        ],
        "versions": [
          "2022",
          "V1",
          "2026"
        ]
      },
      {
        "name": "1103 Brushless Motor",
        "classes": [
          "1103"
        ],
        "kvs": [
          "15000",
          "11000",
          "8000",
          "8500"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "0702 Brushless Motor",
        "classes": [
          "0702"
        ],
        "kvs": [
          "25000",
          "36000",
          "30000",
          "27000"
        ],
        "versions": [
          "2026 Freestyle",
          "2026 Champion",
          "2026 Racing"
        ]
      },
      {
        "name": "0802 Brushless Motor",
        "classes": [
          "0802"
        ],
        "kvs": [
          "28000",
          "25000",
          "22000"
        ],
        "versions": [
          "2026 Champion",
          "2026 Racing",
          "2026 Freestyle"
        ]
      },
      {
        "name": "0802SE",
        "classes": [
          "0802"
        ],
        "kvs": [
          "19500",
          "22000",
          "23000"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "0702 II",
        "classes": [
          "0702"
        ],
        "kvs": [
          "30000",
          "23000",
          "27000"
        ],
        "versions": []
      },
      {
        "name": "0802 2026",
        "classes": [
          "0802"
        ],
        "kvs": [
          "22000",
          "25000",
          "28000"
        ],
        "versions": []
      },
      {
        "name": "0702 2026",
        "classes": [
          "0702"
        ],
        "kvs": [
          "25000",
          "30000",
          "36000"
        ],
        "versions": []
      },
      {
        "name": "1105",
        "classes": [
          "1105"
        ],
        "kvs": [
          "5000",
          "6000"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "1106",
        "classes": [
          "1106"
        ],
        "kvs": [
          "3800",
          "4500"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "1404",
        "classes": [
          "1404"
        ],
        "kvs": [
          "3800",
          "4500"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "1505",
        "classes": [
          "1505"
        ],
        "kvs": [
          "3600",
          "4600"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "1606",
        "classes": [
          "1606"
        ],
        "kvs": [
          "1550",
          "2550"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "2004",
        "classes": [
          "2004"
        ],
        "kvs": [
          "1700",
          "3000"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "0702SE II Brushless Motor",
        "classes": [
          "0702"
        ],
        "kvs": [
          "23000",
          "27000"
        ],
        "versions": [
          "SE II"
        ]
      },
      {
        "name": "1805 Brushless Motor",
        "classes": [
          "1805"
        ],
        "kvs": [
          "2550",
          "1550"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "LAVA 1104 Brushless Motor",
        "classes": [
          "1104"
        ],
        "kvs": [
          "5500",
          "7200"
        ],
        "versions": [
          "LAVA"
        ]
      },
      {
        "name": "O603",
        "classes": [
          "0603"
        ],
        "kvs": [
          "16000",
          "19000"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "SNOW 2306",
        "classes": [
          "2306"
        ],
        "kvs": [
          "1860",
          "2500"
        ],
        "versions": []
      },
      {
        "name": "0702 SE",
        "classes": [
          "0702"
        ],
        "kvs": [
          "25000",
          "27000"
        ],
        "versions": []
      },
      {
        "name": "1204",
        "classes": [
          "1204"
        ],
        "kvs": [
          "5000"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "1506",
        "classes": [
          "1506"
        ],
        "kvs": [
          "3000"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "2204",
        "classes": [
          "2204"
        ],
        "kvs": [
          "2400"
        ],
        "versions": []
      },
      {
        "name": "1103 Brushless Motor (Aquila20)",
        "classes": [
          "1103"
        ],
        "kvs": [
          "10500"
        ],
        "versions": []
      }
    ]
  },
  "AXIS": {
    "name": "AXIS",
    "totalMotorsInCatalog": 255,
    "classes": [
      "1404",
      "2004",
      "2203",
      "2306",
      "2207",
      "3010",
      "2207.5",
      "2307",
      "2406",
      "2306.5"
    ],
    "models": [
      {
        "name": "AF236",
        "classes": [
          "2306"
        ],
        "kvs": [
          "1810",
          "1960",
          "2410",
          "2100"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "AF227",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1960",
          "2010",
          "2710",
          "2100"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "AE2207 V2 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1960",
          "1860",
          "2100",
          "1750"
        ],
        "versions": []
      },
      {
        "name": "C246 SHOOTING",
        "classes": [],
        "kvs": [
          "1650",
          "1850",
          "2050",
          "2650"
        ],
        "versions": []
      },
      {
        "name": "AF204",
        "classes": [
          "2004"
        ],
        "kvs": [
          "1810",
          "2910",
          "3710"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "AF223",
        "classes": [
          "2203"
        ],
        "kvs": [
          "1610",
          "2910",
          "3710"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "C204 2004 T-MOUNT",
        "classes": [
          "2004"
        ],
        "kvs": [
          "2650",
          "3500",
          "2910"
        ],
        "versions": []
      },
      {
        "name": "C206 2006",
        "classes": [
          "2006"
        ],
        "kvs": [
          "2750",
          "1960",
          "2500"
        ],
        "versions": []
      },
      {
        "name": "AF223 2203.5",
        "classes": [
          "2203.5"
        ],
        "kvs": [
          "1610",
          "2910",
          "3710"
        ],
        "versions": []
      },
      {
        "name": "C246",
        "classes": [],
        "kvs": [
          "2050",
          "1850",
          "1650"
        ],
        "versions": []
      },
      {
        "name": "AF310",
        "classes": [
          "3010"
        ],
        "kvs": [
          "1010",
          "1210"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "AF2207.5",
        "classes": [
          "2207.5"
        ],
        "kvs": [
          "1960",
          "1860"
        ],
        "versions": []
      },
      {
        "name": "BLACKBIRD V4 2307",
        "classes": [
          "2307"
        ],
        "kvs": [
          "1960",
          "2060"
        ],
        "versions": []
      },
      {
        "name": "X SUPAFLYFPV X SYNCFPV 2207.5",
        "classes": [
          "2207.5"
        ],
        "kvs": [
          "1860",
          "1960"
        ],
        "versions": []
      },
      {
        "name": "AF2406-X MODULAR",
        "classes": [
          "2406"
        ],
        "kvs": [
          "1860",
          "2080"
        ],
        "versions": []
      },
      {
        "name": "AE V2 2306.5",
        "classes": [
          "2306.5"
        ],
        "kvs": [
          "1960",
          "1860"
        ],
        "versions": []
      },
      {
        "name": "CNHL SPEEDYPIZZA DIAVOLA 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "2020",
          "1960"
        ],
        "versions": []
      },
      {
        "name": "AE 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1960",
          "1850"
        ],
        "versions": []
      },
      {
        "name": "AE2207 V2 ECONOMIC",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1960",
          "1860"
        ],
        "versions": []
      },
      {
        "name": "SPEEDYPIZZADRONES DIAVOLA 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "2020",
          "1960"
        ],
        "versions": []
      },
      {
        "name": "AE2505 AE",
        "classes": [
          "2505"
        ],
        "kvs": [
          "1750",
          "2050"
        ],
        "versions": []
      },
      {
        "name": "ECONOMIC AE2306.5 V2 ARCO FLOW BANDO",
        "classes": [
          "2306.5"
        ],
        "kvs": [
          "1860",
          "1960"
        ],
        "versions": []
      },
      {
        "name": "2207.5 BANDO",
        "classes": [
          "2207.5"
        ],
        "kvs": [
          "1860",
          "1960"
        ],
        "versions": []
      },
      {
        "name": "C204",
        "classes": [],
        "kvs": [
          "2650",
          "3500"
        ],
        "versions": []
      },
      {
        "name": "C206",
        "classes": [],
        "kvs": [
          "1960",
          "2750"
        ],
        "versions": []
      }
    ]
  },
  "GEPRC": {
    "name": "GEPRC",
    "totalMotorsInCatalog": 75,
    "classes": [
      "2107.5",
      "1102",
      "1103",
      "1105",
      "1106",
      "1202",
      "1204",
      "1206",
      "1404",
      "1408"
    ],
    "models": [
      {
        "name": "GR2207,5",
        "classes": [
          "2207.5"
        ],
        "kvs": [
          "1700",
          "1900",
          "1920",
          "2400",
          "2700",
          "2750"
        ],
        "versions": []
      },
      {
        "name": "GR1206",
        "classes": [
          "1206"
        ],
        "kvs": [
          "3600",
          "4500",
          "6000",
          "7500"
        ],
        "versions": []
      },
      {
        "name": "GR1507",
        "classes": [
          "1507"
        ],
        "kvs": [
          "2800",
          "3200",
          "3600",
          "4200"
        ],
        "versions": []
      },
      {
        "name": "GR1106",
        "classes": [
          "1106"
        ],
        "kvs": [
          "4500",
          "6000",
          "7500"
        ],
        "versions": []
      },
      {
        "name": "GR1202",
        "classes": [
          "1202"
        ],
        "kvs": [
          "6000",
          "8000",
          "10000"
        ],
        "versions": []
      },
      {
        "name": "GR1404",
        "classes": [
          "1404"
        ],
        "kvs": [
          "2750",
          "3850",
          "4500"
        ],
        "versions": []
      },
      {
        "name": "GR2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1900",
          "2400",
          "2700"
        ],
        "versions": []
      },
      {
        "name": "GR2306",
        "classes": [
          "2306"
        ],
        "kvs": [
          "1600",
          "2450",
          "2750"
        ],
        "versions": []
      },
      {
        "name": "GR2306,5",
        "classes": [
          "2306.5"
        ],
        "kvs": [
          "1350",
          "1850",
          "2450"
        ],
        "versions": []
      },
      {
        "name": "SPEEDX2 2107.5",
        "classes": [
          "2107.5"
        ],
        "kvs": [
          "1960",
          "2450"
        ],
        "versions": [
          "SPEEDX2"
        ]
      },
      {
        "name": "GR1102",
        "classes": [
          "1102"
        ],
        "kvs": [
          "9000",
          "10000"
        ],
        "versions": []
      },
      {
        "name": "GR1103",
        "classes": [
          "1103"
        ],
        "kvs": [
          "8000",
          "10000"
        ],
        "versions": []
      },
      {
        "name": "GR1105",
        "classes": [
          "1105"
        ],
        "kvs": [
          "5000",
          "6000"
        ],
        "versions": []
      },
      {
        "name": "GR1408",
        "classes": [
          "1408"
        ],
        "kvs": [
          "3750",
          "4100"
        ],
        "versions": []
      },
      {
        "name": "GR2004",
        "classes": [
          "2004"
        ],
        "kvs": [
          "1750",
          "2550"
        ],
        "versions": []
      },
      {
        "name": "SPEEDX2 2809",
        "classes": [
          "2809"
        ],
        "kvs": [
          "1280",
          "1450"
        ],
        "versions": []
      },
      {
        "name": "SPEEDX2 1404",
        "classes": [
          "1404"
        ],
        "kvs": [
          "3000",
          "3850"
        ],
        "versions": []
      },
      {
        "name": "EM3215",
        "classes": [
          "3215"
        ],
        "kvs": [
          "750",
          "900"
        ],
        "versions": []
      },
      {
        "name": "SPEEDX2 1202.5",
        "classes": [
          "1202.5"
        ],
        "kvs": [
          "15000",
          "10000"
        ],
        "versions": []
      },
      {
        "name": "SPEEDX2 1804",
        "classes": [
          "1804"
        ],
        "kvs": [
          "3450",
          "2450"
        ],
        "versions": []
      },
      {
        "name": "GR1204",
        "classes": [
          "1204"
        ],
        "kvs": [
          "5000"
        ],
        "versions": []
      },
      {
        "name": "GR2205",
        "classes": [
          "2205"
        ],
        "kvs": [
          "2300"
        ],
        "versions": []
      },
      {
        "name": "3500KV · 15.2 g",
        "classes": [],
        "kvs": [
          "3500"
        ],
        "versions": []
      },
      {
        "name": "5000KV · 6.5 g",
        "classes": [],
        "kvs": [
          "5000"
        ],
        "versions": []
      },
      {
        "name": "6000KV · 6.5 g",
        "classes": [],
        "kvs": [
          "6000"
        ],
        "versions": []
      }
    ]
  },
  "Foxeer": {
    "name": "Foxeer",
    "totalMotorsInCatalog": 18,
    "classes": [
      "2306.5",
      "2806.5",
      "1507",
      "2105.5",
      "1404",
      "2207.5",
      "3210",
      "2809"
    ],
    "models": [
      {
        "name": "DATURA 2105.5",
        "classes": [
          "2105.5"
        ],
        "kvs": [
          "2650",
          "3650",
          "2950",
          "1650"
        ],
        "versions": []
      },
      {
        "name": "DATURA 2306.5",
        "classes": [
          "2306.5"
        ],
        "kvs": [
          "2550",
          "1850",
          "2020"
        ],
        "versions": []
      },
      {
        "name": "DATURA 2806.5",
        "classes": [
          "2806.5"
        ],
        "kvs": [
          "1750",
          "1350"
        ],
        "versions": []
      },
      {
        "name": "DATURA 1507",
        "classes": [
          "1507"
        ],
        "kvs": [
          "4150",
          "2750"
        ],
        "versions": []
      },
      {
        "name": "DATURA 1404",
        "classes": [
          "1404"
        ],
        "kvs": [
          "3850",
          "4533"
        ],
        "versions": []
      },
      {
        "name": "DATURA 2207.5",
        "classes": [
          "2207.5"
        ],
        "kvs": [
          "1960",
          "2750"
        ],
        "versions": []
      },
      {
        "name": "BLACK HORNET 3210",
        "classes": [
          "3210"
        ],
        "kvs": [
          "930"
        ],
        "versions": []
      },
      {
        "name": "BLACK HORNET 2809 CINELIFTER",
        "classes": [
          "2809"
        ],
        "kvs": [
          "1300"
        ],
        "versions": []
      },
      {
        "name": "BLACK HORNET 2806.5 CINELIFTER",
        "classes": [
          "2806.5"
        ],
        "kvs": [
          "1350"
        ],
        "versions": []
      }
    ]
  },
  "Flywoo": {
    "name": "Flywoo",
    "totalMotorsInCatalog": 38,
    "classes": [
      "0802.4",
      "1103",
      "1202.5",
      "1204",
      "1404",
      "2207",
      "2305.5",
      "2306.5",
      "2806.5",
      "1303"
    ],
    "models": [
      {
        "name": "ROBO RB 1202,5",
        "classes": [
          "1202.5"
        ],
        "kvs": [
          "5500",
          "5800",
          "11500",
          "19500"
        ],
        "versions": []
      },
      {
        "name": "NIN 1404",
        "classes": [
          "1404"
        ],
        "kvs": [
          "2750",
          "3750",
          "4850"
        ],
        "versions": [
          "V2"
        ]
      },
      {
        "name": "NIN 2306,5",
        "classes": [
          "2306.5"
        ],
        "kvs": [
          "1350",
          "1750",
          "2450"
        ],
        "versions": [
          "V2"
        ]
      },
      {
        "name": "NIN 1103",
        "classes": [
          "1103"
        ],
        "kvs": [
          "7650",
          "10500"
        ],
        "versions": [
          "V2"
        ]
      },
      {
        "name": "ROBO RB 1204",
        "classes": [
          "1204"
        ],
        "kvs": [
          "5150",
          "8150"
        ],
        "versions": []
      },
      {
        "name": "ROBO RB 2207 SE",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1750",
          "2450"
        ],
        "versions": []
      },
      {
        "name": "NIN 2806,5",
        "classes": [
          "2806.5"
        ],
        "kvs": [
          "1350",
          "1750"
        ],
        "versions": [
          "V2"
        ]
      },
      {
        "name": "NIN2207.5",
        "classes": [
          "2207.5"
        ],
        "kvs": [
          "1860",
          "2450"
        ],
        "versions": []
      },
      {
        "name": "NIN 2104",
        "classes": [
          "2104"
        ],
        "kvs": [
          "1800",
          "3000"
        ],
        "versions": []
      },
      {
        "name": "NIN 2303.5",
        "classes": [
          "2303.5"
        ],
        "kvs": [
          "1750",
          "3000"
        ],
        "versions": []
      },
      {
        "name": "ROBO RB 0802,4",
        "classes": [
          "0802.4"
        ],
        "kvs": [
          "16500"
        ],
        "versions": []
      },
      {
        "name": "NIN 2305,5",
        "classes": [
          "2305.5"
        ],
        "kvs": [
          "1750"
        ],
        "versions": []
      },
      {
        "name": "1700KV · 31.5 g",
        "classes": [],
        "kvs": [
          "1700"
        ],
        "versions": []
      },
      {
        "name": "1750KV · 28 g",
        "classes": [],
        "kvs": [
          "1750"
        ],
        "versions": []
      },
      {
        "name": "1860KV · 31.5 g",
        "classes": [],
        "kvs": [
          "1860"
        ],
        "versions": []
      },
      {
        "name": "2450KV · 28 g",
        "classes": [],
        "kvs": [
          "2450"
        ],
        "versions": []
      },
      {
        "name": "2750KV · 31.5 g",
        "classes": [],
        "kvs": [
          "2750"
        ],
        "versions": []
      },
      {
        "name": "2750KV · 32 g",
        "classes": [],
        "kvs": [
          "2750"
        ],
        "versions": []
      },
      {
        "name": "ROBO 1303",
        "classes": [
          "1303"
        ],
        "kvs": [
          "6000"
        ],
        "versions": []
      },
      {
        "name": "ROBO 1002 23",
        "classes": [
          "1002"
        ],
        "kvs": [
          "500"
        ],
        "versions": []
      },
      {
        "name": "ROBO 1003",
        "classes": [
          "1003"
        ],
        "kvs": [
          "14800"
        ],
        "versions": []
      },
      {
        "name": "ROBO 1002 19",
        "classes": [
          "1002"
        ],
        "kvs": [
          "800"
        ],
        "versions": []
      },
      {
        "name": "ROBO 1202.5 GOLD/PURPLE",
        "classes": [
          "1202.5"
        ],
        "kvs": [
          "11500"
        ],
        "versions": []
      },
      {
        "name": "ROBO 1002 GOLD/PURPLE",
        "classes": [
          "1002"
        ],
        "kvs": [
          "23500"
        ],
        "versions": []
      }
    ]
  },
  "SpeedyBee": {
    "name": "SpeedyBee",
    "totalMotorsInCatalog": 9,
    "classes": [
      "2006",
      "1404",
      "2306.5",
      "2807",
      "1507"
    ],
    "models": [
      {
        "name": "2807",
        "classes": [
          "2807"
        ],
        "kvs": [
          "1050"
        ],
        "versions": []
      },
      {
        "name": "2006 BEE35",
        "classes": [
          "2006"
        ],
        "kvs": [
          "1950"
        ],
        "versions": []
      },
      {
        "name": "1404 BEE25",
        "classes": [
          "1404"
        ],
        "kvs": [
          "4600"
        ],
        "versions": []
      },
      {
        "name": "2306.5 MASTER5V2",
        "classes": [
          "2306.5"
        ],
        "kvs": [
          "1800"
        ],
        "versions": []
      },
      {
        "name": "1507 MASTER3X",
        "classes": [
          "1507"
        ],
        "kvs": [
          "3600"
        ],
        "versions": []
      },
      {
        "name": "1404 V2",
        "classes": [
          "1404"
        ],
        "kvs": [
          "4600"
        ],
        "versions": []
      },
      {
        "name": "BEESTORM 2306.5 PRO",
        "classes": [
          "2306.5"
        ],
        "kvs": [
          "1880"
        ],
        "versions": []
      }
    ]
  },
  "SunnySky": {
    "name": "SunnySky",
    "totalMotorsInCatalog": 327,
    "classes": [
      "2216",
      "4006",
      "2806",
      "3508",
      "2212",
      "4008",
      "4112",
      "4004",
      "4014",
      "2207"
    ],
    "models": [
      {
        "name": "X2820",
        "classes": [
          "2820"
        ],
        "kvs": [
          "1100",
          "920"
        ],
        "versions": []
      },
      {
        "name": "X2814",
        "classes": [
          "2814"
        ],
        "kvs": [
          "900",
          "1100"
        ],
        "versions": []
      },
      {
        "name": "38KV · 2330 g",
        "classes": [],
        "kvs": [
          "38"
        ],
        "versions": []
      },
      {
        "name": "75KV · 1677 g",
        "classes": [],
        "kvs": [
          "75"
        ],
        "versions": []
      },
      {
        "name": "76KV · 2330 g",
        "classes": [],
        "kvs": [
          "76"
        ],
        "versions": []
      },
      {
        "name": "80KV · 1065 g",
        "classes": [],
        "kvs": [
          "80"
        ],
        "versions": []
      },
      {
        "name": "90KV · 1660 g",
        "classes": [],
        "kvs": [
          "90"
        ],
        "versions": []
      },
      {
        "name": "90KV · 236 g",
        "classes": [],
        "kvs": [
          "90"
        ],
        "versions": []
      },
      {
        "name": "90KV · 364 g",
        "classes": [],
        "kvs": [
          "90"
        ],
        "versions": []
      },
      {
        "name": "90KV · 623 g",
        "classes": [],
        "kvs": [
          "90"
        ],
        "versions": []
      },
      {
        "name": "100KV · 875 g",
        "classes": [],
        "kvs": [
          "100"
        ],
        "versions": []
      },
      {
        "name": "100KV · 1065 g",
        "classes": [],
        "kvs": [
          "100"
        ],
        "versions": []
      },
      {
        "name": "100KV · 170 g",
        "classes": [],
        "kvs": [
          "100"
        ],
        "versions": []
      },
      {
        "name": "100KV · 260 g",
        "classes": [],
        "kvs": [
          "100"
        ],
        "versions": []
      },
      {
        "name": "100KV · 375 g",
        "classes": [],
        "kvs": [
          "100"
        ],
        "versions": []
      },
      {
        "name": "100KV · 430 g",
        "classes": [],
        "kvs": [
          "100"
        ],
        "versions": []
      },
      {
        "name": "100KV · 230 g",
        "classes": [],
        "kvs": [
          "100"
        ],
        "versions": []
      },
      {
        "name": "100KV · 247 g",
        "classes": [],
        "kvs": [
          "100"
        ],
        "versions": []
      },
      {
        "name": "100KV · 585 g",
        "classes": [],
        "kvs": [
          "100"
        ],
        "versions": []
      },
      {
        "name": "100KV · 635 g",
        "classes": [],
        "kvs": [
          "100"
        ],
        "versions": []
      },
      {
        "name": "100KV · 623 g",
        "classes": [],
        "kvs": [
          "100"
        ],
        "versions": []
      },
      {
        "name": "100KV · 775 g",
        "classes": [],
        "kvs": [
          "100"
        ],
        "versions": []
      },
      {
        "name": "100KV · 1038 g",
        "classes": [],
        "kvs": [
          "100"
        ],
        "versions": []
      },
      {
        "name": "110KV · 240 g",
        "classes": [],
        "kvs": [
          "110"
        ],
        "versions": []
      },
      {
        "name": "110KV · 356 g",
        "classes": [],
        "kvs": [
          "110"
        ],
        "versions": []
      }
    ]
  },
  "MEPS": {
    "name": "MEPS",
    "totalMotorsInCatalog": 6,
    "classes": [
      "2207",
      "2306"
    ],
    "models": [
      {
        "name": "NEON 2207 V2",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1950",
          "2050",
          "2550"
        ],
        "versions": []
      },
      {
        "name": "NEON 2306 V2",
        "classes": [
          "2306"
        ],
        "kvs": [
          "1950",
          "2050",
          "2550"
        ],
        "versions": []
      }
    ]
  },
  "Flashhobby": {
    "name": "Flashhobby",
    "totalMotorsInCatalog": 122,
    "classes": [
      "1106",
      "1204",
      "1207",
      "1306",
      "1404",
      "1408",
      "1506",
      "1806",
      "2207.5",
      "2225"
    ],
    "models": [
      {
        "name": "2004",
        "classes": [
          "2004"
        ],
        "kvs": [
          "3150",
          "2100",
          "1750",
          "1900"
        ],
        "versions": []
      },
      {
        "name": "A2306,5",
        "classes": [
          "2306.5"
        ],
        "kvs": [
          "1400",
          "1900",
          "2300",
          "2550"
        ],
        "versions": []
      },
      {
        "name": "D2822",
        "classes": [
          "2822"
        ],
        "kvs": [
          "1100",
          "1450",
          "1800",
          "2600"
        ],
        "versions": []
      },
      {
        "name": "D2826",
        "classes": [
          "2826"
        ],
        "kvs": [
          "930",
          "1000",
          "1400",
          "2200"
        ],
        "versions": []
      },
      {
        "name": "D2830",
        "classes": [
          "2830"
        ],
        "kvs": [
          "750",
          "850",
          "1000",
          "1300"
        ],
        "versions": []
      },
      {
        "name": "D2836",
        "classes": [
          "2836"
        ],
        "kvs": [
          "750",
          "880",
          "1120",
          "1500"
        ],
        "versions": []
      },
      {
        "name": "D3536",
        "classes": [
          "3536"
        ],
        "kvs": [
          "910",
          "1000",
          "1250",
          "1450"
        ],
        "versions": []
      },
      {
        "name": "ARTHUR 2306.5",
        "classes": [
          "2306.5"
        ],
        "kvs": [
          "1400",
          "1900",
          "2550",
          "2300"
        ],
        "versions": []
      },
      {
        "name": "FLASH K2004",
        "classes": [
          "2004"
        ],
        "kvs": [
          "1750",
          "1900",
          "2100",
          "3150"
        ],
        "versions": []
      },
      {
        "name": "A1207",
        "classes": [
          "1207"
        ],
        "kvs": [
          "5200",
          "6000",
          "7000"
        ],
        "versions": []
      },
      {
        "name": "BE1806-B",
        "classes": [
          "1806"
        ],
        "kvs": [
          "1400",
          "2300",
          "2700"
        ],
        "versions": []
      },
      {
        "name": "A2207,5",
        "classes": [
          "2207.5"
        ],
        "kvs": [
          "1900",
          "2450",
          "2750"
        ],
        "versions": []
      },
      {
        "name": "D2225",
        "classes": [
          "2225"
        ],
        "kvs": [
          "1350",
          "1600",
          "2000"
        ],
        "versions": []
      },
      {
        "name": "CF2822",
        "classes": [
          "2822"
        ],
        "kvs": [
          "1200",
          "1534",
          "2840"
        ],
        "versions": []
      },
      {
        "name": "H2830",
        "classes": [
          "2830"
        ],
        "kvs": [
          "3250",
          "3500",
          "4000"
        ],
        "versions": []
      },
      {
        "name": "D2836EVO",
        "classes": [
          "2836"
        ],
        "kvs": [
          "850",
          "1100",
          "1450"
        ],
        "versions": []
      },
      {
        "name": "D3530",
        "classes": [
          "3530"
        ],
        "kvs": [
          "1100",
          "1400",
          "1700"
        ],
        "versions": []
      },
      {
        "name": "D3542",
        "classes": [
          "3542"
        ],
        "kvs": [
          "1000",
          "1250",
          "1450"
        ],
        "versions": []
      },
      {
        "name": "D3548",
        "classes": [
          "3548"
        ],
        "kvs": [
          "790",
          "900",
          "1100"
        ],
        "versions": []
      },
      {
        "name": "ARTHUR 1207",
        "classes": [
          "1207"
        ],
        "kvs": [
          "5200",
          "6000",
          "7000"
        ],
        "versions": []
      },
      {
        "name": "FLASH K2306.5",
        "classes": [
          "2306.5"
        ],
        "kvs": [
          "1900",
          "2300",
          "2550"
        ],
        "versions": []
      },
      {
        "name": "BX1306",
        "classes": [
          "1306"
        ],
        "kvs": [
          "3100",
          "4000"
        ],
        "versions": []
      },
      {
        "name": "A1408",
        "classes": [
          "1408"
        ],
        "kvs": [
          "2800",
          "3650"
        ],
        "versions": []
      },
      {
        "name": "A1506",
        "classes": [
          "1506"
        ],
        "kvs": [
          "3100",
          "4300"
        ],
        "versions": []
      },
      {
        "name": "H2836",
        "classes": [
          "2836"
        ],
        "kvs": [
          "3500",
          "4000"
        ],
        "versions": []
      }
    ]
  },
  "Racerstar": {
    "name": "Racerstar",
    "totalMotorsInCatalog": 199,
    "classes": [
      "0603",
      "0605",
      "0703",
      "0705",
      "0802",
      "08028",
      "0804",
      "0806",
      "1103",
      "1104"
    ],
    "models": [
      {
        "name": "BR2212",
        "classes": [
          "2212"
        ],
        "kvs": [
          "920",
          "930",
          "980",
          "1000",
          "1400",
          "1800"
        ],
        "versions": []
      },
      {
        "name": "2845",
        "classes": [
          "2845"
        ],
        "kvs": [
          "2800",
          "3100",
          "3900",
          "3930",
          "4370",
          "5900"
        ],
        "versions": []
      },
      {
        "name": "BA2216",
        "classes": [
          "2216"
        ],
        "kvs": [
          "880",
          "1100",
          "1250",
          "1400",
          "1800"
        ],
        "versions": []
      },
      {
        "name": "3650",
        "classes": [
          "3650"
        ],
        "kvs": [
          "2300",
          "3900",
          "4300",
          "5900"
        ],
        "versions": []
      },
      {
        "name": "4068",
        "classes": [
          "4068"
        ],
        "kvs": [
          "1700",
          "1900",
          "2050",
          "2650"
        ],
        "versions": []
      },
      {
        "name": "BR2208",
        "classes": [
          "2208"
        ],
        "kvs": [
          "1100",
          "1400",
          "1800",
          "2600"
        ],
        "versions": []
      },
      {
        "name": "BR2211",
        "classes": [
          "2211"
        ],
        "kvs": [
          "1300",
          "1700",
          "2300",
          "3000"
        ],
        "versions": []
      },
      {
        "name": "F540",
        "classes": [],
        "kvs": [
          "3000",
          "3300",
          "3930",
          "4370"
        ],
        "versions": []
      },
      {
        "name": "2435",
        "classes": [
          "2435"
        ],
        "kvs": [
          "4500",
          "4800",
          "6100"
        ],
        "versions": []
      },
      {
        "name": "2440",
        "classes": [
          "2440"
        ],
        "kvs": [
          "4000",
          "4600",
          "6080"
        ],
        "versions": []
      },
      {
        "name": "2445",
        "classes": [
          "2445"
        ],
        "kvs": [
          "3000",
          "3600",
          "5400"
        ],
        "versions": []
      },
      {
        "name": "3660",
        "classes": [
          "3660"
        ],
        "kvs": [
          "2600",
          "3300",
          "3800"
        ],
        "versions": []
      },
      {
        "name": "3670",
        "classes": [
          "3670"
        ],
        "kvs": [
          "1900",
          "2150",
          "2650"
        ],
        "versions": []
      },
      {
        "name": "4076",
        "classes": [
          "4076"
        ],
        "kvs": [
          "1700",
          "2000",
          "2250"
        ],
        "versions": []
      },
      {
        "name": "BR0603B",
        "classes": [
          "0603"
        ],
        "kvs": [
          "16000",
          "20000",
          "14000"
        ],
        "versions": []
      },
      {
        "name": "BR0603C",
        "classes": [
          "0603"
        ],
        "kvs": [
          "17000",
          "19000",
          "22000"
        ],
        "versions": []
      },
      {
        "name": "BR0605B",
        "classes": [
          "0605"
        ],
        "kvs": [
          "12000",
          "14000",
          "16000"
        ],
        "versions": []
      },
      {
        "name": "BR0703C",
        "classes": [
          "0703"
        ],
        "kvs": [
          "17000",
          "19000",
          "22000"
        ],
        "versions": []
      },
      {
        "name": "BR0802",
        "classes": [
          "0802"
        ],
        "kvs": [
          "15000",
          "19500",
          "25000"
        ],
        "versions": []
      },
      {
        "name": "BR1104",
        "classes": [
          "1104"
        ],
        "kvs": [
          "4000",
          "6500",
          "7000"
        ],
        "versions": []
      },
      {
        "name": "BE1206",
        "classes": [
          "1206"
        ],
        "kvs": [
          "4500",
          "6000",
          "7500"
        ],
        "versions": []
      },
      {
        "name": "BR2205",
        "classes": [
          "2205"
        ],
        "kvs": [
          "2300",
          "2600",
          "2800"
        ],
        "versions": []
      },
      {
        "name": "BR2207S",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1600",
          "2200",
          "2500"
        ],
        "versions": []
      },
      {
        "name": "SIC 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1888",
          "2388",
          "2688"
        ],
        "versions": []
      },
      {
        "name": "BA2302",
        "classes": [
          "2302"
        ],
        "kvs": [
          "1500",
          "1650",
          "1800"
        ],
        "versions": []
      }
    ]
  },
  "HGLRC": {
    "name": "HGLRC",
    "totalMotorsInCatalog": 64,
    "classes": [
      "1804",
      "1002",
      "2306.5",
      "1103",
      "1106",
      "1202.5",
      "1303.5",
      "1404",
      "1407",
      "1408"
    ],
    "models": [
      {
        "name": "AEOLUS 2307,5",
        "classes": [
          "2307.5"
        ],
        "kvs": [
          "1750",
          "1900",
          "1950",
          "2550",
          "2600"
        ],
        "versions": []
      },
      {
        "name": "AEOLUS 2004",
        "classes": [
          "2004"
        ],
        "kvs": [
          "1800",
          "3000",
          "2600",
          "3600"
        ],
        "versions": []
      },
      {
        "name": "AEOLUS 1202,5",
        "classes": [
          "1202.5"
        ],
        "kvs": [
          "5600",
          "8000",
          "11600"
        ],
        "versions": []
      },
      {
        "name": "AEOLUS 1404",
        "classes": [
          "1404"
        ],
        "kvs": [
          "3600",
          "4800",
          "2800"
        ],
        "versions": []
      },
      {
        "name": "SPECTER 1404",
        "classes": [
          "1404"
        ],
        "kvs": [
          "2750",
          "4800",
          "5500"
        ],
        "versions": []
      },
      {
        "name": "SPECTER 1804",
        "classes": [
          "1804"
        ],
        "kvs": [
          "2450",
          "3500"
        ],
        "versions": [
          "SPECTER"
        ]
      },
      {
        "name": "FORWARD 1103",
        "classes": [
          "1103"
        ],
        "kvs": [
          "8000",
          "10000"
        ],
        "versions": []
      },
      {
        "name": "FD1106",
        "classes": [
          "1106"
        ],
        "kvs": [
          "2400",
          "3800"
        ],
        "versions": []
      },
      {
        "name": "AEOLUS 1303,5",
        "classes": [
          "1303.5"
        ],
        "kvs": [
          "2500",
          "4500"
        ],
        "versions": []
      },
      {
        "name": "FORWARD 1408",
        "classes": [
          "1408"
        ],
        "kvs": [
          "2400",
          "3600"
        ],
        "versions": []
      },
      {
        "name": "FORWARD 2306",
        "classes": [
          "2306"
        ],
        "kvs": [
          "1600",
          "2450"
        ],
        "versions": []
      },
      {
        "name": "AEOLUS 2306,5",
        "classes": [
          "2306.5"
        ],
        "kvs": [
          "1900",
          "2550"
        ],
        "versions": []
      },
      {
        "name": "AEOLUS 0802",
        "classes": [
          "0802"
        ],
        "kvs": [
          "25000",
          "17000"
        ],
        "versions": []
      },
      {
        "name": "AEOLUS 2105.5",
        "classes": [
          "2105.5"
        ],
        "kvs": [
          "3600",
          "2800"
        ],
        "versions": []
      },
      {
        "name": "AEOLUS 1102",
        "classes": [
          "1102"
        ],
        "kvs": [
          "18000",
          "10000"
        ],
        "versions": []
      },
      {
        "name": "AEOLUS 2207.5",
        "classes": [
          "2207.5"
        ],
        "kvs": [
          "1900",
          "1750"
        ],
        "versions": []
      },
      {
        "name": "FD2306",
        "classes": [
          "2306"
        ],
        "kvs": [
          "1600",
          "2450"
        ],
        "versions": []
      },
      {
        "name": "SPECTER 1002",
        "classes": [
          "1002"
        ],
        "kvs": [
          "21000"
        ],
        "versions": [
          "SPECTER"
        ]
      },
      {
        "name": "SPECTER 2306.5",
        "classes": [
          "2306.5"
        ],
        "kvs": [
          "1900"
        ],
        "versions": [
          "SPECTER"
        ]
      },
      {
        "name": "FLAME 1106",
        "classes": [
          "1106"
        ],
        "kvs": [
          "6000"
        ],
        "versions": []
      },
      {
        "name": "FLAME 1407",
        "classes": [
          "1407"
        ],
        "kvs": [
          "3600"
        ],
        "versions": []
      },
      {
        "name": "1250KV · 51 g",
        "classes": [],
        "kvs": [
          "1250"
        ],
        "versions": []
      },
      {
        "name": "2800KV · 10 g",
        "classes": [],
        "kvs": [
          "2800"
        ],
        "versions": []
      },
      {
        "name": "2800KV · 21 g",
        "classes": [],
        "kvs": [
          "2800"
        ],
        "versions": []
      },
      {
        "name": "3500KV · 22 g",
        "classes": [],
        "kvs": [
          "3500"
        ],
        "versions": []
      }
    ]
  },
  "Diatone": {
    "name": "Diatone",
    "totalMotorsInCatalog": 36,
    "classes": [
      "1103",
      "1105",
      "1206",
      "1404",
      "1408",
      "1606",
      "2004",
      "2203.5",
      "2207",
      "2207.5"
    ],
    "models": [
      {
        "name": "MAMBA TOKA 1206",
        "classes": [
          "1206"
        ],
        "kvs": [
          "2450",
          "3600",
          "4500",
          "6000",
          "7500"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "MAMBA TOKA 2203,5",
        "classes": [
          "2203.5"
        ],
        "kvs": [
          "1650",
          "2200",
          "2650",
          "3300",
          "4200"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "MAMBA 1404",
        "classes": [
          "1404"
        ],
        "kvs": [
          "3000",
          "3650",
          "4000",
          "5000"
        ],
        "versions": [
          "V2",
          "V1"
        ]
      },
      {
        "name": "MAMBA TOKA 2207,5",
        "classes": [
          "2207.5"
        ],
        "kvs": [
          "1700",
          "1800",
          "2450",
          "2650"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "MAMBA 1103",
        "classes": [
          "1103"
        ],
        "kvs": [
          "6500",
          "8500",
          "12000"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "MAMBA 1408",
        "classes": [
          "1408"
        ],
        "kvs": [
          "2900",
          "4100",
          "4000"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "MAMBA TOKA 2306,5",
        "classes": [
          "2306.5"
        ],
        "kvs": [
          "1650",
          "1770",
          "2770"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "MAMBA TOKA 1606",
        "classes": [
          "1606"
        ],
        "kvs": [
          "2700",
          "3750"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "MAMBA TOKA 2004",
        "classes": [
          "2004"
        ],
        "kvs": [
          "1700",
          "2900"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "MAMBA TOKA 1103",
        "classes": [
          "1103"
        ],
        "kvs": [
          "10000"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "MAMBA 1105",
        "classes": [
          "1105"
        ],
        "kvs": [
          "5500"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "MAMBA 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "2650"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "MAMBA TOKA 2808",
        "classes": [
          "2808"
        ],
        "kvs": [
          "1100"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "MAMBA 2808 ROMA F7",
        "classes": [
          "2808"
        ],
        "kvs": [
          "1100"
        ],
        "versions": []
      }
    ]
  },
  "XNOVA": {
    "name": "XNOVA",
    "totalMotorsInCatalog": 234,
    "classes": [
      "1204",
      "1404",
      "1406",
      "1407",
      "1804",
      "1806",
      "2204",
      "2205",
      "2206",
      "2207"
    ],
    "models": [
      {
        "name": "B3675",
        "classes": [
          "3675"
        ],
        "kvs": [
          "535",
          "640",
          "700",
          "800",
          "945",
          "1030"
        ],
        "versions": []
      },
      {
        "name": "B3665",
        "classes": [
          "3665"
        ],
        "kvs": [
          "890",
          "1000",
          "1190",
          "1340",
          "1420",
          "1640"
        ],
        "versions": []
      },
      {
        "name": "B3660",
        "classes": [
          "3660"
        ],
        "kvs": [
          "930",
          "1160",
          "1360",
          "1480",
          "1650",
          "1840"
        ],
        "versions": []
      },
      {
        "name": "B3650",
        "classes": [
          "3650"
        ],
        "kvs": [
          "1650",
          "1920",
          "2200",
          "2620",
          "3300",
          "3800"
        ],
        "versions": []
      },
      {
        "name": "B3640",
        "classes": [
          "3640"
        ],
        "kvs": [
          "2200",
          "2780",
          "3250",
          "3700",
          "4850",
          "5500"
        ],
        "versions": []
      },
      {
        "name": "HARD LINE 2208",
        "classes": [
          "2208"
        ],
        "kvs": [
          "1500",
          "1700",
          "1900",
          "2700",
          "2300",
          "2000"
        ],
        "versions": []
      },
      {
        "name": "LIGHTNIGHT 2208 V2N",
        "classes": [
          "2208"
        ],
        "kvs": [
          "1500",
          "1700",
          "1900",
          "2300",
          "2500",
          "2700"
        ],
        "versions": []
      },
      {
        "name": "T1804",
        "classes": [
          "1804"
        ],
        "kvs": [
          "1900",
          "3500",
          "3100",
          "2800",
          "2400"
        ],
        "versions": []
      },
      {
        "name": "FREESTYLE HARD LINE 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1650",
          "1800",
          "2150",
          "2450",
          "2600"
        ],
        "versions": []
      },
      {
        "name": "LITE RACING LINE 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1950",
          "2200",
          "1700",
          "1800",
          "2700"
        ],
        "versions": []
      },
      {
        "name": "LIGHTNING 2208 V2N 4",
        "classes": [
          "2208"
        ],
        "kvs": [
          "1500",
          "1900",
          "2000",
          "2300",
          "2500"
        ],
        "versions": []
      },
      {
        "name": "2207 HARD LINE V2",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1800",
          "1900",
          "2150",
          "1650",
          "2450"
        ],
        "versions": []
      },
      {
        "name": "4025",
        "classes": [
          "4025"
        ],
        "kvs": [
          "560",
          "670",
          "830",
          "1120"
        ],
        "versions": []
      },
      {
        "name": "4030",
        "classes": [
          "4030"
        ],
        "kvs": [
          "350",
          "470",
          "560",
          "710"
        ],
        "versions": []
      },
      {
        "name": "4035",
        "classes": [
          "4035"
        ],
        "kvs": [
          "300",
          "400",
          "480",
          "600"
        ],
        "versions": []
      },
      {
        "name": "4530",
        "classes": [
          "4530"
        ],
        "kvs": [
          "450",
          "480",
          "500",
          "525"
        ],
        "versions": []
      },
      {
        "name": "4808",
        "classes": [
          "4808"
        ],
        "kvs": [
          "380",
          "480",
          "620",
          "700"
        ],
        "versions": [
          "V1"
        ]
      },
      {
        "name": "RACING 1407",
        "classes": [
          "1407"
        ],
        "kvs": [
          "2800",
          "3100",
          "3500",
          "4000"
        ],
        "versions": []
      },
      {
        "name": "LIGHNIGHT RACING 1804",
        "classes": [
          "1804"
        ],
        "kvs": [
          "2400",
          "2800",
          "3100",
          "3500"
        ],
        "versions": []
      },
      {
        "name": "FREESTYLE SMOOTH LINE 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1700",
          "2400",
          "2750",
          "1850"
        ],
        "versions": []
      },
      {
        "name": "LIGHTNIGHT 4525",
        "classes": [
          "4525"
        ],
        "kvs": [
          "385",
          "530",
          "560",
          "600"
        ],
        "versions": []
      },
      {
        "name": "TAREQ",
        "classes": [],
        "kvs": [
          "400",
          "450",
          "530",
          "535"
        ],
        "versions": []
      },
      {
        "name": "3215 CINELIFTER LINE",
        "classes": [
          "3215"
        ],
        "kvs": [
          "1050",
          "700",
          "800",
          "430"
        ],
        "versions": []
      },
      {
        "name": "3220 CINELIFTER LINE",
        "classes": [
          "3220"
        ],
        "kvs": [
          "490",
          "700",
          "450",
          "980"
        ],
        "versions": []
      },
      {
        "name": "4812",
        "classes": [
          "4812"
        ],
        "kvs": [
          "320",
          "400",
          "470"
        ],
        "versions": []
      }
    ]
  },
  "Lumenier": {
    "name": "Lumenier",
    "totalMotorsInCatalog": 62,
    "classes": [
      "1306",
      "1806",
      "2204",
      "2205",
      "2306",
      "2206",
      "2207",
      "2208",
      "2216",
      "2407"
    ],
    "models": [
      {
        "name": "2306 JOHNNYFPV",
        "classes": [
          "2306"
        ],
        "kvs": [
          "1750",
          "2250",
          "2550"
        ],
        "versions": []
      },
      {
        "name": "2306 JOHNNYFPV V2",
        "classes": [
          "2306"
        ],
        "kvs": [
          "1750",
          "2250",
          "2550"
        ],
        "versions": []
      },
      {
        "name": "ZIP 2407",
        "classes": [
          "2407"
        ],
        "kvs": [
          "1700",
          "2250",
          "2550"
        ],
        "versions": []
      },
      {
        "name": "ZIP V2 2807 BLACKOUT",
        "classes": [
          "2807"
        ],
        "kvs": [
          "1700",
          "1300",
          "1950"
        ],
        "versions": []
      },
      {
        "name": "2307 JOHNNYFPV V3 PRO",
        "classes": [
          "2307"
        ],
        "kvs": [
          "1750",
          "1950",
          "2550"
        ],
        "versions": []
      },
      {
        "name": "ZIP V2 2305",
        "classes": [
          "2305"
        ],
        "kvs": [
          "2400",
          "1800",
          "3200"
        ],
        "versions": []
      },
      {
        "name": "ZIP 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1750",
          "2450"
        ],
        "versions": []
      },
      {
        "name": "JB2407-7 BARDWELL",
        "classes": [
          "2407"
        ],
        "kvs": [
          "2500",
          "1750"
        ],
        "versions": []
      },
      {
        "name": "2807 JOHNNYFPV V3 PRO",
        "classes": [
          "2807"
        ],
        "kvs": [
          "1350",
          "1750"
        ],
        "versions": []
      },
      {
        "name": "ZIP V2 3115",
        "classes": [
          "3115"
        ],
        "kvs": [
          "900",
          "1050"
        ],
        "versions": []
      },
      {
        "name": "ZIP V2 2812",
        "classes": [
          "2812"
        ],
        "kvs": [
          "1150",
          "1300"
        ],
        "versions": []
      },
      {
        "name": "ZIP V2 1404",
        "classes": [
          "1404"
        ],
        "kvs": [
          "2750",
          "4600"
        ],
        "versions": []
      },
      {
        "name": "ZIP V2 2006",
        "classes": [
          "2006"
        ],
        "kvs": [
          "2450",
          "1800"
        ],
        "versions": []
      },
      {
        "name": "2207 JOHNNYFPV V2",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1750",
          "2400"
        ],
        "versions": []
      },
      {
        "name": "RX1306-9",
        "classes": [
          "1306"
        ],
        "kvs": [
          "3100"
        ],
        "versions": []
      },
      {
        "name": "RX1306-7",
        "classes": [
          "1306"
        ],
        "kvs": [
          "4000"
        ],
        "versions": []
      },
      {
        "name": "FXC1806-14",
        "classes": [
          "1806"
        ],
        "kvs": [
          "2300"
        ],
        "versions": []
      },
      {
        "name": "RX1806-13",
        "classes": [
          "1806"
        ],
        "kvs": [
          "2500"
        ],
        "versions": []
      },
      {
        "name": "RX2204-14",
        "classes": [
          "2204"
        ],
        "kvs": [
          "2300"
        ],
        "versions": []
      },
      {
        "name": "RB2204-13 SKITZO",
        "classes": [
          "2204"
        ],
        "kvs": [
          "2500"
        ],
        "versions": []
      },
      {
        "name": "RB2205C-12 SKITZO",
        "classes": [
          "2205"
        ],
        "kvs": [
          "2400"
        ],
        "versions": []
      },
      {
        "name": "RX2206-13",
        "classes": [
          "2206"
        ],
        "kvs": [
          "2000"
        ],
        "versions": []
      },
      {
        "name": "RX2206-11",
        "classes": [
          "2206"
        ],
        "kvs": [
          "2350"
        ],
        "versions": []
      },
      {
        "name": "MB2206-9 FREYBOTT",
        "classes": [
          "2206"
        ],
        "kvs": [
          "2450"
        ],
        "versions": []
      },
      {
        "name": "2207 CHIEF RACING",
        "classes": [
          "2207"
        ],
        "kvs": [
          "2150"
        ],
        "versions": []
      }
    ]
  },
  "TBS": {
    "name": "TBS",
    "totalMotorsInCatalog": 18,
    "classes": [
      "0603",
      "1505",
      "2207",
      "2814",
      "2306",
      "3220"
    ],
    "models": [
      {
        "name": "GRINDER 2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "1850",
          "2500",
          "1750"
        ],
        "versions": [
          "V3"
        ]
      },
      {
        "name": "MICRO 0603",
        "classes": [
          "0603"
        ],
        "kvs": [
          "12000",
          "15000"
        ],
        "versions": []
      },
      {
        "name": "PODRACER 1505",
        "classes": [
          "1505"
        ],
        "kvs": [
          "3600"
        ],
        "versions": []
      },
      {
        "name": "CAIPRINHA 2",
        "classes": [],
        "kvs": [
          "1030"
        ],
        "versions": []
      },
      {
        "name": "1465KV · 29 g",
        "classes": [],
        "kvs": [
          "1465"
        ],
        "versions": []
      },
      {
        "name": "2350KV · 30 g",
        "classes": [],
        "kvs": [
          "2350"
        ],
        "versions": []
      },
      {
        "name": "2375KV · 31 g",
        "classes": [],
        "kvs": [
          "2375"
        ],
        "versions": []
      },
      {
        "name": "2400KV · 31 g",
        "classes": [],
        "kvs": [
          "2400"
        ],
        "versions": []
      },
      {
        "name": "2750KV · 31 g",
        "classes": [],
        "kvs": [
          "2750"
        ],
        "versions": []
      },
      {
        "name": "3600KV · 8.5 g",
        "classes": [],
        "kvs": [
          "3600"
        ],
        "versions": []
      },
      {
        "name": "7600KV · 8.5 g",
        "classes": [],
        "kvs": [
          "7600"
        ],
        "versions": []
      },
      {
        "name": "CAIPIRINHA 2 2814",
        "classes": [
          "2814"
        ],
        "kvs": [
          "1030"
        ],
        "versions": []
      },
      {
        "name": "MR STEELE SILK V6 2306",
        "classes": [
          "2306"
        ],
        "kvs": [
          "1750"
        ],
        "versions": []
      },
      {
        "name": "CHUPITO EX2207",
        "classes": [
          "2207"
        ],
        "kvs": [
          "2000"
        ],
        "versions": []
      },
      {
        "name": "SUPERNOVA 3220",
        "classes": [
          "3220"
        ],
        "kvs": [
          "1000"
        ],
        "versions": []
      }
    ]
  },
  "Happymodel": {
    "name": "Happymodel",
    "totalMotorsInCatalog": 53,
    "classes": [
      "0702",
      "0603",
      "0802",
      "1102",
      "1102.5",
      "1103",
      "1105",
      "1202.5",
      "1203",
      "1204"
    ],
    "models": [
      {
        "name": "EX1102",
        "classes": [
          "1102"
        ],
        "kvs": [
          "8500",
          "9000",
          "10000",
          "13500",
          "19000"
        ],
        "versions": []
      },
      {
        "name": "EX 1103",
        "classes": [
          "1103"
        ],
        "kvs": [
          "11000",
          "7000",
          "6000",
          "8000",
          "12000"
        ],
        "versions": []
      },
      {
        "name": "EX1103S",
        "classes": [
          "1103"
        ],
        "kvs": [
          "6000",
          "7000",
          "8000",
          "12000"
        ],
        "versions": []
      },
      {
        "name": "EX1202,5",
        "classes": [
          "1202.5"
        ],
        "kvs": [
          "6400",
          "8000",
          "11000",
          "11500"
        ],
        "versions": []
      },
      {
        "name": "EX1404",
        "classes": [
          "1404"
        ],
        "kvs": [
          "2750",
          "3500",
          "4800",
          "2700"
        ],
        "versions": []
      },
      {
        "name": "EX0802",
        "classes": [
          "0802"
        ],
        "kvs": [
          "14000",
          "19000",
          "25000"
        ],
        "versions": []
      },
      {
        "name": "SE 0702",
        "classes": [
          "0702"
        ],
        "kvs": [
          "26000",
          "23000"
        ],
        "versions": [
          "SE"
        ]
      },
      {
        "name": "SE0603",
        "classes": [
          "0603"
        ],
        "kvs": [
          "16000",
          "19000"
        ],
        "versions": []
      },
      {
        "name": "EX1203",
        "classes": [
          "1203"
        ],
        "kvs": [
          "5500",
          "6200"
        ],
        "versions": []
      },
      {
        "name": "EX1204",
        "classes": [
          "1204"
        ],
        "kvs": [
          "5000",
          "6500"
        ],
        "versions": []
      },
      {
        "name": "RS1102",
        "classes": [
          "1102"
        ],
        "kvs": [
          "13500",
          "10000"
        ],
        "versions": []
      },
      {
        "name": "SE 0802",
        "classes": [
          "0802"
        ],
        "kvs": [
          "19000",
          "16000"
        ],
        "versions": []
      },
      {
        "name": "SE0702 WHOOPS",
        "classes": [
          "0702"
        ],
        "kvs": [
          "28000",
          "26000"
        ],
        "versions": []
      },
      {
        "name": "SE0703",
        "classes": [
          "0703"
        ],
        "kvs": [
          "15000",
          "19000"
        ],
        "versions": []
      },
      {
        "name": "EX1102,5",
        "classes": [
          "1102.5"
        ],
        "kvs": [
          "11500"
        ],
        "versions": []
      },
      {
        "name": "EX1105",
        "classes": [
          "1105"
        ],
        "kvs": [
          "5200"
        ],
        "versions": []
      },
      {
        "name": "EX 1002",
        "classes": [
          "1002"
        ],
        "kvs": [
          "20000"
        ],
        "versions": []
      },
      {
        "name": "RS 0802",
        "classes": [
          "0802"
        ],
        "kvs": [
          "20000"
        ],
        "versions": []
      },
      {
        "name": "SE0702 0702",
        "classes": [
          "0702"
        ],
        "kvs": [
          "28000"
        ],
        "versions": []
      },
      {
        "name": "EX1103 BASELINE",
        "classes": [
          "1103"
        ],
        "kvs": [
          "11000"
        ],
        "versions": []
      },
      {
        "name": "RS0802 0802",
        "classes": [
          "0802"
        ],
        "kvs": [
          "25000"
        ],
        "versions": []
      },
      {
        "name": "EX1002 1002",
        "classes": [
          "1002"
        ],
        "kvs": [
          "20000"
        ],
        "versions": []
      },
      {
        "name": "SE0802 16000",
        "classes": [
          "0802"
        ],
        "kvs": [
          "19000"
        ],
        "versions": []
      },
      {
        "name": "SE0803",
        "classes": [
          "0803"
        ],
        "kvs": [
          "16000"
        ],
        "versions": []
      },
      {
        "name": "EX1002 RS1002 MOBLITE7 HD",
        "classes": [
          "1002"
        ],
        "kvs": [
          "20000"
        ],
        "versions": []
      }
    ]
  }
};

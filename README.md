# FixMyDrone.fr 🛸🔧

**FixMyDrone** est la plateforme communautaire et forum d'entraide de référence dédiée aux pilotes de drones FPV (Freestyle, Racing, Cinelifter, Long Range, Tiny Whoop).

---

## 🌟 Fonctionnalités Implémentées

1. **Vue Éclatée & Anatomie Interactive d'un Quad FPV :**
   - Schéma technique vectoriel interactif représentant un châssis True-X avec ses 4 moteurs, ses hélices, sa caméra FPV, sa stack FC/ESC, son récepteur radio et son GPS.
   - Hotspots cliquables avec focus direct sur chaque composant et ses statistiques de dépannage.

2. **Tous les Principaux Composants Étalés sur la Page :**
   - Chaque composant correspond à une catégorie précise :
     - 🚀 **Moteurs Brushless** (T-Motor, BrotherHobby, Xing, RCINPOWER...)
     - ⚡ **ESC 4-en-1 & Stack** (SpeedyBee, Foxeer, T-Motor, Holybro...)
     - 🧠 **Contrôleur de Vol FC** (Betaflight, gyro BMI/ICM, target firmware...)
     - 🎥 **Système Vidéo FPV & VTX** (DJI O3 / O4, Walksnail Avatar, HDZero, Analogique...)
     - 📡 **Récepteur Radio RX** (ExpressLRS 2.4GHz/868MHz, TBS Crossfire...)
     - 🦴 **Châssis & Frame Carbone** (ImpulseRC Apex, JeNo, Nazgul...)
     - 🌀 **Hélices Props** (Gemfan, HQProp, Ethix...)
     - 🔋 **Batteries LiPo 4S/6S** (CNHL, Tattu R-Line, GNB...)
     - 🧭 **GPS Rescue & Buzzer** (Matek M10, ViFly Finder 2...)
   - Affichage pour chaque organe des pannes fréquentes, causes probables, solutions express et taux de succès.

3. **Catalogue Interconnecté (Base Multi-Motors & Pièces FPV) :**
   - Fiches produits détaillées.
   - Pannes répertoriées associées directement à chaque modèle.
   - Interconnexion en direct : possibilité pour n'importe quel pilote d'ajouter un fix ou un retour d'expérience d'atelier rattaché à la référence matérielle.

4. **Système de Login Sécurisé :**
   - Espace pilote avec gestion des callsigns, hangars de drones et badges d'expertise.
   - Sessions sécurisées avec support démo en 1 clic.

5. **Rattachement au Domaine `fixmydrone.fr` :**
   - Métadonnées complètes Next.js (`metadataBase: https://fixmydrone.fr`, OpenGraph, Twitter Cards, Sitemap XML, Robots.txt).
   - Script d'activation locale en 1 clic : `setup-domain-fixmydrone.bat`.

---

## 🚀 Démarrage Rapide

### 1. Lancer le serveur de développement
```bash
npm run dev -- -p 3001
```
Le site est disponible immédiatement sur : [http://localhost:3001](http://localhost:3001)

### 2. Accéder via `http://fixmydrone.fr:3001` en local
Pour que Windows redirige `fixmydrone.fr` sur votre machine de test :
1. Faites un clic droit sur `setup-domain-fixmydrone.bat` > **"Exécuter en tant qu'administrateur"**.
2. Ouvrez votre navigateur sur : **[http://fixmydrone.fr:3001](http://fixmydrone.fr:3001)**

---

## 🌐 Déploiement en Production sur Internet

Pour rattacher votre vrai nom de domaine `fixmydrone.fr` chez votre registrar (OVH, Gandi, Cloudflare...) :
- **Enregistrement A** : `@` ➔ `76.76.21.21` (ou l'IP de votre serveur VPS)
- **Enregistrement CNAME** : `www` ➔ `cname.vercel-dns.com` (ou votre hôte)

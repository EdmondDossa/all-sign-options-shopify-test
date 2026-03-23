# Dossier De Refonte

## Refonte De La Configuration Classique ASO

### Version
1.0

### Date
16 mars 2026

### Projet
All Signs Options Shopify

### Auteur
Codex

---

# Sommaire

1. Introduction
2. Contexte
3. Problématique actuelle
4. Vision produit cible
5. Principes UX et UI
6. Architecture fonctionnelle cible
7. Organisation de la navigation
8. Modèle de données cible
9. Règles de gestion par famille d'options
10. Structure des settings
11. Gestion des managers globaux
12. Migration depuis l'existant
13. Règles techniques d'implémentation
14. Plan de mise en oeuvre
15. Risques et points d'attention
16. Conclusion

---

# 1. Introduction

Ce document formalise la refonte de l'expérience de configuration des configurations classiques dans ASO.

L'objectif n'est pas de modifier le fonctionnement de NCPC pour les produits `neon` et `channel`, mais de construire une nouvelle expérience plus simple, plus modulaire et plus cohérente pour les configurations classiques.

La finalité produit est claire :

- permettre à un marchand de créer une configuration rapidement
- lui donner une interface plus lisible
- réduire les sous-routes complexes et les écrans techniques dispersés
- conserver les données métier classiques là où cela reste nécessaire
- réorganiser l'interface selon le principe déjà validé côté NCPC

---

# 2. Contexte

Historiquement, les configurations classiques de l'application reposent sur une structure fragmentée :

- plusieurs sous-routes profondes
- une logique partiellement centrée sur `materials`
- des écrans qui demandent trop de manipulation pour un besoin simple
- des settings répartis sur trop de sous-écrans

En parallèle, les interfaces NCPC ont introduit un principe plus propre :

- une sidebar stable
- de grandes sections
- des pages complètes par famille fonctionnelle
- des cartes de réglages regroupées dans une même page

Cette logique d'interface doit être réutilisée pour les configurations classiques, sans casser les données déjà exploitées dans le runtime actuel.

---

# 3. Problématique actuelle

Les principaux problèmes identifiés sont les suivants :

## 3.1 Complexité excessive

Le marchand doit encore passer par trop d'écrans pour configurer un produit simple.

## 3.2 Logique métier peu lisible

Certaines familles d'options sont encore influencées par des structures historiques qui ne correspondent plus à la manière dont le marchand pense son produit.

## 3.3 Trop de sous-routes

Des opérations simples d'ajout ou d'édition ouvrent encore des routes dédiées alors qu'un formulaire inline ou un écran unique suffit.

## 3.4 Cohérence visuelle incomplète

Les interfaces `manage-*`, les écrans de configuration et les settings ne partagent pas encore tous le même langage visuel.

## 3.5 Mélange entre données globales et données de configuration

Certaines entités doivent être locales à une configuration, d'autres doivent vivre dans un manager global. Cette distinction doit être clarifiée écran par écran.

---

# 4. Vision produit cible

Le marchand doit pouvoir suivre le parcours suivant :

1. créer une configuration
2. entrer dans une interface unique de configuration
3. parcourir les sections depuis une sidebar claire
4. activer et configurer les options utiles
5. définir les exclusions quand elles sont nécessaires
6. ajuster les settings depuis des pages structurées par grandes sections
7. sauvegarder sans devoir comprendre l'architecture technique interne

Le système cible est donc :

- modulaire
- orienté usage marchand
- cohérent avec NCPC dans le design
- compatible avec le runtime classique existant

---

# 5. Principes UX et UI

## 5.1 Principe général

Chaque grande famille fonctionnelle doit avoir :

- une entrée claire dans la sidebar
- un écran principal unique
- une liste lisible
- un formulaire d'ajout et d'édition clair
- des actions homogènes

## 5.2 Principe des settings

Les settings doivent suivre exactement la philosophie NCPC :

- une entrée `General`, `Customizer Setup`, `Language & Images`, `Theme & Color`, `Sort Options`
- une seule page par grande section
- plusieurs cartes de réglage sur la même page
- un menu de section interne à droite
- plus de navigation secondaire par sous-routes dans l'usage normal

## 5.3 Principe des formulaires

Les formulaires doivent :

- éviter les champs redondants
- ne pas exposer les `default` quand ils sont déjà gérés dans le tableau
- éviter les éléments déjà gérés dans une autre section
- afficher les exclusions avec des labels lisibles
- garder les vrais comportements métier existants

## 5.4 Principe des tableaux

Les tableaux doivent rester simples :

- `Preview` si utile
- `Label`
- `Price` si pertinent
- `Default` quand applicable
- `Actions`

Les colonnes techniques inutiles doivent être supprimées.

---

# 6. Architecture fonctionnelle cible

La configuration classique refondue repose sur trois grands ensembles :

## 6.1 Required Options

Familles d'options essentielles au configurateur :

- Sizes
- Pricing
- Fonts
- Colors
- Fixing Methods
- Shapes
- Borders

## 6.2 Additional Options

Familles additionnelles liées à l'offre marchande :

- Materials
- Cliparts
- Additional Inputs
- autres composants si nécessaire

## 6.3 Settings

Pilotage global du comportement de la configuration :

- General
- Customizer Setup
- Language & Images
- Theme & Color
- Sort Options

---

# 7. Organisation de la navigation

## 7.1 Sidebar principale

La sidebar principale doit suivre cette structure :

### Core Setup
- Sizes
- Pricing
- Fonts
- Colors

### Sign Extras
- Materials
- Cliparts
- Fixing Methods
- Shapes
- Borders
- Additional Inputs

### Settings
- General
- Customizer Setup
- Language & Images
- Theme & Color
- Sort Options

## 7.2 Pages settings

Chaque entrée de settings doit ouvrir une page unique :

### General
Une seule page contenant plusieurs cartes :
- Product
- Mode
- Output
- Upload Design
- Quantity Limits
- Mobile Option
- Request Quote
- Simple Options

### Customizer Setup
Une seule page contenant plusieurs cartes :
- Config Options
- Customizer Options
- Sign Part
- Text
- Image

### Language & Images
Une seule page contenant plusieurs cartes liées aux labels, visualizer, images système, uploads et autres médias textuels.

### Theme & Color
Une seule page contenant plusieurs cartes liées au thème, aux couleurs et au CSS custom.

### Sort Options
Une page dédiée à l'ordre des blocs et options.

---

# 8. Modèle de données cible

## 8.1 Principe général

Les données doivent rester lisibles et regroupées par famille d'usage.

Une structure cible lisible est :

```ts
configuration.data = {
  requiredOptions: {
    sizes: {...},
    pricing: {...},
    fonts: {...},
    colors: {...},
    fixingMethods: {...},
    shapes: {...},
    borders: {...},
  },
  additionalOptions: {
    materials: {...},
    cliparts: {...},
    additionalInputs: {...},
  },
  settings: {
    generals: {...},
    customizerSign: {...},
    languageText: {...},
    themes: {...},
    sortOptions: {...},
  },
}
```

## 8.2 Required Options

Chaque famille suit le même principe :

```ts
{
  label: string,
  description?: string,
  items: []
}
```

## 8.3 Fonts

Les polices d'une configuration doivent être stockées sous forme d'objets simples :

```ts
{
  id: string,
  managedFontId: number,
  label: string,
  isDefault: boolean
}
```

## 8.4 Pricing

Le pricing ne doit pas dupliquer les tailles.

Le besoin actuel porte surtout sur le `custom pricing`.

Exemple :

```ts
{
  label: string,
  customPricing: {
    type: "unit" | "range",
    rangePricingPerUnit: boolean,
    shippingMethod: "per-surface" | "per-weight",
    divisorVolumetric: number,
    unit: {
      surface: number,
      basePrice: number,
      charPrice: number,
    },
    range: Array<{
      surface: number,
      basePrice: number,
      charPrice: number,
      shippingPrice: number,
      widthModifier?: number,
      heightModifier?: number,
      length?: number,
    }>
  }
}
```

## 8.5 Materials et exclusions

Le choix produit retenu actuellement est de centraliser les exclusions au niveau du `material` concerné.

Exemple :

```ts
{
  id: string,
  label: string,
  description: string,
  previewImg: string,
  popupImg: string,
  additionalPrice: number,
  isDefault: boolean,
  excludeSizes: string[],
  excludeColors: string[],
  excludeFixingMethods: string[],
  excludeShapes: string[],
  excludeBorders: string[],
}
```

Ce point est important :

- `materials` regroupe les exclusions en une fois
- les autres écrans n'ont plus à exposer `excludeMaterials` dans leur formulaire

---

# 9. Règles de gestion par famille d'options

## 9.1 Sizes

- gestion par liste + formulaire
- settings dédiés pour `Thickness` et `Custom Size`
- le `default` est géré dans le tableau
- les exclusions par material sont pilotées depuis `materials`

## 9.2 Pricing

- liste de profils de pricing
- formulaire de `customPricing`
- support `unit pricing` et `range pricing`
- support du shipping par surface ou par poids
- libellés explicites avec suffixes d'unité

## 9.3 Fonts

- liste des polices accessibles dans la config
- ajout possible depuis la librairie, Google Fonts ou upload
- stockage simplifié par objet
- pas de gestion directe de sélection de fonts dans le bloc `Text` des settings

## 9.4 Colors

- formulaire basé sur les champs classiques
- pas de `default` dans le formulaire
- `default` géré depuis le tableau
- `custom colors` affichés seulement si activés

## 9.5 Fixing Methods

- ajout depuis les éléments managés existants
- possibilité de créer un fixing method local à la config si besoin
- preview visible
- `default` géré dans le tableau
- exclusions lisibles

## 9.6 Shapes

- même logique modulaire que fixing methods
- preview visible
- `default` géré dans le tableau
- exclusions compatibles avec la logique métier retenue

## 9.7 Borders
n- même principe modulaire
- exclusion sur les shapes incompatibles
- `default` géré dans le tableau

## 9.8 Materials

- manager central des exclusions
- `default` géré dans le tableau
- preview et popup image
- prix additionnel
- lecture métier claire pour le marchand

## 9.9 Cliparts

Deux usages distincts doivent coexister :

- rattacher un groupe existant à la config
- créer un nouveau groupe depuis la config

Quand un groupe ou des cliparts sont créés ici :

- ils doivent être persistés dans `Manage cliparts`
- puis attachés à la configuration

Le flux de création doit supporter :

- upload direct
- sélection via API
- ajout de plusieurs cliparts

---

# 10. Structure des settings

## 10.1 Règle structurante

Les settings doivent garder les données classiques, mais adopter le shell NCPC.

Cela implique :

- mêmes grandes sections que dans la sidebar
- pages natives par section
- cartes de réglage sur une même page
- menu de section à droite
- aucune redirection automatique vers des sous-routes dans le flux normal

## 10.2 General

`General` doit conserver les vrais comportements legacy, par exemple :

- types de champs inchangés
- toggles inchangés
- multi-select inchangé quand il existait déjà
- logique de validation inchangée

Le travail autorisé porte sur :

- le shell
- le regroupement visuel
- la lisibilité

Pas sur la dénaturation du comportement.

## 10.3 Customizer Setup

`Customizer Setup` doit désormais tout afficher dans la page :

- Config Options
- Customizer Options
- Sign Part
- Text
- Image

Mais avec une règle claire :

- ne pas réafficher `fonts` dans `Text`
- ne pas réafficher la sélection des cliparts dans `Image`

Les éléments déjà traités ailleurs doivent être retirés de ces cartes.

---

# 11. Gestion des managers globaux

Les managers globaux doivent suivre le même langage visuel que les écrans de configuration.

## 11.1 Attendu

- même style de boutons
- mêmes actions de tableau
- moins de routes `edit` inutiles
- formulaires inline quand c'est suffisant
- boutons `Back` explicites quand on vient d'une config

## 11.2 Cas déjà concernés

- Manage cliparts
- Manage fonts

## 11.3 Règle de contexte

Quand un marchand arrive depuis une configuration :

- le manager global peut être utilisé
- mais il doit pouvoir revenir facilement à l'écran d'origine
- sans perdre le contexte

---

# 12. Migration depuis l'existant

## 12.1 Principe

La migration doit être progressive.

Il ne faut pas casser le runtime classique existant pendant la transition.

## 12.2 Stratégie

1. poser les nouveaux écrans
2. relire les données classiques existantes
3. sauvegarder dans les nouveaux blocs quand cela est possible
4. garder une compatibilité temporaire avec les anciens formats si nécessaire
5. supprimer les anciens chemins uniquement quand les nouveaux écrans sont stabilisés

## 12.3 Règle essentielle

Quand un champ legacy existe déjà et qu'il est utilisé en production :

- son sens doit être conservé
- son type de saisie doit être conservé
- sa logique de sauvegarde doit être respectée

---

# 13. Règles techniques d'implémentation

## 13.1 Ce qui doit être privilégié

- pages natives par section
- listes + formulaires inline
- actions de tableau homogènes
- composants réutilisables pour les formulaires
- storage compatible avec l'existant

## 13.2 Ce qu'il faut éviter

- recréer des routes `edit` inutiles
- multiplier les redirections automatiques
- transformer des champs multi-select en texte libre
- déplacer des responsabilités métier sans l'assumer dans le modèle de données
- dupliquer dans `Text` ou `Image` des blocs déjà gérés ailleurs

## 13.3 Principe de compatibilité

Le shell peut changer.

Le comportement métier ne doit pas être réinventé sans validation.

---

# 14. Plan de mise en oeuvre

## Phase 1

Stabiliser les familles déjà sorties :

- Sizes
- Pricing
- Fonts
- Colors
- Fixing Methods
- Shapes
- Borders
- Materials
- Cliparts

## Phase 2

Finaliser les settings :

- General
- Customizer Setup
- Language & Images
- Theme & Color
- Sort Options

## Phase 3

Harmoniser les managers globaux :

- Manage fonts
- Manage cliparts
- autres managers critiques

## Phase 4

Nettoyer les anciennes routes devenues inutiles :

- routes `edit` remplacées par des formulaires inline
- redirects intermédiaires
- écrans legacy non utilisés dans le flux principal

## Phase 5

Valider :

- cohérence visuelle
- cohérence de stockage
- cohérence de navigation
- absence de rupture métier

---

# 15. Risques et points d'attention

## 15.1 Risque de dénaturation métier

Le principal risque est de simplifier l'interface au point de casser le sens des champs classiques.

## 15.2 Risque de double source de vérité

Si une même logique est sauvegardée à plusieurs endroits sans règle claire, la cohérence devient fragile.

## 15.3 Risque de duplication fonctionnelle

Si `fonts` réapparaît dans `Text` alors qu'il existe déjà une section `Fonts`, l'utilisateur se retrouve avec deux endroits pour faire la même chose.

Même risque pour les cliparts dans `Image`.

## 15.4 Risque de dette technique dans les routes

Tant que les anciennes routes restent présentes, il faut clairement distinguer :

- ce qui est encore utile pour compatibilité
- ce qui est désormais hors du flux principal

---

# 16. Conclusion

La refonte visée n'est pas une simple remise en forme graphique.

C'est une restructuration produit de la configuration classique, avec quatre objectifs simultanés :

- simplifier la vie du marchand
- adopter le principe d'interface validé côté NCPC
- conserver la logique métier classique quand elle reste nécessaire
- préparer une base plus stable pour l'évolution future du configurateur

La ligne directrice à conserver est la suivante :

- même philosophie d'interface que NCPC
- mêmes données métier classiques tant qu'elles sont encore nécessaires
- moins de routes inutiles
- moins de redondance
- plus de lisibilité


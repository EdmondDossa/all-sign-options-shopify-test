# Fonctionnalité de Sélection de Qualité PDF (DPI)

## Vue d'ensemble

Cette fonctionnalité permet aux utilisateurs de configurer la qualité des PDF générés automatiquement lors de la création de commandes. Le système génère toujours un PDF en plus du format sélectionné (PNG, JPEG, SVG, etc.), et maintenant la qualité de ce PDF peut être configurée.

## Fonctionnalités

### 1. Interface Utilisateur
- **Page de configuration** : `app/routes/app.configuration.$configId.settings.general.output.tsx`
- **Champ de sélection** : "Qualité PDF (DPI)" avec options :
  - 72 DPI (Écran)
  - 150 DPI (Impression basique)
  - 300 DPI (Impression qualité) - **Valeur par défaut**
  - 600 DPI (Impression haute qualité)
- **Note d'aide** : "Astuce : plus le DPI est élevé, plus le fichier PDF peut être lourd ; 300 DPI est recommandé pour l'impression."

### 2. Validation et Stockage
- **Validation Zod** : Seules les valeurs 72, 150, 300, 600 sont acceptées
- **Valeur par défaut** : 300 DPI (remplace l'ancien défaut ≈ 72 DPI)
- **Persistance** : La valeur est sauvegardée dans la configuration JSON

### 3. Génération PDF
- **Fichier** : `app/webhooks/OrderCreateWebhook.ts`
- **Récupération de la configuration** : Le DPI configuré est récupéré depuis la configuration de la session
- **Calcul des dimensions** : Utilisation de la formule `width_mm = (imagePixelWidth / pdfDpi) * 25.4`
- **Qualité JPEG adaptative** :
  - 72 DPI : qualité 0.85
  - 150 DPI : qualité 0.9
  - 300 DPI : qualité 0.95
  - 600 DPI : qualité 1.0

## Fonctions Utilitaires

### `pixelsToMm(px: number, dpi: number): number`
Convertit les pixels en millimètres selon le DPI spécifié.

### `calculateImagePlacementWithDpi(...)`
Calcule le placement d'une image dans un PDF en tenant compte du DPI.

### `getJpegQualityFromDpi(dpi: 72 | 150 | 300 | 600): number`
Retourne la qualité JPEG appropriée pour le DPI donné.

## Types

### `ImagePlacement`
```typescript
type ImagePlacement = { 
  x: number; 
  y: number; 
  width: number; 
  height: number; 
};
```

### `OutputType` (mis à jour)
```typescript
export interface OutputType{
    zipName: boolean;
    calculateOutput: boolean;
    pdfDpi?: 72 | 150 | 300 | 600;
}
```

## Flux de Données

1. **Configuration** : L'utilisateur sélectionne le DPI dans l'interface
2. **Sauvegarde** : La valeur est validée et sauvegardée via l'action Remix
3. **Récupération** : Lors de la création de commande, le webhook récupère la configuration
4. **Génération** : Le PDF est généré avec les dimensions et la qualité appropriées

## Compatibilité

- **Rétrocompatibilité** : Les configurations existantes utilisent 300 DPI par défaut
- **Formats supportés** : Tous les formats existants (PNG, JPEG, SVG, etc.) continuent de fonctionner
- **Génération automatique** : Le PDF est toujours généré en plus du format sélectionné

## Tests

Des tests unitaires sont inclus pour vérifier :
- Conversion pixels vers millimètres
- Calcul de la qualité JPEG
- Placement d'image avec DPI

## Migration

Aucune migration de base de données n'est nécessaire car les configurations sont stockées en JSON. Les nouvelles configurations incluront automatiquement le champ `pdfDpi: 300`.

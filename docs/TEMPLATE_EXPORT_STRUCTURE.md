# Structure d'export des templates - Analyse

## Ce qui est réellement nécessaire pour l'import

D'après l'analyse du code d'import (`app/routes/app.templates.main.import.tsx`), voici ce qui est **vraiment utilisé** :

### 1. Fonts (`configData.fonts`)
```json
{
  "fonts": [
    {
      "label": "Font Name",
      "url": "https://...",
      "isGoogleFont": true/false
    }
  ]
}
```
**Nécessaire** : ✅ OUI - Les fonts sont créées lors de l'import

### 2. Materials (`configData.data.materials`)
```json
{
  "data": {
    "materials": [
      // Tableau des matériaux utilisés par les templates
    ]
  }
}
```
**Nécessaire** : ✅ OUI - Fusionnés avec la configuration existante

### 3. Templates (`configData.templates`)
```json
{
  "templates": [
    {
      "id": 123,  // Supprimé lors de l'import
      "name": "Template Name",
      "basePrice": 29.99,
      "prevImg": "url",
      "realImg": "url",
      "enabledAddToCart": false,
      "recaps": {},
      "data": {
        // Données complètes du template (templateData, cartData)
      }
    }
  ]
}
```
**Nécessaire** : ✅ OUI - C'est le cœur de l'export

### 4. Uploads Prefix (`configData.uploadsPrefix`)
```json
{
  "uploadsPrefix": "https://source-shop.myshopify.com"
}
```
**Nécessaire** : ✅ OUI - Pour remplacer les URLs lors de l'import

## Ce qui est exporté mais INUTILE

### ❌ Toute la configuration complète
- `configuration.id` - Pas utilisé (on utilise la config de destination)
- `configuration.name` - Pas utilisé
- `configuration.data.settings` - Pas utilisé (on garde les settings de la config de destination)
- `configuration.data.customizerSign` - Pas utilisé
- `configuration.data.themeColors` - Pas utilisé
- `configuration.product` - Pas utilisé (produits Shopify liés)

### ⚠️ Problème actuel

L'export exporte **TOUTE la configuration**, mais l'import :
1. Utilise une configuration **EXISTANTE** de la boutique de destination
2. Ne fusionne que les **materials** et **fonts**
3. Crée uniquement les **templates**

## Structure optimale pour l'export

```json
{
  "version": "1.0",
  "exportedAt": "2025-01-20T10:30:00.000Z",
  "uploadsPrefix": "https://source-shop.myshopify.com",
  "fonts": [
    // Fonts utilisées par les templates
  ],
  "materials": [
    // Materials utilisés par les templates (extraits de configuration.data.materials)
  ],
  "templates": [
    // Templates à exporter
  ]
}
```

## Recommandations

### Option 1 : Optimiser l'export (recommandé)
- Exporter seulement ce qui est nécessaire
- Réduire la taille du fichier JSON
- Faciliter l'import dans d'autres boutiques/configurations

### Option 2 : Garder la compatibilité
- Garder la structure actuelle pour la compatibilité
- Mais documenter ce qui est utilisé

### Option 3 : Version hybride
- Exporter une version "minimale" par défaut
- Avec option "Export complet" pour les cas spéciaux

## Impact sur l'import

L'import fonctionne actuellement car il **ignore** les données inutiles, mais :
- ⚠️ Fichiers JSON plus volumineux que nécessaire
- ⚠️ Risque de confusion sur ce qui est nécessaire
- ⚠️ Données sensibles (comme product IDs) exportées inutilement


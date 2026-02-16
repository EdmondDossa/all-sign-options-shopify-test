# Data_Template_JSON – Import des templates

Ce dossier contient des fichiers JSON qui représentent **une configuration par fichier** (type de signe : Plastic signs, Decals, Vinyl lettering, etc.). Chaque JSON contient les attributs de la configuration (nom, réglages, matériaux, options) mais **pas** le lien vers une session ou un produit (géré à l’import).

## Mapping fichier → type (nom dans le JSON)

| Fichier         | Nom dans le JSON (type)   | Nb templates |
|-----------------|----------------------------|--------------|
| data.json       | Plastic signs for template | 10           |
| data (1).json   | Plastic signs              | 0            |
| data (2).json   | Decals                     | 2            |
| data (3).json   | Vinyl lettering            | 2            |
| data (4).json   | Aluminium signs            | 7            |
| data (5).json   | Name Badges                | 0            |
| data (6).json   | Roll-up banners            | 2            |
| data (7).json   | Posters                    | 0            |

**Total : 23 templates** dans 5 fichiers.

## Structure d’un fichier JSON

Chaque fichier a la forme :

- **id** : identifiant (ignoré à l’import)
- **name** : nom de la configuration (ex. "Plastic signs")
- **description**, **icon**, **popupImg**
- **sessionId** : ignoré à l’import (on utilise la session courante)
- **data** : objet de configuration (settings, materials, product, fonts, etc.)
- **templates** : tableau à la racine (0 à N templates : name, prevImg, basePrice, data, recaps, etc.)

Les produits (`data.product` ou équivalent) ne sont **pas** importés (autre boutique) ; la configuration est créée sans produit associé. Vous pourrez lier les produits depuis l’app après l’import.

## Importer les templates dans le projet

```bash
npm run import:data-templates
```

Sans variable d’environnement, le script utilise la **première session** en base (pratique en dev). Pour cibler une session précise :

**Linux / macOS (bash) :**
```bash
SESSION_ID=votre-session-id node scripts/import-data-templates.js
```

**Windows (PowerShell) :**
```powershell
$env:SESSION_ID = "votre-session-id"; node scripts/import-data-templates.js
```

Le script :

1. Crée ou met à jour une **Configuration** par fichier (même nom = mise à jour).
2. Importe **tous les templates** du tableau `templates` du JSON. Si le tableau est vide, crée un template placeholder. Réexécuter le script peut créer des doublons.

Les templates importés apparaissent dans la template list de l’application, liés à la bonne configuration.

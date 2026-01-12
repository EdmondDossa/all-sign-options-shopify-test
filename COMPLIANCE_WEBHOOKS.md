# Webhooks de Conformité - All Signs Customizer

## Vue d'ensemble

Cette application implémente les webhooks de conformité obligatoires requis par Shopify pour toutes les applications distribuées via l'App Store. Ces webhooks permettent de gérer les demandes de données et de suppression conformément aux réglementations de protection des données (RGPD, CPRA, etc.).

## Webhooks Implémentés

### 1. `customers/data_request`
- **Route**: `/webhooks/customers/data_request`
- **Objectif**: Permet aux clients de demander leurs données
- **Action**: Collecte et retourne toutes les données liées à un client spécifique

### 2. `customers/redact`
- **Route**: `/webhooks/customers/redact`
- **Objectif**: Supprime/anonymise les données d'un client
- **Action**: Supprime les fichiers et enregistrements liés au client

### 3. `shop/redact`
- **Route**: `/webhooks/shop/redact`
- **Objectif**: Supprime toutes les données d'une boutique
- **Action**: Supprime complètement toutes les données de la boutique

## Configuration

### Variables d'environnement

Aucune variable d'environnement spéciale n'est requise pour les webhooks de conformité. Les webhooks utilisent la validation standard des requêtes HTTP.

### Configuration dans shopify.app.toml

```toml
[webhooks]
api_version = "2025-04"

  [[webhooks.subscriptions]]
  topics = [ "app/uninstalled" ]
  uri = "/webhooks"

  [[webhooks.subscriptions]]
  topics = [ "orders/create" ]
  uri = "/webhooks"

  # Webhooks de conformité obligatoires pour l'App Store
  [[webhooks.subscriptions]]
  compliance_topics = ["customers/data_request", "customers/redact", "shop/redact"]
  uri = "/webhooks"
```

## Sécurité

- **Validation des requêtes**: Vérification que les requêtes sont POST avec Content-Type: application/json
- **Gestion des erreurs**: Retourne les codes d'erreur appropriés (400, 405, 500)
- **Logging**: Tous les webhooks sont loggés pour audit

## Données Gérées

### Données Client
- Designs créés par le client (`Design`)
- Templates personnalisés
- Configurations utilisées
- Fichiers uploadés

### Données Boutique
- Session de la boutique (`Session`)
- Configurations (`Configuration`)
- Templates (`Template`)
- Polices (`Font`)
- Groupes de cliparts (`ClipartsGroup`)
- Catégories (`Category`)
- Paramètres (`Setting`)
- Uploads (`Upload`)
- Tous les fichiers associés

## Fonctionnalités

### customers/data_request
- Collecte toutes les données liées à un client
- Inclut les designs, configurations, templates, polices, cliparts
- Retourne un résumé des données collectées
- Log pour audit

### customers/redact
- Supprime les fichiers physiques des designs
- Supprime les enregistrements de base de données
- Anonymise les noms de templates et configurations
- Gère les erreurs gracieusement

### shop/redact
- Suppression complète de toutes les données
- Suppression des fichiers et dossiers
- Nettoyage de la base de données
- Gestion des erreurs et logging

## Structure des Fichiers

```
app/routes/
├── webhooks.tsx                           # Webhook principal (app/uninstalled, orders/create)
├── webhooks.customers.data_request.tsx    # Webhook de demande de données client
├── webhooks.customers.redact.tsx          # Webhook de suppression de données client
└── webhooks.shop.redact.tsx               # Webhook de suppression de données boutique
```

## Base de Données

### Tables Principales
- `Session`: Informations de session Shopify
- `Design`: Designs créés par les clients
- `Configuration`: Configurations de personnalisation
- `Template`: Templates de produits
- `Font`: Polices disponibles
- `ClipartsGroup`: Groupes de cliparts
- `Clipart`: Cliparts individuels
- `Category`: Catégories de templates
- `Setting`: Paramètres de la boutique
- `Upload`: Fichiers uploadés

### Relations
- Toutes les tables sont liées à `Session` via `sessionId`
- Les designs sont liés aux clients via `customerIp` et `orderId`
- Les templates appartiennent à des configurations et catégories

## Tests

Pour tester les webhooks localement :

```bash
# Utiliser Shopify CLI pour déclencher les webhooks
shopify app generate webhook
```

## Conformité

Cette implémentation respecte :
- Les exigences de Shopify pour l'App Store
- Les réglementations RGPD et CPRA
- Les bonnes pratiques de sécurité
- Les délais de traitement (30 jours maximum)

## Monitoring

- Tous les webhooks sont loggés avec timestamp
- Les erreurs sont capturées et loggées
- Les résultats de suppression sont trackés
- Audit trail complet pour conformité

## Gestion des Fichiers

### Types de Fichiers Gérés
- Images de designs (PNG, JPG, SVG)
- Fichiers de templates (images de prévisualisation)
- Fichiers de configuration (icônes, images popup)
- Fichiers de cliparts
- Fichiers uploadés par les clients

### Emplacements des Fichiers
- `public/uploads/{shop_domain}/`: Fichiers uploadés
- `public/designs/{shop_domain}/`: Designs générés
- `public/aso-cliparts/`: Cliparts par défaut
- `public/upload_designs_files/`: Fichiers de designs uploadés

## Notes Importantes

1. **Délai de traitement**: 30 jours maximum pour traiter les demandes
2. **Rétention légale**: Certaines données peuvent être conservées si légalement requis
3. **Sauvegarde**: Assurez-vous d'avoir des sauvegardes avant la suppression
4. **Test**: Testez toujours les webhooks avant la production
5. **Fichiers**: Les fichiers sont supprimés physiquement du système de fichiers
6. **Base de données**: Les enregistrements sont supprimés de la base de données

## Support

Pour toute question sur l'implémentation des webhooks de conformité, consultez :
- [Documentation Shopify - Privacy Law Compliance](https://shopify.dev/docs/apps/build/compliance/privacy-law-compliance)
- [Guide des webhooks Shopify](https://shopify.dev/docs/apps/webhooks)

## Exemple de Réponse

### customers/data_request
```json
{
  "message": "Customer data request processed successfully",
  "data_request_id": "12345",
  "customer_id": "67890",
  "shop_domain": "example.myshopify.com",
  "data_summary": {
    "designs_count": 5,
    "configurations_count": 2,
    "templates_count": 10,
    "fonts_count": 15,
    "cliparts_groups_count": 8,
    "uploads_count": 3,
    "has_settings": true
  }
}
```

### customers/redact
```json
{
  "message": "Customer redaction processed successfully",
  "customer_id": "67890",
  "shop_domain": "example.myshopify.com",
  "redaction_results": {
    "designs_redacted": 5,
    "files_deleted": 5,
    "errors": []
  }
}
```

### shop/redact
```json
{
  "message": "Shop redaction processed successfully",
  "shop_domain": "example.myshopify.com",
  "redaction_results": {
    "session_deleted": true,
    "designs_deleted": 50,
    "templates_deleted": 100,
    "configurations_deleted": 10,
    "fonts_deleted": 20,
    "cliparts_groups_deleted": 15,
    "categories_deleted": 5,
    "settings_deleted": 1,
    "uploads_deleted": 2,
    "files_deleted": 200,
    "directories_deleted": 3,
    "errors": []
  }
}
```

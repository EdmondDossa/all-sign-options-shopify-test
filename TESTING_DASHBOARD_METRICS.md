# Guide de Test - Métriques du Dashboard

Ce guide explique comment tester les nouvelles métriques du dashboard (`/app`).

## 📋 Métriques implémentées

1. **Products Created** : Nombre de produits Shopify créés par l'application
2. **Orders** : Nombre de commandes contenant au moins un produit ASO
3. **Conversion Rate** : Taux de conversion (Orders / Products Created) * 100

## 🧪 Méthodes de Test

### Méthode 1 : Test en développement local (Recommandé)

1. **Lancer l'application en développement** :
   ```bash
   npm run dev
   ```

2. **Accéder au dashboard** :
   - Ouvrez votre navigateur
   - Accédez à l'URL fournie par Shopify CLI (généralement affichée dans le terminal)
   - Naviguez vers `/app`

3. **Vérifier les métriques** :
   - Les valeurs doivent s'afficher au lieu de "0", "0%", "0"
   - Vérifiez que les nombres sont cohérents avec vos données Shopify

4. **Vérifier les logs serveur** :
   - Dans le terminal où `npm run dev` est lancé
   - Vous devriez voir des logs comme :
     ```
     📊 Calculating dashboard metrics...
     ✅ Products Created: X
     ✅ Orders Count: Y
     ✅ Conversion Rate: Z%
     ```

### Méthode 2 : Vérification manuelle dans Shopify Admin

1. **Vérifier les produits créés** :
   - Allez dans Shopify Admin → Produits
   - Recherchez les produits avec le type `all-signs-options-product`
   - Ou recherchez les produits avec le metafield `allSignsOptionsAsoAso.asoConfigurationId`
   - Le nombre doit correspondre à "Products Created"

2. **Vérifier les commandes** :
   - Allez dans Shopify Admin → Commandes
   - Ouvrez chaque commande et vérifiez si elle contient un produit avec le metafield ASO
   - Comptez manuellement le nombre de commandes
   - Le nombre doit correspondre à "Orders"

3. **Calculer le taux de conversion** :
   - Formule : `(Orders / Products Created) * 100`
   - Exemple : Si vous avez 10 produits et 3 commandes → 30%

### Méthode 3 : Test avec la console du navigateur

1. **Ouvrir la console développeur** :
   - Appuyez sur `F12` ou `Ctrl+Shift+I` (Windows/Linux)
   - Ou `Cmd+Option+I` (Mac)

2. **Vérifier les requêtes réseau** :
   - Onglet "Network" / "Réseau"
   - Rechargez la page `/app`
   - Cherchez les requêtes GraphQL vers Shopify
   - Vérifiez que les requêtes sont bien exécutées

3. **Vérifier les erreurs** :
   - Onglet "Console"
   - Vérifiez qu'il n'y a pas d'erreurs JavaScript
   - Les erreurs GraphQL apparaîtront ici si elles existent

### Méthode 4 : Test avec des données de test

Pour tester avec des données réelles, vous pouvez :

1. **Créer un produit de test** :
   - Utilisez l'application pour créer une configuration
   - Ajoutez un design personnalisé au panier
   - Cela créera automatiquement un produit avec le metafield ASO

2. **Créer une commande de test** :
   - Passez une commande avec le produit créé
   - Le webhook `ORDERS_CREATE` sera déclenché automatiquement

## 🔍 Vérifications à effectuer

### ✅ Vérifications de base

- [ ] Les métriques s'affichent correctement (pas de valeurs en dur "0")
- [ ] Les nombres sont cohérents avec les données Shopify
- [ ] Le taux de conversion est entre 0% et 100%
- [ ] Pas d'erreurs dans la console du navigateur
- [ ] Pas d'erreurs dans les logs serveur

### ✅ Vérifications avancées

- [ ] Les produits avec `productType: "all-signs-options-product"` sont comptés
- [ ] Les produits avec le metafield `allSignsOptionsAsoAso.asoConfigurationId` sont comptés
- [ ] Les produits sans metafield ou avec valeur "0" ne sont PAS comptés
- [ ] Les commandes avec au moins un produit ASO sont comptées
- [ ] Les commandes sans produit ASO ne sont PAS comptées
- [ ] La pagination fonctionne correctement (pour les boutiques avec beaucoup de produits/commandes)

## 🐛 Dépannage

### Problème : Les métriques affichent toujours 0

**Solutions** :
1. Vérifiez que vous avez des produits créés par l'application
2. Vérifiez que les produits ont le metafield `allSignsOptionsAsoAso.asoConfigurationId`
3. Vérifiez les logs serveur pour voir les erreurs éventuelles
4. Vérifiez que l'authentification Shopify fonctionne correctement

### Problème : Erreur GraphQL

**Solutions** :
1. Vérifiez que l'API Shopify est accessible
2. Vérifiez que les permissions de l'app incluent `read_products` et `read_orders`
3. Vérifiez les logs serveur pour voir l'erreur exacte

### Problème : Le taux de conversion est incorrect

**Solutions** :
1. Vérifiez que le calcul est : `(Orders / Products Created) * 100`
2. Vérifiez que `productsCreated > 0` avant de calculer
3. Vérifiez que les nombres de produits et commandes sont corrects

## 📝 Logs de débogage

Les logs suivants sont ajoutés pour faciliter le débogage :

```
📊 Calculating dashboard metrics...
✅ Products Created: X
✅ Orders Count: Y
✅ Conversion Rate: Z%
```

Si vous voyez une erreur :
```
❌ Error calculating dashboard metrics [détails de l'erreur]
```

## 🚀 Prochaines étapes

Une fois les tests validés, vous pouvez :

1. Supprimer les logs de débogage si nécessaire
2. Ajouter un cache pour améliorer les performances
3. Ajouter des filtres par période (semaine, mois, etc.)
4. Ajouter des graphiques pour visualiser l'évolution


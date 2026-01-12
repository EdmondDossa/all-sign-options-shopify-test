# Guide - Créer des Données de Test pour les Métriques

Ce guide explique comment créer des produits et des commandes pour tester les métriques du dashboard.

## 📊 Métriques à tester

1. **Products Created** : Produits créés par l'application avec le metafield `allSignsOptionsAsoAso.asoConfigurationId`
2. **Orders** : Commandes contenant au moins un produit ASO
3. **Conversion Rate** : (Orders / Products Created) * 100

## 🎯 Méthode 1 : Créer des données via l'interface (Recommandé)

### Étape 1 : Créer une configuration

1. **Accédez à la page de création de configuration** :
   - Dans le dashboard, cliquez sur "Create configuration"
   - Ou allez directement à `/app/configuration/create`

2. **Remplissez le formulaire** :
   - Nom de la configuration (ex: "Neon Sign Customiser")
   - Description
   - Icône et image popup
   - Type de matériau (simple, advance, etc.)

3. **Sauvegardez la configuration**

### Étape 2 : Associer un produit Shopify à la configuration

1. **Dans la page de configuration** :
   - Allez dans les paramètres de la configuration
   - Section "Products"
   - Sélectionnez un produit existant de votre boutique Shopify
   - Ou créez un nouveau produit dans Shopify Admin

2. **Le produit sera automatiquement associé** :
   - Le metafield `allSignsOptionsAsoAso.asoConfigurationId` sera ajouté au produit
   - Le `productType` sera défini à `all-signs-options-product`

### Étape 3 : Créer un produit via le customizer (Méthode automatique)

Quand un client utilise le customizer et ajoute un design au panier :

1. **Accédez à votre boutique en ligne** :
   - Allez sur la page produit avec le customizer
   - Créez un design personnalisé
   - Ajoutez-le au panier

2. **Un produit sera automatiquement créé** :
   - Le produit aura le metafield `allSignsOptionsAsoAso.asoConfigurationId`
   - Le produit sera publié automatiquement
   - Ce produit sera compté dans "Products Created"

### Étape 4 : Créer une commande de test

1. **Dans votre boutique Shopify** :
   - Allez sur la page produit avec le customizer
   - Créer un design et l'ajouter au panier
   - Procédez au checkout

2. **Passez une commande de test** :
   - Utilisez le mode test de Shopify
   - Ou utilisez une méthode de paiement de test
   - Complétez la commande

3. **La commande sera détectée automatiquement** :
   - Le webhook `ORDERS_CREATE` sera déclenché
   - La commande sera comptée dans "Orders"

## 🔧 Méthode 2 : Créer des données manuellement dans Shopify Admin

### Créer un produit avec le metafield ASO

1. **Dans Shopify Admin → Produits** :
   - Créez un nouveau produit
   - Nom : "Test Product ASO"
   - Type de produit : `all-signs-options-product`

2. **Ajoutez le metafield** :
   - Allez dans "Métadonnées" du produit
   - Ajoutez un metafield :
     - Namespace : `allSignsOptionsAsoAso`
     - Clé : `asoConfigurationId`
     - Type : Nombre entier
     - Valeur : `1` (ou l'ID d'une configuration existante)

3. **Publiez le produit**

### Créer une commande de test

1. **Dans Shopify Admin → Commandes** :
   - Créez une commande de test
   - Ajoutez le produit créé ci-dessus
   - Complétez la commande

2. **Vérifiez que la commande contient le produit ASO** :
   - La commande doit contenir au moins un produit avec le metafield ASO
   - La commande sera comptée dans "Orders"

## 🧪 Méthode 3 : Utiliser l'API GraphQL directement (Avancé)

### Créer un produit via GraphQL

Vous pouvez utiliser l'API GraphQL de Shopify pour créer un produit :

```graphql
mutation createProduct {
  productCreate(product: {
    title: "Test Product ASO"
    productType: "all-signs-options-product"
    metafields: [{
      namespace: "allSignsOptionsAsoAso"
      key: "asoConfigurationId"
      type: "number_integer"
      value: "1"
    }]
  }) {
    product {
      id
      title
    }
  }
}
```

## ✅ Vérification

### Vérifier que les produits sont créés

1. **Dans Shopify Admin → Produits** :
   - Recherchez les produits avec le type `all-signs-options-product`
   - Ou filtrez par metafield `allSignsOptionsAsoAso.asoConfigurationId`

2. **Dans le dashboard de l'app** :
   - Rechargez la page `/app`
   - Vérifiez que "Products Created" correspond au nombre de produits

### Vérifier que les commandes sont détectées

1. **Dans Shopify Admin → Commandes** :
   - Vérifiez que les commandes contiennent des produits ASO
   - Ouvrez une commande et vérifiez les produits

2. **Dans le dashboard de l'app** :
   - Rechargez la page `/app`
   - Vérifiez que "Orders" correspond au nombre de commandes

### Vérifier le taux de conversion

1. **Calculez manuellement** :
   - Formule : `(Orders / Products Created) * 100`
   - Exemple : Si 10 produits et 3 commandes → 30%

2. **Comparez avec le dashboard** :
   - Le taux affiché doit correspondre au calcul manuel

## 🎯 Scénario de test complet

### Scénario 1 : Test basique

1. Créez 1 configuration
2. Associez 1 produit à cette configuration
3. Créez 1 commande avec ce produit
4. **Résultat attendu** :
   - Products Created: 1
   - Orders: 1
   - Conversion Rate: 100%

### Scénario 2 : Test avec plusieurs produits

1. Créez 1 configuration
2. Associez 3 produits à cette configuration
3. Créez 2 commandes (chacune avec 1 produit différent)
4. **Résultat attendu** :
   - Products Created: 3
   - Orders: 2
   - Conversion Rate: 67% (arrondi)

### Scénario 3 : Test avec produits créés automatiquement

1. Créez 1 configuration
2. Utilisez le customizer pour créer 5 designs différents
3. Ajoutez-les au panier (cela crée 5 produits)
4. Passez 2 commandes (chacune avec plusieurs produits)
5. **Résultat attendu** :
   - Products Created: 5 (ou plus si d'autres produits existent)
   - Orders: 2
   - Conversion Rate: 40% (si 5 produits et 2 commandes)

## 🐛 Dépannage

### Les produits ne sont pas comptés

**Vérifications** :
1. Le produit a-t-il le `productType: "all-signs-options-product"` ?
2. Le produit a-t-il le metafield `allSignsOptionsAsoAso.asoConfigurationId` avec une valeur valide (pas "0", pas vide) ?
3. Le produit est-il publié ?

**Solution** :
- Vérifiez dans Shopify Admin → Produits → [Votre produit] → Métadonnées
- Assurez-vous que le metafield est présent et a une valeur

### Les commandes ne sont pas comptées

**Vérifications** :
1. La commande contient-elle au moins un produit avec le metafield ASO ?
2. Le webhook `ORDERS_CREATE` fonctionne-t-il ?
3. La commande est-elle complétée (pas en brouillon) ?

**Solution** :
- Vérifiez dans Shopify Admin → Commandes → [Votre commande]
- Ouvrez la commande et vérifiez les produits
- Vérifiez les logs serveur pour voir si le webhook est déclenché

### Le taux de conversion est incorrect

**Vérifications** :
1. Les nombres de produits et commandes sont-ils corrects ?
2. Le calcul est-il : `(Orders / Products Created) * 100` ?

**Solution** :
- Vérifiez manuellement les nombres
- Rechargez la page pour voir si les valeurs se mettent à jour

## 📝 Notes importantes

- Les métriques sont calculées à chaque chargement de la page `/app`
- Les calculs peuvent prendre quelques secondes si vous avez beaucoup de produits/commandes
- Les produits doivent avoir le metafield avec une valeur valide (pas "0", pas null)
- Les commandes doivent être complétées (pas en brouillon)
- Le webhook `ORDERS_CREATE` doit fonctionner pour détecter les nouvelles commandes

## 🚀 Prochaines étapes

Une fois que vous avez des données de test :
1. Vérifiez que les métriques s'affichent correctement
2. Testez avec différents scénarios
3. Vérifiez que les calculs sont cohérents
4. Testez avec de grandes quantités de données (si applicable)


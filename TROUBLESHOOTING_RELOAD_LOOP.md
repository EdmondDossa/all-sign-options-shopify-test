# Dépannage - Boucle de Rechargement Infini

## 🔄 Problème
La page de login Shopify se recharge en continu, créant une boucle infinie.

## ✅ Solutions appliquées

### 1. Protection contre les timeouts
- Ajout d'un timeout de 10 secondes pour les calculs de métriques
- Les métriques ne bloquent plus le chargement de la page
- Si les calculs échouent, la page charge quand même avec des valeurs par défaut (0)

### 2. Limitation du nombre de pages
- **Produits** : Maximum 10 pages (2500 produits max)
- **Commandes** : Maximum 5 pages (1250 commandes max)
- Empêche les boucles infinies lors de la pagination

### 3. Gestion d'erreur améliorée
- Les erreurs de calcul ne font plus échouer le loader
- La page se charge même si les métriques ne peuvent pas être calculées

## 🔍 Autres causes possibles

### Cause 1 : Problème d'authentification Shopify

**Symptômes** :
- La page redirige vers `/auth/login` en boucle
- Les cookies de session ne sont pas sauvegardés

**Solutions** :
1. Vérifiez que `SHOPIFY_API_KEY` et `SHOPIFY_API_SECRET` sont correctement configurés dans `.env`
2. Vérifiez que la base de données est accessible (Prisma)
3. Videz les cookies du navigateur et réessayez
4. Vérifiez que le tunnel Shopify CLI fonctionne correctement

### Cause 2 : Erreurs JavaScript non gérées

**Symptômes** :
- Erreurs dans la console du navigateur (F12)
- La page se recharge après chaque erreur

**Solutions** :
1. Ouvrez la console du navigateur (F12)
2. Vérifiez les erreurs JavaScript
3. Recherchez les erreurs liées à :
   - `useLoaderData` (données manquantes)
   - `authenticate.admin` (problème d'authentification)
   - Requêtes GraphQL échouées

### Cause 3 : Problème avec les variables d'environnement

**Symptômes** :
- L'app ne peut pas se connecter à Shopify
- Erreurs dans les logs serveur

**Solutions** :
1. Vérifiez que `.env` contient :
   ```
   SHOPIFY_API_KEY=...
   SHOPIFY_API_SECRET=...
   SHOPIFY_APP_URL=...
   SCOPES=...
   DATABASE_URL=...
   ```
2. Redémarrez le serveur après modification de `.env`

### Cause 4 : Problème de base de données

**Symptômes** :
- Erreurs Prisma dans les logs
- Impossible de sauvegarder les sessions

**Solutions** :
1. Vérifiez que la base de données est accessible
2. Exécutez les migrations :
   ```bash
   npx prisma migrate deploy
   ```
3. Vérifiez la connexion :
   ```bash
   npx prisma db pull
   ```

## 🛠️ Étapes de dépannage

### Étape 1 : Vérifier les logs serveur
```bash
npm run dev
```
Regardez les logs pour voir :
- Des erreurs d'authentification
- Des erreurs GraphQL
- Des timeouts
- Des erreurs de base de données

### Étape 2 : Vérifier la console du navigateur
1. Ouvrez le navigateur (F12)
2. Onglet "Console"
3. Recherchez les erreurs JavaScript
4. Onglet "Network" pour voir les requêtes qui échouent

### Étape 3 : Tester l'authentification
1. Accédez directement à `/auth/login`
2. Entrez votre domaine de boutique
3. Vérifiez que la redirection fonctionne

### Étape 4 : Vérifier les variables d'environnement
```bash
# Vérifiez que les variables sont définies
echo $SHOPIFY_API_KEY
echo $SHOPIFY_API_SECRET
```

### Étape 5 : Réinitialiser la session
1. Supprimez les cookies du navigateur
2. Redémarrez le serveur
3. Réessayez

## 📝 Logs à surveiller

### Logs normaux (succès)
```
📊 Calculating dashboard metrics...
✅ Products Created: X
✅ Orders Count: Y
✅ Conversion Rate: Z%
```

### Logs d'avertissement (non-critique)
```
⚠️ Error calculating dashboard metrics (non-critical): [erreur]
⚠️ Metrics calculation timed out, using default values
⚠️ Reached max pages limit (X) for products count
```

### Logs d'erreur (à investiguer)
```
❌ Error calculating dashboard metrics: [erreur détaillée]
GraphQL errors: [erreurs]
error getting shop domain: [erreur]
```

## 🚀 Solution rapide

Si le problème persiste, vous pouvez temporairement désactiver les calculs de métriques :

```typescript
// Dans app/routes/app._index.tsx
// Commentez cette section :
/*
try {
  productsCreated = await ShopifyProductService.countProductsCreated(admin);
  ordersCount = await ShopifyOrderService.countOrdersWithAsoProducts(admin);
  // ...
} catch (error) {
  // ...
}
*/
```

Cela permettra au dashboard de se charger sans calculer les métriques.

## 📞 Support supplémentaire

Si le problème persiste après avoir essayé toutes ces solutions :
1. Vérifiez la version de Node.js (doit être >= 18.20)
2. Vérifiez que toutes les dépendances sont installées : `npm install`
3. Vérifiez les logs complets du serveur Shopify CLI
4. Vérifiez la documentation Shopify App Remix


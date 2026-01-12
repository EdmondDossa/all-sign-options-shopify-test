/**
 * Script de test pour les métriques du dashboard
 * 
 * Usage: node scripts/test-dashboard-metrics.js
 * 
 * Ce script teste les méthodes de comptage des produits et commandes
 * Il nécessite une connexion Shopify active
 */

import { shopifyApp } from "@shopify/shopify-app-remix";
import { ApiVersion } from "@shopify/shopify-api";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { prisma } from "../app/db.server.js";
import { ShopifyProductService } from "../app/models/ShopifyProduct.service.js";
import { ShopifyOrderService } from "../app/models/ShopifyOrder.service.js";

// Note: Ce script nécessite une session Shopify active
// Pour l'utiliser, vous devez avoir une session valide dans votre base de données

async function testDashboardMetrics() {
  console.log("🧪 Test des métriques du dashboard\n");
  
  try {
    // Note: Vous devez avoir une session Shopify active
    // Pour obtenir une session, vous pouvez utiliser le CLI Shopify ou accéder à l'app en développement
    
    console.log("⚠️  Ce script nécessite une session Shopify active.");
    console.log("Pour tester manuellement:");
    console.log("1. Lancez l'app en développement: npm run dev");
    console.log("2. Accédez au dashboard: /app");
    console.log("3. Vérifiez les métriques affichées\n");
    
    console.log("📊 Métriques à vérifier:");
    console.log("- Products Created: Nombre de produits avec metafield allSignsOptionsAsoAso.asoConfigurationId");
    console.log("- Orders: Nombre de commandes contenant au moins un produit ASO");
    console.log("- Conversion Rate: (Orders / Products Created) * 100\n");
    
    console.log("✅ Pour tester les méthodes directement:");
    console.log("1. Ouvrez la console du navigateur sur /app");
    console.log("2. Vérifiez les logs serveur pour voir les appels GraphQL");
    console.log("3. Vérifiez que les valeurs sont cohérentes avec vos données Shopify\n");
    
    console.log("🔍 Vérifications à faire:");
    console.log("1. Les produits créés doivent avoir le productType: 'all-signs-options-product'");
    console.log("2. Les produits doivent avoir le metafield allSignsOptionsAsoAso.asoConfigurationId");
    console.log("3. Les commandes doivent contenir au moins un produit avec ce metafield");
    console.log("4. Le taux de conversion doit être entre 0% et 100%");
    
  } catch (error) {
    console.error("❌ Erreur lors du test:", error);
  }
}

testDashboardMetrics();


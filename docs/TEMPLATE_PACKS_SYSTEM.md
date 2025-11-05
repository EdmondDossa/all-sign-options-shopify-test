# Template Packs System

## Overview

The Template Packs system allows merchants to purchase premium template packs organized by categories (e.g., Christmas, New Year, Birthday, etc.). Each pack contains multiple templates that can be imported into the merchant's shop.

## Key Features

- **Template Pack Organization**: Templates are organized by categories
- **One-Time Payment**: Merchants pay once per pack (not a subscription)
- **Re-acquisition**: If templates are deleted, merchants can re-purchase the pack
- **Automatic Import**: Templates are automatically imported after purchase
- **Access Management**: System tracks which packs are purchased and if templates still exist

## Workflow

### 1. Creating Template Packs (Developers)

1. **Create Templates**: Create templates in a development shop and organize them by categories
2. **Export Templates**: Run the export script to generate JSON files per category:
   ```bash
   npm run export:templates -- --shop=dev-shop.myshopify.com
   ```
   This creates JSON files like `noel.json`, `new_year.json`, etc. in the `scripts/` directory

3. **Import Packs**: Run the import script to create pack entries in the database:
   ```bash
   npm run import:packs
   ```
   This script:
   - Copies JSON files to `public/template-packs/json/`
   - Creates `TemplatePack` entries in the database
   - Sets default prices and metadata

### 2. Managing Template Packs (Admin)

- Access admin interface at `/app/admin/template-packs`
- View all packs, their status, and prices
- Activate/deactivate packs
- Update prices and metadata

### 3. Purchasing Template Packs (Merchants)

1. Navigate to `/app/templates/packs` from the templates page
2. Browse available template packs
3. Click on a pack to see details
4. Click "Purchase Pack" to buy (one-time payment)
5. Templates are automatically imported after purchase

### 4. Using Template Packs

- Purchased templates appear in `/app/templates/main`
- Templates are organized by their category
- Merchants can use, edit, and customize templates normally

### 5. Re-acquisition

- If a merchant deletes templates from a purchased pack:
  - The system detects this and marks the pack as "Templates Removed"
  - The merchant can click "Re-import Pack" to restore templates
  - If too many templates are deleted, the merchant may need to re-purchase

## Database Schema

### TemplatePack
- `id`: Unique identifier
- `name`: Pack name (e.g., "Pack Noël")
- `slug`: URL-friendly identifier
- `category`: Category name (e.g., "Noël")
- `price`: Price in USD
- `jsonFile`: Path to JSON file (e.g., "noel.json")
- `previewImg`: Preview image URL
- `isActive`: Whether pack is available for purchase
- `order`: Display order

### ShopTemplatePack
- `id`: Unique identifier
- `sessionId`: Shop session ID
- `packId`: Reference to TemplatePack
- `purchasedAt`: Purchase timestamp
- `purchasePrice`: Price paid
- `isActive`: Whether purchase is still valid

## API Routes

### Merchant Routes
- `GET /app/templates/packs` - Gallery of available packs
- `GET /app/templates/packs/:packId` - Pack details page
- `POST /app/templates/packs/:packId` - Purchase/import pack

### Admin Routes
- `GET /app/admin/template-packs` - Manage packs

## Services

### TemplatePackService

Key methods:
- `getAllPacks(sessionId?)`: Get all active packs (with purchase status if sessionId provided)
- `getPack(idOrSlug, sessionId?)`: Get a single pack with access status
- `hasAccessToPack(sessionId, packId)`: Check if shop has access (purchased AND templates exist)
- `recordPurchase(sessionId, packId, price)`: Record a pack purchase
- `importPackToShop(sessionId, packId, shop)`: Import pack templates into shop
- `checkPackAccessAfterDeletion(sessionId)`: Check and deactivate purchases if templates deleted

## Payment System

The system uses Shopify's one-time payment charges via GraphQL mutation `appPurchaseOneTimeCreate`. 

**Note**: Currently, the system processes purchases immediately. In production, you should:
1. Create the one-time charge via GraphQL
2. Wait for webhook confirmation
3. Then import the pack

## File Structure

```
public/
  template-packs/
    json/
      noel.json
      new_year.json
      ...
    previews/
      pack-noel-preview.jpg
      ...
```

## Scripts

### Export Templates
```bash
npm run export:templates [-- --session=SESSION_ID] [-- --shop=SHOP_NAME] [-- --list]
```

### Import Packs
```bash
npm run import:packs
```

## Configuration

### Default Pricing
- Base price: $29.99
- Additional $2 per template over 10 templates

### Access Logic
- Pack is considered "accessible" if:
  1. Shop has purchased the pack (ShopTemplatePack exists and isActive=true)
  2. At least 50% of pack templates still exist in the shop

## Troubleshooting

### Templates not appearing after purchase
- Check that JSON file exists in `public/template-packs/json/`
- Verify fonts and materials are being imported correctly
- Check server logs for import errors

### Pack shows as "purchased" but no access
- Templates may have been deleted
- Use "Re-import Pack" button to restore templates
- System will check access automatically after template deletion

### Import script fails
- Ensure JSON files are in `scripts/` directory
- Check that Prisma client is generated (`npx prisma generate`)
- Verify database connection

## Future Enhancements

- [ ] Version control for packs
- [ ] Pack bundles (multiple packs at discount)
- [ ] Usage statistics and analytics
- [ ] Automatic pack updates
- [ ] Template previews in gallery
- [ ] Search and filtering in pack gallery

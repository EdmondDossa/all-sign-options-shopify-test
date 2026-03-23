# Simplified Classic Config Builder

## Goal

Create a new simplified configuration experience for classic ASO configurations.

This does **not** replace or modify the current NCPC `neon` / `channel` flows.

The objective is:

- keep `NCPC neon/channel` untouched
- keep legacy classic routes available
- introduce a simpler merchant-facing configuration flow
- reduce deep material-driven setup
- let merchants configure customer-facing options directly

## Scope

This builder is for classic configurations only.

Out of scope:

- NCPC `neon`
- NCPC `channel`
- backboards
- mountings
- NCPC-specific option trees

## Product Principle

The merchant should:

1. create a configuration
2. enable the customization options they want
3. configure those options directly
4. optionally define exclusions between options
5. save and publish

The merchant should **not** have to build configuration data indirectly through deep `materials` sub-routes.

## Navigation Target

Use the same visual philosophy as the current classic app areas:

- sidebar
- grouped sections
- simple option managers
- settings grouped separately

### Sidebar Structure

#### Core Setup

- Sizes
- Pricing
- Fonts
- Colors

#### Customization Options

- Materials
- Fixing Methods
- Shapes
- Borders
- Additional Inputs

#### Settings

- General
- Language & Images
- Theme & Color
- Sort Options

## Screen Philosophy

Each screen should be a simple manager.

Each option screen should support:

- list view
- add/edit modal or form
- label
- description
- image or preview if relevant
- default state if relevant
- pricing if relevant
- exclusions if relevant

Avoid:

- deep technical routing
- multi-step setup hidden inside materials
- data entry scattered across multiple child routes

## Data Model Direction

The simplified builder should be option-centric, not material-centric.

### Example Shape

```ts
type AdditionalPrice = {
  type: "none" | "base" | "multiplier";
  value: number;
};

type Exclusions = {
  sizes?: number[];
  colors?: number[];
  fixingMethods?: number[];
  shapes?: number[];
  borders?: number[];
};

type SimplifiedOptionItem = {
  id: string;
  label: string;
  description: string;
  image?: string;
  previewImage?: string;
  isDefault?: boolean;
  isActive?: boolean;
  price?: AdditionalPrice;
  exclusions?: Exclusions;
};
```

### Proposed Settings Root

```ts
settings: {
  simplifiedBuilder: {
    enabled: true,
    enabledOptions: {
      sizes: true,
      pricing: true,
      fonts: true,
      colors: true,
      materials: true,
      fixingMethods: true,
      shapes: true,
      borders: false,
      additionalInputs: true,
    },
  },
}
```

### Proposed Data Groups

```ts
requiredOptions: {
  sizeOptions: { ... },
  priceOptions: { ... },
  fontOptions: { ... },
  colorOptions: { ... },
}

additionalOptions: {
  materials: SimplifiedOptionItem[],
  fixingMethods: SimplifiedOptionItem[],
  shapes: SimplifiedOptionItem[],
  borders: SimplifiedOptionItem[],
  customAdditionalsOptions: SimplifiedOptionItem[],
}
```

## Important Compatibility Rule

Do not break existing storage for classic configs if it is still used elsewhere.

Recommended approach:

- reuse existing data groups where possible
- add a new simplified layout and simplified editors first
- map simplified editors to the existing persisted structures
- only introduce new storage keys when mapping is too costly or too brittle

## Materials in the New Model

`Materials` should become just another configurable option family.

A material item should only contain:

- name
- description
- image
- default flag
- pricing
- exclusions

It should not be the root entry point for configuring all other option families.

## Exclusions Strategy

Keep exclusions simple and visible.

Recommended first set:

- material excludes sizes
- material excludes colors
- material excludes fixing methods
- material excludes shapes
- border excludes shapes
- fixing method excludes sizes if needed

Do not start with full cross-dependency between every option family.

## Migration Strategy

### Phase 1

Introduce the new shell and navigation only.

- new sidebar
- grouped route structure
- no NCPC impact
- no legacy route removal

### Phase 2

Implement simple managers for:

- Sizes
- Pricing
- Fonts
- Colors

These four screens define the core builder experience.

### Phase 3

Implement simple managers for:

- Materials
- Fixing Methods
- Shapes
- Borders

This is where the simplification replaces the old material-heavy setup flow.

### Phase 4

Align settings screens:

- General
- Language & Images
- Theme & Color
- Sort Options

### Phase 5

Add compatibility helpers and migration utilities if needed:

- legacy classic config -> simplified UI mapping
- validation helpers
- exclusion helpers

## Routes Proposal

Suggested route family:

```txt
/app/configuration/:configId/builder
/app/configuration/:configId/builder/sizes
/app/configuration/:configId/builder/pricing
/app/configuration/:configId/builder/fonts
/app/configuration/:configId/builder/colors
/app/configuration/:configId/builder/materials
/app/configuration/:configId/builder/fixing-methods
/app/configuration/:configId/builder/shapes
/app/configuration/:configId/builder/borders
/app/configuration/:configId/builder/additional-inputs
/app/configuration/:configId/builder/settings/general
/app/configuration/:configId/builder/settings/language-images
/app/configuration/:configId/builder/settings/theme-color
/app/configuration/:configId/builder/settings/sort-options
```

This keeps the new experience isolated from:

- legacy classic routes
- NCPC routes

## Implementation Recommendation

Start with a new builder layout instead of refactoring old routes in place.

Reason:

- lower risk
- easier rollback
- easier A/B comparison
- no regression on current merchant workflows

## First Deliverable

The first coded milestone should be:

1. new builder layout + sidebar
2. placeholder route pages
3. live binding to current configuration data
4. no destructive migration

Once that shell exists, each manager can be replaced incrementally.


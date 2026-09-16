# Log des corrections d'accessibilité

Corrections appliquées suite à l'audit d'accessibilité (agent `accessibility-checker`), pour les problèmes de sévérité **Critique** et **Important**. Les problèmes **Mineurs** de l'audit n'ont pas été traités dans cette passe.

Date : 2026-09-07

## Critique

### 1. Formulaire de contact non fonctionnel
- **Fichiers** : `index.html`, `js/main.js`, `css/style.css`
- **Changement** : le bouton passe de `type="button"` à `type="submit"` ; ajout d'un gestionnaire `submit` dans `js/main.js` qui valide le formulaire (`checkValidity`/`reportValidity`) puis ouvre un lien `mailto:` pré-rempli (nom, email, message) vers `fmamalet@gmail.com`. Ajout d'une zone de statut `role="status" aria-live="polite"` annoncée après l'envoi.

### 2. Contenu invisible si JavaScript échoue
- **Fichiers** : `css/style.css`, `js/main.js`
- **Changement** : `.reveal` ne masque plus le contenu par défaut (`opacity` non définie = visible). Une nouvelle classe `.reveal--pending` (ajoutée uniquement par JS juste avant l'observation) porte désormais l'état masqué initial. Si le JS ne s'exécute pas, le contenu reste visible dès le rendu HTML/CSS.

## Important

### 3. Contraste insuffisant de `--color-primary` en thème clair
- **Fichiers** : `css/style.css`, `index.html`, `blog.html`, `blog/construire-un-portfolio-avec-claude-code.html`, `blog/de-product-manager-a-product-builder.html`
- **Changement** : `--color-primary` passe de `#0d9373` (≈3,9:1 sur blanc) à `#0a7a5e` (≈5,3:1) et `--color-primary-hover` de `#0b7a5f` à `#07614a` (≈7,4:1), dans le CSS principal et dans le CSS critique inliné de chaque page (pour éviter tout flash de couleur incohérente).

### 4. Liens de pied de page factices (`href="#"`)
- **Fichiers** : `index.html`, `blog.html`, `blog/construire-un-portfolio-avec-claude-code.html`, `blog/de-product-manager-a-product-builder.html`
- **Changement** : les liens GitHub et LinkedIn du footer pointent désormais vers les vraies URLs (`https://github.com/FranckyMa` et `https://www.linkedin.com/in/franck-mamalet/`), avec `target="_blank" rel="noopener"`.

### 5. Liens ouvrant un nouvel onglet sans avertissement
- **Fichiers** : `index.html`, `blog.html`, `blog/construire-un-portfolio-avec-claude-code.html`, `blog/de-product-manager-a-product-builder.html`, `js/main.js`, `css/style.css`
- **Changement** : ajout d'une classe utilitaire `.sr-only` (texte visible uniquement par les lecteurs d'écran). Les liens GitHub/LinkedIn du footer et les liens de projets générés en JS portent désormais la mention « (nouvel onglet) » (en `span.sr-only` ou dans l'`aria-label` existant).

### 6. Absence de validation/indication des champs obligatoires
- **Fichier** : `index.html`
- **Changement** : ajout de `required` et `aria-required="true"` sur les trois champs du formulaire de contact, d'un astérisque visuel (`.contact-form__required`) à côté de chaque label concerné, et d'une mention explicative en haut du formulaire (« Les champs marqués d'un * sont obligatoires »).

## Non traité (sévérité Mineure, hors périmètre de cette passe)
- Perte de sémantique de liste sur les `<ul>` avec `list-style: none` (VoiceOver/Safari).
- Indicateur de focus des champs de formulaire jugé peu épais.
- Photo de la section « À propos » toujours en placeholder texte.

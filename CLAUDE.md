# CLAUDE.md

Ce fichier fournit des instructions à Claude Code (claude.ai/code) pour travailler avec le code de ce dépôt.

## Présentation du projet

MonPortfolio est un site portfolio statique : HTML, CSS et JavaScript vanilla uniquement — pas de framework, pas d'étape de build, pas de gestionnaire de paquets.

## Conventions de design et de contenu

- Design minimaliste, professionnel, fond sombre.
- Mobile-first : écrire d'abord les styles pour mobile, puis ajouter les styles pour les écrans plus larges via des media queries.
- Le code (noms de variables, de fonctions, commentaires) doit être en anglais.
- Le contenu visible (texte affiché aux utilisateurs) doit être en français.

## Développement

Il n'y a pas d'outillage de build/lint/test dans ce dépôt. Pour prévisualiser le site, ouvrir `index.html` directement dans un navigateur, ou le servir localement, par exemple :

```
python3 -m http.server
```

### Fragments HTML partagés (header, footer, CSS critique)

Le header, le footer et le bloc `<style>` critique sont dupliqués dans les 4 pages HTML (`index.html`, `blog.html`, `blog/*.html`), entre des marqueurs `<!-- sync:start NOM --> … <!-- sync:end NOM -->`. La source unique de chaque fragment vit dans `partials/`.

Après avoir modifié un fichier dans `partials/`, relancer :

```
node scripts/sync-partials.js
```

Ce script est un outil de confort facultatif (aucune dépendance npm) : le site reste 100% HTML statique et fonctionne sans jamais l'exécuter. Ne modifie pas les blocs entre les marqueurs `sync:start`/`sync:end` directement dans les pages HTML — modifie le fichier correspondant dans `partials/` puis relance le script.

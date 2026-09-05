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

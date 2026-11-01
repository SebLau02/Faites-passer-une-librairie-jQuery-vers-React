# HRnet (version React)

Application interne de gestion des dossiers des employés de WealthHealth, convertie de jQuery vers React (100 % React, 0 % jQuery).

- **Create Employee** (`/employees/create`) : formulaire de création d'un employé, avec confirmation dans une fenêtre modale.
- **Employee List** (`/employees`) : tableau des employés avec recherche, tri par colonne et pagination.

L'état (liste des employés) est géré par un Context React (`EmployeesContext`) : il n'y a plus de stockage local. Les données initiales viennent de `public/employees.json`.

Les composants d'interface (DatePicker, Modal, Select, Table, etc.) viennent de la librairie [`@seblau02/oc-ui`](https://github.com/SebLau02/OC-UI), issue de la conversion des plugins jQuery.

## Prérequis

- Node.js ≥ 20 (testé avec Node 22)
- [pnpm](https://pnpm.io)
- Éditeur recommandé : [Visual Studio Code](https://code.visualstudio.com)
- Un accès au registre GitHub Packages pour installer `@seblau02/oc-ui` (voir `.npmrc`)

## Installation

```bash
git clone https://github.com/SebLau02/Faites-passer-une-librairie-jQuery-vers-React.git
cd Faites-passer-une-librairie-jQuery-vers-React
pnpm install
```

## Scripts

| Commande | Rôle |
| --- | --- |
| `pnpm dev` | Serveur de développement |
| `pnpm build` | Build de production dans `dist/` |
| `pnpm preview` | Sert le build (http://localhost:4173) |
| `pnpm lint` | Vérification ESLint |

## Structure

```
src/
  App.jsx          # routes, thème, Context des employés
  hooks/context.js # EmployeesContext
  pages/           # CreateEmployee, EmployeesList
  style/           # styles SCSS
public/employees.json  # données initiales
```

## Performance

Comparaison Lighthouse jQuery / React (build de production) : voir `COMPARISON.md` et les rapports `lighthouse_*.json`. Score de performance 92 → 100, LCP −34 %, TBT 221 → 0 ms.

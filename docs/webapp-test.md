# Webapp test

### Lancer les tests en local

Pour lancer les tests du front en local, il suffit
de lancer cette commande:

```bash
bash scripts/run-webapp-test.sh
```

### Voir les tests visuelement

Si vous souhaitez voir le rendu visuel des tests
sur le navigateur, vous pouvez vous rendre sur le fichier
[jest-puppeteer.config.js](../webapp/jest-puppeteer.config.js) et modifier la variable
`headless` en la mettant a `false`.

### Rendre les tests plus lents

Parfois, avec le mode visuel, on souhaite rendre
le test plus lent afin de bien suivre son deroulement,
pour ceci, il faut se rendre sur le fichier [jest-puppeteer.config.js](../webapp/jest-puppeteer.config.js)
et decommenter la variable `slowMo`.

Augmenter la durée de slowMo permet de rendre le test
encore plus lent.
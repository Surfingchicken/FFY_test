Voici mon rendu pour le test technique FFY, je n'ai malheureusement pas eu le temps de terminer les parties ajouter un évenement et le responsif. 
La majorité du code est située dans Month.js avec assez peu de component pour garder un meilleur tracking du state selectedDate sur lequel va reposer le fonctionnement de l'application.
Le gros du code repose sur la librarie date-fns qui manipule des objets de type Date et permet d'effectuer des opérations de temps à bas niveau tout en étant intuitive. 
J'ai ensuite rajouté des component importés de librairies telles que react-color pour le ColorPicker et material-ui pour le HourPicker qui m'ont fait gagner beaucoup de temps.
Mes problématiques principales ont été une méconnaissance des outils associés à React qui aurait pus beaucoup plus me faciliter la vie.
Si le temps ne m'avait pas défaut j'aurais défini une fonction callback pour ramener les infos selectionnés dans la modale en tant qu'objet meeting au niveau de Month.js.

# Nutshell Base Framework Starterkit for Contao CMS

You can find the documentation of the **Nutshell** at <http://nutshell.erdmann-freunde.de/> (deutsch/german).

The **euf_nutshell_kit** (emphasis on the *kit*) is a convenience wrapper for web developers to start with a new Contao project.
It is packed with scss files to start with, an `.htaccess` suitable for the most projects and maybe more to come.

In addition to the docs mentioned above, you find a "cheatsheet" below. Be reminded that starting with the point you created the project (`composer create-project`) further updates within this repository will not affect your installation.

## Usage
### Create composer project
```bash
composer create-project erdmannfreunde/euf_nutshell_kit [path]
```
Make sure to replace `[path]` with the name of the folder you want to install your Contao installation in.

Alternatively, download and extract the zip file, run `composer install`.

### Change to the Contao installation
```bash
cd path
```

### Install node modules
```bash
npm install
```

### Initialize git repository
```bash
git init
git add .
git commit -m "Initial files"
```

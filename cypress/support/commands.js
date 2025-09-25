// cypress/support/commands.js
// other command imports you use
import 'cypress-file-upload';

// register download helper if you use it
require('cypress-downloadfile/lib/downloadFileCommand');

// ------------------------------------------------------------------
// cypress-visual-regression: load and call the registration function
// ------------------------------------------------------------------
/*
  The package sometimes exports the function as:
   - the module default (module.exports = fn)
   - or as an object with addCompareSnapshotCommand
  We try both so it works for many versions.
*/
let addCompareSnapshotCommand;

try {
    // try requiring the dist command (most docs/examples use this)
    const mod = require('cypress-visual-regression/dist/command');

    // mod could be a function (default export) or an object
    if (typeof mod === 'function') {
        addCompareSnapshotCommand = mod;
    } else {
        addCompareSnapshotCommand =
            mod.addCompareSnapshotCommand || mod.default || mod.compareSnapshotCommand || null;
    }
} catch (err) {
    // fallback to root import
    try {
        const mod2 = require('cypress-visual-regression');
        if (typeof mod2 === 'function') {
            addCompareSnapshotCommand = mod2;
        } else {
            addCompareSnapshotCommand =
                mod2.addCompareSnapshotCommand || mod2.default || null;
        }
    } catch (err2) {
        // ignore, handled below
    }
}

if (typeof addCompareSnapshotCommand !== 'function') {
    // helpful error so you know to check package/export versions
    throw new Error(
        'Could not register cypress-visual-regression command. ' +
        'Tried requiring "cypress-visual-regression/dist/command" and "cypress-visual-regression". ' +
        'Inspect node_modules/cypress-visual-regression/package.json exports or reinstall the package.'
    );
}

// Register the command with optional defaults (you can tweak)
addCompareSnapshotCommand({
    errorThreshold: 0.05,   // default tolerance
    capture: 'viewport',    // 'viewport' or 'fullPage'
    // pixelmatchOptions: { threshold: 0 }, // optional
});


/*jshint esversion: 8 */

Hooks.once('ready', () => {
  if(!game.modules.get('lib-wrapper')?.active && game.user.isGM)
      ui.notifications.error("Module Macro Icons requires the 'libWrapper' module. Please install and activate it.");

  libWrapper.register('macro-icons', 'TextEditor._createEntityLink', function (wrapped, ...args) {
    const [ match, type, target, name ] = args;
    
    let result = wrapped(...args);

    if(type === "Macro") {
      let macro = game.macros.get(target);

      if(macro.data.img) {
        result.classList.add('macro-icons-macro-icon-link');
        result.innerHTML = "<img src='" + macro.data.img + "' class='macro-icons-macro-icon-img'> " + name;
      }
    }

    return result;
  }, 'WRAPPER');
});


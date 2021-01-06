/*jshint esversion: 8 */

Hooks.once('ready', () => {
  if(!game.modules.get('lib-wrapper')?.active && game.user.isGM)
      ui.notifications.error("Module Link Icons requires the 'libWrapper' module. Please install and activate it.");

  libWrapper.register('link-icons', 'TextEditor._createEntityLink', function (wrapped, ...args) {
    const [ match, type, target, name ] = args;
    
    let result = wrapped(...args);

    if(type === "Macro") {
      let macro = game.macros.get(target);

      if(macro.data.img) {
        result.classList.add('link-icons-macro-icon-link');
        result.innerHTML = "<img src='" + macro.data.img + "' class='link-icons-macro-icon-img'> " + name;
      }
    }

    return result;
  }, 'WRAPPER');
});


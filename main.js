Hooks.once("ready", () => {
	// This check should be uneccessary given that lib-wrapper is declared as a required module
	if (!game.modules.get("lib-wrapper")?.active && game.user.isGM)
		ui.notifications.error("Module Macro Icons requires the 'libWrapper' module. Please install and activate it.");

	// Whenever Foundry attempts to render a Content Link, use this wrapped function instead of the vanilla one
	libWrapper.register(
		"macro-icons",
		"TextEditor._createContentLink",
		function (wrapped, ...args) {
			let result = wrapped(...args); // make the call return the standard one
			const linkType = result.attributes["data-type"].value; // get the type of the link
			if (linkType === "Macro") {
				// if result is a macro, do the work to modify it; otherwise return as normal
				const [, , uuid] = args[0]; // Fetch the UUID out of the args
				const { img, name } = fromUuidSync(uuid); // Get the img URI and macro name
				result.classList.add("macro-icons-macro-icon-link"); // inject the CSS
				// replace the inner html with the image and name
				result.innerHTML = "<img src='" + img + "' class='macro-icons-macro-icon-img'>" + " " + name;
			}
			return result;
		},
		"WRAPPER"
	);
});

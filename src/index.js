'use strict';

var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    // Use LaunchRequest, instead of NewSession if you want to use the one-shot model
    // Alexa, ask [my-skill-invocation-name] to (do something)...
    'LaunchRequest': function () {
        this.attributes['speechOutput'] = this.t("WELCOME_MESSAGE", this.t("SKILL_NAME"));
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes['repromptSpeech'] = this.t("WELCOME_REPROMPT");
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'RecipeIntent': function () {
        var itemSlot = this.event.request.intent.slots.Item;
        var itemName;
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }

        var cardTitle = this.t("DISPLAY_CARD_TITLE", this.t("SKILL_NAME"), itemName);
        var recipes = this.t("RECIPES");
        var recipe = recipes[itemName];

        if (recipe) {
            this.attributes['speechOutput'] = recipe;
            this.attributes['repromptSpeech'] = this.t("RECIPE_REPEAT_MESSAGE");
            this.emit(':tellWithCard', recipe, this.attributes['repromptSpeech'], cardTitle, recipe);
        } else {
            var speechOutput = this.t("RECIPE_NOT_FOUND_MESSAGE");
            var repromptSpeech = this.t("RECIPE_NOT_FOUND_REPROMPT");
            if (itemName) {
                speechOutput += this.t("RECIPE_NOT_FOUND_WITH_ITEM_NAME", itemName);
            } else {
                speechOutput += this.t("RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME");
            }
            speechOutput += repromptSpeech;

            this.attributes['speechOutput'] = speechOutput;
            this.attributes['repromptSpeech'] = repromptSpeech;

            this.emit(':ask', speechOutput, repromptSpeech);
        }
    },
    'AMAZON.HelpIntent': function () {
        this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
        this.attributes['repromptSpeech'] = this.t("HELP_REPROMPT");
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest':function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'Unhandled': function () {
        this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
        this.attributes['repromptSpeech'] = this.t("HELP_REPROMPT");
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    }
};


var recipes = {
    "RECIPE_EN_GB" : {
        "snow golem": "A snow golem can be created by placing a pumpkin on top of  two snow blocks on the ground.",
        "pillar quartz block": "A pillar of quartz can be obtained by placing a block of quartz on top of a block of quartz in mine craft.",
        "firework rocket": "A firework rocket can be crafted by placing a firework star in the left middle square, a piece of paper in the center square, and gunpowder in the right middle square in a crafting table. Similar to a firework star, a firework rocket can have more gunpowder added in the bottom row to increase the duration of a rocket.",
        "rabbit stew": "Rabbit stew can be crafted by placing cooked rabbit in the top middle square, a carrot in the middle left square, a baked potato in the center square, any type of mushroom in the middle right square, and a bowl in the bottom middle square.",
        "cauldron": "A cauldron can be created by placing iron ingots in all squares but the top middle and very center squares in a crafting table.",
        "stone shovel": "All types of shovels can be crafted by placing the desired material in the top middle square, and then sticks in the two squares directly beneath that in a crafting table.",
        "red carpet": "Any type of carpet can be crafted by placing two wool, of the same color, next to each other in a crafting window.",
        "book and quill": "A book and quill can be crafted by placing a book in the middle left square, an ink sac in the very center square, and a feather in the bottom middle square in a crafting table.",
        "item frame": "An item frame can be crafted by placing leather in the very center square, and eight sticks surrounding it.",
        "map": "A map can be crafted by placing a compass in the middle square and eight pieces of paper surrounding it.",
        "sticky piston": "A sticky piston can be crafted by placing a slime ball on top of a piston in a crafting window",
        "bread": "Bread can be crafted by placing three wheat across a row in a crafting table.",
        "wooden pick ax": "All types of pick axs can be crafted by placing three of the desired material across the top row, and then placing sticks in the center and bottom middle squares in a crafting table."
    },
    "RECIPE_EN_US" : {
        "snow golem": "A snow golem can be created by placing a pumpkin on top of  two snow blocks on the ground.",
        "pillar quartz block": "A pillar of quartz can be obtained by placing a block of quartz on top of a block of quartz in mine craft.",
        "firework rocket": "A firework rocket can be crafted by placing a firework star in the left middle square, a piece of paper in the center square, and gunpowder in the right middle square in a crafting table. Similar to a firework star, a firework rocket can have more gunpowder added in the bottom row to increase the duration of a rocket.",
        "rabbit stew": "Rabbit stew can be crafted by placing cooked rabbit in the top middle square, a carrot in the middle left square, a baked potato in the center square, any type of mushroom in the middle right square, and a bowl in the bottom middle square.",
        "cauldron": "A cauldron can be created by placing iron ingots in all squares but the top middle and very center squares in a crafting table.",
        "stone shovel": "All types of shovels can be crafted by placing the desired material in the top middle square, and then sticks in the two squares directly beneath that in a crafting table.",
        "red carpet": "Any type of carpet can be crafted by placing two wool, of the same color, next to each other in a crafting window.",
        "book and quill": "A book and quill can be crafted by placing a book in the middle left square, an ink sac in the very center square, and a feather in the bottom middle square in a crafting table.",
        "item frame": "An item frame can be crafted by placing leather in the very center square, and eight sticks surrounding it.",
        "map": "A map can be crafted by placing a compass in the middle square and eight pieces of paper surrounding it.",
        "sticky piston": "A sticky piston can be crafted by placing a slime ball on top of a piston in a crafting window",
        "bread": "Bread can be crafted by placing three wheat across a row in a crafting table.",
        "wooden pick ax": "All types of pick axs can be crafted by placing three of the desired material across the top row, and then placing sticks in the center and bottom middle squares in a crafting table."
    },
    "RECIPE_DE_DE" : {
        "schneegolem": "Ein Schneegolem kann erschaffen werden, indem ein Kürbis auf zwei auf dem Boden stehende Schneeblöcke gesetzt wird.",
        "quarzsäule": "Eine Quarzsäule erhält man, indem in Minecraft ein Quarzblock auf einem Quarzblock platziert wird.",
        "feuerwerksrakete": "Eine Feuerwerksrakete kann gecraftet werden, indem ein Feuerwerksstern in das linke mittlere Feld, ein Blatt Papier in das mittlere Feld und Schwarzpulver in das rechte mittlere Feld der Werkbank gelegt wird. Ähnlich wie bei einem Feuerwerksstern kann einer Feuerwerksrakete in der unteren Reihe zusätzliches Schwarzpulver hinzugefügt werden, um die Dauer der Rakete zu verlängern.",
        "kaninchenragout": "Kaninchenragout kann gecraftet werden, indem ein Gekochtes Kaninchen in das obere mittlere Feld, eine Karotte in das linke mittlere Feld, eine Ofenkartoffel in das Feld ganz in der Mitte, eine beliebige Pilzart in das rechte mittlere Feld und eine Schüssel in des untere mittlere Feld platziert wird.",
        "kessel": "Ein Kessel kann hergestellt werden, indem Eisenbarren in alle Felder der Werkbank mit Ausnahme des oberen mittleren Feldes und des Feldes ganz in der Mitte gelegt werden.",
        "steinschaufel": "Jede Art von Schaufel lässt sich craften, indem auf der Werkbank das gewünschte Material in das obere mittlere Feld gelegt wird und dann Stöcke in die beiden direkt darunter befindlichen Felder platziert werden.",
        "roter teppich": "Jede Art von Teppich lässt sich craften, indem zwei Mal Wolle der gleichen Farbe nebeneinander in das Craftingfeld platziert wird.",
        "buch und feder": "Buch und Feder kann gecraftet werden, indem in der Werkbank ein Buch in das linke mittlere Feld, ein Tintenbeutel in das Feld ganz in der Mitte und eine Feder in das untere mittlere Feld platziert werden.",
        "rahmen": "Ein Rahmen kann gecraftet werden, indem Leder in das Feld ganz in der Mitte platziert und dann von acht Stöcken umgeben wird.",
        "karte": "Eine Karte kann gecraftet werden, indem ein Kompass in das Feld ganz in der Mitte platziert und dann von acht Blättern Papier umgeben wird.",
        "klebriger Kolben": "Ein klebriger Kolben kann gecraftet werden, indem ein Schleimball im Craftingfeld über einem Kolben platziert wird.",
        "brot": "Brot kann gecraftet werden, indem eine Reihe der Werkbank vollständig mit Weizen gefüllt wird.",
        "holzspitzhacke": "Alle Arten von Spitzhacken können gecraftet werden, indem das gewünschte Material drei Mal in der oberen Reihe der Werkbank und dann jeweils ein Stock in das Feld ganz in der Mitte und das in der Mitte der unteren Reihe platziert wird."
    }
};

var languageStrings = {
    "en": {
        "translation": {
            "RECIPES": recipes.RECIPE_EN_US,
            "SKILL_NAME": "Minecraft Helper",
            "WELCOME_MESSAGE": "Welcome to %s. You can ask a question like, what\'s the recipe for a chest? ... Now, what can I help you with.",
            "WELCOME_REPROMPT": "For instructions on what you can say, please say help me.",
            "DISPLAY_CARD_TITLE": "%s  - Recipe for %s.",
            "HELP_MESSAGE": "You can ask questions such as, what\'s the recipe, or, you can say exit...Now, what can I help you with?",
            "HELP_REPROMPT": "You can say things like, what\'s the recipe, or you can say exit...Now, what can I help you with?",
            "STOP_MESSAGE": "Goodbye!",
            "RECIPE_REPEAT_MESSAGE": "Try saying repeat.",
            "RECIPE_NOT_FOUND_MESSAGE": "I\'m sorry, I currently do not know ",
            "RECIPE_NOT_FOUND_WITH_ITEM_NAME": "the recipe for %s. ",
            "RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME": "that recipe. ",
            "RECIPE_NOT_FOUND_REPROMPT": "What else can I help with?"
        }
    },
    "en-US": {
        "translation": {
            "RECIPES" : recipes.RECIPE_EN_US,
            "SKILL_NAME" : "American Minecraft Helper"
        }
    },
    "en-GB": {
        "translation": {
            "RECIPES": recipes.RECIPE_EN_GB,
            "SKILL_NAME": "British Minecraft Helper"
        }
    },
    "de": {
        "translation": {
            "RECIPES" : recipes.RECIPE_DE_DE,
            "SKILL_NAME" : "Assistent für Minecraft in Deutsch",
            "WELCOME_MESSAGE": "Willkommen bei %s. Du kannst beispielsweise die Frage stellen: Welche Rezepte gibt es für eine Truhe? ... Nun, womit kann ich dir helfen?",
            "WELCOME_REPROMPT": "Wenn du wissen möchtest, was du sagen kannst, sag einfach „Hilf mir“.",
            "DISPLAY_CARD_TITLE": "%s - Rezept für %s.",
            "HELP_MESSAGE": "Du kannst beispielsweise Fragen stellen wie „Wie geht das Rezept für“ oder du kannst „Beenden“ sagen ... Wie kann ich dir helfen?",
            "HELP_REPROMPT": "Du kannst beispielsweise Sachen sagen wie „Wie geht das Rezept für“ oder du kannst „Beenden“ sagen ... Wie kann ich dir helfen?",
            "STOP_MESSAGE": "Auf Wiedersehen!",
            "RECIPE_REPEAT_MESSAGE": "Sage einfach „Wiederholen“.",
            "RECIPE_NOT_FOUND_MESSAGE": "Tut mir leid, ich kenne derzeit ",
            "RECIPE_NOT_FOUND_WITH_ITEM_NAME": "das Rezept für %s nicht. ",
            "RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME": "dieses Rezept nicht. ",
            "RECIPE_NOT_FOUND_REPROMPT": "Womit kann ich dir sonst helfen?"
        }
    }
};

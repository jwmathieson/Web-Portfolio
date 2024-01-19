// [Data Functions]------------------------------------------------------------------------------------------------------------------------------

var newUserData = {

    "GlorbalClicks": 0,
    "CanSpawnGlorbals": false,
    "PoppedShinyGlorbal": false,
    "Achievements": {
        "GlorbalPopper": false,
        "GlorbalHunter": false,
        "GlorbalFrenzy": false,
        "GlorbalExtinction": false,
    },

}

function loadData() {

    if (localStorage.getItem("userData")) {

        return JSON.parse(localStorage.getItem("userData"));

    } else {

        return newUserData

    }

}

function saveData() {

    localStorage.setItem("userData", JSON.stringify(userData));

}

var userData = newUserData;

// [Hamburger Functions]------------------------------------------------------------------------------------------------------------------------------

var hamburgerState = sessionStorage.getItem("hamburgerState") || false;

function updateHamburgerMenu() {

    console.log(hamburgerState)

    const nav_container = document.getElementById("nav-container");

    if (hamburgerState) {

        hamburgerState = false;
        nav_container.style.display = "none";

    } else {

        hamburgerState = true;
        nav_container.style.display = "flex";

    }

    sessionStorage.setItem("hamburgerState", hamburgerState)

}

// [Onload Function]------------------------------------------------------------------------------------------------------------------------------

// This function gets fired when the window is loaded
window.onload = function () {

    const currentLink = document.getElementById("PageLink");
    const hero = document.getElementById("Hero");

    const nav_container = document.getElementById("nav-container");
    const hamburger_button = document.getElementById("hamburger-menu")

    const clickable_image = document.getElementById("clickableImage")

    // Safety check just in case there is no id 'PageLink'
    if (currentLink) {

        currentLink.style.transform = "scale(1.1)";
        currentLink.style.backgroundColor = "var(--text-box-color)";
        currentLink.style.border = "3px var(--secondary-color) solid";
        currentLink.style.transition = "border .1s"

    }

    // This function updates everytime the screen size changes
    // When the screen size is 576px then it will enable the hamburger if the user has already enabled it
    // As well as change the visuals of the currentLink
    function updateWindowSizeVisuals() {

        if (window.innerWidth <= 576) {

            currentLink.style.transform = "scale(1)";
            currentLink.style.backgroundColor = "var(--text-box-color)";
            currentLink.style.border = "1px var(--secondary-color) solid";

            if (hamburgerState) {

                setTimeout(function () {

                    nav_container.style.display = "flex"

                }, 250)

            };

        }

    }

    // Gets called to update if the user is already on mobile
    updateWindowSizeVisuals()

    // Gets called everytime the screen size changes
    window.onresize = updateWindowSizeVisuals;

    // This function increases offset by 1 and updated the backgroundposition by the offset
    var repeatingBackgroundPos = sessionStorage.getItem("RepeatingBackgroundPos") || 0;

    function updateHeroBackground() {

        if (hero) {

            // The offset variable is used for the positional offset of the x and y of backgroundPosition
            repeatingBackgroundPos++;

            hero.style.backgroundPosition = repeatingBackgroundPos + "px " + repeatingBackgroundPos + "px";

            sessionStorage.setItem("RepeatingBackgroundPos", repeatingBackgroundPos);

        }

    }

    // Updates the heroBackground when the page loads
    updateHeroBackground();

    // Calls the updateHeroBackground function every .05s
    setInterval(updateHeroBackground, 50);

    // Calls the createGlorbal function every 5s
    setInterval(createGlorbal, 250)

    // Saves the users data every .2s
    setInterval(saveData, 200);

    // Enabled the hamburger_button on each page
    // When its clicked it will call the updateHamburgerMenu function
    hamburger_button.onclick = updateHamburgerMenu;

    imageGalleryPositionalElements()

    if (clickable_image && !userData["CanSpawnGlorbals"]) {

        clickable_image.onclick = shookImage;

        clickable_image.setAttribute("draggable", false);

    }

}

// [Glorbal Activation Functions]------------------------------------------------------------------------------------------------------------------------------

const maxImageClicks = 3;
var imageClicks = 0;
var spawnedSleepingGlorbal = false;

function shookImage() {

    const clickableImage = document.getElementById("clickableImage");

    if (!clickableImage || spawnedSleepingGlorbal) { return };
    ;
    imageClicks += 1;

    if (imageClicks % 2 == 0) {

        clickableImage.style.transform = "rotate(-5deg)";

    } else {

        clickableImage.style.transform = "rotate(5deg)";

    }

    if (imageClicks >= maxImageClicks) {

        spawnedSleepingGlorbal = true;

        var clickableImagePos = clickableImage.getBoundingClientRect()

        var posX = clickableImagePos.x + 25 + "px"
        var posY = clickableImagePos.y + 25 + "px"

        clickableImage.style.transform = "rotate(0deg)";

        clickableImage.style.zIndex = 50;
        clickableImage.style.animation = "fallingImage .75s forwards linear"

        createGlorbal({ "type": "sleeping", "posX": posX, "posY": posY })

    }

}

// [Image Gallery Functions]------------------------------------------------------------------------------------------------------------------------------

const galleryInfo = [

    { src: "images/ImageGallery/swordRender.jpg", alt:"An image of a sword", name: "3D Model: Sword", description: "This is a sword I modeled for a set of weapons in a game. The design of the sword's handle,guard, and blade would then be used for everyone other weapon in the set.", type: "image" },
    { src: "images/ImageGallery/magicSwordRender.jpg", alt:"An image of a sword with engravings on the guard and wrappings on the blade.", name: "3D Model: 'Frostmourne'", description: "This is a sword that I modeled for a quest reward in a game. In terms of design this sword is more detailed then any other weapon I have made. Its name 'Frostmourne' was created by another developer. The general idea of the sword is a weapon with ice magic.", type: "image" },
    { src: "images/ImageGallery/spearRender.jpg", alt:"An image of a spear", name: "3D Model: Spear", description: "This is a spear I modeled for a set of weapons in a game. The blade of the spear is bit unique I'd say compared to other bladed weapons I modeled in the past. That design choice makes the spear feel a bit unique in my opinion.", type: "image" },
    { src: "images/ImageGallery/daggerRender.jpg", alt:"An image of a dagger", name: "3D Model: Dagger", description: "This is a dagger I modeled for a set of weapons in a game. Its blade differs from other blades I have made as it curves.", type: "image" },
    { src: "images/ImageGallery/hammerRender.jpg", alt:"An image of a large two-handed hammer", name: "3D Model: Hammer", description: "This is a hammer I modeled for a set of weapons in a game. This model Is more detailed then other weapons in the set. The hammer part of the model has some small details with little bolts that go around it.", type: "image" },
    { src: "images/ImageGallery/theBasiliskRender.jpg", alt:"An image of a large snake with a crystal mane", name: "3D Model: 'The Basilisk'", description: "This model of a large snake is for a enemy in a game. It has a crystal mane and its head is covered in stone like armor. The model also has a rig attached to it so it can be animated.", type: "image" },
    { src: "images/ImageGallery/gameVideo.mp4", name: "Game Programming: First Person Game", description: "This small game project was developed in the engine Godot. I only spend a week on it but I did make great progress at the time. The game was going to be a dungeon exploration game where the player could equip different gear. Each dungeon would be randomly generated and would be selectable from a world map. This project is now discontinued but was a great learning experience for me.", type: "video" },


];

var currentGalleryIndex = 0;

// This function is used for changing the currently displayed image on the image gallery
// The image gallery is only available on the portfolio page
// This function can only be called by two different buttons on that page
function updateImageGallery(type, position) {

    const imageGallery_ImageDisplay = document.getElementById("imageGallery-ImageDisplay");
    const imageGallery_VideoDisplay = document.getElementById("imageGallery-VideoDisplay");

    const imageGallery_ImageName = document.getElementById("imageGallery-ImageName");
    const imageGallery_ImageDescription = document.getElementById("imageGallery-ImageDescription");

    const image_gallery_LeftButton = document.getElementById("image-gallery-LeftButton");
    const image_gallery_RightButton = document.getElementById("image-gallery-RightButton");

    switch (type) {
        case "Left":

            currentGalleryIndex--;

            break;

        case "Right":

            currentGalleryIndex++;

            break;

        case "SetPosition":

            currentGalleryIndex = position;

            break;
    };

    if (currentGalleryIndex >= galleryInfo.length - 1) {

        currentGalleryIndex = galleryInfo.length - 1

        image_gallery_RightButton.style.opacity = .5;

    } else if (currentGalleryIndex <= 0) {

        currentGalleryIndex = 0

        image_gallery_LeftButton.style.opacity = .5;

    } else {

        image_gallery_LeftButton.style.opacity = 1;
        image_gallery_RightButton.style.opacity = 1;

    }

    const info = galleryInfo[currentGalleryIndex];

    if (info) {

        var src = info["src"];
        var alt = info["alt"]
        var name = info["name"];
        var description = info["description"];

        var type = info["type"]

        imageGallery_ImageName.innerText = name;
        imageGallery_ImageDescription.innerText = description;

        switch (type) {
            case "image":

                imageGallery_ImageDisplay.src = src;
                imageGallery_ImageDisplay.setAttribute("alt",alt);
                imageGallery_VideoDisplay.style.display = "none";
                imageGallery_ImageDisplay.style.display = "block";

                break;

            case "video":

                imageGallery_VideoDisplay.src = src;
                imageGallery_ImageDisplay.style.display = "none";
                imageGallery_VideoDisplay.style.display = "block";

                break;
        }

    }

    var image_GalleryPositionSlots = document.body.getElementsByClassName("imageGalleryPositionSlot");

    var positionSlotTbl = Array.from(image_GalleryPositionSlots)

    for (i in positionSlotTbl) {

        var positional_element = positionSlotTbl[i];

        if (positional_element.getAttribute("name") == currentGalleryIndex) {

            positional_element.style.backgroundColor = "rgba(0,0,0,.2)";

        } else {

            positional_element.style.backgroundColor = "rgba(0,0,0,.1)";

        }

    };

    image_gallery_LeftButton.style.borderBottom = "var(--default-text-color) 2px solid";
    image_gallery_RightButton.style.borderBottom = "var(--default-text-color) 2px solid";

}

function galleryButtonVisual(button, type) {

    const image_gallery_Button = document.getElementById("image-gallery-" + button + "Button");

    switch (type) {
        case "Up":

            image_gallery_Button.style.borderBottom = "var(--default-text-color) 2px solid";

            break;

        case "Down":

            image_gallery_Button.style.borderBottom = "none";

            break;
    };

}

function imageGalleryPositionalElements() {

    const imageGallery_PositionalDisplay = document.getElementById("imageGallery-currentImagePosition")

    if (!imageGallery_PositionalDisplay) { return }

    for (i in galleryInfo) {

        var newPositionalSlot = document.createElement("div");

        newPositionalSlot.setAttribute("class", "imageGalleryPositionSlot");
        newPositionalSlot.setAttribute("name", i);

        if (i == 0) {

            newPositionalSlot.style.backgroundColor = "rgba(0,0,0,.2)";

        }

        imageGallery_PositionalDisplay.appendChild(newPositionalSlot)

    }

    updateImageGallery("SetPosition", currentGalleryIndex);

}

// [Glorbal Functions]------------------------------------------------------------------------------------------------------------------------------

// Contains all the information for the glorbal achievements. These are used in the notification function
const glorbalAchievements = {

    GlorbalPopper: { image: "images/Achievements/achievement_GlorbalPopper.png", backgroundColor: "#486BCF", title: "Glorbal Popper", description: "Where did this thing come from? (Pop 1 Glorbal)" },
    GlorbalHunter: { image: "images/Achievements/achievement_GlorbalHunter.png", backgroundColor: "#ED2468", title: "Glorbal Hunter", description: "How many are there? (Pop 10 Glorbals)" },
    GlorbalFrenzy: { image: "images/Achievements/achievement_GlorbalFrenzy.png", backgroundColor: "#DC3E6E", title: "Glorbal Frenzy", description: "Too many Glorbals. (Pop 100 Glorbals)" },
    GlorbalExtinction: { image: "images/Achievements/achievement_GlorbalExtinction.png", backgroundColor: "#f2c3fc", title: "Glorbal Extinction", description: "You popped the last shiny Glorbal." },
    GlorbalAwakening: { image: "images/Achievements/achievement_GlorbalAwakening.png", backgroundColor: "#43beb1", title: "Glorbal Awakening", description: "What have you done!" },

};

// Contains all the glorbal colors with an assigned image
const glorbalInfo = [

    { color: "#486BCF", image: "images/Glorbals/Blue/Blue_1.png", idle: "BlueGlorbalIdle 1s forwards infinite step-start" },
    { color: "#ED2468", image: "images/Glorbals/HotPink/HotPink_1.png", idle: "HotPinkGlorbalIdle 1s forwards infinite step-start" },
    { color: "#DC3E6E", image: "images/Glorbals/Pink/Pink_1.png", idle: "PinkGlorbalIdle 1s forwards infinite step-start" },
    { color: "#7562E3", image: "images/Glorbals/Purple/Purple_1.png", idle: "PurpleGlorbalIdle .5s forwards infinite step-start" },
    { color: "#D7BD38", image: "images/Glorbals/Yellow/Yellow_1.png", idle: "YellowGlorbalIdle 1s forwards infinite step-start" },
    { color: "#5AA465", image: "images/Glorbals/Green/Green_1.png", idle: "GreenGlorbalIdle 1s forwards infinite step-start" },

];

const shinyGlorbalInfo = { color: "#f2c3fc", image: "images/Glorbals/Shiny/Shiny_1.png", idle: "ShinyGlorbalIdle .5s forwards infinite step-start" }
const sleepingGlorbalInfo = { color: "#e74728", image: "images/Glorbals/Sleeping/Sleeping_1.png", idle: "SleepingGlorbalIdle 5s forwards infinite step-start" }

// Creates a new Glorbal
function createGlorbal(extraInfo) {

    extraInfo = extraInfo || {}

    if (window.innerWidth <= 576 || (!userData["CanSpawnGlorbals"] && (extraInfo["type"] != "sleeping"))) { return }

    var isShiny = false;
    var noDespawn = false;

    var positionX = randomGlorbalPos(100) + "%";
    var positionY = randomGlorbalPos(100) + "%";

    var randomIndex = Math.floor(Math.random() * glorbalInfo.length);
    var newGlorbalInfo = glorbalInfo[randomIndex];

    if (!userData["PoppedShinyGlorbal"] && userData["GlorbalClicks"] >= 10 && Math.floor(Math.random() * 10) == 1) {

        isShiny = true;
        shinyGlorbalSpawned = true;
        newGlorbalInfo = shinyGlorbalInfo;

    };

    if (extraInfo && extraInfo["type"] == "sleeping") {

        newGlorbalInfo = sleepingGlorbalInfo;
        positionX = extraInfo["posX"];
        positionY = extraInfo["posY"];

        noDespawn = true;

    }

    var glorbalAnimations = [

        "GlorbalSpawn .5s ease-in-out forwards",
        newGlorbalInfo["idle"] || null

    ];

    if (!noDespawn) {

        glorbalAnimations.push("GlorbalDeSpawn 10s ease-in-out forwards");

    }

    var glorbalImage = newGlorbalInfo["image"];
    var glorbalColor = newGlorbalInfo["color"];
    var shockwaveInfo = { "color": glorbalColor, "posX": positionX, "posY": positionY };

    var glorbal = document.createElement("div");

    glorbal.setAttribute("class", "glorbal")
    glorbal.setAttribute("draggable", false);

    glorbal.style.backgroundImage = "url(" + glorbalImage + ")";

    glorbal.style.left = positionX;
    glorbal.style.top = positionY;

    glorbal.style.animation = glorbalAnimationString(glorbalAnimations);

    document.body.appendChild(glorbal);

    // Pops the glorbal
    glorbal.addEventListener("mousedown", function () {

        document.documentElement.style.setProperty("--secondary-color", glorbalColor);

        glorbal.remove();

        glorbalPopEffect(shockwaveInfo);

        if (isShiny) {

            userData["PoppedShinyGlorbal"] = true;
            createNewNotification("GlorbalExtinction");

        };

        if (extraInfo && extraInfo["type"] == "sleeping") {

            userData["CanSpawnGlorbals"] = true;

            createNewNotification("GlorbalAwakening");

        } else {

            userData["GlorbalClicks"]++;

        }

        switch (userData["GlorbalClicks"]) {
            case 1:

                createNewNotification("GlorbalPopper");

                break;

            case 10:

                createNewNotification("GlorbalHunter");

                break;

            case 100:

                createNewNotification("GlorbalFrenzy");

                break;
        };

    });

    setTimeout(function () {

        if (glorbal && !noDespawn) {

            glorbal.remove()

        }

    }, 10000);
}

// Returns a random number from 1-100, used for positioning a new Glorbal
function randomGlorbalPos(range) {
    return Math.floor(Math.random() * range)
}

// Creates a shockwave effect for when clicking on a Glorbal
function glorbalPopEffect(info) {

    var popEffect = document.createElement("div");

    popEffect.setAttribute("class", "glorbalPop")

    popEffect.style.left = info.posX;
    popEffect.style.top = info.posY;

    popEffect.style.backgroundColor = info.color;

    document.body.appendChild(popEffect);

    setTimeout(function () {

        popEffect.remove();

    }, 500);

}

// Returns a single string that contains all the animations in the glorbalAnimations variable
function glorbalAnimationString(glorbalAnimations) {

    var animationString = "";
    var index = 0

    for (i in glorbalAnimations) {

        index++;

        if (glorbalAnimations.length != 1 && index != glorbalAnimations.length) {

            animationString += glorbalAnimations[i] + ","

        } else {

            animationString += glorbalAnimations[i]

        }

    }

    return animationString;
};

// [Notification Functions]------------------------------------------------------------------------------------------------------------------------------

// This function creates a notification in the bottom right of the screen
function createNewNotification(achievement) {

    var info = glorbalAchievements[achievement];

    if (!info || userData["Achievements"][achievement]) { return };

    userData["Achievements"][achievement] = true;

    var newNotificationContainer = document.createElement("div");
    var newNotificationTitle = document.createElement("h5");
    var newNotificationDescription = document.createElement("p");
    var newNotificationImage = document.createElement("img");
    var newNotificationSection = document.createElement("section");

    newNotificationContainer.setAttribute("class", "Notification");

    newNotificationContainer.appendChild(newNotificationImage);
    newNotificationContainer.appendChild(newNotificationSection);
    newNotificationSection.appendChild(newNotificationTitle);
    newNotificationSection.appendChild(newNotificationDescription);

    newNotificationContainer.setAttribute("class", "achievement")
    newNotificationImage.setAttribute("class", "achievement-image")

    newNotificationContainer.style.backgroundColor = info["backgroundColor"];

    newNotificationDescription.innerText = info["description"];
    newNotificationTitle.innerText = info["title"];
    newNotificationImage.src = info["image"];

    document.body.appendChild(newNotificationContainer);

    setTimeout(function () {

        newNotificationContainer.remove();

    }, 6000);

}
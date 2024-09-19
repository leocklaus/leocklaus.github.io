let currentLanguage = "en";
let currentActiveTab = "profile";

const pages = [
    {
        "id": "profile",
        "en": {
            "title": "Profile",
            "url": "/api/user/leocklaus?language=en"
        },
        "pt": {
            "title": "Perfil",
            "url": "/api/user/leocklaus?language=pt"
        }
    },
    {
        "id": "portfolio",
        "en": {
            "title": "Portfolio",
            "url": "/api/user/leocklaus/portfolio?language=en"
        },
        "pt": {
            "title": "Portfolio",
            "url": "/api/user/leocklaus/portfolio?language=pt"
        }
    },
    {
        "id": "contact",
        "en": {
            "title": "Contact",
            "url": "/api/user/leocklaus/contact?language=en"
        },
        "pt": {
            "title": "Contato",
            "url": "/api/user/leocklaus/contact?language=pt"
        }
    }
]


const footerText = {
    "en": "Made with 1L (maybe 2) of &#9749; by leocklaus",
    "pt": "Feito com 1L (talvez 2) de café por leocklaus"
}

const modal = document.querySelector(".modal");

window.addEventListener('DOMContentLoaded', function() {
    modal.showModal();
})



const fetchData = async (fileName) => {
    const response = await fetch(`./data/${fileName}`);
    const data = await response.json();
    return data;
};

const updateData = async (pageName) => {

    const fileName = `${pageName}_${currentLanguage}.json`;

    try {
        const jsonData = await fetchData(fileName);
        const formattedJson = JSON.stringify(jsonData, null, 2);
        document.getElementById("json-block").textContent = formattedJson;
        Prism.highlightElement(document.getElementById("json-block"));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

updateData(currentActiveTab);

const getElement = (id) => {
    return document.querySelector("#" + id);
}

const removeActiveTabClass = (element) => {
    element.classList.remove("active-tab");
}

const addActiveTabClass = (element) => {
    element.classList.add("active-tab");
}

const removeActiveCollectionButtonClass = (element) => {
    element.classList.remove("collections--active-button");
}

const addActiveCollectionButtonClass = (element) => {
    element.classList.add("collections--active-button");
}

const changeActiveTab = (tabName) => {
    const activeTabElement = getElement("tab--" + currentActiveTab);
    removeActiveTabClass(activeTabElement);
    const newActiveTabElement = getElement("tab--" + tabName);
    addActiveTabClass(newActiveTabElement);
}

const changeActiveCollectionButton = (buttonName) => {
    const activeButtonElement = getElement("collection--" + currentActiveTab);
    removeActiveCollectionButtonClass(activeButtonElement);
    const newActiveButtonElement = getElement("collection--" + buttonName);
    addActiveCollectionButtonClass(newActiveButtonElement);
}

const setRequestURL = () => {
    const element = getElement("request--url");
    const page = pages.filter(page => page.id == currentActiveTab);
    element.textContent = page[0][currentLanguage].url;
}

const changePage = (name) => {
    updateData(name);
    changeActiveTab(name);
    changeActiveCollectionButton(name);
    currentActiveTab = name;
    setRequestURL();
}

const toogleHiddenCollectionClass = () => {
    const element = getElement("collections");
    element.classList.toggle("collections--hidden");
}

const flipArrow = () => {
    const arrow = getElement("collection--arrow");
    if(arrow.textContent.trim() == "keyboard_arrow_down"){
        arrow.textContent = "keyboard_arrow_up";
    } else {
        arrow.textContent = "keyboard_arrow_down";
    }
}

const hidenCollection = () => {
    toogleHiddenCollectionClass();
    flipArrow();
}

const setPageNames = () => {
    pages.forEach(page => {
        id = page["id"]
        text = page[currentLanguage].title;
        tab = getElement("tab--" + id).querySelector(".tab--name");
        tab.textContent = text;
        collection = getElement("collections--" + id);
        collection.textContent = text; 
    })
}

const setFooterText = () => {
    text = footerText[currentLanguage];
    console.log(text)
    getElement("footer--text").textContent = text;
}

const setLanguage = (language) => {

    if(language == "en"){
        modal.close()
        return;
    }

    currentLanguage = language;
    setFooterText();
    setPageNames();
    updateData(currentActiveTab);
    setRequestURL();
    modal.close();
}

const profileButton = getElement("tab--profile");
const portfolioButton = getElement("tab--portfolio");
const contactButton = getElement("tab--contact");

const profileCollectionButton = getElement("collection--profile");
const portfolioCollectionButton = getElement("collection--portfolio");
const contactCollectionButton = getElement("collection--contact");

const collectionTitle = getElement("collections--title");

profileButton.addEventListener("click", () => changePage("profile"));
portfolioButton.addEventListener("click", () => changePage("portfolio"));
contactButton.addEventListener("click", () => changePage("contact"));

profileCollectionButton.addEventListener("click", () => changePage("profile"));
portfolioCollectionButton.addEventListener("click", () => changePage("portfolio"));
contactCollectionButton.addEventListener("click", () => changePage("contact"));

collectionTitle.addEventListener("click", ()=> hidenCollection());


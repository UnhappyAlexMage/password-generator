let products = [
        "Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"
];

const gridContainer = document.getElementById("productItem");
const toggleBtn = document.getElementById("toggleBtn");
const loadMoreBtn = document.getElementById("loadMoreBtn");
let indexItems = 1;
let isListMode = false;

function renderItems() {
    gridContainer.innerHTML = "";
    products.forEach((name) => {
        const item = document.createElement("div");
        item.className = "catalog-item";
        item.textContent = name;
        gridContainer.appendChild(item);
    });
};

function toggleView() {
    if (isListMode) {
        gridContainer.classList.remove("list-mode");
    } else {
        gridContainer.classList.add("list-mode");
    }
    isListMode = !isListMode;
};

function loadMoreProducts() {
    loadMoreBtn.textContent = "Загрузка...";
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
        const newProducts = [];
        const itemsToAdd = 3;
        
        for (let i = 0; i < itemsToAdd; i++) {
            newProducts.push(`New Item ${indexItems}`);
            indexItems++;
        }
        
        products.push(...newProducts);
        
        renderItems();
        
        loadMoreBtn.textContent = "Показать еще";
        loadMoreBtn.disabled = false;
        
        if (products.length > 14) {
            loadMoreBtn.textContent = "Товаров больше нет";
            loadMoreBtn.disabled = true;
        }
    }, 1000);

    console.log(products)
};

renderItems();
toggleBtn.addEventListener("click", toggleView);
loadMoreBtn.addEventListener("click", loadMoreProducts);
function openTable(evt, tableName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("menu-grid");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].className = tabcontent[i].className.replace(" active", "")
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', "");
    }

    document.getElementById(tableName).className += " active";
    
    evt.currentTarget.className += ' active';
}

function closeTab(closeButton) {
    closeButton.parentElement.className = closeButton.parentElement.className.replace(" active", "");
    console.log("Close function executed!");
}

const menuDataUrl = 'menu_data.json';

async function loadMenu() {
    try {
        const response = await fetch(menuDataUrl);
        const menuData = await response.json();

        renderMenu(menuData);
    } catch (error) {
        console.error('Failed to load menu data:', error);
    }
}

function renderMenu(data) {
    const menuContainer = document.getElementById('menu-section');
    const noticeDiv = document.querySelector('.menu-section .notice');
    const tabContainter = document.getElementById('tab-buttons');

    for (const categoryName in data) {
        if (data.hasOwnProperty(categoryName)) {
            const tabButton = document.createElement('button');
            tabButton.className = 'tablinks';
            tabButton.textContent = categoryName;

            tabButton.addEventListener('click', (event) => {
                openTable(event, categoryName);
            });

            tabContainter.appendChild(tabButton);
            
            const items = data[categoryName];

            let categoryDiv = document.getElementById(categoryName);

            if (!categoryDiv) {
                categoryDiv = document.createElement('div');
                categoryDiv.id = categoryName;
                categoryDiv.className = 'menu-grid';

                if (noticeDiv) {
                    menuContainer.insertBefore(categoryDiv, noticeDiv);
                } else {
                    menuContainer.appendChild(categoryDiv);
                }

                const closeSpan = document.createElement('span');
                closeSpan.className = 'topright';
                closeSpan.textContent = '\u00D7';
                closeSpan.setAttribute('onclick', 'closeTab(this)') 
                categoryDiv.prepend(closeSpan);
            }
            
            const existingItems = categoryDiv.querySelectorAll('.menu-item');
            existingItems.forEach(item => item.remove());

            let categoryPrice = "";
            if (items.every(item => item.price === items[0].price)) {
                categoryPrice = ` | ${items[0].price}`;
            }
            
            let h2 = categoryDiv.querySelector('h2');
            if (!h2) {
                h2 = document.createElement('h2');
                categoryDiv.insertBefore(h2, categoryDiv.children[1] || null);
            }
            h2.textContent = `${categoryName}${categoryPrice}`;

            items.forEach(item => {
                const menuItemDiv = document.createElement('div');
                menuItemDiv.className = 'menu-item';
                
                const nameHeader = document.createElement('h3');
                nameHeader.textContent = item.name;

                const priceParagraph = document.createElement('p');
                priceParagraph.textContent = item.price;

                menuItemDiv.appendChild(nameHeader);
                menuItemDiv.appendChild(priceParagraph);

                categoryDiv.appendChild(menuItemDiv);
            });
        }
    }
}

loadMenu();
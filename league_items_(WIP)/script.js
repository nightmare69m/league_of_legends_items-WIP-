// Item details database
const itemDetails = {
    // Marksman Items
    'Infinity Edge': {
        description: 'Increases critical strike damage significantly',
        stats: {
            'Attack Damage': '+65',
            'Critical Strike Chance': '+25%',
            'Critical Damage': '+40%',
            'Unique Passive': 'Critical strikes deal 35% increased damage'
        },
        category: 'Marksman',
        price: 3400
    },
    'Phantom Dancer': {
        description: 'Provides high attack speed and mobility',
        stats: {
            'Attack Speed': '+45%',
            'Critical Strike Chance': '+20%',
            'Movement Speed': '+7%',
            'Unique Passive': 'Grants ghosting and bonus move speed when near enemies'
        },
        category: 'Marksman',
        price: 2800
    },
    'Yun Tal': {
        description: 'Balanced attack speed and critical strike item',
        stats: {
            'Attack Damage': '+25',
            'Attack Speed': '+40%',
            'Critical Strike Chance': '+20%'
        },
        category: 'Marksman',
        price: 2500
    },
    'immortal_sheild_bow': {
        description: 'Provides survivability through a lifeline shield',
        stats: {
            'Attack Damage': '+50',
            'Attack Speed': '+20%',
            'Life Steal': '+10%',
            'Unique Passive': 'Lifeline - Shield when taking damage'
        },
        category: 'Marksman',
        price: 3000
    },
    // Fighter Items
    'Sundered Sky': {
        description: 'Heals upon hitting enemy champions',
        stats: {
            'Attack Damage': '+55',
            'Ability Haste': '+15',
            'Health': '+300',
            'Unique Passive': 'First attack against champion heals and deals bonus damage'
        },
        category: 'Fighter',
        price: 3100
    },
    'Stridebreaker': {
        description: 'Provides attack speed and health with a slowing active',
        stats: {
            'Attack Damage': '+50',
            'Attack Speed': '+20%',
            'Health': '+300',
            'Unique Active': 'Slow nearby enemies'
        },
        category: 'Fighter',
        price: 3300
    },
    'Black cleaver': {
        description: 'Shreds armor and provides health',
        stats: {
            'Attack Damage': '+55',
            'Health': '+400',
            'Ability Haste': '+25',
            'Unique Passive': 'Shreds armor on physical damage'
        },
        category: 'Fighter',
        price: 3100
    },
    'Eclipse': {
        description: 'Provides shielding and burst damage',
        stats: {
            'Attack Damage': '+60',
            'Lethality': '+12',
            'Omnivamp': '+8%',
            'Unique Passive': 'Gain shield and move speed after hitting twice'
        },
        category: 'Fighter',
        price: 3000
    }
    
};


const popup = document.getElementById('imagePopup');
const popupItemName = document.getElementById('popupItemName');
const popupItemImage = document.getElementById('popupItemImage');
const popupItemDescription = document.getElementById('popupItemDescription');
const popupItemStats = document.getElementById('popupItemStats');
const closePopup = document.querySelector('.close-popup');


let hoverTimeout;


function showPopup(itemName, imageSrc) {
    const item = itemDetails[itemName];
    if (!item) {
        console.log(`No details found for ${itemName}`);
        return;
    }

    
    popupItemName.textContent = itemName;
    popupItemImage.src = imageSrc;
    popupItemImage.alt = itemName;
    popupItemDescription.textContent = item.description;

    
    popupItemStats.innerHTML = '';

    // Add stats
    for (const [statName, value] of Object.entries(item.stats)) {
        const statRow = document.createElement('div');
        statRow.className = 'stat-row';
        statRow.innerHTML = `
            <span class="stat-name">${statName}:</span>
            <span class="stat-value">${value}</span>
        `;
        popupItemStats.appendChild(statRow);
    }

    
    if (item.category || item.price) {
        const infoRow = document.createElement('div');
        infoRow.className = 'stat-row';
        infoRow.innerHTML = `
            <span class="stat-name">Category:</span>
            <span class="stat-value">${item.category}</span>
        `;
        popupItemStats.appendChild(infoRow);
        
        if (item.price) {
            const priceRow = document.createElement('div');
            priceRow.className = 'stat-row';
            priceRow.innerHTML = `
                <span class="stat-name">Price:</span>
                <span class="stat-value">${item.price} gold</span>
            `;
            popupItemStats.appendChild(priceRow);
        }
    }

  
    popup.style.display = 'flex';
}


function hidePopup() {
    popup.style.display = 'none';
    clearTimeout(hoverTimeout); 
}


document.querySelectorAll('.flex-item').forEach(item => {
    const itemNameElement = item.querySelector('h3');
    const itemImageElement = item.querySelector('img');
    
    if (itemNameElement && itemImageElement) {
        const itemName = itemNameElement.textContent;
        const imageSrc = itemImageElement.src;

        
        item.addEventListener('mouseenter', () => {
            hoverTimeout = setTimeout(() => {
                showPopup(itemName, imageSrc);
            }, 2000);
        });

       
        item.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
        });

     
        item.addEventListener('click', (e) => {
            e.stopPropagation(); 
            showPopup(itemName, imageSrc);
        });
    }
});


closePopup.addEventListener('click', hidePopup);


popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        hidePopup();
    }
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hidePopup();
    }
});


document.querySelectorAll('.flex-item').forEach(item => {
    item.addEventListener('click', function(e) {
        if (popup.style.display === 'flex') {
            e.preventDefault();
            e.stopPropagation();
        }
    });
});
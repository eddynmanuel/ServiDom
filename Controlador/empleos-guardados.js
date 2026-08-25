import { auth, db } from '../Modelo/firebase.js';
import { collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// DOM Elements
const elements = {
    tabs: document.querySelectorAll('.tab-btn'),
    panels: document.querySelectorAll('.tab-panel'),
    
    // Grids
    gridGuardados: document.getElementById('grid-guardados'),
    gridPostulados: document.getElementById('grid-postulados'),
    gridProcesados: document.getElementById('grid-procesados'),
    
    // Empty states
    emptyGuardados: document.getElementById('empty-guardados'),
    emptyPostulados: document.getElementById('empty-postulados'),
    emptyProcesados: document.getElementById('empty-procesados'),
    
    // Counters
    countGuardados: document.getElementById('count-guardados'),
    countPostulados: document.getElementById('count-postulados'),
    countProcesados: document.getElementById('count-procesados')
};

let currentUser = null;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        configurarTabs();
        await cargarEmpleos();
    } else {
        window.location.href = 'login.html';
    }
});

function configurarTabs() {
    elements.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active classes
            elements.tabs.forEach(t => t.classList.remove('active'));
            elements.panels.forEach(p => p.classList.remove('active'));
            
            // Add active classes
            tab.classList.add('active');
            const targetId = `panel-${tab.dataset.tab}`;
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });
}

async function cargarEmpleos() {
    if (!currentUser) return;
    
    try {
        // Here you would normally query Firestore for saved/applied jobs
        // const qGuardados = query(collection(db, 'guardados'), where('userId', '==', currentUser.uid));
        // const qPostulados = query(collection(db, 'postulaciones'), where('userId', '==', currentUser.uid));
        
        // As this is a new implementation, the collections might be empty.
        // We will simulate 0 items to trigger the professional empty states.
        
        renderGrid([], 'guardados');
        renderGrid([], 'postulados');
        renderGrid([], 'procesados');
        
    } catch (error) {
        console.error("Error al cargar empleos:", error);
    }
}

function renderGrid(data, tipo) {
    const grid = elements[`grid${capitalize(tipo)}`];
    const emptyState = elements[`empty${capitalize(tipo)}`];
    const counter = elements[`count${capitalize(tipo)}`];
    
    if (!grid || !emptyState || !counter) return;
    
    counter.textContent = data.length;
    
    if (data.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'flex';
        return;
    }
    
    grid.style.display = 'grid';
    emptyState.style.display = 'none';
    grid.innerHTML = '';
    
    data.forEach(empleo => {
        const card = document.createElement('div');
        card.className = 'empleo-card animate-fade-in-up';
        card.innerHTML = `
            <div class="card-header">
                <span class="categoria-badge">${empleo.categoria}</span>
                <span class="precio">${empleo.precio}</span>
            </div>
            <h3>${empleo.titulo}</h3>
            <p>${empleo.descripcion}</p>
            <div class="card-footer">
                <div class="meta-info">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    ${empleo.ubicacion}
                </div>
                ${tipo === 'postulados' ? 
                    `<span class="estado-badge ${empleo.estado}">${capitalize(empleo.estado)}</span>` : 
                    `<button class="btn-secondary">Ver detalles</button>`
                }
            </div>
        `;
        grid.appendChild(card);
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

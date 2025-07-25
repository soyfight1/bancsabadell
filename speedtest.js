// Variables globales
let testRunning = false;
let testData = {
    download: 0,
    upload: 0,
    ping: 0,
    jitter: 0
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeSpeedTest();
    detectNetworkInfo();
    loadLastTestResults();
});

// Inicializar la aplicación
function initializeSpeedTest() {
    updateConnectionStatus();
    setupEventListeners();
    
    // Actualizar información del navegador
    document.getElementById('browser-info').textContent = getBrowserInfo();
    
    // Detectar tipo de conexión
    if (navigator.connection) {
        const connection = navigator.connection;
        document.getElementById('connection-type').textContent = 
            `${connection.effectiveType?.toUpperCase() || 'Desconocido'} - ${connection.downlink || 'N/A'} Mbps`;
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Click fuera del modal para cerrarlo
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('info-modal');
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Tecla ESC para cerrar modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Detectar información de red
async function detectNetworkInfo() {
    try {
        // Obtener IP pública y información del ISP
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        document.getElementById('public-ip').textContent = data.ip || 'No disponible';
        document.getElementById('isp').textContent = data.org || 'No disponible';
        document.getElementById('location').textContent = 
            `${data.city || ''}, ${data.country_name || 'No disponible'}`.replace(/^, /, '');
    } catch (error) {
        console.log('No se pudo obtener información de red externa');
        document.getElementById('public-ip').textContent = 'No disponible';
        document.getElementById('isp').textContent = 'No disponible';
        document.getElementById('location').textContent = 'No disponible';
    }
}

// Obtener información del navegador
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Desconocido';
    
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';
    
    return `${browser} ${navigator.platform}`;
}

// Actualizar estado de conexión
function updateConnectionStatus() {
    const status = navigator.onLine ? 'Conectado' : 'Desconectado';
    const connectionElement = document.getElementById('connection-type');
    
    if (navigator.onLine) {
        connectionElement.style.color = '#2ed573';
    } else {
        connectionElement.style.color = '#ff4757';
    }
}

// Iniciar test de velocidad
async function startSpeedTest() {
    if (testRunning) return;
    
    testRunning = true;
    
    // Ocultar resultados anteriores
    document.getElementById('results-container').style.display = 'none';
    document.getElementById('tips-container').style.display = 'none';
    
    // Cambiar botones
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('stop-button').style.display = 'flex';
    
    // Añadir clase de testing al speedometer
    document.getElementById('speedometer').classList.add('testing');
    
    try {
        // Test de ping primero
        await runPingTest();
        
        // Test de descarga (10 segundos)
        await runDownloadTest();
        
        // Test de subida (10 segundos)
        await runUploadTest();
        
        // Mostrar resultados
        showResults();
        
    } catch (error) {
        console.error('Error en el test:', error);
        showError('Error durante el test. Inténtalo de nuevo.');
    } finally {
        testRunning = false;
        resetUI();
    }
}

// Test de ping
async function runPingTest() {
    updateTestPhase('Midiendo latencia...');
    
    const pingResults = [];
    const testCount = 10;
    
    for (let i = 0; i < testCount; i++) {
        const startTime = performance.now();
        
        try {
            // Usar el endpoint de ping del servidor
            const response = await fetch(`/ping?t=${Date.now()}`);
            
            if (!response.ok) throw new Error('Ping failed');
            
            const endTime = performance.now();
            const pingTime = endTime - startTime;
            pingResults.push(pingTime);
            
        } catch (error) {
            console.log('Ping failed:', error);
            pingResults.push(100); // Fallback ping
        }
        
        updateProgress((i + 1) / testCount * 15); // 15% del progreso total
        await sleep(150);
    }
    
    // Filtrar outliers (valores muy altos)
    const filteredResults = pingResults.filter(ping => ping < 1000);
    const validResults = filteredResults.length > 0 ? filteredResults : pingResults;
    
    testData.ping = Math.round(validResults.reduce((a, b) => a + b) / validResults.length);
    testData.jitter = Math.round(Math.max(...validResults) - Math.min(...validResults));
}

// Test de descarga
async function runDownloadTest() {
    updateTestPhase('Probando velocidad de descarga...');
    
    const downloadSizes = [
        1024 * 500,   // 500KB
        1024 * 1024,  // 1MB
        1024 * 1024 * 2, // 2MB
        1024 * 1024 * 5, // 5MB
        1024 * 1024 * 10 // 10MB
    ];
    
    let totalBytes = 0;
    const startTime = performance.now();
    const testDuration = 10000; // 10 segundos
    
    // Hacer múltiples descargas concurrentes
    const downloadPromises = downloadSizes.map(async (size) => {
        while (performance.now() - startTime < testDuration) {
            try {
                const chunkStart = performance.now();
                const response = await fetch(`/download?size=${size}&t=${Date.now()}`);
                
                if (!response.ok) throw new Error('Download failed');
                
                const data = await response.blob();
                totalBytes += data.size;
                
                // Actualizar velocidad en tiempo real
                const elapsed = (performance.now() - startTime) / 1000;
                const currentSpeed = (totalBytes * 8) / (elapsed * 1000000); // Mbps
                updateSpeedometer(currentSpeed);
                
                // Actualizar progreso (15% a 65%)
                const progress = 15 + ((performance.now() - startTime) / testDuration) * 50;
                updateProgress(Math.min(progress, 65));
                
            } catch (error) {
                console.log('Download chunk failed:', error);
                break;
            }
            
            await sleep(50);
        }
    });
    
    await Promise.all(downloadPromises);
    
    const totalTime = (performance.now() - startTime) / 1000;
    testData.download = Math.round((totalBytes * 8) / (totalTime * 1000000)); // Mbps
}

// Test de subida
async function runUploadTest() {
    updateTestPhase('Probando velocidad de subida...');
    
    const uploadSizes = [
        1024 * 500,   // 500KB
        1024 * 1024,  // 1MB
        1024 * 1024 * 2, // 2MB
        1024 * 1024 * 5  // 5MB
    ];
    
    let totalBytes = 0;
    const startTime = performance.now();
    const testDuration = 10000; // 10 segundos
    
    // Hacer múltiples uploads concurrentes
    const uploadPromises = uploadSizes.map(async (size) => {
        while (performance.now() - startTime < testDuration) {
            try {
                const data = generateTestData(size);
                const formData = new FormData();
                formData.append('data', new Blob([data]));
                
                const chunkStart = performance.now();
                
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) throw new Error('Upload failed');
                
                const result = await response.json();
                totalBytes += size;
                
                // Actualizar velocidad en tiempo real
                const elapsed = (performance.now() - startTime) / 1000;
                const currentSpeed = (totalBytes * 8) / (elapsed * 1000000); // Mbps
                updateSpeedometer(currentSpeed);
                
                // Actualizar progreso (65% a 100%)
                const progress = 65 + ((performance.now() - startTime) / testDuration) * 35;
                updateProgress(Math.min(progress, 100));
                
            } catch (error) {
                console.log('Upload chunk failed:', error);
                break;
            }
            
            await sleep(100);
        }
    });
    
    await Promise.all(uploadPromises);
    
    const totalTime = (performance.now() - startTime) / 1000;
    testData.upload = Math.round((totalBytes * 8) / (totalTime * 1000000)); // Mbps
}

// Generar datos de prueba
function generateTestData(size) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < size; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Actualizar speedometer
function updateSpeedometer(speed) {
    const needle = document.getElementById('needle');
    const speedValue = document.getElementById('speed-value');
    
    // Calcular ángulo (de -90° a 90°)
    let angle = -90;
    if (speed > 0) {
        // Escala logarítmica para mejor visualización
        const maxSpeed = 200;
        const normalizedSpeed = Math.min(speed, maxSpeed);
        angle = -90 + (normalizedSpeed / maxSpeed) * 180;
    }
    
    needle.style.transform = `rotate(${angle}deg)`;
    speedValue.textContent = Math.round(speed);
}

// Actualizar fase del test
function updateTestPhase(phase) {
    document.getElementById('test-phase').textContent = phase;
}

// Actualizar progreso
function updateProgress(percentage) {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${Math.round(percentage)}%`;
}

// Mostrar resultados
function showResults() {
    // Actualizar valores en la UI
    document.getElementById('download-result').textContent = `${testData.download} Mbps`;
    document.getElementById('upload-result').textContent = `${testData.upload} Mbps`;
    document.getElementById('ping-result').textContent = `${testData.ping} ms`;
    document.getElementById('jitter-result').textContent = `${testData.jitter} ms`;
    
    // Mostrar contenedores
    document.getElementById('results-container').style.display = 'block';
    document.getElementById('tips-container').style.display = 'block';
    
    // Generar consejos personalizados
    generateNetworkTips();
    
    // Guardar resultados
    saveTestResults();
    
    // Actualizar último test
    updateLastTestTime();
}

// Generar consejos personalizados
function generateNetworkTips() {
    const tipsGrid = document.getElementById('tips-grid');
    tipsGrid.innerHTML = '';
    
    const tips = [];
    
    // Consejos basados en velocidad de descarga
    if (testData.download < 10) {
        tips.push({
            type: 'poor',
            title: 'Velocidad de Descarga Baja',
            description: 'Considera cambiar a un plan de internet más rápido o contactar a tu proveedor para verificar problemas en la línea.'
        });
    } else if (testData.download < 50) {
        tips.push({
            type: 'good',
            title: 'Velocidad Moderada',
            description: 'Tu velocidad es adecuada para navegación básica. Para streaming HD o gaming, considera un upgrade.'
        });
    } else {
        tips.push({
            type: 'excellent',
            title: 'Excelente Velocidad',
            description: '¡Perfecto! Tu conexión es ideal para streaming 4K, gaming online y trabajo remoto.'
        });
    }
    
    // Consejos basados en velocidad de subida
    if (testData.upload < 5) {
        tips.push({
            type: 'poor',
            title: 'Subida Limitada',
            description: 'Para videollamadas y subir archivos grandes, necesitas mayor velocidad de subida. Considera un plan simétrico.'
        });
    } else if (testData.upload < 20) {
        tips.push({
            type: 'good',
            title: 'Subida Aceptable',
            description: 'Buena para videollamadas HD. Para streaming o backup en la nube, podrías beneficiarte de más velocidad.'
        });
    } else {
        tips.push({
            type: 'excellent',
            title: 'Subida Excelente',
            description: 'Perfecta para streaming, videollamadas 4K y subir contenido pesado sin problemas.'
        });
    }
    
    // Consejos basados en ping
    if (testData.ping > 100) {
        tips.push({
            type: 'poor',
            title: 'Latencia Alta',
            description: 'Usa conexión por cable en lugar de WiFi, cierra aplicaciones que usen internet y considera cambiar de servidor DNS.'
        });
    } else if (testData.ping > 50) {
        tips.push({
            type: 'good',
            title: 'Latencia Moderada',
            description: 'Aceptable para la mayoría de actividades. Para gaming competitivo, intenta optimizar tu red local.'
        });
    } else {
        tips.push({
            type: 'excellent',
            title: 'Latencia Excelente',
            description: '¡Perfecto para gaming! Tu conexión tiene una respuesta muy rápida.'
        });
    }
    
    // Consejos basados en jitter
    if (testData.jitter > 30) {
        tips.push({
            type: 'poor',
            title: 'Conexión Inestable',
            description: 'Tu conexión tiene variaciones. Reinicia tu router, verifica cables y evita interferencias WiFi.'
        });
    }
    
    // Consejos generales
    tips.push({
        type: 'good',
        title: 'Optimización General',
        description: 'Coloca el router en posición central, actualiza firmware, usa banda 5GHz y evita obstáculos físicos.'
    });
    
    tips.push({
        type: 'good',
        title: 'Horarios Pico',
        description: 'Si la velocidad varía, evita horarios pico (19:00-23:00) para actividades que requieran ancho de banda.'
    });
    
    // Renderizar consejos
    tips.forEach(tip => {
        const tipElement = document.createElement('div');
        tipElement.className = `tip-item ${tip.type}`;
        tipElement.innerHTML = `
            <div class="tip-title">${tip.title}</div>
            <div class="tip-description">${tip.description}</div>
        `;
        tipsGrid.appendChild(tipElement);
    });
}

// Detener test
function stopSpeedTest() {
    testRunning = false;
    resetUI();
}

// Resetear UI
function resetUI() {
    document.getElementById('start-button').style.display = 'flex';
    document.getElementById('stop-button').style.display = 'none';
    document.getElementById('speedometer').classList.remove('testing');
    
    updateTestPhase('Test completado');
    updateProgress(100);
    updateSpeedometer(0);
}

// Guardar resultados del test
function saveTestResults() {
    const results = {
        ...testData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    
    localStorage.setItem('lastSpeedTest', JSON.stringify(results));
}

// Cargar últimos resultados
function loadLastTestResults() {
    const lastTest = localStorage.getItem('lastSpeedTest');
    if (lastTest) {
        const results = JSON.parse(lastTest);
        const date = new Date(results.timestamp);
        document.getElementById('last-test-time').textContent = date.toLocaleString();
        document.getElementById('last-test').style.display = 'flex';
    }
}

// Actualizar tiempo del último test
function updateLastTestTime() {
    const now = new Date();
    document.getElementById('last-test-time').textContent = now.toLocaleString();
    document.getElementById('last-test').style.display = 'flex';
}

// Mostrar error
function showError(message) {
    updateTestPhase(`Error: ${message}`);
    resetUI();
}

// Función de utilidad para sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Modal functions
function openModal() {
    document.getElementById('info-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('info-modal').style.display = 'none';
}

// Event listeners para conexión
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);

// Detectar cambios en la conexión
if (navigator.connection) {
    navigator.connection.addEventListener('change', function() {
        setTimeout(updateConnectionStatus, 1000);
    });
}

// Auto-actualizar información cada 30 segundos
setInterval(() => {
    if (!testRunning) {
        updateConnectionStatus();
    }
}, 30000);

// Shortcuts de teclado
document.addEventListener('keydown', function(e) {
    if (e.key === ' ' || e.key === 'Enter') {
        if (!testRunning) {
            e.preventDefault();
            startSpeedTest();
        }
    }
    
    if (e.key === 'i' || e.key === 'I') {
        openModal();
    }
});

// Mostrar información al hacer click en el logo
document.querySelector('.logo').addEventListener('click', openModal);
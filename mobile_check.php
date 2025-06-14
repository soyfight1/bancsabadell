<?php
function isMobileDevice() {
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    
    $mobilePatterns = [
        '/Mobile/i',
        '/Android/i',
        '/iPhone/i',
        '/iPad/i',
        '/iPod/i',
        '/BlackBerry/i',
        '/Windows Phone/i',
        '/Opera Mini/i',
        '/IEMobile/i',
        '/Mobile Safari/i',
        '/webOS/i',
        '/Kindle/i',
        '/Silk/i',
        '/Opera Mobi/i'
    ];
    
    foreach ($mobilePatterns as $pattern) {
        if (preg_match($pattern, $userAgent)) {
            return true;
        }
    }
    
    return false;
}
if (!isMobileDevice()) {
    http_response_code(404);
    ?>
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 - Página no encontrada</title>
        <style>
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .error-container { 
                background: white;
                padding: 60px 40px;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 500px;
                margin: 20px;
            }
            .error-code {
                font-size: 120px;
                font-weight: bold;
                color: #e74c3c;
                margin: 0;
                line-height: 1;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            }
            .error-title {
                font-size: 28px;
                color: #2c3e50;
                margin: 20px 0 10px 0;
                font-weight: 600;
            }
            .error-message {
                color: #7f8c8d;
                font-size: 16px;
                line-height: 1.6;
                margin: 20px 0;
            }
            .error-icon {
                font-size: 80px;
                margin-bottom: 20px;
                opacity: 0.3;
            }
            @media (max-width: 600px) {
                .error-container {
                    padding: 40px 20px;
                    margin: 10px;
                }
                .error-code {
                    font-size: 80px;
                }
                .error-title {
                    font-size: 24px;
                }
            }
        </style>
    </head>
    <body>
        <div class="error-container">
            <div class="error-icon">🔍</div>
            <h1 class="error-code">404</h1>
            <h2 class="error-title">Página no encontrada</h2>
            <p class="error-message">
                Lo sentimos, la página que buscas no existe o ha sido movida.<br>
                Por favor, verifica la URL e inténtalo de nuevo.
            </p>
        </div>
    </body>
    </html>
    <?php
    exit;
}
?>
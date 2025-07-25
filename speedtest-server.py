#!/usr/bin/env python3
import http.server
import socketserver
import json
import time
import random
import os
from urllib.parse import urlparse, parse_qs
from datetime import datetime

PORT = int(os.environ.get('PORT', 8080))

class SpeedTestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        # Endpoint para test de descarga
        if parsed_path.path == '/download':
            self.handle_download_test(parsed_path)
        # Endpoint para obtener datos de prueba
        elif parsed_path.path.startswith('/testdata'):
            self.handle_test_data(parsed_path)
        # Endpoint para ping
        elif parsed_path.path == '/ping':
            self.handle_ping()
        # Servir archivos estáticos
        else:
            if self.path == '/':
                self.path = '/speedtest.html'
            return super().do_GET()
    
    def do_POST(self):
        parsed_path = urlparse(self.path)
        
        # Endpoint para test de subida
        if parsed_path.path == '/upload':
            self.handle_upload_test()
        else:
            self.send_response(404)
            self.end_headers()
    
    def handle_download_test(self, parsed_path):
        """Maneja el test de descarga generando datos aleatorios"""
        query_params = parse_qs(parsed_path.query)
        size = int(query_params.get('size', ['1048576'])[0])  # 1MB por defecto
        
        self.send_response(200)
        self.send_header('Content-Type', 'application/octet-stream')
        self.send_header('Content-Length', str(size))
        self.end_headers()
        
        # Generar y enviar datos aleatorios
        chunk_size = 8192
        sent = 0
        
        while sent < size:
            remaining = min(chunk_size, size - sent)
            data = os.urandom(remaining)
            self.wfile.write(data)
            sent += remaining
    
    def handle_test_data(self, parsed_path):
        """Genera datos de prueba de diferentes tamaños"""
        query_params = parse_qs(parsed_path.query)
        size = int(query_params.get('size', ['1024'])[0])
        
        self.send_response(200)
        self.send_header('Content-Type', 'text/plain')
        self.send_header('Content-Length', str(size))
        self.end_headers()
        
        # Generar datos de texto aleatorio
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        data = ''.join(random.choice(chars) for _ in range(size))
        self.wfile.write(data.encode('utf-8'))
    
    def handle_upload_test(self):
        """Maneja el test de subida recibiendo datos"""
        content_length = int(self.headers.get('Content-Length', 0))
        
        start_time = time.time()
        
        # Leer datos en chunks
        bytes_received = 0
        chunk_size = 8192
        
        while bytes_received < content_length:
            remaining = min(chunk_size, content_length - bytes_received)
            chunk = self.rfile.read(remaining)
            if not chunk:
                break
            bytes_received += len(chunk)
        
        end_time = time.time()
        duration = end_time - start_time
        
        # Calcular velocidad
        speed_bps = (bytes_received * 8) / duration if duration > 0 else 0
        speed_mbps = speed_bps / 1_000_000
        
        response = {
            'bytes_received': bytes_received,
            'duration': duration,
            'speed_mbps': round(speed_mbps, 2),
            'timestamp': datetime.now().isoformat()
        }
        
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode('utf-8'))
    
    def handle_ping(self):
        """Maneja el test de ping"""
        start_time = time.time()
        
        # Simular un pequeño delay de procesamiento
        time.sleep(0.001)
        
        response = {
            'timestamp': datetime.now().isoformat(),
            'server_time': time.time()
        }
        
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode('utf-8'))
    
    def log_message(self, format, *args):
        """Override para personalizar logs"""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f"[{timestamp}] {format % args}")

class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True

def main():
    # Cambiar al directorio del script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print(f"🚀 SpeedTest Server iniciado en puerto {PORT}")
    print(f"📊 Accede a: http://localhost:{PORT}")
    print(f"🔧 Endpoints disponibles:")
    print(f"   - GET  /ping           - Test de latencia")
    print(f"   - GET  /download?size=X - Test de descarga")
    print(f"   - POST /upload         - Test de subida")
    print(f"   - GET  /testdata?size=X - Datos de prueba")
    print("🌐 Presiona Ctrl+C para detener el servidor\n")
    
    try:
        with ThreadedTCPServer(("", PORT), SpeedTestHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido")

if __name__ == "__main__":
    main()
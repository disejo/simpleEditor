// Inicializar los iconos de Lucide
lucide.createIcons();

// Código de ejemplo inicial
let contenidoInicial = {
    html: `<div class="tarjeta">\n  <h2>¡Hola, Mundo!</h2>\n  <p>Este es tu primer proyecto.</p>\n  <button id="mi-boton">Haz clic aquí</button>\n</div>`,
    css: `body {\n  font-family: Arial, sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  margin: 0;\n  background-color: #f0f4f8;\n}\n\n.tarjeta {\n  background: white;\n  padding: 20px 40px;\n  border-radius: 10px;\n  box-shadow: 0 4px 6px rgba(0,0,0,0.1);\n  text-align: center;\n}\n\nbutton {\n  background-color: #3b82f6;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 5px;\n  cursor: pointer;\n  font-size: 16px;\n  margin-top: 10px;\n}\n\nbutton:hover {\n  background-color: #2563eb;\n}`,
    js: `const boton = document.getElementById('mi-boton');\n\nboton.addEventListener('click', () => {\n  boton.textContent = '¡Hiciste clic!';\n  boton.style.backgroundColor = '#10b981';\n});`
};

const opcionesEditor = { theme: 'monokai', lineNumbers: true, lineWrapping: true, tabSize: 2 };

// Inicializar editores
const editorHTML = CodeMirror.fromTextArea(document.getElementById('html-editor'), { ...opcionesEditor, mode: 'htmlmixed' });
const editorCSS = CodeMirror.fromTextArea(document.getElementById('css-editor'), { ...opcionesEditor, mode: 'css' });
const editorJS = CodeMirror.fromTextArea(document.getElementById('js-editor'), { ...opcionesEditor, mode: 'javascript' });

editorHTML.setValue(contenidoInicial.html);
editorCSS.setValue(contenidoInicial.css);
editorJS.setValue(contenidoInicial.js);

const iframe = document.getElementById('preview-frame');

// Función mejorada para actualizar vista previa
function actualizarVistaPrevia() {
    const html = editorHTML.getValue();
    const css = editorCSS.getValue();
    const js = editorJS.getValue();

    let contenidoIframe = '';

    // Si el alumno utiliza la estructura HTML5 completa, inyectamos el CSS y JS inteligentemente
    if (html.toLowerCase().includes('<html')) {
        contenidoIframe = html;
        
        // Inyectar CSS antes del cierre del head
        if (css.trim() !== '') {
            if (contenidoIframe.includes('</head>')) {
                contenidoIframe = contenidoIframe.replace('</head>', `<style>${css}</style></head>`);
            } else {
                contenidoIframe += `<style>${css}</style>`;
            }
        }
        
        // Inyectar JS antes del cierre del body
        if (js.trim() !== '') {
            const scriptTag = `<script>try { ${js} } catch (error) { console.error("Error JS: ", error); }<\/script>`;
            if (contenidoIframe.includes('</body>')) {
                contenidoIframe = contenidoIframe.replace('</body>', `${scriptTag}</body>`);
            } else {
                contenidoIframe += scriptTag;
            }
        }
    } else {
        // Comportamiento por defecto (fragmentos)
        contenidoIframe = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>try { ${js} } catch (error) { console.error("Error JS: ", error); }<\/script>
            </body>
            </html>
        `;
    }

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(contenidoIframe);
    doc.close();
}

let temporizador;
function alCambiarCodigo() {
    clearTimeout(temporizador);
    temporizador = setTimeout(actualizarVistaPrevia, 500);
}

editorHTML.on('change', alCambiarCodigo);
editorCSS.on('change', alCambiarCodigo);
editorJS.on('change', alCambiarCodigo);
actualizarVistaPrevia();

// ---- LÓGICA DE NUEVOS BOTONES Y PANELES ---- //

// Insertar Estructura HTML5
document.getElementById('btn-html5').addEventListener('click', () => {
    const plantilla = `<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Mi Proyecto</title>\n</head>\n<body>\n  \n  <h1>¡Hola Mundo!</h1>\n  \n</body>\n</html>`;
    if (editorHTML.getValue().trim() !== '') {
        if (confirm('¿Reemplazar tu código HTML actual con la estructura básica de HTML5?')) {
            editorHTML.setValue(plantilla);
        }
    } else {
        editorHTML.setValue(plantilla);
    }
    // Asegurarnos de que el panel HTML esté visible
    document.getElementById('panel-html').classList.remove('oculto');
    document.getElementById('btn-toggle-html').classList.replace('bg-slate-800', 'bg-slate-700');
    setTimeout(() => editorHTML.refresh(), 10);
});

// Alternar visibilidad de paneles
function configurarToggle(btnId, panelId, editorInstance) {
    document.getElementById(btnId).addEventListener('click', function() {
        const panel = document.getElementById(panelId);
        const estaOculto = panel.classList.contains('oculto');
        
        if (estaOculto) {
            panel.classList.remove('oculto');
            this.classList.replace('bg-slate-800', 'bg-slate-700');
            this.style.opacity = '1';
        } else {
            panel.classList.add('oculto');
            this.classList.replace('bg-slate-700', 'bg-slate-800');
            this.style.opacity = '0.5';
        }
        
        // Actualizar todos los editores visibles para que recalcule su nuevo tamaño flexible
        setTimeout(() => {
            editorHTML.refresh();
            editorCSS.refresh();
            editorJS.refresh();
        }, 50);
    });
}

configurarToggle('btn-toggle-html', 'panel-html', editorHTML);
configurarToggle('btn-toggle-css', 'panel-css', editorCSS);
configurarToggle('btn-toggle-js', 'panel-js', editorJS);

// ---- BOTONES ANTERIORES ---- //

document.getElementById('btn-limpiar').addEventListener('click', () => {
    if(confirm('¿Estás seguro de que quieres borrar todo tu código?')) {
        editorHTML.setValue('');
        editorCSS.setValue('');
        editorJS.setValue('');
    }
});

document.getElementById('btn-descargar').addEventListener('click', () => {
    const html = editorHTML.getValue();
    const css = editorCSS.getValue();
    const js = editorJS.getValue();

    let contenidoFinal = '';
    if (html.toLowerCase().includes('<html')) {
         contenidoFinal = html.replace('</head>', `<style>\n${css}\n</style>\n</head>`)
                              .replace('</body>', `<script>\n${js}\n<\/script>\n</body>`);
    } else {
         contenidoFinal = `<!DOCTYPE html>\n<html lang="es">\n<head>\n<meta charset="UTF-8">\n<title>Mi Proyecto</title>\n<style>\n${css}\n</style>\n</head>\n<body>\n${html}\n<script>\n${js}\n<\/script>\n</body>\n</html>`;
    }
    
    const blob = new Blob([contenidoFinal], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mi-proyecto.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
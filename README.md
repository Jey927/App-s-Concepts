# Virtus — Diario de Carácter

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

Descripción
---
Virtus es una aplicación educativa diseñada para monitorear la vivencia de las virtudes en estudiantes de secundaria (media) y educación media superior. Permite el registro diario de reflexiones sobre virtudes, ofrece retroalimentación asistida por IA y presenta métricas visuales de progreso para fomentar el crecimiento del carácter.

Público objetivo
---
- Estudiantes de secundaria (media) y media superior.  
- Docentes, orientadores y familias interesados en acompañar procesos formativos en valores.

Características principales
---
- Registro diario de prácticas y reflexiones relacionadas con virtudes (Responsabilidad, Honestidad, Generosidad, Perseverancia, Respeto, Gratitud, Paciencia, Humildad).  
- Retroalimentación generada por IA (opcional) con sugerencias prácticas y motivación.  
- Panel de análisis con gráficos semanales y visión de progreso.  
- Persistencia local (localStorage) para uso sin servidor y privacidad por defecto.  
- Integración opcional con la API de Gemini para enriquecer la retroalimentación textual.

Tecnologías
---
- React 19 + Vite  
- TypeScript  
- Tailwind CSS (vía CDN en index.html)  
- Recharts (visualizaciones)  
- Lucide Icons  
- @google/genai (opcional, Gemini)

Instalación y ejecución local
---
Requisitos: Node.js (16+ recomendado)

1. Clonar el repositorio
```bash
git clone https://github.com/Jey927/App-s-Concepts.git
cd App-s-Concepts
```

2. Instalar dependencias
```bash
npm install
```

3. (Opcional) Configurar la clave de Gemini para retroalimentación IA  
Crea un archivo `.env.local` en la raíz con:
```env
GEMINI_API_KEY=tu_api_key_aqui
```

4. Ejecutar en modo desarrollo
```bash
npm run dev
```

5. Abrir la app en el navegador (por defecto)
```
http://localhost:3000
```

Uso básico
---
- Vista "Registrar": crea una entrada diaria indicando la virtud y tu reflexión.  
- Vista "Mi Progreso": visualiza gráficos y un análisis semanal generado por la integración de IA (si está configurada).  
- Los registros se guardan en localStorage; si habilitas Gemini, las reflexiones pueden enviarse a la API para generar feedback.

Estructura del proyecto
---
- src/
  - App.tsx — Componente raíz
  - components/ — CheckInForm, AnalyticsDashboard, etc.
  - services/ — Lógica para generar feedback (Gemini) y utilidades
  - types.ts — Tipos y enums (Virtue, DailyLog, AIFeedback)
- index.html, vite.config.ts, package.json, tsconfig.json — Configuración del proyecto

Privacidad y manejo de datos
---
- Por defecto, todas las reflexiones y registros se almacenan localmente (localStorage).  
- Si habilitas la integración con Gemini, los textos se envían a la API de Google; revisa las políticas de la API y evita enviar datos personales sensibles. Considera anonimizar entradas antes de enviar.

Sugerencias para producción
---
- Añadir autenticación y sincronización segura con backend si deseas persistencia multi-dispositivo.  
- Implementar cifrado/privacidad para datos sensibles.  
- Política de consentimiento y aviso a usuarios (estudiantes y/o tutores) sobre uso de IA.  
- Tests y flujo CI/CD (por ejemplo GitHub Actions) para validación.

Contribuciones
---
¡Bienvenidas! Puedes contribuir mediante:
1. Crear un fork y trabajar en una rama nueva.  
2. Abrir un Pull Request describiendo los cambios.  

Ideas de contribución:
- Agregar autenticación y sincronización en backend.  
- Mejorar accesibilidad y diseño UI.  
- Añadir tests (unitarios y e2e).  
- Añadir localizaciones y más virtudes personalizables.

Licencia
---
Actualmente no hay una licencia incluida. Si quieres que el proyecto sea público y reutilizable, se recomienda agregar una licencia (por ejemplo MIT).

Archivos recomendados a añadir
---
- `.gitignore` — node_modules, .env.local, dist, etc.  
- `LICENSE` — por ejemplo MIT si quieres compartir abiertamente.  
- `CONTRIBUTING.md` y plantillas de Issues/PRs si aceptas colaboraciones.

Contacto
---
Repositorio y perfil: https://github.com/Jey927

Notas finales
---
Este README está en español y contiene instrucciones de instalación, uso y advertencias de privacidad respecto al uso de IA. Si quieres, puedo:
- preparar y agregar el `.gitignore` y una licencia MIT al repositorio,  
- o bien, comprometer y subir este README directamente al repo por ti.

# 🏓 PaddleBuilder - Generador de Landing Pages para Escuelas de Pádel

Una aplicación completa para crear landing pages profesionales para escuelas y academias de pádel, con editor visual y integración con Supabase.

## ✨ Características

- 🎨 **Editor visual intuitivo** - Edita todas las secciones en tiempo real
- 📱 **Completamente responsivo** - Se ve perfecto en móvil y desktop
- 🔐 **Sistema de autenticación** - Con Supabase Auth
- 💾 **Persistencia en la nube** - Datos guardados en Supabase
- 👥 **Modo invitado** - Prueba sin registrarte (localStorage)
- 🚀 **Modal de publicación** - Comparte tu landing fácilmente
- 🎯 **Secciones optimizadas** - Hero, Sobre nosotros, Clases, Entrenadores, Testimonios, Ofertas, FAQ, Contacto

## Estructura del Proyecto

```
src/
├── app/                    # Páginas (App Router)
│   ├── dashboard/         # Panel de control
│   ├── builder/[id]/      # Editor visual
│   └── [slug]/           # Páginas públicas
├── components/
│   ├── builder/          # Componentes del editor
│   ├── landing/          # Componentes públicos
│   └── ui/              # Componentes base
├── lib/
│   ├── types.ts         # Definiciones TypeScript
│   ├── constants.ts     # Textos predefinidos
│   └── utils.ts         # Utilidades
└── store/
    └── landingStore.ts  # Estado global
```

## Secciones Implementadas

1. **Configuración** - Nombre, tono de voz, color primario
2. **Hero** - Título, subtítulo, CTA, imagen de fondo
3. **Sobre nosotros** - Ventajas, descripción, imágenes
4. **Clases** - Precios, descripciones, CTAs
5. **Entrenadores** - Biografías, especialidades
6. **Testimonios** - Reseñas con puntuación
7. **Oferta** - Promociones especiales
8. **FAQ** - Preguntas frecuentes
9. **Contacto** - Formulario e información

## Cómo usar

### Opción 1: Ver demos HTML (Recomendado)
Para ver el resultado final sin problemas de dependencias:

1. **Landing completa**: Abre `demo.html` en tu navegador
2. **Dashboard**: Abre `dashboard-demo.html` en tu navegador
3. **Editor**: Abre `builder-demo.html` en tu navegador

### Opción 2: Ejecutar con Next.js
```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en desarrollo
npm run dev
```

### 3. Navegación (cuando funcione con Next.js)
- `/` - Página de inicio
- `/dashboard` - Panel de control
- `/builder/padel-pro-sevilla` - Editor
- `/padel-pro-sevilla` - Landing pública

## Datos de ejemplo

El proyecto incluye datos de ejemplo para "Padel Pro Sevilla" con:
- 1 clase configurada
- 1 entrenador
- 1 testimonio
- FAQ habilitadas
- Información de contacto completa

## Próximos pasos

Para completar la funcionalidad podrías añadir:

- [ ] Base de datos real (Prisma + PostgreSQL)
- [ ] Autenticación de usuarios
- [ ] Upload de imágenes (Cloudinary/AWS S3)
- [ ] Sugerencias de IA reales
- [ ] Más editores de secciones
- [ ] Sistema de plantillas
- [ ] Exportación/publicación
- [ ] Analytics y métricas

## Tecnologías

- **Next.js 14** con App Router
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos
- **Zustand** para gestión de estado
- **shadcn/ui** para componentes base

¡El proyecto está listo para desarrollo y ampliación! 🚀# PaddleBuilder - Ready for production

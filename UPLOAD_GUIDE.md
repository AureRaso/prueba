# 📷 Guía de Upload de Imágenes

El sistema de upload de imágenes ya está implementado y funcionando. Aquí te explico cómo usarlo:

## 🔧 Funcionalidades implementadas

### 1. Upload individual de imágenes
- **Logo** (Configuración)
- **Imagen de fondo del Hero** (Hero)

### 2. Upload múltiple de imágenes
- **Galería de imágenes** (Sobre nosotros) - hasta 6 imágenes

## 🎯 Cómo usar el upload

### Métodos de carga:
1. **Drag & Drop**: Arrastra las imágenes directamente al área de upload
2. **Click para seleccionar**: Haz clic en "Seleccionar archivo(s)"
3. **Pegar**: Puedes pegar imágenes del portapapeles (próximamente)

### Formatos soportados:
- JPG, JPEG, PNG, WebP
- Tamaño máximo: 2MB (logo), 5MB (hero), 3MB (galería)

### Estados visuales:
- **Vacío**: Área de drop con icono y texto
- **Cargando**: Spinner con texto "Subiendo imagen..."
- **Cargado**: Imagen con overlay para cambiar/eliminar
- **Error**: Mensaje de error específico

## 🚀 Páginas donde funciona

### 1. Editor > Configuración
```
http://localhost:3000/builder/padel-pro-sevilla
```
- Tab "⚙️ Configuración"
- Campo "Logo": Upload individual

### 2. Editor > Hero
```
http://localhost:3000/builder/padel-pro-sevilla
```
- Tab "🎨 Hero"
- Campo "Imagen de fondo": Upload individual

### 3. Editor > Sobre nosotros
```
http://localhost:3000/builder/padel-pro-sevilla
```
- Tab "📄 Sobre nosotros"
- Campo "Imágenes": Upload múltiple (hasta 6)

## 🎨 Preview en tiempo real

Las imágenes subidas se muestran instantáneamente en:
- **Preview del editor** (lado derecho)
- **Landing pública**: `http://localhost:3000/padel-pro-sevilla`

## 💾 Almacenamiento

**Actual**: Las imágenes se convierten a base64 y se almacenan en el estado local.

**Para producción** (próximamente):
- Cloudinary, AWS S3, o similar
- URLs optimizadas
- Múltiples resoluciones
- CDN para mejor rendimiento

## 🔄 Gestión de imágenes

### Upload individual:
- **Cambiar**: Hover sobre imagen → "Cambiar"
- **Eliminar**: Hover sobre imagen → "Eliminar"

### Upload múltiple:
- **Eliminar**: Hover sobre imagen → "Eliminar"
- **Añadir más**: Arrastrar nuevas imágenes
- **Límite**: Máximo 6 imágenes por sección

## ✅ Validaciones implementadas

- ✅ Formato de archivo (solo imágenes)
- ✅ Tamaño máximo configurable
- ✅ Número máximo de archivos
- ✅ Mensajes de error descriptivos
- ✅ Estados de carga visuales

## 🐛 Solución de problemas

**Si el upload no funciona**:
1. Verifica que el archivo sea una imagen válida
2. Comprueba el tamaño (debe ser menor al límite)
3. Asegúrate de que JavaScript esté habilitado
4. Revisa la consola del navegador para errores

**Archivos no soportados**:
- PDF, videos, documentos → Solo imágenes
- Archivos corruptos → Error automático
- Archivos muy grandes → Mensaje de límite

## 🎉 ¡Listo para usar!

El sistema de upload está completamente funcional. Ve a:
**http://localhost:3000/builder/padel-pro-sevilla**

Y prueba subir imágenes en las diferentes secciones. ¡Verás los cambios en tiempo real! 🚀
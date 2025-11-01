'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { ImageUpload } from '@/components/ui/image-upload';
import { SimpleColorPicker } from '@/components/ui/simple-color-picker';
import { useLandingStore } from '@/store/landingStore';

export function ClassesEditor() {
  const { currentLanding, updateClasses, addClass, updateClass, deleteClass } = useLandingStore();
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [newClass, setNewClass] = useState({
    title: '',
    description: '',
    price: 0,
    priceUnit: 'class' as const,
    includes: [''],
    cta: 'Apuntarse',
    image: undefined as string | undefined
  });

  if (!currentLanding) return null;

  const handleAddClass = () => {
    if (newClass.title && newClass.description) {
      addClass({
        id: Date.now().toString(),
        ...newClass,
        includes: newClass.includes.filter(item => item.trim() !== '')
      });
      setNewClass({
        title: '',
        description: '',
        price: 0,
        priceUnit: 'class',
        includes: [''],
        cta: 'Apuntarse',
        image: undefined
      });
      setIsAddingClass(false);
    }
  };

  const handleIncludeChange = (index: number, value: string, isNew = false) => {
    if (isNew) {
      const newIncludes = [...newClass.includes];
      newIncludes[index] = value;
      if (index === newIncludes.length - 1 && value.trim() !== '') {
        newIncludes.push('');
      }
      setNewClass({ ...newClass, includes: newIncludes });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Clases
        </h3>

        {/* Background Color */}
        <div className="mb-6">
          <SimpleColorPicker
            value={currentLanding.classes.backgroundColor}
            onChange={(value) => updateClasses({ backgroundColor: value })}
            label="Color de fondo de la sección"
            type="background"
          />
        </div>

        {/* Text Color */}
        <div className="mb-6">
          <SimpleColorPicker
            value={currentLanding.classes.textColor}
            onChange={(value) => updateClasses({ textColor: value })}
            label="Color del texto"
            type="text"
          />
        </div>

        {/* Existing Classes */}
        <div className="space-y-4 mb-6">
          {currentLanding.classes.items.map((classItem, index) => (
            <div key={classItem.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900">{classItem.title}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteClass(classItem.id)}
                >
                  Eliminar
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Label>Título</Label>
                  <Input
                    value={classItem.title}
                    onChange={(e) => updateClass(classItem.id, { title: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Descripción</Label>
                  <Textarea
                    value={classItem.description}
                    onChange={(e) => updateClass(classItem.id, { description: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Precio</Label>
                    <Input
                      type="number"
                      value={classItem.price}
                      onChange={(e) => updateClass(classItem.id, { price: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Unidad</Label>
                    <Select
                      value={classItem.priceUnit}
                      onChange={(e) => updateClass(classItem.id, { priceUnit: e.target.value as any })}
                    >
                      <option value="class">por clase</option>
                      <option value="month">al mes</option>
                      <option value="pack">pack de clases</option>
                      <option value="trimester">trimestre</option>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Imagen</Label>
                  <ImageUpload
                    value={classItem.image}
                    onChange={(value) => updateClass(classItem.id, { image: value })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Class */}
        {!isAddingClass ? (
          <Button onClick={() => setIsAddingClass(true)}>
            + Añadir clase
          </Button>
        ) : (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-3">Nueva clase</h4>

            <div className="space-y-3">
              <div>
                <Label>Título</Label>
                <Input
                  value={newClass.title}
                  onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                  placeholder="Ej: Iniciación al Pádel"
                />
              </div>

              <div>
                <Label>Descripción</Label>
                <Textarea
                  value={newClass.description}
                  onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                  placeholder="Descripción de la clase..."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Precio</Label>
                  <Input
                    type="number"
                    value={newClass.price}
                    onChange={(e) => setNewClass({ ...newClass, price: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Unidad</Label>
                  <Select
                    value={newClass.priceUnit}
                    onChange={(e) => setNewClass({ ...newClass, priceUnit: e.target.value as any })}
                  >
                    <option value="class">por clase</option>
                    <option value="month">al mes</option>
                    <option value="pack">pack de clases</option>
                    <option value="trimester">trimestre</option>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Incluye</Label>
                {newClass.includes.map((include, index) => (
                  <Input
                    key={index}
                    value={include}
                    onChange={(e) => handleIncludeChange(index, e.target.value, true)}
                    placeholder="Ej: Material incluido"
                    className="mb-2"
                  />
                ))}
              </div>

              <div>
                <Label>Imagen</Label>
                <ImageUpload
                  value={newClass.image}
                  onChange={(value) => setNewClass({ ...newClass, image: value })}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddClass}>
                  Añadir clase
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingClass(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/image-upload';
import { SimpleColorPicker } from '@/components/ui/simple-color-picker';
import { useLandingStore } from '@/store/landingStore';

const SPECIALTIES = [
  'Iniciación',
  'Competición',
  'Táctica avanzada',
  'Técnica',
  'Preparación física',
  'Menores',
  'Adultos',
  'Seniors',
  'Psicología deportiva',
  'Entrenamiento personalizado'
];

export function TrainersEditor() {
  const { currentLanding, updateTrainers, addTrainer, updateTrainer, deleteTrainer } = useLandingStore();
  const [isAddingTrainer, setIsAddingTrainer] = useState(false);
  const [newTrainer, setNewTrainer] = useState({
    name: '',
    role: '',
    specialties: [] as string[],
    bio: '',
    image: undefined as string | undefined
  });

  if (!currentLanding) return null;

  const handleAddTrainer = () => {
    if (newTrainer.name && newTrainer.role && newTrainer.bio) {
      addTrainer({
        id: Date.now().toString(),
        ...newTrainer
      });
      setNewTrainer({
        name: '',
        role: '',
        specialties: [],
        bio: '',
        image: undefined
      });
      setIsAddingTrainer(false);
    }
  };

  const handleSpecialtyToggle = (specialty: string, trainerId?: string, isNew = false) => {
    if (isNew) {
      const newSpecialties = newTrainer.specialties.includes(specialty)
        ? newTrainer.specialties.filter(s => s !== specialty)
        : [...newTrainer.specialties, specialty];
      setNewTrainer({ ...newTrainer, specialties: newSpecialties });
    } else if (trainerId) {
      const trainer = currentLanding.trainers.items.find(t => t.id === trainerId);
      if (trainer) {
        const newSpecialties = trainer.specialties.includes(specialty)
          ? trainer.specialties.filter(s => s !== specialty)
          : [...trainer.specialties, specialty];
        updateTrainer(trainerId, { specialties: newSpecialties });
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Entrenadores
        </h3>

        {/* Background Color */}
        <div className="mb-6">
          <SimpleColorPicker
            value={currentLanding.trainers.backgroundColor}
            onChange={(value) => updateTrainers({ backgroundColor: value })}
            label="Color de fondo de la sección"
            type="background"
          />
        </div>

        {/* Text Color */}
        <div className="mb-6">
          <SimpleColorPicker
            value={currentLanding.trainers.textColor}
            onChange={(value) => updateTrainers({ textColor: value })}
            label="Color del texto"
            type="text"
          />
        </div>

        {/* Existing Trainers */}
        <div className="space-y-4 mb-6">
          {currentLanding.trainers.items.map((trainer) => (
            <div key={trainer.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900">{trainer.name}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteTrainer(trainer.id)}
                >
                  Eliminar
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Label>Nombre</Label>
                  <Input
                    value={trainer.name}
                    onChange={(e) => updateTrainer(trainer.id, { name: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Cargo/Rol</Label>
                  <Input
                    value={trainer.role}
                    onChange={(e) => updateTrainer(trainer.id, { role: e.target.value })}
                    placeholder="Ej: Director técnico, Entrenador principal..."
                  />
                </div>

                <div>
                  <Label>Especialidades</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {SPECIALTIES.map((specialty) => {
                      const isSelected = trainer.specialties.includes(specialty);
                      return (
                        <label
                          key={specialty}
                          className={`flex items-center space-x-2 p-2 rounded border cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 border-blue-200'
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSpecialtyToggle(specialty, trainer.id)}
                            className="rounded"
                          />
                          <span className="text-sm">{specialty}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label>Biografía</Label>
                  <Textarea
                    value={trainer.bio}
                    onChange={(e) => updateTrainer(trainer.id, { bio: e.target.value })}
                    rows={3}
                    placeholder="Experiencia, formación, logros..."
                  />
                </div>

                <div>
                  <Label>Foto</Label>
                  <ImageUpload
                    value={trainer.image}
                    onChange={(value) => updateTrainer(trainer.id, { image: value })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Trainer */}
        {!isAddingTrainer ? (
          <Button onClick={() => setIsAddingTrainer(true)}>
            + Añadir entrenador
          </Button>
        ) : (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-3">Nuevo entrenador</h4>

            <div className="space-y-3">
              <div>
                <Label>Nombre</Label>
                <Input
                  value={newTrainer.name}
                  onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                  placeholder="Ej: Carlos López"
                />
              </div>

              <div>
                <Label>Cargo/Rol</Label>
                <Input
                  value={newTrainer.role}
                  onChange={(e) => setNewTrainer({ ...newTrainer, role: e.target.value })}
                  placeholder="Ej: Director técnico, Entrenador principal..."
                />
              </div>

              <div>
                <Label>Especialidades</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {SPECIALTIES.map((specialty) => {
                    const isSelected = newTrainer.specialties.includes(specialty);
                    return (
                      <label
                        key={specialty}
                        className={`flex items-center space-x-2 p-2 rounded border cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 border-blue-200'
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSpecialtyToggle(specialty, undefined, true)}
                          className="rounded"
                        />
                        <span className="text-sm">{specialty}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label>Biografía</Label>
                <Textarea
                  value={newTrainer.bio}
                  onChange={(e) => setNewTrainer({ ...newTrainer, bio: e.target.value })}
                  rows={3}
                  placeholder="Experiencia, formación, logros..."
                />
              </div>

              <div>
                <Label>Foto</Label>
                <ImageUpload
                  value={newTrainer.image}
                  onChange={(value) => setNewTrainer({ ...newTrainer, image: value })}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddTrainer}>
                  Añadir entrenador
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingTrainer(false)}
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
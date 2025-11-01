import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LandingData } from '@/lib/types';

interface PublicTrainersProps {
  trainers: LandingData['trainers'];
}

export function PublicTrainers({ trainers }: PublicTrainersProps) {
  if (trainers.items.length === 0) return null;

  const textColor = trainers.textColor || '#1f2937';

  return (
    <section
      className="py-12 sm:py-16"
      style={{ backgroundColor: trainers.backgroundColor || '#ffffff' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: textColor }}
          >
            Nuestro Equipo
          </h2>
          <p
            className="text-lg sm:text-xl opacity-80"
            style={{ color: textColor }}
          >
            Entrenadores profesionales y apasionados
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {trainers.items.map((trainer) => (
            <Card key={trainer.id} className="text-center">
              <CardHeader>
                {/* Photo */}
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  {trainer.image ? (
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      {trainer.name.charAt(0)}
                    </div>
                  )}
                </div>

                <CardTitle className="text-xl">{trainer.name}</CardTitle>
                <CardDescription className="text-lg font-medium text-gray-700">
                  {trainer.role}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Specialties */}
                {trainer.specialties.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {trainer.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bio */}
                <p className="text-gray-600 text-sm">
                  {trainer.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
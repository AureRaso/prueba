import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LandingData } from '@/lib/types';

interface PublicClassesProps {
  classes: LandingData['classes'];
  primaryColor: string;
}

const getPriceUnitText = (unit: string) => {
  const unitMap: Record<string, string> = {
    'class': 'por clase',
    'month': 'al mes',
    'pack': 'pack de clases',
    'trimester': 'trimestre'
  };
  return unitMap[unit] || unit;
};

export function PublicClasses({ classes, primaryColor }: PublicClassesProps) {
  if (classes.items.length === 0) return null;

  const textColor = classes.textColor || '#1f2937';

  return (
    <section
      className="py-12 sm:py-16"
      style={{ backgroundColor: classes.backgroundColor || '#f8fafc' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2"
            style={{ color: textColor }}
          >
            Nuestras Clases
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl opacity-80 px-2"
            style={{ color: textColor }}
          >
            Encuentra la clase perfecta para tu nivel
          </p>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {classes.items.map((classItem) => (
            <Card key={classItem.id} className="h-full flex flex-col">
              {/* Image */}
              <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                {classItem.image ? (
                  <img
                    src={classItem.image}
                    alt={classItem.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Imagen de clase
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{classItem.title}</CardTitle>
                <CardDescription>{classItem.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* Price */}
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    €{classItem.price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    {getPriceUnitText(classItem.priceUnit)}
                  </span>
                </div>

                {/* Includes */}
                {classItem.includes.length > 0 && (
                  <div className="mb-6 flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Incluye:</h4>
                    <ul className="space-y-1">
                      {classItem.includes.map((item, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <span className="text-green-500 mr-2">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <Button
                  className="w-full mt-auto"
                  style={{
                    backgroundColor: primaryColor,
                    borderColor: primaryColor,
                  }}
                >
                  {classItem.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
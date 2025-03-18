
import React from 'react';
import { Card } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface ActivitySuggestionProps {
  activity: string;
}

const ActivitySuggestion: React.FC<ActivitySuggestionProps> = ({ activity }) => {
  return (
    <Card className="mt-6 p-4 bg-white/10 backdrop-blur-md border-white/20">
      <div className="flex items-start space-x-3">
        <Lightbulb className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
        <div className="text-white">
          <h3 className="font-semibold mb-1">Suggested Activity</h3>
          <p className="text-sm opacity-90">{activity}</p>
        </div>
      </div>
    </Card>
  );
};

export default ActivitySuggestion;

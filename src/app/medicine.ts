export interface Medicine {
  id: string;
  medicine: string;
  description: string;
  done: boolean;

  //An welchen Tagen soll die Medizin konsumiert werden? z.B. Mo,Mi,Fr,So
  consumption: Date;
  //Bis wann wird das Medikament eingenommen z.B. zwei Wochen
  consumption_monday: boolean;
  consumption_tuesday: boolean;
  consumption_wednesday: boolean;
  consumption_thursday: boolean;
  consumption_friday: boolean;
  consumption_satturday: boolean;
  consumption_sunday: boolean;

  //Wie oft wird das Präperat pro Tag eingenommen
  consumption_morning: boolean;
  consumption_midday: boolean;
  consumption_evening: boolean;
}
